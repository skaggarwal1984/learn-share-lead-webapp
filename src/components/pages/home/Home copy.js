import React from "react";
import { Link } from "react-router-dom";

/**
 * Home — Executive Landing (article-style theme, no global bg)
 * ----------------------------------------------------------------
 * - Clean, recruiter/executive friendly hero with crisp value prop
 * - Impact stats, value pillars, and featured articles
 * - No external UI libs, fully responsive, print-friendly
 * - Matches /articles and /profile aesthetic (white cards, light borders)
 */

export default function Home() {
  React.useEffect(() => {
    document.title = "Sandeep Aggarwal — Engineering Director";
  }, []);

  return (
    <main className="home">
      <style>{styles}</style>

      {/* HERO */}
      <header className="container">
        <section className="card hero" aria-label="Intro">
          <div className="hero-left">
            <div className="kicker">Engineering Leadership</div>
            <h1 className="title">
              Building personalization, recommendations, and search that move the business.
            </h1>
            <p className="lead">
              I’m <b>Sandeep Kumar Aggarwal</b>, a seasoned Engineering Director leading a 60+ person
              org across Personalization, Recommendations, and the Digital Home platform. I focus on
              <i> measurable</i> outcomes—faster delivery, reliable systems, cost discipline, and customer impact.
            </p>

            <div className="cta-row" role="group" aria-label="Primary actions">
              <Link to="/profile" className="btn primary">👤 View My Profile</Link>
              <Link to="/articles" className="btn ghost">🧠 Read Articles</Link>
              <a className="btn" href="mailto:skaggarwal1984@gmail.com">✉️ Get in Touch</a>
            </div>

            <ul className="stats">
              <Stat label="Years in tech" value="19+" />
              <Stat label="Org size" value="60+" />
              <Stat label="Revenue impact" value="$400M+" />
              <Stat label="Engagement" value="99%" />
            </ul>
          </div>

          <div className="hero-right" aria-hidden>
            <div className="avatar" title="Sandeep Kumar Aggarwal">SA</div>
            <ul className="hero-tags">
              <li>Personalization</li>
              <li>Recommendations</li>
              <li>Search</li>
              <li>Customer Engagement</li>
            </ul>
          </div>
        </section>
      </header>

      {/* VALUE PILLARS */}
      <section className="container">
        <h2 className="h2">What I build & scale</h2>
        <p className="muted">
          Enterprise platforms that compound value—aligned to OKRs, measured via always-on KPIs.
        </p>

        <div className="grid four">
          <ValueCard
            title="Personalization Platform"
            bullets={[
              "Unified profiles, signals, and feature stores",
              "Real-time targeting & experimentation",
              "Tunable relevance with responsible AI guardrails",
            ]}
          />
          <ValueCard
            title="Recommendation Systems"
            bullets={[
              "Contextual, session-aware ranking",
              "Multi-arm bandits & feedback loops",
              "Lift in CTR, AOV, and conversion",
            ]}
          />
          <ValueCard
            title="Search & Relevance"
            bullets={[
              "Blended lexical + vector retrieval",
              "Query understanding, facets, synonyms",
              "p95 latency & budget-aware scoring",
            ]}
          />
          <ValueCard
            title="Engineering Excellence"
            bullets={[
              "Lead time & deploy frequency up",
              "Change Failure Rate ≤ 15%",
              "Culture of mentorship & recognition",
            ]}
          />
        </div>
      </section>

      {/* KPI STRIP */}
      <section className="container">
        <div className="card note">
          <div>
            <div className="kicker">Always-On KPIs</div>
            <div className="note-title">Delivery · Quality · Reliability · Efficiency · People</div>
            <p className="muted">
              The field guide we use weekly to keep engineering accountable and customer-obsessed.
            </p>
          </div>
          <Link to="/articles/key-terms-modern-engineering" className="btn primary">Open KPI Guide →</Link>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section className="container">
        <h2 className="h2">Featured Articles</h2>
        <p className="muted">Bookmark-worthy deep dives you can use in design reviews and interviews.</p>

        <div className="grid three">
          <ArticleCard
            to="/articles/key-terms-modern-engineering"
            title="🔑 Key Terms in Modern Engineering"
            blurb="Your weekly health check: formulas, targets, and a 30-minute ritual."
            est="~8 min read"
          />
          <ArticleCard
            to="/articles/databases-comparison"
            title="🧱 Cassandra vs Redis vs MongoDB vs OpenSearch"
            blurb="Decision matrix, architecture & read behavior, capacity math, ops runbook."
            est="~10 min read"
          />
          <ArticleCard
            to="/articles/transformers-primer"
            title="🤖 Transformer Architecture: The LLM Primer"
            blurb="First-principles tour of self-attention, stacks, decoding, and scaling."
            est="~9 min read"
          />
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="container">
        <div className="card">
          <h2 className="h2">Operating Principles</h2>
          <ul className="pill-row">
            {[
              "Strategy → Roadmap → KPIs",
              "Small batches, fast feedback",
              "SLOs + Error budgets",
              "Cost awareness by design",
              "Safety & Responsible AI",
              "Mentor, multiply, celebrate",
            ].map((t) => <li className="pill" key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section className="container">
        <div className="card contact">
          <div>
            <h2 className="h2">Let’s build something meaningful</h2>
            <p className="muted">
              Whether it’s a platform modernization, a personalization roadmap, or scaling teams across continents—
              I’m happy to share playbooks and partner on outcomes.
            </p>
          </div>
          <div className="cta-col">
            <a className="btn primary" href="mailto:skaggarwal1984@gmail.com">✉️ Email Sandeep</a>
            <a className="btn ghost" href="https://www.linkedin.com/in/sandeep-kumar-aggarwal-ba022555" target="_blank" rel="noreferrer">↗ Connect on LinkedIn</a>
          </div>
        </div>
      </section>

      <footer className="container foot">
        <p className="muted">© {new Date().getFullYear()} Sandeep Kumar Aggarwal · Bengaluru, India</p>
      </footer>
    </main>
  );
}

/* ---------- small presentational helpers ---------- */
function Stat({ label, value }) {
  return (
    <li className="stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </li>
  );
}

function ValueCard({ title, bullets }) {
  return (
    <article className="card value-card">
      <h3 className="h3">{title}</h3>
      <ul className="list">
        {bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
    </article>
  );
}

function ArticleCard({ to, title, blurb, est }) {
  return (
    <article className="card article-card">
      <h3 className="h3"><Link to={to} className="alink">{title}</Link></h3>
      <p className="muted">{blurb}</p>
      <div className="meta">{est} · Updated {new Date().toLocaleDateString()}</div>
      <Link to={to} className="btn">Read →</Link>
    </article>
  );
}

/* ---------- styles (scoped to this page) ---------- */
const styles = `
  .home { background: transparent; color: #111827; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial; }
  .container { max-width: 1080px; margin: 24px auto; padding: 0 16px; }
  .kicker { text-transform: uppercase; letter-spacing: .08em; font-weight: 700; color: #6b7280; font-size: 12px; }
  .title { font-size: 34px; line-height: 1.15; font-weight: 800; margin: 6px 0 8px; }
  .lead { color: #374151; margin: 0 0 12px; }
  .h2 { font-size: 22px; font-weight: 800; margin: 0 0 6px; }
  .h3 { font-size: 18px; font-weight: 700; margin: 0 0 6px; }
  .muted { color: #374151; }
  .meta { color: #6b7280; font-size: 13px; margin-top: 6px; }

  .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
  .note { display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: center; }
  .note-title { font-weight: 800; font-size: 18px; margin-top: 4px; }
  .alink { color: #0b66c3; text-decoration: none; }

  .btn { background: #0b66c3; color: #fff; padding: 8px 12px; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; border: 0; cursor: pointer; }
  .btn:hover { filter: brightness(0.98); }
  .btn.ghost { background: #f3f4f6; color: #111827; }
  .btn.primary { background: #0b66c3; color: #fff; }

  .hero { display: grid; gap: 16px; }
  @media (min-width: 980px) { .hero { grid-template-columns: 1.7fr 1fr; } }
  .hero-left .cta-row { display: flex; gap: 8px; flex-wrap: wrap; margin: 8px 0 6px; }
  .stats { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 8px; list-style: none; padding: 0; margin: 10px 0 0; }
  @media (min-width: 620px) { .stats { grid-template-columns: repeat(4, minmax(0,1fr)); } }
  .stat { border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 12px; background: #fff; }
  .stat-value { font-size: 20px; font-weight: 800; }
  .stat-label { font-size: 12px; color: #6b7280; }

  .hero-right { display: grid; gap: 10px; justify-items: center; }
  .avatar { width: 124px; height: 124px; border-radius: 999px; background: #f3f4f6; border: 1px solid #e5e7eb; display: grid; place-items: center; font-weight: 800; font-size: 28px; color: #0b66c3; }
  .hero-tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 4px; }
  .hero-tags li { list-style: none; border: 1px solid #e5e7eb; background: #f9fafb; color: #374151; border-radius: 999px; padding: 6px 10px; font-size: 13px; }

  .grid.four { display: grid; gap: 12px; }
  @media (min-width: 800px) { .grid.four { grid-template-columns: repeat(4, minmax(0,1fr)); } }

  .grid.three { display: grid; gap: 12px; }
  @media (min-width: 800px) { .grid.three { grid-template-columns: repeat(3, minmax(0,1fr)); } }

  .value-card .list { margin: 0 0 8px 18px; color: #374151; line-height: 1.65; }
  .article-card p { margin: 0 0 6px; }
  .list { margin: 0 0 8px 18px; color: #374151; line-height: 1.65; }

  .pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  .pill { background: #f9fafb; color: #374151; border: 1px solid #e5e7eb; border-radius: 999px; padding: 6px 10px; font-size: 13px; }

  .contact { display: grid; gap: 12px; grid-template-columns: 1fr; align-items: center; }
  @media (min-width: 800px) { .contact { grid-template-columns: 1fr auto; } }
  .cta-col { display: grid; gap: 8px; }

  .foot { padding-bottom: 24px; text-align: center; }
  @media print { .btn, .avatar { display: none !important; } .card { break-inside: avoid; } }
`;
