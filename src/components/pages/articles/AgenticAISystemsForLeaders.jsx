// components/pages/articles/AgenticAISystemsForLeaders.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * 🤖 Agentic AI Systems for Engineering Leaders — A Practical Playbook
 * - Maps human leadership behaviors to a 10‑part agentic AI architecture
 * - Clear What / Why / How blocks you can apply today
 * - Sticky ToC, Like/Share (localStorage), consistent visual system
 */

const NS = "sandeep:articles:v1";
const ARTICLE_KEY = "articles:agentic-ai-systems";

/* -------------------------- localStorage helpers -------------------------- */
function readStore() {
  try {
    const raw = localStorage.getItem(NS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function writeStore(obj) {
  try {
    localStorage.setItem(NS, JSON.stringify(obj));
  } catch {}
}
function useLocalStore(key, initial) {
  const [state, setState] = React.useState(() => {
    const store = readStore();
    return store[key] ?? initial;
  });
  React.useEffect(() => {
    const store = readStore();
    store[key] = state;
    writeStore(store);
  }, [key, state]);
  return [state, setState];
}

/* ------------------------------ Social bits ------------------------------ */
function LikeButton({ storeKey }) {
  const [model, setModel] = useLocalStore(storeKey, { liked: false, likeCount: 0 });
  const toggle = () =>
    setModel((m) => {
      const liked = !m.liked;
      return { liked, likeCount: Math.max(0, (m.likeCount || 0) + (liked ? 1 : -1)) };
    });
  return (
    <button
      className={`kt-btn ${model.liked ? "liked" : "ghost"}`}
      onClick={toggle}
      aria-pressed={model.liked}
    >
      {model.liked ? "♥ Liked" : "♡ Like"} {model.likeCount ? `· ${model.likeCount}` : ""}
    </button>
  );
}
function ShareButton() {
  const onShare = async () => {
    const url = window.location.href;
    const title = "Agentic AI Systems for Engineering Leaders — Practical Playbook";
    const text = "Map human leadership behaviors to a 10‑part agentic AI architecture.";
    try {
      if (navigator.share) await navigator.share({ title, text, url });
      else {
        await navigator.clipboard.writeText(url);
        alert("🔗 Link copied to clipboard!");
      }
    } catch {}
  };
  return (
    <button className="kt-btn ghost" onClick={onShare} aria-label="Share article">
      ↗ Share
    </button>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function AgenticAISystemsForLeaders() {
  React.useEffect(() => {
    document.title = "Agentic AI Systems for Engineering Leaders | Sandeep Aggarwal";
  }, []);

  const [activeId, setActiveId] = React.useState(() => localStorage.getItem("agentic:lastId") || "intro");
  React.useEffect(() => {
    const ids = [
      "intro",
      "quickstart",
      "mmi",
      "normalize",
      "memory",
      "classify",
      "routing",
      "simulate",
      "delivery",
      "feedback",
      "nudges",
      "boundaries",
      "patterns",
      "guardrails",
      "faq",
    ];
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 80) current = id;
      }
      setActiveId(current);
      localStorage.setItem("agentic:lastId", current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <article style={wrap}>
      <style>{styles}</style>

      <header className="kt-hero">
        <p className="kt-kicker">Agentic AI</p>
        <h1 className="kt-title">🤖 Agentic AI Systems for Engineering Leaders</h1>
        <p className="kt-desc">
          The emerging agentic architecture feels familiar because it mirrors how leaders operate: sensing, remembering,
          deciding, and coaching in real and near‑real time.
        </p>
        <div className="kt-meta">By Sandeep Kumar Aggarwal · Updated {new Date().toLocaleDateString()}</div>
        <div className="kt-toolbar" style={{ gap: 8, flexWrap: "wrap" }}>
          <a className="kt-btn ghost" href="#quickstart">Jump to Quick‑Start ↓</a>
        </div>
        <hr className="kt-hr" />
      </header>

      <div className="kt-wrap">
        {/* Sticky ToC */}
        <aside className="kt-sticky">
          <nav className="kt-card kt-toc" aria-label="On this page">
            <strong style={{ display: "block", marginBottom: 6 }}>On this page</strong>
            {[
              ["intro", "Overview"],
              ["quickstart", "Quick‑Start"],
              ["mmi", "1) Multi‑Modal Input"],
              ["normalize", "2) API & Normalization"],
              ["memory", "3) Memory Augmentation"],
              ["classify", "4) Query Classification"],
              ["routing", "5) Toolchain Routing"],
              ["simulate", "6) Simulation & Decisions"],
              ["delivery", "7) Output & Delivery"],
              ["feedback", "8) Feedback & Learning"],
              ["nudges", "9) Proactive Nudges"],
              ["boundaries", "10) Human Boundaries"],
              ["patterns", "Implementation Patterns"],
              ["guardrails", "Governance & Guardrails"],
              ["faq", "FAQ"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeId === id ? "active" : ""}>
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div>


{/* INTRO */}
<section id="intro" className="kt-card">
  <h2 className="kt-h2">Why agentic AI mirrors leadership</h2>
  <p>
    Leaders continuously integrate <b>signals</b> (people, systems), consult <b>memory</b> (history, culture),
    classify <b>intent</b>, choose a <b>tool</b>, simulate outcomes, and communicate decisions — then learn and
    nudge. Agentic systems do the same, on silicon.
  </p>
  <div className="kt-note" style={{marginTop:12, padding:"12px 16px", borderLeft:"4px solid #0b66c3", background:"#f9fafb", borderRadius:8}}>
    <strong>What is an agentic system?</strong> It’s an AI system that can perceive inputs, maintain memory,
    classify and route queries, make context‑aware decisions, and take actions with feedback loops — resembling
    how humans exercise agency in leadership and decision‑making.
  </div>
</section>



          {/* QUICK START */}
          <section id="quickstart" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">🚀 Quick‑Start (build this first)</h2>
            <ol className="kt-list">
              <li><b>Inputs</b>: Slack/Teams + Email + Docs as sources.</li>
              <li><b>Query Normalization</b>: Normalize the ask</li>
              <li><b>Memory</b>: Session + long‑term profile + org patterns (RAG over ADRs, RFCs, best practices).</li>
              <li><b>Classification</b>: {"Factual | Strategic | Coaching | Conflict | Reflective | Sentiment"}.</li>
              <li><b>Routing</b>: RAG ↔ MCP tools ↔ Simulation/Scoring ↔ Coaching agent ↔ Escalation.</li>
              <li><b>Delivery</b>: Role‑sensitive, confident, citation‑first responses.</li>
              <li><b>Feedback</b>: Thumbs + rationale; auto‑tune memory and tone.</li>
            </ol>
          </section>

          {/* 1 */}
          <section id="mmi" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">1) Multi‑Modal Input Agent</h2>
            <ul className="kt-list">
              <li><b>What:</b> Accept questions from chat, voice, email, dashboards.</li>
              <li><b>Why:</b> Meet people where the work happens; reduce switching costs.</li>
              <li><b>How:</b> Webhooks + events; unify into a single <code>Query</code> schema.</li>
              <li><b>When:</b> Start day 1; expand channels as adoption grows.</li>
            </ul>
          </section>

          {/* 2 */}
          <section id="normalize" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">2) API & Query Normalization</h2>
            <ul className="kt-list">
              <li><b>What:</b> Fix typos, enrich context, extract entities and intent.</li>
              <li><b>Why:</b> Stable inputs → reliable downstream reasoning.</li>
              <li><b>How:</b> PII scrub, intent taxonomy, policy‑aware pre‑filters.</li>
            </ul>
          </section>

          {/* 3 */}
          <section id="memory" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">3) Memory Augmentation</h2>
            <ul className="kt-list">
              <li><b>What:</b> Short‑term session + long‑term profile + org knowledge + best practices.</li>
              <li><b>Why:</b> Personalization and consistency; avoids Groundhog Day answers.</li>
              <li><b>How:</b> Vector + graph + SQL stores; time‑decay and safety redaction.</li>
            </ul>
          </section>

          {/* 4 */}
          <section id="classify" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">4) Query Classification</h2>
            <ul className="kt-list">
              <li><b>What:</b> {"Factual, Strategic, Coaching, Conflict, Reflective, Sentiment"}.</li>
              <li><b>Why:</b> Right question → right reasoning path → faster, safer answers.</li>
              <li><b>How:</b> Few‑shot taxonomy + confidence threshold + fallbacks to human.</li>
            </ul>
          </section>

          {/* 5 */}
          <section id="routing" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">5) Toolchain Routing</h2>
            <ul className="kt-list">
              <li><b>What:</b> Choose among RAG, MCP tools, simulators, coaching agents, escalation.</li>
              <li><b>Why:</b> Decomposes complex asks; keeps LLM focused.</li>
              <li><b>How:</b> Router policies + cost/latency guardrails; observable traces.</li>
            </ul>
          </section>

          {/* 6 */}
          <section id="simulate" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">6) Simulation & Decision Engine</h2>
            <ul className="kt-list">
              <li><b>What:</b> Score options by <i>impact</i>, <i>risk</i>, <i>morale</i>; apply fairness filters.</li>
              <li><b>Why:</b> Make tradeoffs explicit; reveal second‑order effects.</li>
              <li><b>How:</b> Scoring functions + scenario trees + Monte Carlo where useful.</li>
            </ul>
          </section>

          {/* 7 */}
          <section id="delivery" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">7) LLM Output & Delivery</h2>
            <ul className="kt-list">
              <li><b>What:</b> Clear, confident, role‑sensitive communication.
              </li>
              <li><b>How:</b> Templates for CEO/VP/EM/IC; citations by default; action lists.</li>
            </ul>
          </section>

          {/* 8 */}
          <section id="feedback" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">8) Feedback & Learning</h2>
            <ul className="kt-list">
              <li><b>What:</b> Continuous improvement of tone, memory, and reasoning based on ratings.</li>
              <li><b>How:</b> RLHF‑lite via thumbs + rationale; safe‑ops override when quality drops.</li>
            </ul>
          </section>

          {/* 9 */}
          <section id="nudges" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">9) Proactive Nudges</h2>
            <ul className="kt-list">
              <li><b>What:</b> Surface morale dips, missed recognition, stale goals, check‑in needs.</li>
              <li><b>How:</b> Temporal rules + anomaly detection; notify in the user’s channel.</li>
            </ul>
          </section>

          {/* 10 */}
          <section id="boundaries" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">10) Human Boundaries</h2>
            <ul className="kt-list">
              <li><b>What:</b> Keep emotions, values, accountability human‑owned.</li>
              <li><b>How:</b> Escalation triggers, consent gates, and “human‑in‑the‑loop” policies.</li>
            </ul>
          </section>

          {/* Patterns */}
          <section id="patterns" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">Implementation Patterns</h2>
            <ul className="kt-list">
              <li><b>Coaching Agent:</b> 1:1 prep, feedback reframes, growth plans.</li>
              <li><b>Decision Review:</b> RFC assistant that tests for clarity, risk, and customer impact.</li>
              <li><b>Delivery Health:</b> DORA + qualitative sentiment for a single scoreboard.</li>
              <li><b>Incident Co‑pilot:</b> Timeline, comms drafts, postmortem scaffolds.</li>
            </ul>
          </section>

          {/* Guardrails */}
          <section id="guardrails" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">Governance & Guardrails</h2>
            <ul className="kt-list">
              <li>Data minimization, purpose limitation, and retention windows.</li>
              <li>Red‑teaming, prompt injection defenses, and model evals per release.</li>
              <li>Clear ownership: policy, safety, and SLOs for latency and quality.</li>
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" className="kt-card" style={{ margin: "16px 0" }}>
            <h2 className="kt-h2">FAQ</h2>
            <details>
              <summary><b>Where should I start?</b></summary>
              <p>Start with inputs → memory → classification → routing. Ship a narrow coaching use case inside one org team.</p>
            </details>
            <details>
              <summary><b>How do I measure success?</b></summary>
              <p>Task success rate, latency, citation coverage, and user CSAT. For delivery health, track DORA + satisfaction.</p>
            </details>
            <details>
              <summary><b>What about costs?</b></summary>
              <p>Cache aggressively, prefer smaller models with tool use, and cap token windows by design.</p>
            </details>
          </section>

          <hr className="kt-hr" />
          <footer className="kt-foot">
            <Link to="/articles" style={{ textDecoration: "none", color: "#0b66c3", fontWeight: 600 }}>
              ← Back to Articles
            </Link>
            <a href="#intro" className="kt-btn" style={{ textDecoration: "none" }}>
              Back to Top ↑
            </a>
          </footer>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------- Styles ---------------------------------- */
const styles = `
  .kt-wrap{display:grid;grid-template-columns:1fr;gap:20px}
  @media(min-width:980px){.kt-wrap{grid-template-columns:240px 1fr}}
  .kt-sticky{top:72px;align-self:start}
  .kt-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px}
  .kt-hero{background:linear-gradient(135deg,#eef2ff,#eff6ff);border:1px solid #e5e7eb;border-radius:12px;padding:16px}
  .kt-kicker{text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:#6b7280;font-size:12px;margin:0}
  .kt-title{font-size:34px;margin:6px 0 8px;font-weight:800;line-height:1.15}
  .kt-desc{color:#374151;margin:0 0 8px}
  .kt-meta{color:#6b7280;font-size:13px;margin:4px 0 10px}
  .kt-toc a{display:block;padding:8px 10px;border-radius:8px;color:#0b66c3;text-decoration:none}
  .kt-toc a.active{background:#eff6ff;font-weight:700}
  .kt-hr{border:0;height:1px;background:#e5e7eb;margin:16px 0}
  .kt-h2{font-size:22px;margin:0 0 8px;font-weight:800}
  .kt-list{margin:0 0 8px 18px;color:#374151;line-height:1.65}
  .kt-toolbar{display:flex;gap:8px;flex-wrap:wrap}
  .kt-btn{background:#0b66c3;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;border:0;cursor:pointer}
  .kt-btn.ghost{background:#f3f4f6;color:#111827}
  .kt-btn.liked{background:#ef4444}
  .kt-foot{display:flex;gap:12px;align-items:center;justify-content:space-between}
  .kt-badge{display:inline-block;padding:2px 8px;border-radius:999px;border:1px solid #e5e7eb;background:#f9fafb;color:#374151;font-size:12px}
`;

const wrap = { maxWidth: 1080, margin: "32px auto", padding: "0 16px" };
