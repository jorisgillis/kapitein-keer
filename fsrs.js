/*
 * Kapitein Keer — FSRS v6 (Free Spaced Repetition Scheduler, version 6)
 *
 * Pure-function port of the Java implementation in LingualQ-Pilot:
 *   src/main/java/com/langualQ/pilot/core/fsrs/six/
 *
 * Ported files:
 *   - FSRS6UpdateAlgorithm.java — all FSRS v6 formulas
 *   - FSRS6Scheduler.java       — short-term vs long-term scheduling, desired retention 0.9
 *   - Card.java, Grade.java, DSMemoryModel.java, MemoryModel.java, NoMemoryModel.java
 *
 * This file is PURE: no DOM access, no localStorage, no I/O of any kind.
 * It exposes a single global object: `FSRS` (window.FSRS in browsers).
 * Dates are plain JavaScript `Date` objects (the Java ZonedDateTime maps to Date).
 */
(function (global) {
  'use strict';

  // ── Weights W4–W20 — hardcoded constants from the Java source ──
  var W4 = 6.4133;
  var W5 = 0.8334;
  var W6 = 3.0194;
  var W7 = 0.001;
  var W8 = 1.8722;
  var W9 = 0.1666;
  var W10 = 0.796;
  var W11 = 1.4835;
  var W12 = 0.0614;
  var W13 = 0.2629;
  var W14 = 1.6483;
  var W15 = 0.6014;
  var W16 = 1.8729;
  var W17 = 0.5425;
  var W18 = 0.0912;
  var W19 = 0.0658;
  var W20 = 0.1542;

  // ── Initial stability per grade (Java: STABILITY_INITIAL_*) ──
  var STABILITY_INITIAL_AGAIN = 0.212;
  var STABILITY_INITIAL_HARD = 1.2931;
  var STABILITY_INITIAL_GOOD = 2.3065;
  var STABILITY_INITIAL_EASY = 8.2956;

  // ── Scheduler constants ──
  var DESIRED_RETENTION = 0.9;
  var DAY_IN_SECONDS = 24 * 60 * 60;

  // ── Grade (Java enum: AGAIN=1, HARD=2, GOOD=3, EASY=4) ──
  var Grade = Object.freeze({
    AGAIN: 1,
    HARD: 2,
    GOOD: 3,
    EASY: 4,
    Again: 1,
    Hard: 2,
    Good: 3,
    Easy: 4
  });

  function gradeFromValue(value) {
    if (value < 1 || value > 4) {
      throw new Error('Grade value must be between 1 and 4 (inclusive)');
    }
    return value;
  }

  // ── Memory models (Java: MemoryModel sealed interface) ──
  // NoMemoryModel: a card that has never been reviewed.
  function noMemoryModel() {
    return { kind: 'NoMemoryModel' };
  }

  // DSMemoryModel: difficulty (0–10) + stability (days).
  function dsMemoryModel(difficulty, stability) {
    return { kind: 'DSMemoryModel', difficulty: difficulty, stability: stability };
  }

  function isNoMemoryModel(model) {
    return model != null && model.kind === 'NoMemoryModel';
  }

  function isDSMemoryModel(model) {
    return model != null && model.kind === 'DSMemoryModel';
  }

  // ── Card (Java record Card) ──
  function initialCard() {
    return {
      memoryModel: noMemoryModel(),
      repetitions: 0,
      lapses: 0,
      nextReviewDate: null,
      previousReviewDate: null
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  // ══ FSRS6UpdateAlgorithm ══

  function initialStability(grade) {
    switch (grade) {
      case Grade.AGAIN: return STABILITY_INITIAL_AGAIN;
      case Grade.HARD: return STABILITY_INITIAL_HARD;
      case Grade.GOOD: return STABILITY_INITIAL_GOOD;
      case Grade.EASY: return STABILITY_INITIAL_EASY;
      default: throw new Error('Unknown grade: ' + grade);
    }
  }

  function initialDifficulty(grade) {
    var g = grade;
    return clamp(W4 - Math.exp(W5 * (g - 1)) + 1, 0, 10);
  }

  function initialMemoryModel(grade) {
    return dsMemoryModel(initialDifficulty(grade), initialStability(grade));
  }

  function retrievability(model, t) {
    return Math.pow(1 + (Math.pow(0.9, -1 / W20) - 1) * t / model.stability, -W20);
  }

  function stabilityGradeCompensation(grade) {
    switch (grade) {
      case Grade.AGAIN:
        throw new Error('No AGAIN grade in this flow, has a separate formula');
      case Grade.HARD: return W15;
      case Grade.GOOD: return 1.0;
      case Grade.EASY: return W16;
      default: throw new Error('Unknown grade: ' + grade);
    }
  }

  function nextShortTermStability(model, grade) {
    var G = grade;
    var S = model.stability;
    return S * Math.exp(W17 * (G - 3 + W18)) * Math.pow(S, -W19);
  }

  function nextStabilityRecalled(model, grade, t) {
    var S = model.stability;
    var D = model.difficulty;
    var R = retrievability(model, t);
    return S * (1 + stabilityGradeCompensation(grade) * Math.exp(W8) * (11 - D) *
      Math.pow(S, -W9) * (Math.exp(W10 * (1 - R)) - 1));
  }

  function nextStabilityFailed(model, t) {
    var R = retrievability(model, t);
    var D = model.difficulty;
    var S = model.stability;
    var updatedStability = W11 * Math.pow(D, -W12) * (Math.pow(S + 1, W13) - 1) *
      Math.exp(W14 * (1 - R));
    return Math.min(S, updatedStability);
  }

  function nextStability(model, grade, t) {
    if (grade === Grade.AGAIN) {
      return nextStabilityFailed(model, t);
    }
    return nextStabilityRecalled(model, grade, t);
  }

  function nextDifficulty(previous, grade) {
    var updatedDifficulty =
      previous.difficulty + (-W6 * (grade - 3)) * ((10 - previous.difficulty) / 9);
    var clampedNextDifficulty = clamp(updatedDifficulty, 0, 10);
    return W7 * initialDifficulty(Grade.EASY) + (1 - W7) * clampedNextDifficulty;
  }

  // Long-term update: t = days elapsed since the last review.
  function updateParameters(memoryModel, grade, t) {
    if (isNoMemoryModel(memoryModel)) {
      return initialMemoryModel(grade);
    }
    return dsMemoryModel(
      nextDifficulty(memoryModel, grade),
      nextStability(memoryModel, grade, t));
  }

  // Short-term update (learn phase / same-day review): no time factor.
  function updateParametersShortTerm(memoryModel, grade) {
    if (isNoMemoryModel(memoryModel)) {
      return initialMemoryModel(grade);
    }
    return dsMemoryModel(
      nextDifficulty(memoryModel, grade),
      nextShortTermStability(memoryModel, grade));
  }

  // Time interval for the next review, in (fractional) days.
  function calculateInterval(model, desiredRetention) {
    var correctionFactor = Math.pow(0.9, -1 / W20) - 1;
    var desiredRetentionFactor = Math.pow(desiredRetention, -1 / W20) - 1;
    return model.stability / correctionFactor * desiredRetentionFactor;
  }

  // ══ FSRS6Scheduler ══

  function getLapseIncrement(grade) {
    return grade === Grade.AGAIN ? 1 : 0;
  }

  function timeInDaysSinceLastReview(card, now) {
    return (now.getTime() - card.previousReviewDate.getTime()) / 1000 / DAY_IN_SECONDS;
  }

  function sameDayReview(card, now) {
    var hoursBetweenPreviousAndThisReview =
      (now.getTime() - card.previousReviewDate.getTime()) / 1000 / 3600;
    return hoursBetweenPreviousAndThisReview < 24;
  }

  // Initial scheduling OR same-day review (< 24h since previous review) → short term.
  function isShortTermLearnPhase(card, now) {
    var at = now || new Date();
    return card.previousReviewDate == null
      || card.nextReviewDate == null
      || sameDayReview(card, at);
  }

  function updateMemoryModel(card, grade, now) {
    if (isShortTermLearnPhase(card, now)) {
      return updateParametersShortTerm(card.memoryModel, grade);
    }
    return updateParameters(card.memoryModel, grade, timeInDaysSinceLastReview(card, now));
  }

  function secondsToNextReview(updatedMemoryModel) {
    return Math.round(calculateInterval(updatedMemoryModel, DESIRED_RETENTION) * DAY_IN_SECONDS);
  }

  // Schedule the next review of `card` after grading it with `grade`.
  // `now` is optional (defaults to the current time) and exists so tests
  // can pass a fixed Date — the Java Clock maps to this parameter.
  function schedule(card, grade, now) {
    var at = now || new Date();
    var updatedMemoryModel = updateMemoryModel(card, grade, at);
    var nextReviewDate = new Date(at.getTime() + secondsToNextReview(updatedMemoryModel) * 1000);
    return {
      memoryModel: updatedMemoryModel,
      repetitions: card.repetitions + 1,
      lapses: card.lapses + getLapseIncrement(grade),
      nextReviewDate: nextReviewDate,
      previousReviewDate: at
    };
  }

  // ══ Public module ══

  var FSRS = {
    // Constants
    W4: W4, W5: W5, W6: W6, W7: W7, W8: W8, W9: W9, W10: W10,
    W11: W11, W12: W12, W13: W13, W14: W14, W15: W15, W16: W16,
    W17: W17, W18: W18, W19: W19, W20: W20,
    STABILITY_INITIAL_AGAIN: STABILITY_INITIAL_AGAIN,
    STABILITY_INITIAL_HARD: STABILITY_INITIAL_HARD,
    STABILITY_INITIAL_GOOD: STABILITY_INITIAL_GOOD,
    STABILITY_INITIAL_EASY: STABILITY_INITIAL_EASY,
    DESIRED_RETENTION: DESIRED_RETENTION,
    DAY_IN_SECONDS: DAY_IN_SECONDS,

    // Data types
    Grade: Grade,
    gradeFromValue: gradeFromValue,
    Card: { initial: initialCard },
    DSMemoryModel: { create: dsMemoryModel },
    NoMemoryModel: { create: noMemoryModel },
    isDSMemoryModel: isDSMemoryModel,
    isNoMemoryModel: isNoMemoryModel,

    // FSRS6UpdateAlgorithm
    initialStability: initialStability,
    initialDifficulty: initialDifficulty,
    initialMemoryModel: initialMemoryModel,
    retrievability: retrievability,
    stabilityGradeCompensation: stabilityGradeCompensation,
    nextShortTermStability: nextShortTermStability,
    nextStabilityRecalled: nextStabilityRecalled,
    nextStabilityFailed: nextStabilityFailed,
    nextStability: nextStability,
    nextDifficulty: nextDifficulty,
    updateParameters: updateParameters,
    updateParametersShortTerm: updateParametersShortTerm,
    calculateInterval: calculateInterval,

    // FSRS6Scheduler
    schedule: schedule,
    isShortTermLearnPhase: isShortTermLearnPhase,
    timeInDaysSinceLastReview: timeInDaysSinceLastReview,
    secondsToNextReview: secondsToNextReview
  };

  global.FSRS = FSRS;
})(typeof window !== 'undefined' ? window : globalThis);
