import React from "react";
import { Link } from "react-router-dom";

export default function ArticlesIndex() {
  React.useEffect(() => { document.title = "Articles | Sandeep Aggarwal"; }, []);

  return (
    <div style={wrap}>
      <h1 style={h1}>Articles</h1>
      <p style={lead}>
        Deep dives on engineering & leadership
      </p>

      <div style={grid}>

   {/* Dictionary  */}
        <article style={card}>
          <h2 style={h2}>
            <Link to="/articles/engineering-dictionary" style={a}>
              📘 Engineering & Leadership Dictionary
            </Link>
          </h2>
          <p style={muted}>
            A practical, searchable reference across strategy, delivery, people, architecture, finance, risk, customers, and collaboration.
          </p>
          <div style={meta}>
            ~12 min read · Updated {new Date().toLocaleDateString()}
          </div>
          <Link to="/articles/engineering-dictionary" style={btn}>
            Read →
          </Link>
        </article>

        {/* NEW: Leadership Frameworks */}
        <article style={card}>
          <h2 style={h2}>
            <Link to="/articles/leadership-frameworks" style={a}>
              🧭 Leadership Frameworks for Engineering Leaders
            </Link>
          </h2>
          <p style={muted}>
            The ultimate guide to decision systems, mental models, and cultural principles used by top engineering leaders worldwide.
          </p>
          <div style={meta}>
            ~15 min read · Updated {new Date().toLocaleDateString()}
          </div>
          <Link to="/articles/leadership-frameworks" style={btn}>
            Read →
          </Link>
        </article>

        {/* Key Terms */}
        <article style={card}>
          <h2 style={h2}>
            <Link to="/articles/key-terms-modern-engineering" style={a}>
              🔑 Key Engineering Terms
            </Link>
          </h2>
          <p style={muted}>
            The always-on KPI guide (Delivery, Quality, scaling, deployment strategies, rituals)
          </p>
          <div style={meta}>
            ~8 min read · Updated {new Date().toLocaleDateString()}
          </div>
          <Link to="/articles/key-terms-modern-engineering" style={btn}>
            Read →
          </Link>
        </article>

        {/* Databases  */}
        <article style={card}>
          <h2 style={h2}>
            <Link to="/articles/databases-comparison" style={a}>
              🧱 Cassandra vs Redis vs MongoDB vs OpenSearch
            </Link>
          </h2>
          <p style={muted}>
            Architecture & read behavior tables, decision matrix, anti-patterns, capacity math, and an ops runbook you can use day-to-day.
          </p>
          <div style={meta}>
            ~10 min read · Updated {new Date().toLocaleDateString()}
          </div>
          <Link to="/articles/databases-comparison" style={btn}>
            Read →
          </Link>
        </article>

        {/* Transformers */}
        <article style={card}>
          <h2 style={h2}>
            <Link to="/articles/transformers-primer" style={a}>
              🤖 Transformer Architecture: The LLM Primer
            </Link>
          </h2>
          <p style={muted}>
            A first-principles tour of self-attention, Q/K/V, model stacks, decoding, and scaling—with an interactive causal mask.
          </p>
          <div style={meta}>
            ~9 min read · Updated {new Date().toLocaleDateString()}
          </div>
          <Link to="/articles/transformers-primer" style={btn}>
            Read →
          </Link>
        </article>

     
      </div>
    </div>
  );
}

/* minimal inline styles */
const wrap = { maxWidth: 880, margin: "32px auto", padding: "0 16px" };
const h1 = { fontSize: 32, margin: "0 0 8px", fontWeight: 800 };
const h2 = { fontSize: 22, margin: "0 0 8px", fontWeight: 700 };
const lead = { color: "#6b7280", marginBottom: 24 };
const grid = { display: "grid", gap: 16 };
const card = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
};
const a = { color: "#0b66c3", textDecoration: "none" };
const btn = {
  display: "inline-block",
  marginTop: 8,
  padding: "8px 12px",
  borderRadius: 8,
  background: "#0b66c3",
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
};
const meta = { color: "#6b7280", fontSize: 13, marginTop: 6 };
const muted = { color: "#374151" };
