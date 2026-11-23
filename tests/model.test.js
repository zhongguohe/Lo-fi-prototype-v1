import test from "node:test";
import assert from "node:assert/strict";
import {
  initialState,
  dateKey,
  shiftDate,
  weekKey,
  stats,
  saveRecord,
  tick,
  goalFor,
  updateWeeklyGoal,
  recordDateError,
  scheduleErrors,
  releaseSavedActivity,
} from "../src/model.js";
const today = dateKey();
const record = (extra = {}) => ({
  id: "test",
  activity: "Walk",
  category: "exercise",
  date: today,
  duration: 10,
  intensity: "Moderate",
  source: "Self-reported",
  completion: "Completed",
  ...extra,
});
test("sample records keep study breaks and moderate exercise separate", () => {
  const s = initialState();
  const p = stats(s.records, today);
  assert.equal(p.total, 23);
  assert.equal(p.moderate, 20);
  assert.equal(p.breaks, 1);
  assert.equal(p.breakMinutes, 3);
});
test("a light backup earns growth but no moderate exercise minutes", () => {
  const s = saveRecord(initialState(false), record({ intensity: "Light" }));
  assert.equal(stats(s.records, today).total, 10);
  assert.equal(stats(s.records, today).moderate, 0);
});
test("saving the same activity twice replaces it; editing recalculates growth", () => {
  let s = saveRecord(initialState(false), record({ duration: 33 }));
  s = saveRecord(s, record({ duration: 33 }));
  assert.equal(s.records.length, 1);
  assert.equal(stats(s.records, today).stage, 2);
  s = saveRecord(s, record({ duration: 29 }));
  assert.equal(stats(s.records, today).total, 29);
  assert.equal(stats(s.records, today).stage, 1);
});
test("rescheduling, skipping, and pet toggle do not create activity credit", () => {
  let s = initialState();
  s = {
    ...s,
    prefs: { ...s.prefs, pet: false },
    plans: s.plans.map((p) => ({ ...p, status: "Rescheduled" })),
  };
  assert.equal(stats(s.records, today).total, 23);
  s.plans[0].status = "Skipped";
  assert.equal(stats(s.records, today).total, 23);
});
test("study pause freezes both timers, reminders pause only freezes countdown", () => {
  let s = initialState(false);
  s.study = { status: "studying", seconds: 0, remaining: 60, reminders: "on" };
  s = tick(s, 10);
  assert.equal(s.study.seconds, 10);
  assert.equal(s.study.remaining, 50);
  s.study.status = "paused";
  s = tick(s, 10);
  assert.equal(s.study.seconds, 10);
  assert.equal(s.study.remaining, 50);
  s.study.status = "studying";
  s.study.reminders = "paused";
  s = tick(s, 10);
  assert.equal(s.study.seconds, 20);
  assert.equal(s.study.remaining, 50);
});
test("a delayed reminder preserves study time and becomes due after delay", () => {
  let s = initialState(false);
  s.study = {
    status: "studying",
    seconds: 2700,
    remaining: 300,
    reminders: "delayed",
  };
  s = tick(s, 300);
  assert.equal(s.study.seconds, 3000);
  assert.equal(s.study.remaining, 0);
  assert.equal(s.study.reminders, "on");
});
test("notifications off keeps study running, and activity timer only runs while active", () => {
  let s = initialState(false);
  s.prefs.notifications = false;
  s.study = { status: "studying", seconds: 0, remaining: 60, reminders: "on" };
  s.active = { status: "paused", seconds: 3 };
  s = tick(s, 10);
  assert.equal(s.study.seconds, 10);
  assert.equal(s.study.remaining, 60);
  assert.equal(s.active.seconds, 3);
  s.active.status = "running";
  assert.equal(tick(s, 10).active.seconds, 13);
});
test("week totals use actual activity date and Monday as the week start", () => {
  assert.equal(weekKey("2026-11-08"), "2026-11-02");
  assert.equal(weekKey("2026-11-09"), "2026-11-09");
  assert.equal(
    stats([record({ date: "2026-11-08" })], "2026-11-09").moderate,
    0,
  );
});
test("next week goal preserves current goal until its effective week", () => {
  const s = initialState();
  s.prefs.scheduledGoal = { value: 90, week: "2026-11-09" };
  assert.equal(goalFor(s, "2026-11-08"), 60);
  assert.equal(goalFor(s, "2026-11-09"), 90);
});
test("saving a confirmed activity updates its plan; a pending timer alone does not", () => {
  let s = initialState();
  s.active = { status: "pending", planId: "sample-plan", seconds: 600 };
  assert.equal(s.plans[0].status, "Planned");
  s = saveRecord(
    s,
    record({ planId: "sample-plan", completion: "Ended Early" }),
  );
  assert.equal(s.plans[0].status, "Ended Early");
});
test("next day without activity retains cumulative points; empty start has no records", () => {
  const s = initialState();
  const next = stats(s.records, shiftDate(today, 1));
  assert.equal(next.total, 23);
  assert.equal(next.todayBreaks, 0);
  assert.equal(initialState(false).plans.length, 0);
  assert.equal(initialState(false).records.length, 0);
});

