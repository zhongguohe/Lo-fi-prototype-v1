import Form, { Field } from "./Form";
import React, {
  useState,
  useEffect,
  useRef,
  useId,
  createContext,
  useContext,
} from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  NavLink,
} from "react-router-dom";
import {
  Home as HomeIcon,
  BookOpen,
  Dumbbell,
  BarChart3,
  UserRound,
  ArrowLeft,
  ChevronRight,
  Clock,
  Plus,
  Settings,
  Pause,
  Play,
  Check,
  Cat,
  X,
} from "lucide-react";
import {
  STORAGE_KEY,
  uid,
  dateKey,
  shiftDate,
  weekKey,
  minutes,
  round,
  initialState,
  todayFor,
  goalFor,
  stats,
  saveRecord,
  tick,
  readState,
} from "./model";
const Context = createContext();
const useApp = () => useContext(Context);
const titles = {
  "/setup": ["P01", "Initial Setup"],
  "/": ["P02", "Home"],
  "/study/settings": ["P03", "Study Settings"],
  "/study": ["P04", "Study Session"],
  "/activity": ["P05", "Activity Session"],
  "/confirm": ["P06", "Activity Confirmation"],
  "/exercise": ["P07", "Exercise Plans"],
  "/plan/new": ["P08", "Plan Editor"],
  "/backup": ["P09", "Backup Setup"],
  "/progress": ["P11", "Progress Overview"],
  "/history": ["P12", "Activity History"],
  "/pet": ["P14", "Virtual Pet"],
  "/personal": ["P15", "Personal Center"],
};
const fmtTime = (n) =>
  `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
const displayDate = (d) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
const categoryName = (c) =>
  c === "study" ? "Study Break" : "Planned Exercise";
function Button({
  children,
  secondary = false,
  danger = false,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={`button ${secondary ? "secondary" : ""} ${danger ? "danger" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
function Card({ title, children, className = "" }) {
  return (
    <section className={`card ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
function Badge({ children }) {
  return <span className="badge">{children}</span>;
}
function Empty({ children }) {
  return <p className="empty">{children}</p>;
}
function Row({ label, value }) {
  return (
    <div className="data-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
function Meter({ value, max, label }) {
  return (
    <div className="meter-group">
      <div
        className="meter"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={Math.max(max, value)}
      >
        <div style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
      <p className="hint">
        {value} / {max} {label}
      </p>
    </div>
  );
}
function LinkButton({ to, children, secondary = false }) {
  const nav = useNavigate();
  return (
    <Button secondary={secondary} onClick={() => nav(to)}>
      {children}
    </Button>
  );
}
function Toggle({ label, checked, onChange }) {
  return (
    <label className="toggle">
      <span>{label}</span>
      <input
        aria-label={label}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-state">{checked ? "On" : "Off"}</span>
    </label>
  );
}
function ActivityFields({ draft, setDraft, category = false }) {
  const change = (k, v) => setDraft({ ...draft, [k]: v });
  return (
    <>
      {category && (
        <Field label="Activity Category">
          <select
            value={draft.category}
            onChange={(e) => change("category", e.target.value)}
          >
            <option value="study">Study Break</option>
            <option value="exercise">Planned Exercise</option>
          </select>
        </Field>
      )}
      <Field label="Activity Type">
        <input
          required
          pattern=".*\S.*"
          maxLength={70}
          value={draft.activity}
          onChange={(e) => change("activity", e.target.value)}
        />
      </Field>
      <Field label="Date">
        <input
          required
          type="date"
          value={draft.date}
          onInput={(e) => change("date", e.currentTarget.value)}
          onChange={(e) => change("date", e.target.value)}
        />
      </Field>
      <Field label="Actual Duration (minutes)">
        <input
          required
          type="number"
          min="0.1"
          max="600"
          step="0.1"
          value={draft.duration}
          onChange={(e) => change("duration", e.target.value)}
        />
      </Field>
      <Field label="Intensity">
        <select
          value={draft.intensity}
          onChange={(e) => change("intensity", e.target.value)}
        >
          <option>Light</option>
          <option>Moderate</option>
        </select>
      </Field>
      <p className="hint">
        Light activities do not count toward your weekly moderate exercise goal.
      </p>
    </>
  );
}
function App() {
  const [previewScale, setPreviewScale] = useState(() =>
    Math.min(1, (window.innerHeight - 72) / 844),
  );
  useEffect(() => {
    const resize = () =>
      setPreviewScale(
        Math.max(0.1, Math.min(1, (window.innerHeight - 72) / 844)),
      );
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const [state, setState] = useState(readState),
    [modal, setModal] = useState(null),
    [notice, setNotice] = useState(""),
    [planDraft, setPlanDraft] = useState(null);
  const nav = useNavigate(),
    location = useLocation(),
    content = useRef();
  const patchPrefs = (values) =>
    setState((s) => ({ ...s, prefs: { ...s.prefs, ...values } }));
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      setNotice("Your browser could not save data. Keep this tab open.");
    }
  }, [state]);
  useEffect(() => {
    const id = setInterval(
      () =>
        setState((s) =>
          s.study.status === "studying" || s.active?.status === "running"
            ? tick(s)
            : s,
        ),
      1000,
    );
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (
      state.study.status === "studying" &&
      state.study.reminders === "on" &&
      state.prefs.notifications &&
      state.study.remaining === 0 &&
      !state.active &&
      !modal &&
      location.pathname !== "/study/settings"
    )
      setModal({ type: "reminder" });
  }, [state, modal, location.pathname]);
  useEffect(() => {
    content.current?.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    if (notice) {
      const id = setTimeout(() => setNotice(""), 6000);
      return () => clearTimeout(id);
    }
  }, [notice]);
  const today = todayFor(state),
    summary = stats(state.records, today),
    goal = goalFor(state);
  const studyRound = () =>
    setState((s) => ({
      ...s,
      study: {
        ...s.study,
        status: "studying",
        remaining: s.prefs.interval * 60,
        reminders: "on",
      },
    }));
  const startActivity = (category, plan = null, backup = false) => {
    if (state.active) {
      nav(
        state.active.status === "pending" || state.active.status === "saved"
          ? "/confirm"
          : "/activity",
      );
      return;
    }
    setState((s) => ({
      ...s,
      study:
        category === "study" ? { ...s.study, status: "on-break" } : s.study,
      active: {
        id: uid(),
        category,
        planId: plan?.id,
        activity:
          category === "study"
            ? s.prefs.activity
            : backup
              ? plan.backup
              : plan.activity,
        planned: Number(
          category === "study"
            ? s.prefs.duration
            : backup
              ? plan.backupDuration
              : plan.duration,
        ),
        intensity:
          category === "study" ||
          !/brisk|cycl|jogg|running|swim|aerobic/i.test(
            backup ? plan.backup : plan.activity,
          )
            ? "Light"
            : "Moderate",
        date: today,
        source: "Self-reported",
        status: "ready",
        seconds: 0,
        completion: "Completed",
        previousPlanStatus: plan?.status,
        usingBackup: backup,
      },
    }));
    setModal(null);
    nav("/activity");
  };
  const finishActivity = (early = false) => {
    setState((s) => ({
      ...s,
      active: {
        ...s.active,
        status: "pending",
        duration: Math.max(0.1, minutes(s.active.seconds)),
        completion: early ? "Ended Early" : "Completed",
      },
    }));
    setModal(null);
    nav("/confirm");
  };
  const discard = () => {
    const a = state.active;
    setState((s) => ({
      ...s,
      active: null,
      plans: s.plans.map((p) =>
        p.id === a?.planId && a?.status !== "saved"
          ? { ...p, status: a.previousPlanStatus || "Planned" }
          : p,
      ),
      study:
        a?.category === "study" ? { ...s.study, status: "paused" } : s.study,
    }));
    setModal(null);
    nav(
      a?.category === "study"
        ? "/study"
        : a?.planId
          ? `/plan/${a.planId}`
          : "/",
    );
  };
  const nextPlans = state.plans
    .filter((p) => ["Planned", "Rescheduled"].includes(p.status))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const ctx = {
    state,
    setState,
    modal,
    setModal,
    notice,
    setNotice,
    nav,
    today,
    summary,
    goal,
    patchPrefs,
    studyRound,
    startActivity,
    finishActivity,
    discard,
    planDraft,
    setPlanDraft,
    nextPlans,
  };
  let [pageId, title] =
    titles[location.pathname] ||
    (location.pathname.startsWith("/plan/")
      ? [
          location.pathname.endsWith("/edit") ? "P08" : "P10",
          location.pathname.endsWith("/edit") ? "Plan Editor" : "Plan Details",
        ]
      : [
          "P13",
          location.pathname.endsWith("/new")
            ? "Add Activity"
            : "Record Details",
        ]);
  const hideNav = ["/setup", "/activity", "/confirm"].includes(
    location.pathname,
  );
  function back() {
    if (location.pathname === "/activity") {
      setModal({ type: "leave-activity" });
      return;
    }
    if (location.pathname === "/confirm" && state.active?.status !== "saved") {
      setModal({ type: "discard" });
      return;
    }
    if (location.pathname === "/confirm") {
      nav(
        state.active?.category === "study"
          ? "/study"
          : `/plan/${state.active?.planId}`,
      );
      setState((s) => ({
        ...s,
        active: null,
        study:
          s.active?.category === "study"
            ? { ...s.study, status: "paused", remaining: s.prefs.interval * 60 }
            : s.study,
      }));
      return;
    }
    if (location.pathname === "/backup") {
      nav("/plan/new");
      return;
    }
    const target = location.pathname.startsWith("/plan/")
      ? "/exercise"
      : location.pathname.startsWith("/record/")
        ? "/history"
        : location.pathname === "/study/settings"
          ? "/study"
          : ["/history", "/pet"].includes(location.pathname)
            ? "/progress"
            : "/";
    nav(target);
  }
  return (
    <Context.Provider value={ctx}>
      <div className="desktop">
        <div
          className="phone-stage"
          style={{ "--preview-scale": previewScale }}
        >
          <div className="phone">
            <header className="header">
              <div className="brand">
                <BookOpen size={18} />
                <span>MOVE MORE</span>
                <span className="lofi">LO-FI V1</span>
              </div>
              <div className="header-row">
                {location.pathname !== "/" &&
                  location.pathname !== "/setup" && (
                    <button
                      className="icon-button"
                      aria-label="Back"
                      onClick={back}
                    >
                      <ArrowLeft size={21} />
                    </button>
                  )}
                <div className="heading">
                  <span className="eyebrow">{pageId} / SI684</span>
                  <h1>{title}</h1>
                </div>
                {location.pathname !== "/setup" && (
                  <button
                    className="avatar"
                    aria-label="Personal Center"
                    onClick={() =>
                      location.pathname === "/activity"
                        ? setModal({ type: "leave-activity" })
                        : nav("/personal")
                    }
                  >
                    {state.prefs.avatar === "icon" ? (
                      <UserRound size={20} />
                    ) : (
                      state.prefs.avatar
                    )}
                  </button>
                )}
              </div>
            </header>
            <main
              ref={content}
              className={`content ${hideNav ? "no-nav" : ""}`}
            >
              {notice && (
                <div role="status" className="notice">
                  {notice}
                </div>
              )}
              <Routes>
                <Route path="/setup" element={<Setup />} />
                {!state.setup ? (
                  <Route path="*" element={<Navigate to="/setup" replace />} />
                ) : (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="/study" element={<Study />} />
                    <Route path="/study/settings" element={<StudySettings />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/confirm" element={<Confirmation />} />
                    <Route path="/exercise" element={<Plans />} />
                    <Route
                      path="/plan/new"
                      element={<PlanEditor key="new" />}
                    />
                    <Route
                      path="/plan/:id/edit"
                      element={<PlanEditor key={location.pathname} />}
                    />
                    <Route path="/backup" element={<Backup />} />
                    <Route path="/plan/:id" element={<PlanDetails />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/history" element={<History />} />
                    <Route
                      path="/record/:id"
                      element={<Record key={location.pathname} />}
                    />
                    <Route path="/pet" element={<Pet />} />
                    <Route path="/personal" element={<Personal />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </>
                )}
              </Routes>
            </main>
            {!hideNav && state.setup && (
              <nav className="bottom-nav" aria-label="Main navigation">
                {[
                  ["/", HomeIcon, "Home"],
                  ["/study", BookOpen, "Study"],
                  ["/exercise", Dumbbell, "Exercise"],
                  ["/progress", BarChart3, "Progress"],
                ].map(([to, Icon, label]) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      isActive ||
                      (to === "/exercise" &&
                        location.pathname.startsWith("/plan")) ||
                      (to === "/progress" &&
                        ["/history", "/pet"].includes(location.pathname))
                        ? "selected"
                        : ""
                    }
                  >
                    <Icon size={21} />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
            )}
            {modal && <Modal key={modal.type} />}
          </div>
        </div>
        <p className="desktop-caption">
          SI684 · 390 × 844 · Preview {Math.round(previewScale * 100)}%
        </p>
      </div>
    </Context.Provider>
  );
}
function Setup() {
  const { state, setState, nav } = useApp();
  const [d, setD] = useState({ ...state.prefs, petChoice: "" });
  return (
    <>
      <p className="intro">Make room for movement.</p>
      <p>
        Set a study rhythm and a weekly exercise goal that work for you. You can
        change these later.
      </p>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setState((s) => ({
            ...s,
            setup: true,
            prefs: { ...s.prefs, ...d, pet: d.petChoice === "yes" },
            study: { ...s.study, remaining: Number(d.interval) * 60 },
          }));
          nav("/");
        }}
      >
        <PreferenceFields draft={d} setDraft={setD} />
        <Field label="Weekly Exercise Goal (minutes)">
          <input
            required
            type="number"
            min="1"
            max="3000"
            value={d.goal}
            onChange={(e) => setD({ ...d, goal: Number(e.target.value) })}
          />
        </Field>
        <p className="hint">
          Counts confirmed moderate planned exercise. Start with a goal that
          feels manageable.
        </p>
        <Field label="Would you like to show a virtual pet?">
          <select
            required
            value={d.petChoice}
            onChange={(e) => setD({ ...d, petChoice: e.target.value })}
          >
            <option value="">Choose a preference</option>
            <option value="yes">Yes, show my pet</option>
            <option value="no">No, just show my progress</option>
          </select>
        </Field>
        <Card title="How records work">
          <p>
            Review and confirm your activity before it counts. This prototype
            uses self-reported records. No device is required.
          </p>
          <p className="hint">
            {state.records.length || state.plans.length
              ? "Sample activities and one plan are included for classroom testing. Reset to an empty start in Personal Center → Device & Data."
              : "You are starting with no activity records or exercise plans. You can load sample data in Personal Center → Device & Data."}
          </p>
        </Card>
        <Button type="submit">Save & Continue</Button>
      </Form>
    </>
  );
}
function PreferenceFields({ draft: d, setDraft }) {
  return (
    <>
      <Field label="Study Interval (minutes)">
        <input
          required
          type="number"
          min="1"
          max="180"
          value={d.interval}
          onChange={(e) => setDraft({ ...d, interval: Number(e.target.value) })}
        />
      </Field>
      <Field label="Break Duration (minutes)">
        <input
          required
          type="number"
          min="1"
          max="60"
          value={d.duration}
          onChange={(e) => setDraft({ ...d, duration: Number(e.target.value) })}
        />
      </Field>
      <Field label="Preferred Break Activity">
        <select
          value={d.activity}
          onChange={(e) => setDraft({ ...d, activity: e.target.value })}
        >
          <option>Short walk</option>
          <option>Stretching</option>
          <option>Walk to get water</option>
          <option>Gentle movement</option>
        </select>
      </Field>
    </>
  );
}
function Home() {
  const { state, today, summary, goal, nextPlans, nav } = useApp();
  const next = nextPlans[0];
  return (
    <>
      <p className="eyebrow">{displayDate(today)}</p>
      <p className="intro">Hi, {state.prefs.nickname}.</p>
      <p className="subtle">A little movement, on your terms.</p>
      {state.active && (
        <Card title="Activity to finish">
          <p>
            {state.active.activity} ·{" "}
            {state.active.status === "saved"
              ? "Saved — ready to continue"
              : state.active.status === "pending"
                ? "Pending confirmation"
                : state.active.status}
          </p>
          <LinkButton
            to={
              ["saved", "pending"].includes(state.active.status)
                ? "/confirm"
                : "/activity"
            }
          >
            Return to Activity
          </LinkButton>
        </Card>
      )}
      <div className="stat-grid">
        <Card>
          <span>Today's Study Breaks</span>
          <strong className="stat">{summary.todayBreaks}</strong>
          <span className="hint">confirmed breaks</span>
        </Card>
        <Card>
          <span>Weekly Exercise Minutes</span>
          <strong className="stat">
            {summary.moderate}
            <small> / {goal}</small>
          </strong>
          <span className="hint">moderate exercise</span>
        </Card>
      </div>
      {summary.todayBreaks === 0 &&
        !state.records.some((r) => r.date === today) && (
          <p className="notice">
            {state.records.length
              ? "No activity recorded today. Your previous progress is still here."
              : "No activity records yet. Complete a break or add a manual record to begin."}
          </p>
        )}
      <Card title="Current Study Status">
        <Badge>{studyStatus(state)}</Badge>
        <p>
          {state.prefs.interval}-minute study interval · {state.prefs.duration}
          -minute break
        </p>
        <LinkButton to="/study">
          {state.study.status === "idle"
            ? "Start Studying"
            : "View Study Session"}
        </LinkButton>
      </Card>
      <Card title="Next Planned Exercise">
        {next ? (
          <>
            <h3>{next.activity}</h3>
            <p>
              {displayDate(next.date)} · {next.time} · {next.duration} min
            </p>
            <Badge>{next.status}</Badge>
            <Button secondary onClick={() => nav(`/plan/${next.id}`)}>
              View Exercise Plan <ChevronRight size={16} />
            </Button>
          </>
        ) : (
          <>
            <Empty>No exercise planned yet.</Empty>
            <LinkButton to="/plan/new">Create Exercise Plan</LinkButton>
          </>
        )}
      </Card>
      <Card title="Progress Preview">
        <Row label="Total Growth Points" value={summary.total} />
        <p className="hint">
          Study breaks and moderate exercise are tracked separately.
        </p>
        <LinkButton secondary to="/progress">
          View Progress
        </LinkButton>
      </Card>
    </>
  );
}
function studyStatus(s) {
  return s.study.status === "idle"
    ? "Not started"
    : s.study.status === "paused"
      ? "Study Paused"
      : s.study.status === "on-break"
        ? "Taking a Break"
        : !s.prefs.notifications
          ? "Studying · Notifications Off"
          : s.study.reminders === "paused"
            ? "Reminders Paused"
            : s.study.reminders === "delayed"
              ? "Reminder Delayed"
              : "Studying";
}
function StudySettings() {
  const { state, setState, nav, setNotice } = useApp();
  const [d, setD] = useState({ ...state.prefs });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setState((s) => ({
          ...s,
          prefs: { ...s.prefs, ...d },
          study: {
            ...s.study,
            remaining: Number(d.interval) * 60,
            reminders: "on",
          },
        }));
        nav("/study");
        setNotice(
          "Break settings saved. The next reminder uses your updated interval.",
        );
      }}
    >
      <p>Choose your next study rhythm. Changes apply only after you save.</p>
      <PreferenceFields draft={d} setDraft={setD} />
      <Button type="submit">Save</Button>
      <LinkButton to="/study" secondary>
        Cancel
      </LinkButton>
    </Form>
  );
}
function Study() {
  const { state, setState, setModal, studyRound, nav } = useApp();
  const s = state.study;
  const running = s.status === "studying";
  return (
    <>
      <Badge>{studyStatus(state)}</Badge>
      <div className="timer-box">
        <BookOpen size={32} />
        <p>Study time</p>
        <strong className="timer">{fmtTime(s.seconds)}</strong>
        <p>
          {state.prefs.interval} min study / {state.prefs.duration} min break
        </p>
      </div>
      <Card title="Next Break Reminder">
        <strong>
          {s.status === "idle"
            ? "Start a session to set a reminder"
            : s.status === "on-break"
              ? "Your break is in progress"
              : s.reminders === "paused"
                ? "Paused for this session"
                : !state.prefs.notifications
                  ? "Notifications are turned off"
                  : `${fmtTime(s.remaining)} remaining`}
        </strong>
        {running && s.reminders !== "paused" && state.prefs.notifications && (
          <p className="hint">
            Next reminder:{" "}
            {new Date(Date.now() + s.remaining * 1000).toLocaleTimeString(
              "en-US",
              { hour: "numeric", minute: "2-digit" },
            )}
            {s.reminders === "delayed" ? " · Delayed" : ""}
          </p>
        )}
        <p className="hint">
          {s.status === "paused"
            ? "Study time and the reminder countdown are both paused."
            : s.reminders === "paused"
              ? "Study time continues while reminders are paused."
              : "Your preferred break: " + state.prefs.activity}
        </p>
      </Card>
      {s.status === "idle" ? (
        <Button onClick={studyRound}>
          <Play size={17} />
          Start Studying
        </Button>
      ) : s.status === "on-break" ? (
        <LinkButton
          to={
            ["pending", "saved"].includes(state.active?.status)
              ? "/confirm"
              : "/activity"
          }
        >
          Return to Break
        </LinkButton>
      ) : (
        <>
          <Button
            onClick={() =>
              setState((st) => ({
                ...st,
                study: { ...st.study, status: running ? "paused" : "studying" },
              }))
            }
          >
            {running ? <Pause size={17} /> : <Play size={17} />}{" "}
            {running ? "Pause Study" : "Resume Study"}
          </Button>
          {s.reminders === "paused" ? (
            <Button
              secondary
              onClick={() =>
                setState((st) => ({
                  ...st,
                  study: {
                    ...st.study,
                    reminders: "on",
                    remaining: st.prefs.interval * 60,
                  },
                }))
              }
            >
              Resume Reminders
            </Button>
          ) : (
            <Button
              secondary
              onClick={() => setModal({ type: "pause-reminders" })}
            >
              Pause Reminders
            </Button>
          )}
        </>
      )}
      <LinkButton secondary to="/study/settings">
        <Settings size={16} />
        Break Settings
      </LinkButton>
      {s.status !== "idle" && (
        <Button secondary onClick={() => setModal({ type: "end-study" })}>
          End Study Session
        </Button>
      )}
      <details className="demo">
        <summary>Prototype time controls</summary>
        <p>For testing only. No need to wait for a full study interval.</p>
        <Button
          secondary
          disabled={
            !running || s.reminders === "paused" || !state.prefs.notifications
          }
          onClick={() => {
            setState((st) => ({
              ...st,
              study: { ...st.study, remaining: 0, reminders: "on" },
            }));
            setModal({ type: "reminder" });
          }}
        >
          Simulate Next Reminder
        </Button>
        <Button
          secondary
          disabled={!running}
          onClick={() => setState((st) => tick(st, 300))}
        >
          Advance 5 Minutes
        </Button>
      </details>
      <p className="hint">
        Reminders appear inside this prototype while it is open.
      </p>
    </>
  );
}
function Activity() {
  const { state, setState, finishActivity, setModal, nav } = useApp();
  const a = state.active;
  if (!a)
    return (
      <>
        <Empty>No activity in progress.</Empty>
        <LinkButton to="/">Back to Home</LinkButton>
      </>
    );
  if (["pending", "saved"].includes(a.status))
    return <Navigate to="/confirm" replace />;
  return (
    <>
      <Badge>
        {categoryName(a.category)}
        {a.usingBackup ? " · Backup" : ""}
      </Badge>
      <Card>
        <Field label="Activity Type">
          <input
            maxLength={70}
            value={a.activity}
            onChange={(e) =>
              setState((s) => ({
                ...s,
                active: { ...s.active, activity: e.target.value },
              }))
            }
          />
        </Field>
        <Row label="Planned Duration" value={`${a.planned} min`} />
        <Row
          label="Activity Status"
          value={
            a.status === "running"
              ? "Activity In Progress"
              : a.status === "paused"
                ? "Activity Paused"
                : "Ready to start"
          }
        />
      </Card>
      <div className="timer-box">
        <Dumbbell size={32} />
        <p>Elapsed time</p>
        <strong className="timer">{fmtTime(a.seconds)}</strong>
        <p>Confirm your actual time afterward.</p>
      </div>
      <Button
        disabled={!a.activity.trim()}
        onClick={() =>
          setState((s) => ({
            ...s,
            plans: s.plans.map((p) =>
              p.id === a.planId ? { ...p, status: "In Progress" } : p,
            ),
            active: {
              ...s.active,
              status: a.status === "running" ? "paused" : "running",
            },
          }))
        }
      >
        {a.status === "running"
          ? "Pause Activity"
          : a.status === "paused"
            ? "Resume Activity"
            : "Start Activity"}
      </Button>
      <Button
        secondary
        disabled={a.seconds === 0}
        onClick={() => finishActivity(false)}
      >
        Finish Activity
      </Button>
      <Button
        secondary
        disabled={a.seconds === 0}
        onClick={() => setModal({ type: "end-early" })}
      >
        End Early
      </Button>
      <Button secondary onClick={() => setModal({ type: "discard" })}>
        No Activity / Discard
      </Button>
      <details className="demo">
        <summary>Prototype time controls</summary>
        <p>
          Advance the timer for a classroom walkthrough. The final duration
          remains editable.
        </p>
        <Button
          secondary
          disabled={a.status !== "running"}
          onClick={() => setState((s) => tick(s, 60))}
        >
          Advance Activity 1 Minute
        </Button>
      </details>
    </>
  );
}
function Confirmation() {
  const { state, setState, nav, setModal, summary, studyRound } = useApp();
  const a = state.active;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(a ? { ...a } : null);
  if (!a)
    return (
      <>
        <Empty>No activity to confirm.</Empty>
        <LinkButton to="/">Back to Home</LinkButton>
      </>
    );
  if (a.status !== "pending" && a.status !== "saved")
    return <Navigate to="/activity" replace />;
  const save = (e) => {
    e.preventDefault();
    if (state.records.some((r) => r.id === a.id)) return;
    if (
      !draft.activity.trim() ||
      !Number.isFinite(Number(draft.duration)) ||
      Number(draft.duration) <= 0 ||
      Number(draft.duration) > 600 ||
      !draft.date
    ) {
      setEditing(true);
      return;
    }
    const record = {
      ...draft,
      duration: Number(draft.duration),
      activity: draft.activity.trim(),
    };
    setState((s) => ({
      ...saveRecord(s, record),
      active: { ...record, status: "saved" },
    }));
    setEditing(false);
  };
  return (
    <>
      {a.status === "saved" ? (
        <>
          <div className="feedback">
            <Check size={32} />
            <h2>Activity saved</h2>
            <strong className="stat">+{a.duration} Growth Points</strong>
            <p>
              {summary.total} total points · Stage {summary.stage}
            </p>
          </div>
          <p>
            Your {categoryName(a.category).toLowerCase()} record has been added
            once.
          </p>
          {a.category === "study" ? (
            <Button
              onClick={() => {
                studyRound();
                setState((s) => ({ ...s, active: null }));
                nav("/study");
              }}
            >
              Continue Studying
            </Button>
          ) : (
            <Button
              onClick={() => {
                setState((s) => ({ ...s, active: null }));
                nav(`/plan/${a.planId}`);
              }}
            >
              Done
            </Button>
          )}
          <LinkButton secondary to="/progress">
            View Progress
          </LinkButton>
          {a.category === "study" && (
            <Button
              secondary
              onClick={() => {
                setState((s) => ({
                  ...s,
                  active: null,
                  study: {
                    ...s.study,
                    status: "idle",
                    seconds: 0,
                    remaining: s.prefs.interval * 60,
                    reminders: "on",
                  },
                }));
                nav("/");
              }}
            >
              End Study Session
            </Button>
          )}
        </>
      ) : (
        <Form onSubmit={save}>
          <Badge>Activity Pending Confirmation</Badge>
          <p>Check what you actually did. Nothing counts until you save.</p>
          {editing ? (
            <ActivityFields draft={draft} setDraft={setDraft} />
          ) : (
            <Card>
              <Row label="Activity Type" value={draft.activity} />
              <Row label="Actual Duration" value={`${draft.duration} min`} />
              <Row label="Intensity" value={draft.intensity} />
              <Row label="Record Source" value={draft.source} />
              <Row label="Completion Status" value={draft.completion} />
              <Row label="Category" value={categoryName(draft.category)} />
            </Card>
          )}
          <p className="hint">
            Self-reported activity. Timer values are suggestions you can
            correct.
          </p>
          <Button type="submit">Save Activity</Button>
          <Button secondary type="button" onClick={() => setEditing((v) => !v)}>
            {editing ? "Review Changes" : "Edit"}
          </Button>
          <Button
            secondary
            type="button"
            onClick={() => setModal({ type: "discard" })}
          >
            Discard / No Activity
          </Button>
          <Button
            secondary
            type="button"
            onClick={() => {
              setState((s) => ({
                ...s,
                active: { ...s.active, status: "paused" },
              }));
              nav("/activity");
            }}
          >
            Back to Activity
          </Button>
        </Form>
      )}
    </>
  );
}
function Plans() {
  const { state, goal, summary } = useApp();
  const groups = [
    ["Planned Exercises", ["Planned", "In Progress"]],
    ["Rescheduled Exercises", ["Rescheduled"]],
    ["Completed Exercises", ["Completed", "Ended Early"]],
    ["Skipped Exercises", ["Skipped"]],
  ];
  return (
    <>
      <Card title="Weekly Exercise Goal">
        <Row
          label="Moderate exercise"
          value={`${summary.moderate} / ${goal} min`}
        />
        <Meter value={summary.moderate} max={goal} label="minutes" />
        {state.prefs.scheduledGoal && (
          <p className="hint">
            Goal from {displayDate(state.prefs.scheduledGoal.week)}:{" "}
            {state.prefs.scheduledGoal.value} min/week
          </p>
        )}
      </Card>
      <LinkButton to="/plan/new">
        <Plus size={17} />
        Create Exercise Plan
      </LinkButton>
      {groups.map(([title, statuses]) => (
        <section key={title} className="section">
          <h2>{title}</h2>
          {state.plans.filter((p) => statuses.includes(p.status)).length ? (
            state.plans
              .filter((p) => statuses.includes(p.status))
              .map((p) => <PlanCard key={p.id} plan={p} />)
          ) : (
            <Empty>No {title.toLowerCase()} yet.</Empty>
          )}
        </section>
      ))}
    </>
  );
}
function PlanCard({ plan: p }) {
  const { nav } = useApp();
  return (
    <button className="card plan-card" onClick={() => nav(`/plan/${p.id}`)}>
      <div>
        <h3>{p.activity}</h3>
        <p>
          {displayDate(p.date)} · {p.time} · {p.duration} min
        </p>
        <Badge>{p.status}</Badge>
      </div>
      <ChevronRight size={20} />
    </button>
  );
}
function PlanEditor() {
  const { state, today, nav, setState, planDraft, setPlanDraft } = useApp();
  const path = useLocation().pathname;
  const editing = path.endsWith("/edit");
  const id = path.split("/")[2];
  const existing = state.plans.find((p) => p.id === id);
  const [d, setD] = useState(
    editing
      ? existing
      : planDraft || {
          activity: "Brisk walk",
          date: today,
          time: "17:30",
          duration: 20,
          backup: "Indoor stretching",
          backupDuration: 10,
          barrier: "",
        },
  );
  if (!d) return <Empty>Plan not found.</Empty>;
  const change = (k, v) => setD({ ...d, [k]: v });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const clean = {
          ...d,
          activity: d.activity.trim(),
          duration: Number(d.duration),
          backupDuration: Number(d.backupDuration),
        };
        if (editing) {
          setState((s) => ({
            ...s,
            plans: s.plans.map((p) => (p.id === id ? clean : p)),
          }));
          nav(`/plan/${id}`);
        } else {
          setPlanDraft(clean);
          nav("/backup");
        }
      }}
    >
      <p>
        {editing
          ? "Update your original plan and backup."
          : "Make a plan for movement outside study time."}
      </p>
      <Field label="Activity Type">
        <input
          required
          pattern=".*\S.*"
          maxLength={70}
          value={d.activity}
          onChange={(e) => change("activity", e.target.value)}
        />
      </Field>
      <Field label="Date">
        <input
          required
          type="date"
          value={d.date}
          onInput={(e) => change("date", e.currentTarget.value)}
          onChange={(e) => change("date", e.target.value)}
        />
      </Field>
      <Field label="Time">
        <input
          required
          type="time"
          value={d.time}
          onInput={(e) => change("time", e.currentTarget.value)}
          onChange={(e) => change("time", e.target.value)}
        />
      </Field>
      <Field label="Planned Duration (minutes)">
        <input
          required
          type="number"
          min="1"
          max="600"
          value={d.duration}
          onChange={(e) => change("duration", e.target.value)}
        />
      </Field>
      {editing && (
        <>
          <h2>Backup Plan</h2>
          <BackupFields draft={d} setDraft={setD} />
        </>
      )}
      <Button type="submit">{editing ? "Save Changes" : "Next"}</Button>
      <Button
        secondary
        type="button"
        onClick={() => {
          setPlanDraft(null);
          nav(editing ? `/plan/${id}` : "/exercise");
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}
function BackupFields({ draft: d, setDraft }) {
  return (
    <>
      <Field label="Possible Barrier (optional)">
        <input
          maxLength={180}
          value={d.barrier}
          onChange={(e) => setDraft({ ...d, barrier: e.target.value })}
        />
      </Field>
      <Field label="Backup Activity Type">
        <input
          required
          pattern=".*\S.*"
          maxLength={70}
          value={d.backup}
          onChange={(e) => setDraft({ ...d, backup: e.target.value })}
        />
      </Field>
      <Field label="Backup Duration (minutes)">
        <input
          required
          type="number"
          min="1"
          max="600"
          value={d.backupDuration}
          onChange={(e) =>
            setDraft({ ...d, backupDuration: Number(e.target.value) })
          }
        />
      </Field>
    </>
  );
}
function Backup() {
  const { planDraft, setPlanDraft, setState, nav } = useApp();
  const [d, setD] = useState(planDraft);
  if (!d)
    return (
      <>
        <Empty>Create an exercise plan first.</Empty>
        <LinkButton to="/plan/new">Create Exercise Plan</LinkButton>
      </>
    );
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const plan = {
          ...d,
          id: uid(),
          activity: d.activity.trim(),
          backup: d.backup.trim(),
          status: "Planned",
        };
        setState((s) => ({ ...s, plans: [...s.plans, plan] }));
        setPlanDraft(null);
        nav(`/plan/${plan.id}`);
      }}
    >
      <Card title="Your Original Plan">
        <p>
          {d.activity} · {d.duration} min
        </p>
        <p>
          {displayDate(d.date)} at {d.time}
        </p>
      </Card>
      <p>
        If plans change, have an activity ready that fits your time and space.
      </p>
      <BackupFields draft={d} setDraft={setD} />
      <Button type="submit">Save Plan</Button>
      <Button
        secondary
        type="button"
        onClick={() => {
          setPlanDraft(d);
          nav("/plan/new");
        }}
      >
        Back
      </Button>
      <Button
        secondary
        type="button"
        onClick={() => {
          setPlanDraft(null);
          nav("/exercise");
        }}
      >
        Cancel
      </Button>
    </Form>
  );
}
function PlanDetails() {
  const { state, startActivity, setModal, nav } = useApp();
  const id = useLocation().pathname.split("/")[2],
    p = state.plans.find((p) => p.id === id);
  if (!p)
    return (
      <>
        <Empty>Plan not found.</Empty>
        <LinkButton to="/exercise">Back to Exercise</LinkButton>
      </>
    );
  const done = ["Completed", "Ended Early", "Skipped"].includes(p.status);
  const actual = state.records.find((r) => r.planId === p.id);
  return (
    <>
      <Badge>{p.status}</Badge>
      <Card title="Original Exercise Plan">
        <h3>{p.activity}</h3>
        <Row
          label="Scheduled Time"
          value={`${displayDate(p.date)} · ${p.time}`}
        />
        <Row label="Planned Duration" value={`${p.duration} min`} />
        {p.originalDate && (
          <p className="hint">
            Originally {displayDate(p.originalDate)} at {p.originalTime}.{" "}
            {p.status === "Rescheduled"
              ? "Rescheduled and still to do."
              : "Schedule history preserved."}
          </p>
        )}
      </Card>
      <Card title="Backup Activity">
        <h3>{p.backup}</h3>
        <p>{p.backupDuration} minutes</p>
        {p.barrier && <p className="hint">If: {p.barrier}</p>}
      </Card>
      {actual && (
        <Card title="Confirmed Actual Activity">
          <h3>
            {actual.activity}
            {actual.usingBackup ? " · Backup" : ""}
          </h3>
          <p>
            {actual.duration} min · {actual.intensity} · {actual.completion}
          </p>
        </Card>
      )}
      {!done ? (
        <>
          <Button onClick={() => startActivity("exercise", p)}>
            Start Activity
          </Button>
          <Button secondary onClick={() => nav(`/plan/${id}/edit`)}>
            Edit Plan
          </Button>
          <Button
            secondary
            onClick={() => setModal({ type: "disruption", plan: p })}
          >
            I Can't Do This Now
          </Button>
        </>
      ) : (
        <>
          <p className="notice">
            {p.status === "Skipped"
              ? "This plan was skipped. No activity or growth points were added."
              : "Your confirmed activity is saved in Activity History."}
          </p>
          <LinkButton secondary to="/history">
            View Activity History
          </LinkButton>
        </>
      )}
      <LinkButton secondary to="/exercise">
        Back to Exercise Plans
      </LinkButton>
    </>
  );
}
function Progress() {
  const { summary, goal, state } = useApp();
  return (
    <>
      <p>Two kinds of movement. One view of your progress.</p>
      <Card title="Study Breaks">
        <Row label="Study Breaks Completed" value={summary.breaks} />
        <Row
          label="Study Break Minutes"
          value={`${summary.breakMinutes} min`}
        />
        <p className="hint">All confirmed study breaks, across all dates.</p>
      </Card>
      <Card title="Weekly Moderate Exercise">
        <strong className="stat">
          {summary.moderate}
          <small> min</small>
        </strong>
        <Row label="Weekly Exercise Goal" value={`${goal} min`} />
        <Meter value={summary.moderate} max={goal} label="minutes" />
        <p className="hint">
          Monday–Sunday. Confirmed moderate planned exercise only; light study
          breaks stay separate.
        </p>
      </Card>
      <Card title="Cumulative Growth">
        <Row label="Total Growth Points" value={summary.total} />
        {state.prefs.pet ? (
          <Row label="Pet Growth Stage" value={`Stage ${summary.stage}`} />
        ) : (
          <Badge>Pet Disabled</Badge>
        )}
        <p className="hint">
          1 confirmed minute = 1 point. Points describe recorded activity, not
          equal health benefits.
        </p>
      </Card>
      {!state.records.length && (
        <Empty>
          No records yet. Add an activity or complete a break to see progress.
        </Empty>
      )}
      <LinkButton to="/history">View Activity History</LinkButton>
      <LinkButton secondary to="/pet">
        {state.prefs.pet ? "View Virtual Pet" : "Virtual Pet · Off"}
      </LinkButton>
    </>
  );
}
function History() {
  const { state, nav } = useApp();
  const [filter, setFilter] = useState("all");
  const list = state.records
    .filter((r) => filter === "all" || r.category === filter)
    .sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <Field label="Filter Activity Type">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Activities</option>
          <option value="study">Study Breaks</option>
          <option value="exercise">Planned Exercise</option>
        </select>
      </Field>
      <LinkButton to="/record/new">
        <Plus size={17} />
        Add Manual Record
      </LinkButton>
      {list.length ? (
        list.map((r) => (
          <button
            key={r.id}
            className="card history-card"
            onClick={() => nav(`/record/${r.id}`)}
          >
            <div className="split">
              <Badge>{categoryName(r.category)}</Badge>
              <ChevronRight size={17} />
            </div>
            <h3>{r.activity}</h3>
            <p>
              {displayDate(r.date)} · {r.duration} min · {r.intensity}
            </p>
            <span className="hint">
              {r.source} · {r.completion}
            </span>
          </button>
        ))
      ) : (
        <Empty>
          No records found. Confirm an activity or add a manual record.
        </Empty>
      )}
    </>
  );
}
function Record() {
  const { state, setState, nav, today, setNotice } = useApp();
  const id = useLocation().pathname.split("/")[2];
  const isNew = id === "new";
  const record = state.records.find((r) => r.id === id);
  const [editing, setEditing] = useState(isNew),
    [d, setD] = useState(
      record
        ? { ...record }
        : {
            id: uid(),
            activity: "Short walk",
            date: today,
            category: "study",
            duration: 3,
            intensity: "Light",
            source: "Self-reported",
            completion: "Completed",
          },
    );
  if (!isNew && !record)
    return (
      <>
        <Empty>Record not found.</Empty>
        <LinkButton to="/history">Back to History</LinkButton>
      </>
    );
  return (
    <>
      {editing ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setState((s) =>
              saveRecord(s, {
                ...d,
                activity: d.activity.trim(),
                duration: Number(d.duration),
              }),
            );
            nav("/history");
            setNotice(
              isNew
                ? "Manual activity saved. Progress updated."
                : "Progress updated from your corrected record.",
            );
          }}
        >
          <p>
            {isNew
              ? "Record an activity you actually completed."
              : "Correct this record. Its contribution will be recalculated."}
          </p>
          <ActivityFields draft={d} setDraft={setD} category={isNew} />
          <p className="hint">
            Record Source: {d.source}
            {!isNew ? " · Changes are user corrections." : ""}
          </p>
          <Button type="submit">Save</Button>
          <Button
            type="button"
            secondary
            onClick={() => {
              if (isNew) nav("/history");
              else {
                setD({ ...record });
                setEditing(false);
              }
            }}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <Card>
            <Row label="Activity Type" value={record.activity} />
            <Row label="Date" value={displayDate(record.date)} />
            <Row label="Duration" value={`${record.duration} min`} />
            <Row label="Intensity" value={record.intensity} />
            <Row
              label="Activity Category"
              value={categoryName(record.category)}
            />
            <Row label="Record Source" value={record.source} />
            <Row label="Growth Points" value={record.duration} />
            <Row label="Completion Status" value={record.completion} />
          </Card>
          <Button onClick={() => setEditing(true)}>Edit</Button>
          <LinkButton secondary to="/history">
            Back to Activity History
          </LinkButton>
        </>
      )}
    </>
  );
}
function Pet() {
  const { state, summary, patchPrefs } = useApp();
  return (
    <>
      <Toggle
        label="Show Virtual Pet"
        checked={state.prefs.pet}
        onChange={(v) => patchPrefs({ pet: v })}
      />
      {state.prefs.pet ? (
        <>
          <div className="pet-placeholder">
            <Cat size={94} strokeWidth={1} />
            <span>Virtual pet placeholder</span>
          </div>
          <Card title={`Current Growth Stage: ${summary.stage}`}>
            <Row label="Total Growth Points" value={summary.total} />
            <Meter
              value={round(summary.total % 30)}
              max={30}
              label="points to next stage"
            />
            <p>
              {summary.next} more points to Stage {summary.stage + 1}.
            </p>
          </Card>
        </>
      ) : (
        <Card title="Pet Disabled">
          <p>
            Your activities and {summary.total} growth points are still saved.
            Turn your pet back on whenever you like.
          </p>
        </Card>
      )}
      <Card title="Growth Explanation">
        <p>
          Each confirmed minute adds 1 growth point. Every 30 points unlocks the
          next stage.
        </p>
        <p>
          Correcting a record updates its contribution. Missing a day never
          removes points or harms your pet.
        </p>
        <p className="hint">Decorations are not part of this V1 prototype.</p>
      </Card>
      <LinkButton secondary to="/progress">
        Back to Progress
      </LinkButton>
    </>
  );
}
function Personal() {
  const { state, setState, goal, patchPrefs, setModal, nav } = useApp();
  return (
    <>
      <Card title="Profile">
        <div className="profile">
          <span className="avatar large">
            {state.prefs.avatar === "icon" ? (
              <UserRound size={30} />
            ) : (
              state.prefs.avatar
            )}
          </span>
          <div>
            <h3>{state.prefs.nickname}</h3>
            <p className="hint">Local demo profile · no account</p>
          </div>
        </div>
        <Button secondary onClick={() => setModal({ type: "profile" })}>
          Edit Profile
        </Button>
      </Card>
      <Card title="Weekly Exercise Goal">
        <Row label="This week's goal" value={`${goal} min`} />
        {state.prefs.scheduledGoal && (
          <p className="hint">
            Scheduled: {state.prefs.scheduledGoal.value} min from{" "}
            {displayDate(state.prefs.scheduledGoal.week)}
          </p>
        )}
        <Button secondary onClick={() => setModal({ type: "goal" })}>
          Edit Weekly Goal
        </Button>
      </Card>
      <Card title="Study Break Preferences">
        <p>
          {state.prefs.interval} min study · {state.prefs.duration} min break
          <br />
          {state.prefs.activity}
        </p>
        <LinkButton secondary to="/study/settings">
          Edit Study Break Preferences
        </LinkButton>
      </Card>
      <Card title="Notification Preferences">
        <Toggle
          label="In-app Break Reminders"
          checked={state.prefs.notifications}
          onChange={(v) => {
            patchPrefs({ notifications: v });
            if (v)
              setState((s) => ({
                ...s,
                study: {
                  ...s.study,
                  remaining: s.prefs.interval * 60,
                  reminders: "on",
                },
              }));
          }}
        />
        <p className="hint">
          No real push notifications. Turning these off keeps study time
          running. Turning them on schedules a future reminder.
        </p>
      </Card>
      <Card title="Virtual Pet Preferences">
        <Toggle
          label="Show Virtual Pet"
          checked={state.prefs.pet}
          onChange={(v) => patchPrefs({ pet: v })}
        />
        <LinkButton secondary to="/pet">
          Open Virtual Pet
        </LinkButton>
      </Card>
      <Card title="Device & Data Information">
        <p>
          {state.prefs.device ? "Demo device connected" : "No device connected"}
        </p>
        <Button secondary onClick={() => setModal({ type: "device" })}>
          Device & Data
        </Button>
      </Card>
      <LinkButton secondary to="/history">
        Activity History
      </LinkButton>
      <Button secondary onClick={() => setModal({ type: "help" })}>
        Help / About
      </Button>
    </>
  );
}
export default App;

function Modal() {
  const {
    modal: m,
    setModal,
    state,
    setState,
    patchPrefs,
    nav,
    today,
    goal,
    startActivity,
    finishActivity,
    discard,
    setNotice,
  } = useApp();
  const [d, setD] = useState(() =>
    m.type === "profile"
      ? { nickname: state.prefs.nickname, avatar: state.prefs.avatar }
      : m.type === "goal"
        ? { value: goal, when: "next" }
        : m.type === "reschedule"
          ? { date: m.plan.date, time: m.plan.time }
          : {},
  );
  const dialog = useRef(null),
    opener = useRef(document.activeElement);
  const close = () => setModal(null);
  useEffect(() => {
    const first = dialog.current?.querySelector("button,input,select");
    first?.focus();
    const prev = opener.current;
    return () => prev?.focus();
  }, [m.type]);
  const closeable = !["reminder", "later", "pause-reminders"].includes(m.type);
  const headings = {
    reminder: "Time for a study break",
    later: "Remind Me Later",
    "pause-reminders": "Pause reminders?",
    disruption: "Plans changed?",
    reschedule: "Reschedule Exercise",
    skip: "Skip this plan?",
    "end-early": "End activity early?",
    discard: "Discard this activity?",
    "leave-activity": "Leave this activity?",
    "end-study": "End study session?",
    profile: "Edit Profile",
    goal: "Edit Weekly Goal",
    device: "Device & Data",
    help: "Help / About",
    reset: "Reset to an empty start?",
    examples: "Load sample data?",
  };
  const updatePlan = (values) =>
    setState((s) => ({
      ...s,
      plans: s.plans.map((p) => (p.id === m.plan.id ? { ...p, ...values } : p)),
    }));
  const restore = (examples) => {
    setState(initialState(examples));
    close();
    nav("/setup");
  };
  return (
    <div className="modal-backdrop">
      <section
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="modal"
        onKeyDown={(e) => {
          if (e.key === "Escape" && closeable) close();
          if (e.key === "Tab") {
            const all = [
              ...dialog.current.querySelectorAll("button,input,select,a"),
            ].filter((el) => !el.disabled);
            const first = all[0],
              last = all.at(-1);
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }}
      >
        <div className="split">
          <h2 id="modal-title">{headings[m.type] || "Preferences"}</h2>
          {closeable && (
            <button
              aria-label="Close dialog"
              className="icon-button"
              onClick={close}
            >
              <X size={20} />
            </button>
          )}
        </div>
        {m.type === "reminder" && (
          <>
            <p>
              Step away for {state.prefs.duration} minutes of{" "}
              {state.prefs.activity.toLowerCase()}, or choose a time that works
              better.
            </p>
            <Button onClick={() => startActivity("study")}>Start Break</Button>
            <Button secondary onClick={() => setModal({ type: "later" })}>
              Remind Later
            </Button>
            <Button
              secondary
              onClick={() => setModal({ type: "pause-reminders" })}
            >
              Pause Reminders
            </Button>
          </>
        )}
        {m.type === "later" && (
          <>
            <p>
              Keep your current study session. When should the reminder return?
            </p>
            {[5, 10].map((n) => (
              <Button
                key={n}
                onClick={() => {
                  setState((s) => ({
                    ...s,
                    study: {
                      ...s.study,
                      remaining: n * 60,
                      reminders: "delayed",
                    },
                  }));
                  close();
                  nav("/study");
                }}
              >
                {n} Minutes
              </Button>
            ))}
            <Button secondary onClick={() => setModal({ type: "reminder" })}>
              Back
            </Button>
          </>
        )}
        {m.type === "pause-reminders" && (
          <>
            <p>
              Study time will keep running. Break reminders pause for this
              session until you resume them.
            </p>
            <Button
              onClick={() => {
                setState((s) => ({
                  ...s,
                  study: { ...s.study, reminders: "paused" },
                }));
                close();
                nav("/study");
              }}
            >
              Pause Reminders
            </Button>
            <Button
              secondary
              onClick={() => {
                if (state.study.remaining === 0) setModal({ type: "reminder" });
                else close();
              }}
            >
              Cancel
            </Button>
          </>
        )}
        {m.type === "disruption" && (
          <>
            <p>
              Choose what works for you. Choosing an option alone does not add
              activity points.
            </p>
            <Card title="Your Backup">
              <p>
                {m.plan.backup} · {m.plan.backupDuration} min
              </p>
            </Card>
            <Button onClick={() => startActivity("exercise", m.plan, true)}>
              Use Backup
            </Button>
            <Button
              secondary
              onClick={() => setModal({ type: "reschedule", plan: m.plan })}
            >
              Reschedule
            </Button>
            <Button
              secondary
              onClick={() => setModal({ type: "skip", plan: m.plan })}
            >
              Skip
            </Button>
            <Button secondary onClick={close}>
              Cancel
            </Button>
          </>
        )}
        {m.type === "reschedule" && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              updatePlan({
                date: d.date,
                time: d.time,
                status: "Rescheduled",
                originalDate: m.plan.originalDate || m.plan.date,
                originalTime: m.plan.originalTime || m.plan.time,
              });
              close();
              setNotice(
                "Plan rescheduled. It is still waiting to be completed.",
              );
            }}
          >
            <Field label="New Date">
              <input
                required
                type="date"
                value={d.date || ""}
                onInput={(e) => setD({ ...d, date: e.currentTarget.value })}
                onChange={(e) => setD({ ...d, date: e.target.value })}
              />
            </Field>
            <Field label="New Time">
              <input
                required
                type="time"
                value={d.time || ""}
                onInput={(e) => setD({ ...d, time: e.currentTarget.value })}
                onChange={(e) => setD({ ...d, time: e.target.value })}
              />
            </Field>
            <Button type="submit">Save</Button>
            <Button secondary type="button" onClick={close}>
              Cancel
            </Button>
          </Form>
        )}
        {m.type === "skip" && (
          <>
            <p>
              This plan will be marked Skipped. No activity will be added. Your
              existing progress stays.
            </p>
            <Button
              onClick={() => {
                updatePlan({ status: "Skipped" });
                close();
              }}
            >
              Confirm Skip
            </Button>
            <Button secondary onClick={close}>
              Cancel
            </Button>
          </>
        )}
        {m.type === "end-early" && (
          <>
            <p>
              You can save the time you actually moved. Review your duration on
              the next screen.
            </p>
            <Button onClick={() => finishActivity(true)}>
              Save Actual Activity
            </Button>
            <Button secondary onClick={discard}>
              No Activity / Discard
            </Button>
            <Button secondary onClick={close}>
              Cancel
            </Button>
          </>
        )}
        {["discard", "leave-activity"].includes(m.type) && (
          <>
            <p>
              Unsaved activity will not count toward your history or growth
              points.
            </p>
            <Button onClick={discard}>Discard Activity</Button>
            <Button secondary onClick={close}>
              Keep Activity
            </Button>
          </>
        )}
        {m.type === "end-study" && (
          <>
            <p>
              Your confirmed activity records will stay saved. Reminders stop
              when you end this session.
            </p>
            <Button
              onClick={() => {
                if (
                  state.active?.category === "study" &&
                  state.active.status !== "saved"
                ) {
                  setModal({ type: "discard" });
                  return;
                }
                setState((s) => ({
                  ...s,
                  active: s.active?.category === "study" ? null : s.active,
                  study: {
                    status: "idle",
                    seconds: 0,
                    remaining: s.prefs.interval * 60,
                    reminders: "on",
                  },
                }));
                close();
                nav("/");
              }}
            >
              End Study Session
            </Button>
            <Button secondary onClick={close}>
              Cancel
            </Button>
          </>
        )}
        {m.type === "profile" && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              patchPrefs({ nickname: d.nickname.trim(), avatar: d.avatar });
              close();
            }}
          >
            <Field label="Nickname">
              <input
                autoComplete="nickname"
                required
                pattern=".*\S.*"
                maxLength={30}
                value={d.nickname || ""}
                onChange={(e) => setD({ ...d, nickname: e.target.value })}
              />
            </Field>
            <Field label="Avatar">
              <select
                value={d.avatar}
                onChange={(e) => setD({ ...d, avatar: e.target.value })}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="icon">Simple profile icon</option>
              </select>
            </Field>
            <Button type="submit">Save</Button>
            <Button secondary type="button" onClick={close}>
              Cancel
            </Button>
          </Form>
        )}
        {m.type === "goal" && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const nextWeek = shiftDate(weekKey(today), 7);
              patchPrefs(
                d.when === "next"
                  ? {
                      scheduledGoal: { value: Number(d.value), week: nextWeek },
                    }
                  : { goal: Number(d.value), scheduledGoal: null },
              );
              close();
            }}
          >
            <Field label="Weekly Exercise Goal (minutes)">
              <input
                required
                type="number"
                min="1"
                max="3000"
                value={d.value ?? goal}
                onChange={(e) => setD({ ...d, value: e.target.value })}
              />
            </Field>
            <Field label="Apply change">
              <select
                value={d.when || "next"}
                onChange={(e) => setD({ ...d, when: e.target.value })}
              >
                <option value="next">Starting next week</option>
                <option value="this">This week</option>
              </select>
            </Field>
            <p className="hint">
              {d.when === "this"
                ? "This week's goal line will change. Your recorded minutes and points will stay the same."
                : "Your current weekly goal stays in place until next Monday."}
            </p>
            <Button type="submit">Save</Button>
            <Button secondary type="button" onClick={close}>
              Cancel
            </Button>
          </Form>
        )}
        {m.type === "device" && (
          <>
            <p>
              No real device, permission request, or health data connection is
              used. Records are stored in this browser only.
            </p>
            <Toggle
              label="Demo Device Connection"
              checked={state.prefs.device}
              onChange={(v) => patchPrefs({ device: v })}
            />
            <p className="hint">
              Turning this off stops future demo connection use. It does not
              delete existing self-reported records. No automatic import is
              implemented.
            </p>
            <details className="demo">
              <summary>Prototype data controls</summary>
              <p>For classroom testing. These controls do not earn points.</p>
              <Button
                secondary
                onClick={() => {
                  setState((s) => ({ ...s, dayOffset: s.dayOffset + 1 }));
                  close();
                  nav("/");
                }}
              >
                Preview Next Day · No New Activity
              </Button>
              {state.dayOffset !== 0 && (
                <Button
                  secondary
                  onClick={() => {
                    setState((s) => ({ ...s, dayOffset: 0 }));
                    close();
                  }}
                >
                  Return to Today's Date
                </Button>
              )}
              <Button secondary onClick={() => setModal({ type: "reset" })}>
                Reset to Empty Start
              </Button>
              <Button secondary onClick={() => setModal({ type: "examples" })}>
                Reload Sample Data
              </Button>
            </details>
            <Button onClick={close}>Done</Button>
          </>
        )}
        {["reset", "examples"].includes(m.type) && (
          <>
            <p>
              This replaces all local settings, plans, and activity records{" "}
              {m.type === "examples"
                ? "with the sample data"
                : "with an empty start"}
              . You will return to Initial Setup.
            </p>
            <Button onClick={() => restore(m.type === "examples")}>
              Confirm Reset
            </Button>
            <Button secondary onClick={close}>
              Cancel
            </Button>
          </>
        )}
        {m.type === "help" && (
          <>
            <p>SI684 Low-Fidelity Prototype V1</p>
            <p>
              Take adjustable study breaks, plan exercise with a backup, and
              review your cumulative progress.
            </p>
            <p>
              Only saved activity earns points: 1 minute = 1 point. Every 30
              points unlocks a stage. Light breaks and moderate planned exercise
              are counted separately.
            </p>
            <p>
              Use Activity History to correct a record. Pause Study stops both
              timers; Pause Reminders keeps study time running. Pet preferences
              never erase your records.
            </p>
            <p className="hint">
              No login, push notifications, sensors, sync, or backend. Timer
              controls and device settings are simulations. Local browser
              storage keeps your saved data.
            </p>
            <Button onClick={close}>Done</Button>
          </>
        )}
      </section>
    </div>
  );
}
