import React, { useState } from "react";

/**
 * MyProfile — Article-style theme (no dark background)
 * - No page background/gradient; inherits page bg
 * - White cards (#fff), light borders (#e5e7eb), blue accent (#0b66c3)
 * - Matches the look/feel used in your Articles pages
 */

const METRICS = [
  { label: "", sub: "Digital Sales Influence" },
  { label: "", sub: "Incremental Revenue" },
  { label: "", sub: "Efficiency Gains" },
  { label: "", sub: "Cost Savings" },
  { label: "", sub: "Best-in-class engineering culture" },
];

const COMPETENCIES = [
  "Global Engineering Leadership",
  "Enterprise Strategy Alignment",
  "Executive Influence",
  "Cloud-native AI/ML Platforms",
  "Culture & Leadership Development",
  "Crisis & Risk Leadership",
  "Technology Depth & Mentorship",
  "Situational Leadership",
  "Transformation Leadership",
  "Coaching Leadership"
];

const TECH = [
  "Java",
  "Spring Boot",
  "Python",
  "React",
  "Kafka",
  "Apache Beam",
  "GCP",
  "Cassandra",
  "Elasticsearch",
  "MongoDB",
  "Redis",
  "BigQuery",
  "AI/ML",
  "Agents",
];

const EXPERIENCES = [
  {
    title: "Director – Software Engineering, Lowe’s India",
    period: "2022 – Present",
    points: [
      "Scaled org to 3 senior managers, 5 architects, and 60+ engineers across Personalization, Recommendation, and Digital Home; influenced X% of digital sales.",
      "Drove digital transformation delivering Y incremental revenue YoY and Z in savings (contracts, Vertex AI, GCP compute).",
      "Built low-code/no-code platform enabling launches in hours instead of weeks.",
      "Partnered with VPs/SVPs on infra strategy; embedded cost discipline and operational excellence.",
      "Achieved 99% engagement and top performance across leadership & engineering KPIs.",
      "De-risked peak readiness via a six-week transformation plan with resourcing/milestones.",
    ],
  },
  {
    title: "Sr. Engineering Manager, Lowe’s India",
    period: "2021 – 2022",
    points: [
      "Led dual-shore strategy; managed 10+ in U.S. and scaled India org to 30+ in a year.",
      "Owned personalization platforms across software, data engineering, and data science; improved conversion & engagement.",
      "Aligned platform roadmaps to enterprise priorities; accelerated time-to-market.",
      "Scaled via campus hiring, leadership onboarding, and career pathing programs.",
      "Established engineering standards/governance laying foundation for Recommendation & MyHome platforms.",
    ],
  },
  {
    title: "Specialist Master & Engineering Roles",
    period: "2006 – 2020",
    points: [
      "Led enterprise transformation programs with cloud-native modernization and agile delivery.",
      "Launched global content discovery & search for a Fortune 100 tech major across multiple markets.",
      "Achieved Technology Architect distinction in 6 years; recognized as people-first leader and strategist.",
    ],
  },
];

const RECOGNITION = [
  "Consistently outperform expectations across roles; recognized for transformation and delivery excellence.",
  "Trusted advisor to VPs & SVPs on platform modernization, operations, and cost efficiency, and culture building",
  "Built culture of trust and innovation; 99% engagement and top engineering KPIs.",
  "LinkedIn Brand Ambassador within the organization.",
];

const EDUCATION = [
  { school: "Himachal Pradesh University", degree: "B.E., Computer Science & Engineering" },
];

function Metric({ label, sub }) {
  return (
    <div className="mp-metric" role="group" aria-label={sub}>
      <div className="mp-metric-sub">{sub}</div>
      <div className="mp-metric-label" aria-live="polite">{label}</div>
    </div>
  );
}