test("future actual records cannot create or replace activity credit", () => {
  let s = initialState(false);
  const future = record({ date: shiftDate(today, 1), planId: "planned" });
  s.plans = [{ id: "planned", status: "Planned" }];
  assert.equal(saveRecord(s, future), s);
  assert.equal(s.plans[0].status, "Planned");
  s = saveRecord(s, record());
  const corrected = saveRecord(s, future);
  assert.equal(corrected, s);
  assert.equal(stats(corrected.records, today).total, 10);
  assert.equal(recordDateError("2026-02-31", today), "Enter a valid activity date.");
  assert.equal(recordDateError(today, today), "");
  assert.equal(recordDateError(shiftDate(today, -1), today), "");
});

test("exercise must have an explicitly chosen valid intensity before saving", () => {
  const s = initialState(false);
  for (const intensity of ["", undefined, "Unknown"]) {
    assert.equal(saveRecord(s, record({ intensity })), s);
  }
  const light = saveRecord(s, record({ intensity: "Light" }));
  assert.equal(stats(light.records, today).moderate, 0);
  assert.equal(stats(light.records, today).total, 10);
  const moderate = saveRecord(s, record({ intensity: "Moderate" }));
  assert.equal(stats(moderate.records, today).moderate, 10);
});

test("legacy future records are retained but excluded from current activity totals", () => {
  const records = [
    record({ id: "old", date: "2026-11-19" }),
    record({ id: "future", date: "2026-11-21", duration: 40 }),
    record({ id: "future-break", category: "study", date: "2026-11-21" }),
  ];
  const totals = stats(records, "2026-11-20");
  assert.equal(totals.moderate, 10);
  assert.equal(totals.total, 10);
  assert.equal(totals.breaks, 0);
  assert.equal(records.length, 3);
});

test("new future goal preserves the goal that has already taken effect", () => {
  let s = initialState(false);
  s.prefs.scheduledGoal = { value: 90, week: "2026-11-16" };
  s = updateWeeklyGoal(s, 120, "next", "2026-11-20");
  assert.equal(goalFor(s, "2026-11-20"), 90);
  assert.equal(goalFor(s, "2026-11-23"), 120);
  s = updateWeeklyGoal(s, 150, "next", "2026-11-20");
  assert.equal(goalFor(s, "2026-11-20"), 90);
  assert.equal(goalFor(s, "2026-11-23"), 150);
  s = updateWeeklyGoal(s, 75, "this", "2026-11-20");
  assert.equal(s.prefs.scheduledGoal, null);
  assert.equal(goalFor(s, "2026-11-20"), 75);
  assert.equal(s.records.length, 0);
});

test("plan dates and times reject past schedules while allowing future days", () => {
  const now = new Date(2026, 10, 20, 15, 30);
  assert.ok(scheduleErrors("2026-11-19", "17:30", "2026-11-20", now).date);
  assert.ok(scheduleErrors("2026-11-20", "15:29", "2026-11-20", now).time);
  assert.deepEqual(scheduleErrors("2026-11-20", "15:30", "2026-11-20", now), {});
  assert.deepEqual(scheduleErrors("2026-11-21", "08:00", "2026-11-20", now), {});
  assert.ok(scheduleErrors("2026-11-20", "25:00", "2026-11-20", now).time);
});

test("leaving saved feedback releases the task without changing its record or plan", () => {
  let s = initialState();
  s.active = { category: "study", status: "saved", id: "sample-break" };
  s.study = { ...s.study, status: "on-break", seconds: 120 };
  const next = releaseSavedActivity(s);
  assert.equal(next.active, null);
  assert.equal(next.study.status, "paused");
  assert.equal(next.study.seconds, 120);
  assert.equal(next.records, s.records);
  assert.equal(next.plans, s.plans);
  assert.equal(stats(next.records, today).total, 23);
  for (const status of ["ready", "running", "paused", "pending"]) {
    s.active = { category: "study", status };
    assert.equal(releaseSavedActivity(s), s);
  }
  s.active = { category: "exercise", status: "saved" };
  assert.equal(releaseSavedActivity(s).study, s.study);
});
