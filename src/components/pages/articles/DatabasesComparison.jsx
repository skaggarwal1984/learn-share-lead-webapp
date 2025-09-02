import React from "react";
import { Link } from "react-router-dom";

/**
 * DatabasesComparison — Plain-English Guide
 * Cassandra · Redis · MongoDB · Elasticsearch
 * -------------------------------------------------------
 * Non-engineer friendly:
 * - One-line what it is
 * - Best for / Avoid if
 * - How it grows
 * - How writes/reads work (in simple words)
 */

export default function DatabasesComparison() {
  React.useEffect(() => {
    document.title = "Cassandra · Redis · MongoDB · Elasticsearch — Simple Guide";
  }, []);

  const [activeId, setActiveId] = React.useState("matrix");
  React.useEffect(() => {
    const ids = ["matrix","arch","strategy","writes","reads","fit","antipatterns","cheat"];
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) cur = id;
      }
      setActiveId(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyCheat = async () => {
    const text = `Databases in 12 lines (Plain English)

Cassandra: Many equal machines act as one. Great for nonstop writes and huge scale.
Redis: Super-fast sticky notes (key->value) kept in memory. Best as a cache/accelerator.
MongoDB: Flexible folders of JSON docs. Easy to change fields as you go.
Elasticsearch: A powerful search librarian for text/logs/vectors.

Pick one:
• Need blazing-fast lookups/counters/sessions? → Redis
• Need flexible records that change shape? → MongoDB
• Firehose of events/time-series with massive scale? → Cassandra
• Full-text or log search, “find it fast”? → Elasticsearch

Rules:
• Choose keys from your top queries; avoid always-growing hot keys.
• For read-after-write, use majority/QUORUM/read-primary.
• Redis speeds things up but shouldn’t be your only source of truth.`;
    try { await navigator.clipboard.writeText(text); alert("✅ Cheatsheet copied."); }
    catch { alert("Copy failed. Select text and press Cmd/Ctrl+C."); }
  };

  return (
    <article style={wrap}>
      <style>{styles}</style>

      <header>
        <p className="kicker">Databases</p>
        <h1 className="title">🧱 Cassandra vs Redis vs MongoDB vs Elasticsearch</h1>
        <p className="desc">
          A non-technical guide to what each does, when to use them, and how data moves — in plain English.
        </p>
        <div className="meta">By Sandeep Kumar Aggarwal · Updated {new Date().toLocaleDateString()}</div>
        <div className="toolbar">
          <a className="btn ghost" href="#fit">Skip to “When to Use” ↓</a>
        </div>
        <hr className="hr" />
      </header>

      <div className="layout">
        {/* Sticky ToC */}
        <aside className="toc">
          <nav className="card" aria-label="On this page">
            <strong>On this page</strong>
            {[
              ["arch","What They Are (in one line)"],
              ["strategy","How they coordinate"],
              ["writes","How Writing Data Works"],
              ["reads","How Reading Data Works"],
              ["fit","When to Use"],
            ].map(([id,label]) => (
              <a key={id} href={`#${id}`} className={activeId===id? "active":""}>{label}</a>
            ))}
          </nav>
        </aside>

        <div>
         

{/* What They Are */}
<section id="arch" className="card">
  <h2 className="h2">🏗 What They Are (in one line)</h2>
  <ul className="list">
    <li><b>Cassandra:</b> A distributed NoSQL database with a masterless, peer-to-peer architecture that runs across many machines.</li>
    <li><b>Redis:</b> An in-memory data structure store used as a database, cache, and message broker.</li>
    <li><b>MongoDB:</b> A document database built for scalability and flexibility with rich querying and indexing.</li>
    <li><b>Elasticsearch:</b> An open-source, distributed search and analytics engine built for speed, scale, and AI applications.</li>
  </ul>
</section>


{/* How They Grow */}
<section id="strategy" className="card">
  <h2 className="h2">🌐 How They Coordinate</h2>
  <ul className="list">
    <li>
      <b>Cassandra (any node can be the coordinator):</b> the node that receives a request
      looks up the partition’s replicas from its ring/token map, forwards the write/read to
      those replicas, and waits for the chosen consistency level before replying. As you add
      nodes and token ranges are reassigned, the coordinator’s view (via gossip/cluster state)
      updates and it automatically routes to the new replica owners.
    </li>
    <li>
      <b>Redis (Cluster) (client acts as coordinator):</b> the Redis-Cluster–aware client
      hashes the key to one of 16,384 slots and sends the command directly to the node that
      owns that slot. During resharding, servers return MOVED/ASK redirects so the client
      refreshes its slot→node map and routes to the new primary.
    </li>
    <li>
      <b>MongoDB (mongos is the coordinator/router):</b> applications talk to <code>mongos</code>,
      which caches metadata from config servers and routes each request to the right shard(s);
      when chunks move or shards are added, <code>mongos</code> refreshes metadata and keeps
      routing correctly.
    </li>
    <li>
      <b>Elasticsearch (the receiving node coordinates):</b> the node that gets the request
      becomes the coordinating node—on search it “scatters” to relevant shards and then
      “gathers”/merges results; on indexing it routes to the index’s primary shard. As the
      cluster scales and shards relocate, the coordinator uses the cluster state to route to
      the current shard holders.
    </li>
  </ul>
</section>


          {/* How Writing Data Works */}
          <section id="writes" className="card">
            <h2 className="h2">✍️ How Writing Data Works</h2>
            <ul className="list">
              <li><b>Cassandra:</b> You can write to any machine. It shares the write with a few others for safety. You can choose “save fast” or “save safer.”</li>
              <li><b>Redis:</b> You write to the primary for that bucket. Copies to backups happen shortly after.</li>
              <li><b>MongoDB:</b> A router sends your write to the primary of the right shard. You can ask it to wait until copies are done.</li>
              <li><b>Elasticsearch:</b> Your document goes to the right shard, then gets copied. It becomes searchable a moment later.</li>
            </ul>
          </section>

          {/* How Reading Data Works */}
          <section id="reads" className="card">
            <h2 className="h2">📖 How Reading Data Works</h2>
            <ul className="list">
              <li><b>Cassandra:</b> Reads can come from several copies. You can choose faster vs. more up-to-date.</li>
              <li><b>Redis:</b> Reads are usually from the primary (fastest path). You can read from copies if you accept slight delay.</li>
              <li><b>MongoDB:</b> You can read from the primary (freshest) or secondaries (may be a tiny bit behind).</li>
              <li><b>Elasticsearch:</b> A coordinator asks each shard, then combines the answers for you.</li>
            </ul>
          </section>

          {/* When to Use */}
          <section id="fit" className="card">
            <h2 className="h2">🎯 When to Use</h2>
            <div className="grid2">
              <QuickPick
                title="Choose Cassandra if you need…"
                items={[
                  "Constant stream of data (events, time-series)",
                  "Huge scale with predictable speed",
                  "Write-heavy systems that keep growing",
                ]}
              />
              <QuickPick
                title="Choose Redis if you need…"
                items={[
                  "Blazing speed (microseconds)",
                  "Caching, sessions, rate limiting, counters",
                  "Temporary, hot data close to your app",
                ]}
              />
              <QuickPick
                title="Choose MongoDB if you need…"
                items={[
                  "Flexible records (fields may differ)",
                  "Fast product changes without heavy migrations",
                  "Good general-purpose app database",
                ]}
              />
              <QuickPick
                title="Choose Elasticsearch if you need…"
                items={[
                  "Full-text search (“find this phrase/word”)",
                  "Search over logs/metrics at scale",
                  "Vector search (“find similar items”)",
                ]}
              />
            </div>
          </section>

          {/* Avoid These */}
          <section id="antipatterns" className="card">
            <h2 className="h2">⛔ Avoid These</h2>
            <ul className="list">
              <li><b>Redis</b> as your main system of record (it’s a speed booster, not a ledger).</li>
              <li><b>MongoDB</b> with a shard key your queries don’t use (you’ll end up searching everywhere).</li>
              <li><b>Cassandra</b> with “one giant key” that collects endless data (it creates a traffic jam).</li>
              <li><b>Elasticsearch</b> as a transactional app database (it’s built for search, not banking-style updates).</li>
              </ul>
          </section>


          <hr className="hr"/>
          <footer className="foot">
            <Link to="/articles" style={{ textDecoration:"none", color:"#0b66c3", fontWeight:600 }}>← Back to Articles</Link>
          </footer>
        </div>
      </div>
    </article>
  );
}

/* Small building blocks */
function DBCard({ name, oneLine, best = [], avoid = [] }) {
  return (
    <div className="dbcard">
      <div className="dbcard-title">{name}</div>
      <p className="dbcard-oneline">{oneLine}</p>
      <div className="dbcard-cols">
        <div>
          <div className="h3">Best for</div>
          <ul className="list">
            {best.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
        <div>
          <div className="h3">Avoid if</div>
          <ul className="list">
            {avoid.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function QuickPick({ title, items = [] }) {
  return (
    <div className="qp">
      <div className="h3">{title}</div>
      <ul className="list">
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  );
}

/* Styles */
const styles = `
  .layout { display:grid; grid-template-columns: 1fr; gap:20px; }
  @media(min-width:980px){.layout{grid-template-columns:240px 1fr;}}
  .toc { top:72px; align-self:start; }
  .card { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:16px; }
  .kicker{ text-transform:uppercase; letter-spacing:.08em; font-weight:700; color:#6b7280; font-size:12px; margin:0 }
  .title{font-size:34px;font-weight:800;line-height:1.15;margin:6px 0 8px}
  .desc{color:#374151;margin:0 0 8px}
  .meta{color:#6b7280;font-size:13px;margin-bottom:8px}
  .toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .btn{background:#0b66c3;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;cursor:pointer;text-decoration:none;border:0}
  .btn.ghost{background:#f3f4f6;color:#111}
  .hr{height:1px;background:#e5e7eb;border:0;margin:16px 0}
  .h2{font-size:22px;font-weight:800;margin:0 0 8px}
  .h3{font-size:16px;font-weight:700;margin:8px 0 6px}
  .list{margin:0 0 8px 18px;color:#374151;line-height:1.65}
  .note{background:#f8fafc;border:1px solid #e5e7eb;padding:8px 10px;border-radius:8px;color:#374151}

  .cards{display:grid;gap:12px}
  @media(min-width:760px){.cards{grid-template-columns:repeat(2,minmax(0,1fr));}}
  @media(min-width:1100px){.cards{grid-template-columns:repeat(2,minmax(0,1fr));}}

  .dbcard{border:1px solid #e5e7eb;border-radius:10px;padding:12px}
  .dbcard-title{font-weight:800;margin-bottom:4px}
  .dbcard-oneline{color:#374151;margin:0 0 8px}
  .dbcard-cols{display:grid;gap:8px}
  @media(min-width:640px){.dbcard-cols{grid-template-columns:1fr 1fr;gap:12px}}

  .grid2{display:grid;gap:12px}
  @media(min-width:760px){.grid2{grid-template-columns:repeat(2,minmax(0,1fr));}}

  .toc nav a{display:block;padding:6px 8px;margin-top:4px;border-radius:6px;text-decoration:none;color:#0b66c3}
  .toc nav a.active{background:#eff6ff;font-weight:700}
  @media print{.toc,.toolbar{display:none}.card{break-inside:avoid}}
`;

const wrap = { maxWidth:1080, margin:"32px auto", padding:"0 16px" };
