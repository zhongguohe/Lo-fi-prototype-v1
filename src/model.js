export const STORAGE_KEY = "si684-wireframe-v1";
export const uid = () => globalThis.crypto.randomUUID();
export function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function shiftDate(day, amount) {
  const d = new Date(`${day}T12:00:00`);
  d.setDate(d.getDate() + amount);
  return dateKey(d);
}
export function weekKey(day) {
  const d = new Date(`${day}T12:00:00`);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return dateKey(d);
}
export const minutes = (seconds) => Math.round((seconds / 60) * 10) / 10;
export const round = (n) => Math.round(n * 10) / 10;
export function initialState(examples = true) {
  const today = dateKey();
  return {
    version: 1,
    setup: false,
    dayOffset: 0,
    prefs: {
      interval: 45,
      duration: 3,
      activity: "Short walk",
      goal: 60,
      pet: false,
      notifications: true,
      nickname: "Student",
      avatar: "S",
      device: false,
      scheduledGoal: null,
    },
    study: { status: "idle", seconds: 0, remaining: 2700, reminders: "on" },
    active: null,
    records: examples
      ? [
          {
            id: "sample-break",
            activity: "Short walk",
            category: "study",
            date: today,
            duration: 3,
            intensity: "Light",
            source: "Self-reported",
            completion: "Completed",
          },
          {
            id: "sample-exercise",
            activity: "Brisk walk",
            category: "exercise",
            date: today,
            duration: 20,
            intensity: "Moderate",
            source: "Self-reported",
            completion: "Completed",
          },
        ]
      : [],
    plans: examples
      ? [
          {
            id: "sample-plan",
            activity: "Brisk walk",
            date: today,
            time: "17:30",
            duration: 20,
            barrier: "An assignment takes longer than expected",
            backup: "Indoor stretching",
            backupDuration: 10,
            status: "Planned",
          },
        ]
      : [],
  };
}
export function todayFor(state) {
  return shiftDate(dateKey(), state.dayOffset);
}
export function goalFor(state, day = todayFor(state)) {
  const scheduled = state.prefs.scheduledGoal;
  return scheduled && weekKey(day) >= scheduled.week
    ? scheduled.value
    : state.prefs.goal;
}
export function stats(records, day) {
  const breaks = records.filter((r) => r.category === "study");
  const weekly = records.filter(
    (r) =>
      r.category === "exercise" &&
      r.intensity === "Moderate" &&
      weekKey(r.date) === weekKey(day),
  );
  const total = round(records.reduce((a, r) => a + Number(r.duration), 0));
  return {
    breaks: breaks.length,
    breakMinutes: round(breaks.reduce((a, r) => a + Number(r.duration), 0)),
    todayBreaks: breaks.filter((r) => r.date === day).length,
    moderate: round(weekly.reduce((a, r) => a + Number(r.duration), 0)),
    total,
    stage: Math.floor(total / 30) + 1,
    next: round(30 - (total % 30)),
  };
}
export function saveRecord(state, record) {
  const records = [...state.records.filter((r) => r.id !== record.id), record];
  return {
    ...state,
    records,
    plans: state.plans.map((p) =>
      p.id === record.planId ? { ...p, status: record.completion } : p,
    ),
  };
}
export function tick(state, delta = 1) {
  let study = state.study,
    active = state.active;
  if (study.status === "studying")
    study = {
      ...study,
      seconds: study.seconds + delta,
      remaining:
        study.reminders !== "paused" && state.prefs.notifications
          ? Math.max(0, study.remaining - delta)
          : study.remaining,
    };
  if (active?.status === "running")
    active = { ...active, seconds: active.seconds + delta };
  if (study.remaining === 0 && study.reminders === "delayed")
    study = { ...study, reminders: "on" };
  return { ...state, study, active };
}
export function readState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (s?.version === 1 && Array.isArray(s.records) && Array.isArray(s.plans))
      return s;
  } catch {}
  return initialState();
}