function Pill({ children }) {
  return <span className="mp-pill">{children}</span>;
}

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="mp-accordion" role="tablist" aria-label="Career Experience">
      {items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={idx} className="mp-accordion-item">
            <button
              className="mp-accordion-trigger"
              role="tab"
              aria-expanded={open}
              aria-controls={`sect-${idx}`}
              id={`tab-${idx}`}
              onClick={() => setOpenIndex(open ? -1 : idx)}
            >
              <div className="mp-accordion-head">
                <span className="mp-accordion-title">{item.title}</span>
                <span className="mp-accordion-period">{item.period}</span>
              </div>
              <span className={`mp-caret ${open ? "open" : ""}`} aria-hidden>▾</span>
            </button>
            <div
              id={`sect-${idx}`}
              role="tabpanel"
              aria-labelledby={`tab-${idx}`}
              className={`mp-accordion-panel ${open ? "open" : ""}`}
            >
              <ul className="mp-list">
                {item.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MyProfile() {
  return (
    <div className="mp">
      {/* Scoped styles — article-like theme */}
      <style>{`
        .mp {
          --card:#ffffff;
          --line:#e5e7eb;
          --text:#111827;
          --muted:#6b7280;
          --accent:#0b66c3;
          --ring:rgba(11,102,195,.18);
          --pill:#f9fafb;
          --pillText:#374151;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji";
          color: var(--text);
          background: transparent; /* no page background */
          padding: 24px;
        }
        .mp a { color: inherit; }
        .mp-container { max-width: 1120px; margin: 0 auto; }
        .mp-card {
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 12px;
          box-shadow: none; /* match articles (no heavy shadow) */
          overflow: hidden;
        }

        .mp-header { display: grid; gap: 16px; padding: 24px; border-bottom: 1px solid var(--line); }
        @media (min-width: 640px) { .mp-header { padding: 28px; grid-template-columns: 1fr auto; align-items: start; } }
        .mp-title { font-size: 28px; font-weight: 800; letter-spacing: -.01em; }
        @media (min-width: 640px) { .mp-title { font-size: 32px; } }
        .mp-sub { color: var(--muted); margin-top: 6px; }

        .mp-contact { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; color: var(--muted); }
        .mp-chip { display:inline-flex; gap:8px; align-items:center; padding:6px 10px; border:1px solid var(--line); border-radius:999px; background:#f3f4f6; }

        .mp-cta { display:flex; gap:10px; }
        .mp-btn { appearance:none; border:1px solid var(--line); background:#f3f4f6; color: var(--text); padding:10px 12px; border-radius:8px; font-weight:600; cursor:pointer; transition: box-shadow .2s ease, border-color .2s ease, transform .05s ease; text-decoration:none; display:inline-flex; align-items:center; }
        .mp-btn:hover { border-color: var(--accent); box-shadow: 0 0 0 3px var(--ring); }
        .mp-btn.primary { background: var(--accent); color:#fff; border-color: transparent; }
        .mp-btn.primary:hover { transform: translateY(-1px); }

        .mp-body { padding: 20px; }
        @media (min-width: 640px) { .mp-body { padding: 24px 28px; } }

        .mp-grid { display:grid; gap:16px; }
        @media (min-width: 1024px) { .mp-grid { grid-template-columns: 2fr 1fr; gap:20px; } }

        .mp-section-title { font-size: 18px; font-weight: 700; }
        .mp-section-sub { color: var(--muted); margin-top: 2px; }

        /* Article-like "note" look for summary */
        .mp-summary { border:1px solid var(--line); border-radius: 10px; padding: 14px; background:#f8fafc; }
        .mp-summary p { color: var(--muted); line-height: 1.65; margin:0; }

        .mp-metrics { display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px; }
        @media (min-width: 520px) { .mp-metrics { grid-template-columns: repeat(4, minmax(0,1fr)); } }
        .mp-metric { display:flex; align-items:center; justify-content:space-between; border:1px solid var(--line); border-radius:10px; padding:10px 12px; background:#fff; }
        .mp-metric-sub { color: var(--muted); font-size: 12px; }
        .mp-metric-label { font-weight: 800; font-size: 18px; }

        .mp-pill { display:inline-flex; align-items:center; gap:6px; border-radius:999px; padding:6px 10px; background: var(--pill); color: var(--pillText); border:1px solid var(--line); font-size: 13px; }
        .mp-pills { display:flex; flex-wrap: wrap; gap:8px; }

        .mp-accordion-item { border-top: 1px solid var(--line); }
        .mp-accordion-trigger { width:100%; background:transparent; color:inherit; text-align:left; padding:14px 0; border:0; display:flex; align-items:center; justify-content:space-between; cursor:pointer; }
        .mp-accordion-head { display:flex; flex-direction:column; gap:4px; }
        @media (min-width: 640px) { .mp-accordion-head { flex-direction: row; align-items:center; justify-content: space-between; gap:10px; width:100%; } }
        .mp-accordion-title { font-weight: 600; }
        .mp-accordion-period { color: var(--muted); font-size: 14px; }
        .mp-caret { margin-left:12px; transition: transform .2s ease; }
        .mp-caret.open { transform: rotate(180deg); }
        .mp-accordion-panel { display:none; padding: 0 0 14px 0; }
        .mp-accordion-panel.open { display:block; }

        .mp-list { margin-left: 18px; color: var(--muted); line-height: 1.6; display:grid; gap:8px; list-style: disc; }

        .mp-row { display:grid; gap:16px; }
        @media (min-width: 1024px) { .mp-row { grid-template-columns: 2fr 1fr; } }

        .mp-card-sec { border:1px solid var(--line); border-radius:10px; padding:14px; background:#fff; }
        .mp-badges { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
        .mp-badge { background: var(--pill); color: var(--pillText); border:1px solid var(--line); border-radius: 999px; padding:6px 10px; font-size:13px; }

        .mp-hr { height:1px; background: var(--line); margin: 22px 0; border: 0; }

        .mp-footer { display:flex; flex-direction:column; gap:10px; align-items:stretch; }
        @media (min-width: 640px) { .mp-footer { flex-direction:row; justify-content:space-between; align-items:center; } }
        .mp-footer p { color: var(--muted); margin:0; }
      `}</style>

      <div className="mp-container">
        <div className="mp-card" role="region" aria-label="Sandeep Kumar Aggarwal Profile">
          {/* Header */}
          <div className="mp-header">
            <div>
              <div className="mp-title">Sandeep Kumar Aggarwal</div>
              <div className="mp-sub">
                Seasoned Engineering Director · Personalization · Recommendation · Content · Search · Customer Engagement
              </div>
              <div className="mp-contact" aria-label="Contact and links">
                <span className="mp-chip" aria-label="Location">📍 Bengaluru, India</span>
              </div>
            </div>
            <div className="mp-cta" role="group" aria-label="Quick actions">
              <a className="mp-btn primary" href="mailto:skaggarwal1984@gmail.com">Email Me →</a>
              <a className="mp-btn" href="https://www.linkedin.com/in/sandeep-kumar-aggarwal-ba022555" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>

          {/* Body */}
          <div className="mp-body">
            {/* Top grid: Summary + Metrics */}
            <div className="mp-grid">
              <section>
                <div className="mp-section-title">Executive Summary</div>
                <div className="mp-section-sub">Impact at enterprise scale</div>
                <div className="mp-summary" style={{ marginTop: 10 }}>
                  <p>
                    Transformation and servant leader with 19 years in technology and 10+ years of engineering leadership. Built and scaled high-performing global teams across personalization, recommendations, search, content, and customer engagement. At Lowe’s, I lead a 60+ member org across Personalization, Recommendation, and Home Platform, directly influencing X% of digital sales. Through digital transformation, platform modernization, and operational excellence, my teams delivered Y incremental revenue and multi-million-dollar savings while elevating customer experiences.
                  </p>
                </div>
              </section>

              <aside>
                <div className="mp-section-title">Impact Snapshot</div>
                <div className="mp-section-sub">Results at a glance</div>
                <div className="mp-metrics" style={{ marginTop: 10 }}>
                  {METRICS.map((m, i) => (
                    <Metric key={i} {...m} />
                  ))}
                </div>
              </aside>
            </div>

            {/* Competencies + Tech */}
            <div className="mp-row" style={{ marginTop: 18 }}>
              <section className="mp-card-sec">
                <div className="mp-section-title">Core Competencies</div>
                <div className="mp-section-sub">Strengths leaders care about</div>
                <div className="mp-pills" style={{ marginTop: 10 }}>
                  {COMPETENCIES.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
              </section>

              <aside className="mp-card-sec">
                <div className="mp-section-title">Tech Stack</div>
                <div className="mp-section-sub">Strong technical foundation</div>
                <div className="mp-pills" style={{ marginTop: 10 }}>
                  {TECH.map((t) => (
                    <span className="mp-badge" key={t}>{t}</span>
                  ))}
                </div>
              </aside>
            </div>

            {/* Experience */}
            <section className="mp-card-sec" style={{ marginTop: 18 }}>
              <div className="mp-section-title">Career Experience</div>
              <div className="mp-section-sub">Scope, scale, and outcomes</div>
              <Accordion items={EXPERIENCES} />
            </section>

            {/* Recognition + Education */}
            <div className="mp-row" style={{ marginTop: 18 }}>
              <section className="mp-card-sec">
                <div className="mp-section-title">Recognition & Impact</div>
                <div className="mp-section-sub">What leaders & teams say</div>
                <ul className="mp-list" style={{ marginTop: 10 }}>
                  {RECOGNITION.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <div className="mp-badges" style={{ marginTop: 10 }}>
                  <span className="mp-badge">★ Outperform Expectations</span>
                  <span className="mp-badge">👥 99% Engagement</span>
                </div>
              </section>

              <aside className="mp-card-sec">
                <div className="mp-section-title">Education</div>
                <div className="mp-section-sub">Foundation</div>
                <div className="mp-summary" style={{ marginTop: 10 }}>
                  {EDUCATION.map((e, i) => (
                    <div key={i}>
                      <div style={{ fontWeight: 600 }}>{e.degree}</div>
                      <div className="mp-sub">{e.school}</div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <hr className="mp-hr" />

            {/* Footer CTA */}
            <footer className="mp-footer">
              <p>Ready to discuss engineering & leadership? Let's connect</p>
              <div className="mp-cta">
                <a className="mp-btn primary" href="mailto:skaggarwal1984@gmail.com">Let’s Talk →</a>
                <a className="mp-btn" href="https://www.linkedin.com/in/sandeep-kumar-aggarwal-ba022555" target="_blank" rel="noreferrer">Connect ↗</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
