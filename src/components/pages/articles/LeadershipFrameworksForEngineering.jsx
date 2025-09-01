// components/pages/articles/LeadershipFrameworksForEngineering.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * 🧭 Leadership Frameworks for Engineering Leaders — Ultimate Field Guide
 * - Priority-ordered frameworks used by top engineering leaders
 * - Each with What / Why / How / When blocks (actionable, plain-English)
 * - Sticky ToC, Like/Share (localStorage), consistent visual system
 */

const NS = "sandeep:articles:v1";
const ARTICLE_KEY = "articles:leadership-frameworks";

/* -------------------------- localStorage helpers -------------------------- */
function readStore() { try { const raw = localStorage.getItem(NS); return raw ? JSON.parse(raw) : {}; } catch { return {}; } }
function writeStore(obj) { try { localStorage.setItem(NS, JSON.stringify(obj)); } catch {} }
function useLocalStore(key, initial) {
  const [state, setState] = React.useState(() => {
    const store = readStore();
    return store[key] ?? initial;
  });
  React.useEffect(() => { const store = readStore(); store[key] = state; writeStore(store); }, [key, state]);
  return [state, setState];
}

/* ------------------------------ Social bits ------------------------------ */
function LikeButton({ storeKey }) {
  const [model, setModel] = useLocalStore(storeKey, { liked: false, likeCount: 0 });
  const toggle = () => setModel((m) => {
    const liked = !m.liked;
    return { liked, likeCount: Math.max(0, (m.likeCount || 0) + (liked ? 1 : -1)) };
  });
  return (
    <button className={`kt-btn ${model.liked ? "liked" : "ghost"}`} onClick={toggle} aria-pressed={model.liked}>
      {model.liked ? "♥ Liked" : "♡ Like"} {model.likeCount ? `· ${model.likeCount}` : ""}
    </button>
  );
}
function ShareButton() {
  const onShare = async () => {
    const url = window.location.href;
    const title = "Leadership Frameworks for Engineering Leaders — Field Guide";
    const text = "Priority-ordered leadership frameworks with plain-English how-tos.";
    try {
      if (navigator.share) await navigator.share({ title, text, url });
      else { await navigator.clipboard.writeText(url); alert("🔗 Link copied to clipboard!"); }
    } catch {}
  };
  return <button className="kt-btn ghost" onClick={onShare}>↗ Share</button>;
}

