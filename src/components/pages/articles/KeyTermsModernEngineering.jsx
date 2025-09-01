// components/pages/articles/KeyTermsModernEngineering.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * 🔑 Engineering KPIs — Simple, OKR-first
 * - Clean definitions in the main view (no targets, no formulas, no examples)
 * - Quantitative details live ONLY inside the OKR blocks
 * - Light UI, easy skim for engineers & leadership
 */

const NS = "sandeep:articles:v1";
const ARTICLE_KEY = "articles:key-terms-modern-engineering";

/* -------------------------- localStorage helpers -------------------------- */
function readStore() { try { const raw = localStorage.getItem(NS); return raw ? JSON.parse(raw) : {}; } catch { return {}; } }
function writeStore(obj) { try { localStorage.setItem(NS, JSON.stringify(obj)); } catch {}
}
function useLocalStore(key, initial) {
  const [state, setState] = React.useState(() => {
    const store = readStore();
    return store[key] ?? initial;
  });
  React.useEffect(() => { const store = readStore(); store[key] = state; writeStore(store); }, [key, state]);
  return [state, setState];
}

/* -------------------------- Self Assessment (1–5) ------------------------- */
function SelfAssessment({ storeKey }) {
  const fields = [
    ["Delivery", "Lead Time, Deploys, Flow"],
    ["Quality", "CFR, Escapes, Coverage"],
    ["Reliability", "SLO, p95/p99, MTTR"],
    ["Efficiency", "Cost/req, Build, Flaky"],
    ["People", "Engagement, Retention, Growth"],
    ["Customer Impact", "Adoption, NPS, Revenue"],
  ];
  const [scores, setScores] = useLocalStore(storeKey, {
    Delivery:3, Quality:3, Reliability:3, Efficiency:3, People:3, "Customer Impact":3
  });
  const avg = Object.values(scores).reduce((a,b)=>a+Number(b||0),0)/(Object.keys(scores).length||1);
  const band = avg>=4.5?"Elite":avg>=3.5?"High":avg>=2.5?"Medium":"Low";
  return (
    <section id="assess" className="kt-card">
      <h2 className="kt-h2">🧪 Team Self-Assessment (1–5)</h2>
      <div className="kt-assess">
        {fields.map(([k,hint])=> (
          <label key={k} className="kt-as-row">
            <div className="kt-as-name"><strong>{k}</strong><span className="kt-as-hint">{hint}</span></div>
            <input type="range" min="1" max="5" step="1" value={scores[k]} onChange={(e)=>setScores({...scores,[k]:Number(e.target.value)})}/>
            <div className="kt-as-score">{scores[k]}</div>
          </label>
        ))}
      </div>
      <div className="kt-note"><strong>Score:</strong> {avg.toFixed(1)} / 5 · <strong>Band:</strong> {band}</div>
      <div style={{ marginTop:8, display:"flex", gap:8 }}>
        <button className="kt-btn ghost" onClick={()=>setScores({Delivery:3,Quality:3,Reliability:3,Efficiency:3,People:3,"Customer Impact":3})}>Reset</button>
      </div>
    </section>
  );
}

