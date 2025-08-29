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
            <p className="kt-desc">If you adopt only a handful, start here: <b>First Principles → OKRs → AWS LPs → DORA → Agile/Lean → Systems Thinking</b>. This set gives you clarity, focus, culture, measurable outcomes, delivery cadence, and a way to debug complex org/system behavior.</p>
            <ul className="kt-list">
              <li><span className="kt-badge">Why this order?</span> Understand problems from the ground up (First Principles), align on outcomes (OKRs), uphold strong behaviors (AWS LPs), measure delivery (DORA), run short feedback loops (Agile/Lean), and reason about causal loops (Systems Thinking).</li>
            </ul>
          </section>

          {/* FIRST PRINCIPLES */}
          <section id="first-principles" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🧠 First Principles Thinking</h2>
            <ul className="kt-list">
              <li><b>What:</b> Break a problem down to unquestioned basics (facts, constraints), then build solutions up from those truths rather than analogy or precedent.</li>
              <li><b>Why:</b> Avoids cargo-culting; surfaces non-obvious, simpler or cheaper approaches.</li>
              <li><b>How:</b> Write the problem; list assumptions; label each as fact/hypothesis; test high-impact hypotheses; design from the “truth set”.</li>
              <li><b>When:</b> New domains, cost/latency cliffs, large re-architecture, conflicting opinions.</li>
            </ul>
          </section>

          {/* OKRs */}
          <section id="okrs" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🎯 OKRs (Objectives & Key Results)</h2>
            <ul className="kt-list">
              <li><b>What:</b> A goal system that pairs an inspiring Objective with 2–4 measurable Key Results.</li>
              <li><b>Why:</b> Forces focus, aligns teams, and makes progress visible; pairs perfectly with KPIs.</li>
              <li><b>How:</b> Quarterly rhythm; 1–3 Objectives per team; KRs numeric and outcome-oriented; weekly check-ins; post-quarter grading & learnings.</li>
              <li><b>When:</b> Any time you need prioritization clarity and cross-team alignment.</li>
            </ul>
          </section>

          {/* AWS LPS */}
          <section id="aws-lps" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">📜 Amazon Leadership Principles</h2>
            <ul className="kt-list">
              <li><b>What:</b> 16 behaviors (e.g., Customer Obsession, Ownership, Dive Deep, Bias for Action) that set cultural guardrails.</li>
              <li><b>Why:</b> Normalizes high standards and decision hygiene; helps hire, coach, and promote consistently.</li>
              <li><b>How:</b> Map each principle to interview signals, feedback phrases, and promotion dossiers; celebrate stories that exemplify them.</li>
              <li><b>When:</b> Hiring loops, performance reviews, incident postmortems, strategy reviews.</li>
            </ul>
          </section>

          {/* DORA */}
          <section id="dora" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">📈 DORA Metrics</h2>
            <ul className="kt-list">
              <li><b>What:</b> Four delivery KPIs: Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Restore.</li>
              <li><b>Why:</b> Best-validated proxy for software delivery performance & org health.</li>
              <li><b>How:</b> Automate from CI/CD/incident tools; review weekly; tie improvements to OKRs.</li>
              <li><b>When:</b> Always on; especially during platform modernization or velocity pushes.</li>
            </ul>
          </section>

          {/* AGILE & LEAN */}
          <section id="agile-lean" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🔁 Agile & Lean</h2>
            <ul className="kt-list">
              <li><b>What:</b> Iterative delivery (Agile) + waste reduction & flow (Lean).</li>
              <li><b>Why:</b> Short feedback loops → better quality, happier teams, faster learning.</li>
              <li><b>How:</b> Small batches, WIP limits, Kanban boards, retrospectives, customer demos.</li>
              <li><b>When:</b> Product discovery, scaling teams, reducing cycle time & rework.</li>
            </ul>
          </section>

          {/* SYSTEMS THINKING */}
          <section id="systems-thinking" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🌐 Systems Thinking</h2>
            <ul className="kt-list">
              <li><b>What:</b> See the org/product as an interconnected system with feedback loops and delays.</li>
              <li><b>Why:</b> Prevents local optimizations that harm the whole; reveals leverage points.</li>
              <li><b>How:</b> Causal loop diagrams, stock-and-flow sketches, “5 Whys”, measure leading vs lagging indicators.</li>
              <li><b>When:</b> Persistent incidents, hidden bottlenecks, incentives misaligned with outcomes.</li>
            </ul>
          </section>

          {/* RADICAL CANDOR */}
          <section id="radical-candor" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🗣️ Radical Candor</h2>
            <ul className="kt-list">
              <li><b>What:</b> Care personally, challenge directly.</li>
              <li><b>Why:</b> Faster growth, fewer politics, clearer expectations.</li>
              <li><b>How:</b> SBI feedback (Situation-Behavior-Impact), regular 1:1s, ask for feedback first.</li>
              <li><b>When:</b> Performance coaching, cross-team friction, post-incident reviews.</li>
            </ul>
          </section>

          {/* SERVANT LEADERSHIP */}
          <section id="servant-leadership" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🤝 Servant Leadership</h2>
            <ul className="kt-list">
              <li><b>What:</b> Leaders serve the team: unblock, grow people, amplify impact.</li>
              <li><b>Why:</b> Builds trust and autonomy; scales leadership across org.</li>
              <li><b>How:</b> Regularly remove obstacles, sponsor careers, share credit, own blame.</li>
              <li><b>When:</b> Hypergrowth, onboarding waves, culture resets.</li>
            </ul>
          </section>

          {/* EISENHOWER */}
          <section id="eisenhower" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">⏱️ Eisenhower Matrix (Urgent vs Important)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Triage work into Do / Schedule / Delegate / Eliminate.</li>
              <li><b>Why:</b> Avoids the urgent trap; protects strategy time.</li>
              <li><b>How:</b> Weekly review; move “important-non-urgent” into calendar blocks.</li>
              <li><b>When:</b> Fire-fighting culture, overbooked calendars, noisy backlogs.</li>
            </ul>
          </section>

          {/* RACI / DACI */}
          <section id="raci-daci" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🧩 RACI / DACI (Decision Clarity)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Roles for decisions (Responsible/Accountable/Consulted/Informed or Driver/Approver/Contributors/Informed).</li>
              <li><b>Why:</b> Ends “who decides?” debates; speeds execution.</li>
              <li><b>How:</b> Add a RACI/DACI table to design docs, program charters, incident process.</li>
              <li><b>When:</b> Cross-team programs, ambiguous ownership, incident response.</li>
            </ul>
          </section>

          {/* CYNEFIN */}
          <section id="cynefin" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🗺️ Cynefin Framework (Contextual Decision-Making)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Categorizes situations: Clear, Complicated, Complex, Chaotic.</li>
              <li><b>Why:</b> Pick the right approach: best practice vs expert analysis vs probe-sense-respond.</li>
              <li><b>How:</b> Label initiatives; choose governance accordingly; revisit as context shifts.</li>
              <li><b>When:</b> New domains, incident chaos, ambiguous product bets.</li>
            </ul>
          </section>

          {/* DESIGN THINKING */}
          <section id="design-thinking" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🎨 Design Thinking</h2>
            <ul className="kt-list">
              <li><b>What:</b> Human-centered problem solving: empathize → define → ideate → prototype → test.</li>
              <li><b>Why:</b> Reduces building the wrong thing; drives adoption.</li>
              <li><b>How:</b> Customer interviews, usability tests, low-fi prototypes before code.</li>
              <li><b>When:</b> New product areas, onboarding flows, rethinking core journeys.</li>
            </ul>
          </section>

          {/* JTBD */}
          <section id="jtbd" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🧰 Jobs To Be Done (JTBD)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Users “hire” products to make progress in a context; focus on job, not persona.</li>
              <li><b>Why:</b> Clarifies requirements; reveals switching triggers and anxieties.</li>
              <li><b>How:</b> Job stories (“When ___, I want ___, so I can ___”); rank jobs by importance & satisfaction.</li>
              <li><b>When:</b> Prioritizing roadmap, positioning features, reducing churn.</li>
            </ul>
          </section>

          {/* OODA */}
          <section id="ooda" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">⚡ OODA Loop (Observe-Orient-Decide-Act)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Rapid decision cycle to out-learn/out-maneuver with tight feedback.</li>
              <li><b>Why:</b> Beats slower competitors; great for incidents and market shifts.</li>
              <li><b>How:</b> Instrument, review signals, decide, act, learn, repeat; prefer reversible decisions (Type-2).</li>
              <li><b>When:</b> Incident response, competitive pressure, early product discovery.</li>
            </ul>
          </section>

          {/* WARDLEY */}
          <section id="wardley" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🗺️ Wardley Mapping</h2>
            <ul className="kt-list">
              <li><b>What:</b> Map value chain vs evolution (Genesis → Custom → Product → Commodity).</li>
              <li><b>Why:</b> Shows where to build vs buy; anticipates industrialization & cost curves.</li>
              <li><b>How:</b> Map user needs → components → stage; align strategy and investment.</li>
              <li><b>When:</b> Platform strategy, cloud migrations, vendor decisions.</li>
            </ul>
          </section>

          {/* ICS */}
          <section id="ics" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🚒 Incident Command System (ICS)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Roles & rituals for emergencies (Incident Commander, Ops, Comms, Scribe).</li>
              <li><b>Why:</b> Reduces chaos, speeds MTTR, improves comms.</li>
              <li><b>How:</b> Paging, role cards, status cadence, single source of truth, postmortems.</li>
              <li><b>When:</b> Sev0/Sev1 incidents, security events, major outages.</li>
            </ul>
          </section>

          {/* SDT */}
          <section id="sdt" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🌱 Self-Determination Theory (Motivation)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Motivation thrives with Autonomy, Mastery (Competence), Relatedness.</li>
              <li><b>Why:</b> Drives engagement, performance, retention.</li>
              <li><b>How:</b> Give goals not tasks, growth ladders, peer learning, team rituals.</li>
              <li><b>When:</b> Culture building, career paths, mid-level stagnation.</li>
            </ul>
          </section>

          {/* TPS / LEAN */}
          <section id="tps-lean" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🏭 Toyota Production System / Lean</h2>
            <ul className="kt-list">
              <li><b>What:</b> Eliminate waste (Muda), unevenness (Mura), overburden (Muri); enable flow.</li>
              <li><b>Why:</b> Fewer defects, lower cost, faster cycle time.</li>
              <li><b>How:</b> Value-stream mapping, andon (stop-the-line), Kaizen, small batch sizes.</li>
              <li><b>When:</b> CI/CD optimization, build/test time, incident prevention.</li>
            </ul>
          </section>

          {/* MCKINSEY 7S */}
          <section id="mckinsey7s" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🏛️ McKinsey 7-S (Org Alignment)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Align Strategy, Structure, Systems, Style, Staff, Skills, Shared Values.</li>
              <li><b>Why:</b> Diagnoses why transformations stall; ensures coherence.</li>
              <li><b>How:</b> Heat-map each “S”; create changes that reinforce, not conflict.</li>
              <li><b>When:</b> Reorgs, platform pivots, post-merger integration.</li>
            </ul>
          </section>

          {/* LEADERSHIP PIPELINE */}
          <section id="leadership-pipeline" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🪜 Leadership Pipeline</h2>
            <ul className="kt-list">
              <li><b>What:</b> Stages from IC → Lead → Manager → Manager of Managers → Exec, each with changed “time span of work”.</li>
              <li><b>Why:</b> Prevents role confusion; clarifies what to stop/ start at each stage.</li>
              <li><b>How:</b> Role charters, success metrics per level, promotion criteria, coaching.</li>
              <li><b>When:</b> Rapid growth, first-time managers, succession planning.</li>
            </ul>
          </section>

          {/* PORTER */}
          <section id="porter" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🧭 Porter’s Five Forces (Strategic Context)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Industry forces: Rivalry, New Entrants, Substitutes, Buyer & Supplier Power.</li>
              <li><b>Why:</b> Guides tech bets (moats, platform vs product, cost vs differentiation).</li>
              <li><b>How:</b> Rate each force, pick strategy (cost, differentiation, focus), align roadmap.</li>
              <li><b>When:</b> Annual planning, product strategy, pricing/packaging shifts.</li>
            </ul>
          </section>

          {/* BLUE OCEAN */}
          <section id="blue-ocean" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🌊 Blue Ocean Strategy (Create Uncontested Space)</h2>
            <ul className="kt-list">
              <li><b>What:</b> Shift from competing to creating: Eliminate-Reduce-Raise-Create grid.</li>
              <li><b>Why:</b> Avoid feature arms-race; find new value curves.</li>
              <li><b>How:</b> Map competitor factors; decide what to eliminate or amplify; prototype.</li>
              <li><b>When:</b> Stagnant markets, saturated categories, step-change bets.</li>
            </ul>
          </section>

          {/* HOW TO USE */}
          <section id="how-to-use" className="kt-card" style={{marginTop:16}}>
            <h2 className="kt-h2">🧩 How to Use This Guide</h2>
            <ul className="kt-list">
              <li><b>Pick 3–5 frameworks</b> that solve <i>today’s</i> problems; avoid boiling the ocean.</li>
              <li><b>Codify rituals</b> (e.g., weekly OKR review + DORA check + retro with Radical Candor).</li>
              <li><b>Teach with examples</b>: add one story per framework to onboarding & playbooks.</li>
              <li><b>Measure adoption</b> (checklists, audit questions, leading indicators).</li>
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