/* --------------------------------- Page ---------------------------------- */
export default function LeadershipFrameworksForEngineering() {
  React.useEffect(()=>{ document.title="Leadership Frameworks for Engineering Leaders | Sandeep Aggarwal"; },[]);
  const [activeId, setActiveId] = React.useState(()=>localStorage.getItem("lfr:lastId")||"quickstart");
  React.useEffect(()=>{
    const ids = [
      "quickstart",
      "first-principles","okrs","aws-lps","dora","agile-lean","systems-thinking",
      "radical-candor","servant-leadership","eisenhower","raci-daci","cynefin",
      "design-thinking","jtbd","ooda","wardley","ics",
      "sdt","tps-lean","mckinsey7s","leadership-pipeline",
      "porter","blue-ocean",
      "how-to-use"
    ];
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id); if (!el) continue;
        if (el.getBoundingClientRect().top <= 80) current = id;
      }
      setActiveId(current);
      localStorage.setItem("lfr:lastId", current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  },[]);

  return (
    <article style={wrap}>
      <style>{styles}</style>

      <header>
        <p className="kt-kicker">Foundations</p>
        <h1 className="kt-title">🧭 Leadership Frameworks for Engineering Leaders</h1>
        <p className="kt-desc">
          The decision systems, mental models, and cultural principles high-performing engineering leaders use to scale impact.
        </p>
        <div className="kt-meta">
          By Sandeep Kumar Aggarwal · Updated {new Date().toLocaleDateString()}
        </div>
        <div className="kt-toolbar" style={{gap:8, flexWrap:"wrap"}}>
          <a className="kt-btn ghost" href="#quickstart">Jump to Quick-Start Stack ↓</a>

        </div>
        <hr className="kt-hr" />
      </header>

      <div className="kt-wrap">
        {/* Sticky ToC */}
        <aside className="kt-sticky">
          <nav className="kt-card kt-toc" aria-label="On this page">
            <strong style={{ display:"block", marginBottom:6 }}>On this page</strong>
            {[
              ["quickstart","Quick-Start Stack"],
              ["first-principles","First Principles Thinking"],
              ["okrs","OKRs (Objectives & Key Results)"],
              ["aws-lps","Amazon Leadership Principles"],
              ["dora","DORA Metrics"],
              ["agile-lean","Agile & Lean"],
              ["systems-thinking","Systems Thinking"],
              ["radical-candor","Radical Candor"],
              ["servant-leadership","Servant Leadership"],
              ["eisenhower","Eisenhower Matrix"],
              ["raci-daci","RACI/DACI"],
              ["cynefin","Cynefin (Context)"],
              ["design-thinking","Design Thinking"],
              ["jtbd","Jobs To Be Done"],
              ["ooda","OODA Loop"],
              ["wardley","Wardley Mapping"],
              ["ics","Incident Command System (ICS)"],
              ["sdt","Self-Determination Theory"],
              ["tps-lean","Toyota Production System / Lean"],
              ["mckinsey7s","McKinsey 7-S"],
              ["leadership-pipeline","Leadership Pipeline"],
              ["porter","Porter’s Five Forces"],
              ["blue-ocean","Blue Ocean Strategy"],
              ["how-to-use","How to Use This Guide"]
            ].map(([id,label])=>(
              <a key={id} href={`#${id}`} className={activeId===id?"active":""}>{label}</a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div>

          {/* QUICK START */}
          <section id="quickstart" className="kt-card">
            <h2 className="kt-h2">🚀 Quick-Start Stack (use these first)</h2>
            <p className="kt-desc">If you adopt only a handful, start here: <b>First Principles → OKRs → AWS LPs → DORA → Agile/Lean</b>. This set gives you clarity, focus, culture, measurable outcomes, delivery cadence, and a way to debug complex org/system behavior.</p>
            <ul className="kt-list">
              <li><span className="kt-badge">Why this order?</span> Understand problems from the ground up (First Principles), align on outcomes (OKRs), uphold strong behaviors (AWS LPs), measure delivery (DORA), run short feedback loops (Agile/Lean).</li>
            </ul>
          </section>

          {/* FIRST PRINCIPLES */}
          <section id="first-principles" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🧠 First Principles Thinking</h2>
            <ul className="kt-list">
              <li><b>What:</b> Break a problem down to unquestioned basics (facts, constraints), then build solutions up from those truths rather than analogy or precedent.</li>
            </ul>
          </section>

          {/* OKRs */}
          <section id="okrs" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🎯 OKRs (Objectives & Key Results)</h2>
            <ul className="kt-list">
              <li><b>What:</b> A goal system that pairs an inspiring Objective with 2–4 measurable Key Results.</li>
            </ul>
          </section>

          {/* AWS LPS */}
          <section id="aws-lps" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">📜 Amazon Leadership Principles</h2>
            <ul className="kt-list">
              <li><b>What:</b> 16 behaviors (e.g., Customer Obsession, Ownership, Dive Deep, Bias for Action) that set cultural guardrails.</li>
            </ul>
          </section>

          {/* DORA */}
          <section id="dora" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">📈 DORA Metrics</h2>
            <ul className="kt-list">
              <li><b>What:</b> Four delivery KPIs: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Restore.</li>
            </ul>
          </section>

          {/* AGILE & LEAN */}
          <section id="agile-lean" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🔁 Agile & Lean</h2>
            <ul className="kt-list">
              <li><b>What:</b> Iterative delivery (Agile & Learn iteratively.</li>
            </ul>
          </section>

          {/* RADICAL CANDOR */}
          <section id="radical-candor" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🗣️ Radical Candor</h2>
            <ul className="kt-list">
              <li><b>What:</b> Care personally, challenge directly.</li>
            </ul>
          </section>

          {/* SERVANT LEADERSHIP */}
          <section id="servant-leadership" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🤝 Growth Leadership</h2>
            <ul className="kt-list">
              <li><b>What:</b> Leaders serve the team: unblock, grow people, amplify impact.</li>
            </ul>
          </section>

          {/* LEADERSHIP PIPELINE */}
          <section id="leadership-pipeline" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🪜 Leadership Pipeline</h2>
            <ul className="kt-list">
              <li><b>What:</b> Stages from IC → Lead → Manager → Manager of Managers → Exec, each with changed “time span of work”.</li>
            </ul>
          </section>


          <hr className="kt-hr" />
          <footer className="kt-foot">
            <Link to="/articles" style={{ textDecoration:"none", color:"#0b66c3", fontWeight:600 }}>← Back to Articles</Link>
            <a href="#quickstart" className="kt-btn" style={{ textDecoration:"none" }}>Back to Top ↑</a>
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
  .kt-sticky{position:sticky;top:72px;align-self:start}
  .kt-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px}
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