/* --------------------------------- Page ---------------------------------- */
export default function KeyTermsModernEngineering() {
  React.useEffect(()=>{ document.title="Key Terms in Modern Engineering | Sandeep Aggarwal"; },[]);
  const [activeId, setActiveId] = React.useState(()=>localStorage.getItem("kterms:lastId")||"delivery");
  React.useEffect(()=>{
    const ids=["delivery","quality","reliability","efficiency","people","customer","assess","ritual"];
    const onScroll=()=>{ let current=ids[0]; for (const id of ids){ const el=document.getElementById(id); if(!el) continue; if(el.getBoundingClientRect().top<=80) current=id; } setActiveId(current); localStorage.setItem("kterms:lastId",current); };
    window.addEventListener("scroll",onScroll,{passive:true}); onScroll(); return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  return (
    <article style={wrap}>
      <style>{styles}</style>

      <header>
        <p className="kt-kicker">Foundations</p>
        <h1 className="kt-title">🔑 Engineering KPIs</h1>
        <p className="kt-desc">
          Six buckets with crisp definitions. <b>All metrics/examples live only in the OKR boxes</b> so the main view stays clean.
        </p>
        <div className="kt-meta">By Sandeep Kumar Aggarwal · Updated {new Date().toLocaleDateString()}</div>
        <div className="kt-toolbar">
          <a className="kt-btn ghost" href="#ritual">Jump to Weekly Ritual ↓</a>
        </div>
        <hr className="kt-hr" />
        <p className="kt-desc">
          A simple, shared language for engineering performance—easy to skim, easy to act. Use the OKR examples to set targets, then review weekly.
        </p>
      </header>

      <div className="kt-wrap">
        {/* Sticky ToC */}
        <aside className="kt-sticky">
          <nav className="kt-card kt-toc" aria-label="On this page">
            <strong style={{ display:"block", marginBottom:6 }}>On this page</strong>
            {[
              ["delivery","Delivery"],
              ["quality","Quality"],
              ["reliability","Reliability"],
              ["efficiency","Efficiency"],
              ["people","People"],
              ["customer","Customer Impact"],
              ["ritual","Weekly Ritual"],
            ].map(([id,label])=> (
              <a key={id} href={`#${id}`} className={activeId===id?"active":""}>{label}</a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div>
          {/* DELIVERY */}
          <section id="delivery" className="kt-card">
            <h2 className="kt-h2">🚚 Delivery — Speed & Predictability</h2>
            <ul className="kt-list">
              <li><span className="kt-badge">Lead Time</span> — Time from work start to production; core signal of execution speed.</li>
              <li><span className="kt-badge">Throughput</span> — Completed items per week across features and fixes; shows delivery rate.</li>
              <li><span className="kt-badge">Release Frequency</span> — How often production receives new value; basic cadence of agility.</li>
            </ul>
            {/* OKR block — quantitative examples intentionally kept here */}
            <div className="kt-note" style={{marginTop:8}}>
              <strong>OKR (Delivery) Examples:</strong> Ship value faster without surprises.
              <ul className="kt-list">
                <li>KR1 — Reduce Lead Time median to ≤ <span className="kt-code">48h</span> (from 120h)</li>
              </ul>
            </div>
          </section>

          {/* QUALITY */}
          <section id="quality" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">🧪 Quality — Correctness & Prevention</h2>
            <ul className="kt-list">
              <li><span className="kt-badge">Change Failure Rate (CFR)</span> — Share of deployments that cause incidents or rollbacks.</li>
              <li><span className="kt-badge">Escape Rate</span> — Defects discovered in production; reflects prevention depth.</li>
            </ul>
            <div className="kt-note" style={{ marginTop: 8 }}>
              <strong>OKR (Quality) Examples:</strong> Raise correctness; prevent regressions.
              <ul className="kt-list">
                <li>KR1 — CFR ≤ <span className="kt-code">12%</span> (from 18%)</li>
              </ul>
            </div>
          </section>

          {/* RELIABILITY */}
          <section id="reliability" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">🔒 Reliability — Availability & Resilience</h2>
            <ul className="kt-list">
              <li><span className="kt-badge">Availability (SLO)</span> — Percentage of time a service is up for users.</li>
              <li><span className="kt-badge">Latency (p95/p99)</span> — Tail response times customers experience.</li>
              <li><span className="kt-badge">MTTR / MTTD</span> — Speed to detect issues and restore normal operation.</li>
              <li><span className="kt-badge">Error Budget Burn</span> — Portion of allowed unreliability used in a window.</li>
              <li><span className="kt-badge">TPS / Capacity</span> — Sustainable throughput and headroom at target quality.</li>
              <li><span className="kt-badge">Incident Count / Severity</span> — Volume and seriousness of customer-affecting events.</li>
            </ul>
            <div className="kt-note" style={{marginTop:8}}>
              <strong>OKR (Reliability) Examples:</strong> Delight customers with consistent uptime.
              <ul className="kt-list">
                <li>KR1 — p95 latency &lt; <span className="kt-code">300ms</span> on top 5 APIs</li>
                <li>KR2 — MTTR p50 &lt; <span className="kt-code">45m</span>; MTTD &lt; <span className="kt-code">5m</span></li>
              </ul>
            </div>
          </section>

          {/* EFFICIENCY */}
          <section id="efficiency" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">⚙️ Efficiency — Sustainable Economics & Flow</h2>
            <ul className="kt-list">
              <li><span className="kt-badge">Cost per Request / Feature</span> — Unit cost to deliver value to customers.</li>
              <li><span className="kt-badge">Build & Test Cycle Time</span> — Speed of CI feedback loops to developers.</li>
              <li><span className="kt-badge">Infra Utilization</span> — Right-sizing compute and memory without thrash.</li>
            </ul>
            <div className="kt-note" style={{marginTop:8}}>
              <strong>OKR (Efficiency) Examples:</strong> Improve developer throughput & unit economics.
              <ul className="kt-list">
                <li>KR1 — CI Build+Test p50 &lt; <span className="kt-code">10m</span> (from 19m)</li>
              </ul>
            </div>
          </section>

          {/* PEOPLE */}
          <section id="people" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">👥 People — Culture, Growth, Capacity</h2>
            <ul className="kt-list">
              <li><span className="kt-badge">Engagement / eNPS</span> — Team advocacy and energy to build.</li>
              <li><span className="kt-badge">Retention / Attrition</span> — Ability to keep top talent over time.</li>
              <li><span className="kt-badge">Hiring Velocity</span> — Time to fill roles and start impactful work.</li>
              <li><span className="kt-badge">Mentorship & Promotion</span> — Visible career growth and recognition.</li>
              <li><span className="kt-badge">Span of Control</span> — Effective team size per manager for coaching.</li>
              <li><span className="kt-badge">Onboarding Time</span> — Time to first meaningful production contribution.</li>
            </ul>
            <div className="kt-note" style={{marginTop:8}}>
              <strong>OKR (People) Examples:</strong> Build an engaged, scalable org.
              <ul className="kt-list">
                <li>KR1 — eNPS ≥ <span className="kt-code">90%</span> favorable on “I recommend”</li>
              </ul>
            </div>
          </section>

          {/* CUSTOMER IMPACT */}
          <section id="customer" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">🎯 Customer Impact — Outcomes, Not Output</h2>
            <ul className="kt-list">
              <li><span className="kt-badge">NPS / CSAT</span> — Satisfaction and loyalty from real users.</li>
              <li><span className="kt-badge">Conversion / Adoption</span> — How many eligible users try and use the thing.</li>
              <li><span className="kt-badge">Retention / Churn</span> — Whether customers keep coming back.</li>
              <li><span className="kt-badge">Revenue per Feature / Engineer</span> — ROI lens connecting engineering to value.</li>
              <li><span className="kt-badge">Time-to-Adoption</span> — How quickly users reach first meaningful use.</li>
              <li><span className="kt-badge">Support Tickets & MTTR</span> — Customer pain volume and fix speed.</li>
            </ul>
            <div className="kt-note" style={{marginTop:8}}>
              <strong>OKR (Customer Impact) Examples:</strong> Translate engineering into business outcomes.
              <ul className="kt-list">
                <li>KR2 — Feature X adoption ≥ <span className="kt-code">35%</span> of eligible in 30 days</li>
              </ul>
            </div>
          </section>

          {/* WEEKLY RITUAL */}
          <section id="ritual" className="kt-card" style={{ marginTop: 16 }}>
            <h2 className="kt-h2">📅 Weekly Review Ritual (30 minutes)</h2>
          </section>

           <hr className="kt-hr" />
          <footer className="kt-foot">
            <Link to="/articles" style={{ textDecoration:"none", color:"#0b66c3", fontWeight:600 }}>← Back to Articles</Link>
            <a href="#delivery" className="kt-btn" style={{ textDecoration:"none" }}>Back to Top ↑</a>
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
  .kt-h3{font-size:16px;margin:8px 0 6px;font-weight:700}
  .kt-list{margin:0 0 8px 18px;color:#374151;line-height:1.65}
  .kt-toolbar{display:flex;gap:8px;flex-wrap:wrap}
  .kt-btn{background:#0b66c3;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;border:0;cursor:pointer}
  .kt-btn.ghost{background:#f3f4f6;color:#111827}
  .kt-foot{display:flex;gap:12px;align-items:center;justify-content:space-between}
  .kt-badge{display:inline-block;padding:2px 8px;border-radius:999px;border:1px solid #e5e7eb;background:#f9fafb;color:#374151;font-size:12px}
  .kt-code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;background:#f8fafc;padding:2px 6px;border-radius:6px;border:1px solid #e5e7eb}

  /* Self assessment */
  .kt-assess{display:grid;gap:8px}
  .kt-as-row{display:grid;grid-template-columns:1fr 220px auto;gap:8px;align-items:center}
  @media(max-width:640px){.kt-as-row{grid-template-columns:1fr}}
  .kt-as-name{display:flex;flex-direction:column;gap:2px}
  .kt-as-hint{color:#6b7280;font-size:12px}
  .kt-as-score{width:36px;text-align:center;font-weight:700}

  @media print{
    .kt-sticky,.kt-toolbar{display:none!important}
    .kt-card{break-inside:avoid}
    body{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  }
`;

const wrap = { maxWidth: 1080, margin: "32px auto", padding: "0 16px" };
