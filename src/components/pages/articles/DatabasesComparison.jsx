import React from "react";
import { Link } from "react-router-dom";

/**
 * DatabasesComparison — Architecture Field Guide
 * Cassandra · Redis · MongoDB · Elasticsearch
 * -------------------------------------------------------
 * Design-review ready:
 * - What architecture do they use? (peer-to-peer, primary/replica, etc.)
 * - Distributed strategy (partitioning, coordination, replication)
 * - How WRITES are distributed (routing, commit path)
 * - How READS are distributed (routing, freshness)
 * - Fit & anti-patterns (brief)
 */

export default function DatabasesComparison() {
  React.useEffect(() => {
    document.title = "Cassandra · Redis · MongoDB · Elasticsearch — Architecture Guide";
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
    const text = `DB Architecture — Quick Punch List\n\nCassandra — Peer-to-peer ring; consistent hashing; partition+replicate; coordinator routes; quorum reads/writes.\nRedis (Cluster) — Primary/replica per slot; 16384 hash slots; client or proxy routes by key; fast, eventual to replicas.\nMongoDB — Sharded cluster; mongos routes by shard key; replica sets per shard; configurable read/write concern.\nElasticsearch — Primary shards + replicas; coordinating node scatter/gather; eventual consistency across shards.\n\nRules of thumb:\n• Choose shard key = dominant access pattern; avoid monotonic keys.\n• Plan for hotspots (counters, time-buckets) → add bucketing.\n• For read-after-write, use majority/QUORUM or read primary.\n• Keep one system of record; Redis is acceleration not truth.`;
    try { await navigator.clipboard.writeText(text); alert("✅ Cheatsheet copied to clipboard."); }
    catch { alert("Copy failed. Select text and use Cmd/Ctrl+C."); }
  };

  return (
    <article style={wrap}>
      <style>{styles}</style>

      <header>
        <p className="kicker">Databases</p>
        <h1 className="title">🧱 Cassandra vs Redis vs MongoDB vs Elasticsearch</h1>
        <p className="desc">
          Simple mental models for architecture, distributed strategy, and how reads/writes flow —
          so engineers and leaders can make wise design decisions quickly.
        </p>
        <div className="meta">By Sandeep Kumar Aggarwal · Updated {new Date().toLocaleDateString()}</div>
        <div className="toolbar">
          <a className="btn ghost" href="#writes">Jump to Write Path ↓</a>
        </div>
        <hr className="hr" />
      </header>

      <div className="layout">
        {/* Sticky ToC */}
        <aside className="toc">
          <nav className="card" aria-label="On this page">
            <strong>On this page</strong>
            {[
              ["matrix","Decision Snapshot"],
              ["arch","Architecture at a Glance"],
              ["strategy","Distributed Strategy"],
              ["writes","How WRITES distribute"],
              ["reads","How READS distribute"],
              ["fit","Workloads & Fit"],
              ["antipatterns","Anti-Patterns"],
              ["cheat","Cheat Sheet"],
            ].map(([id,label]) => (
              <a key={id} href={`#${id}`} className={activeId===id? "active":""}>{label}</a>
            ))}
          </nav>
        </aside>

        <div>
          {/* Decision Snapshot */}
          <section id="matrix" className="card">
            <h2 className="h2">✅ Decision Snapshot</h2>
            <div className="grid matrix">
              <Cell head />
              <Cell head>Cassandra</Cell>
              <Cell head>Redis (Cluster)</Cell>
              <Cell head>MongoDB</Cell>
              <Cell head>Elasticsearch</Cell>

              <Cell k>Model</Cell>
              <Cell>Peer-to-peer ring</Cell>
              <Cell>Primary/replica per slot</Cell>
              <Cell>Sharded; replica sets</Cell>
              <Cell>Primary shards + replicas</Cell>

              <Cell k>Partitioning</Cell>
              <Cell>Consistent hashing by partition key</Cell>
              <Cell>16384 hash slots (key → slot)</Cell>
              <Cell>Shard key range/hashed</Cell>
              <Cell>Index shards (docID → shard)</Cell>

              <Cell k>Replication</Cell>
              <Cell>RF per keyspace; hinted handoff/repair</Cell>
              <Cell>Replica per primary; async to replica</Cell>
              <Cell>Replica sets per shard</Cell>
              <Cell>Replicas per primary shard</Cell>

              <Cell k>Consistency</Cell>
              <Cell>Tunable (ONE/QUORUM/ALL)</Cell>
              <Cell>Strong on primary; eventual to replicas</Cell>
              <Cell>Write/Read Concern (local/majority)</Cell>
              <Cell>Primary is source; cluster is eventual</Cell>
            </div>
            <p className="note">Guideline: <strong>Pick shard keys from access patterns</strong>. Avoid hotspots and monotonic keys.</p>
          </section>

          {/* Architecture at a Glance */}
          <section id="arch" className="card">
            <h2 className="h2">🏗 Architecture at a Glance</h2>
            <div className="grid table">
              <Row k="Cluster topology" c="Gossip ring; any node can coordinate" r="Primary per slot; replicas; cluster bus" m="Config servers + mongos routers; shards are replica sets" o="Any node can coordinate; primary shards on data nodes" />
              <Row k="Coordination" c="Gossip + snitches; no single leader" r="Cluster metadata shared; failover elections" m="Config servers store metadata; mongos routes" o="Master-less routing; cluster state; shard allocation" />
              <Row k="Failure handling" c="Quorum tolerance; read/write at QUORUM" r="Replica promotion on primary failure" m="Automatic elections in replica sets" o="Replica promotion; shard relocation" />
              <Row k="Transactions" c="Partition-level batches; no cross-partition ACID" r="Single-key atomic ops; Lua scripts" m="Multi-doc ACID in a replica set; sharded transactions supported with cost" o="Per-doc; updates are versioned; no cross-shard ACID" />
            </div>
          </section>

          {/* Distributed Strategy */}
          <section id="strategy" className="card">
            <h2 className="h2">🌐 Distributed Computing Strategy</h2>
            <div className="grid table">
              <Row k="Data distribution" c="Partition key → token range (ring)" r="Key → slot → primary" m="Shard key → shard; balancer moves chunks" o="Doc ID/hash → primary shard" />
              <Row k="Load balancing" c="Even across token ranges; avoid wide partitions" r="Per-slot primaries; client-side routing" m="mongos routes; secondaries for reads" o="Coordinating node scatter/gather across shards" />
              <Row k="Rebalancing" c="Add nodes → move token ranges" r="Reshard by slot moves / resharding" m="Balancer migrates chunks to even load" o="Shard reallocation; ILM for indices" />
            </div>
          </section>

          {/* How WRITES distribute */}
          <section id="writes" className="card">
            <h2 className="h2">✍️ How WRITES distribute</h2>
            <div className="grid table">
              <Row k="Write target" c="Any node (becomes coordinator)" r="Primary of the slot" m="Primary of the owning shard" o="Primary shard(s) via coordinating node" />
              <Row k="Routing" c="Coordinator hashes partition key → replicas" r="Key → slot → primary; replicas async" m="mongos routes by shard key" o="Router fans to primaries of matching shards" />
              <Row k="Commit path" c="Write to replicas; succeed at chosen consistency (e.g., QUORUM)" r="Sync to primary; replicate async; WAIT for replicas if needed" m="Journal on primary; replicate to secondaries; writeConcern controls ack" o="Index doc on primary; replicate to shard replicas; refresh makes searchable" />
              <Row k="Conflict model" c="Last-write-wins per cell (timestamp)" r="Single-writer per key (primary)" m="Primary serializes; majority resolves" o="Optimistic concurrency with _version" />
              <Row k="Hotspot risks" c="Skewed partition keys → wide partitions" r="Single hot key/slot → primary bottleneck" m="Poor shard key → hot shard" o="Hot term/index or single shard hit" />
            </div>
          </section>

          {/* How READS distribute */}
          <section id="reads" className="card">
            <h2 className="h2">📖 How READS distribute</h2>
            <div className="grid table">
              <Row k="Read target" c="Coordinator reads from replicas (LOCAL_*, QUORUM)" r="Primary by default; replicas via READONLY or replicas API" m="Primary or secondary; readPreference controls" o="Coordinating node queries relevant shards; merges results" />
              <Row k="Freshness" c="Depends on consistency chosen" r="Primary is fresh; replicas eventually" m="majority ensures read-after-write; secondaryPreferred may be stale" o="Search visibility after refresh/commit interval" />
              <Row k="Fan-out" c="Single partition is cheap; cross-partition = scatter/gather" r="Single key lookup; multi-key = multi-target" m="Query targets shards by key/index; can scatter" o="Scatter to shards; aggregate/sort on coordinator" />
              <Row k="Latency shape" c="Stable if partitioned well; tail from QUORUM" r="Ultra-low at memory; network hops minimal" m="Good with indexes; cross-shard joins are costly" o="Great for text/vec; heavy aggregations need resources" />
            </div>
          </section>

          {/* Workloads & Fit */}
          <section id="fit" className="card">
            <h2 className="h2">🎯 Workloads & Fit</h2>
            <ul className="list">
              <li><b>Cassandra:</b> time-series, events, personalization, IoT — write-heavy linear scale.</li>
              <li><b>Redis (Cluster):</b> cache/session/rate limit, queues, leaderboards — microsecond latency.</li>
              <li><b>MongoDB:</b> product/catalog, profiles, CMS, flexible documents — fast iteration.</li>
              <li><b>Elasticsearch:</b> full-text & vector search, logs/metrics, analytics filters.</li>
            </ul>
          </section>

          {/* Anti-Patterns */}
          <section id="antipatterns" className="card">
            <h2 className="h2">⛔ Anti-Patterns</h2>
            <ul className="list">
              <li>Redis as system of record; missing durability semantics.</li>
              <li>MongoDB shard key that doesn't match queries → hot shard & scatter.</li>
              <li>Cassandra wide unbounded partitions; ALLOW FILTERING scans.</li>
              <li>Elasticsearch used as OLTP/transactional store.</li>
              <li>Cross-DB distributed transactions without a saga.</li>
            </ul>
          </section>

          {/* Cheat Sheet */}
          <section id="cheat" className="card">
            <h2 className="h2">📎 Cheat Sheet</h2>
            <ul className="list">
              <li><b>Cassandra:</b> model tables by query; use QUORUM for balance; repair regularly.</li>
              <li><b>Redis:</b> cluster for scale; keep values small; use TTLs; consider WAIT for stronger durability.</li>
              <li><b>MongoDB:</b> choose shard key from top 2 queries; use majority for R-A-W; index selectively.</li>
              <li><b>Elasticsearch:</b> right-size shards (e.g., 20–50GB); tune refresh/replicas; ILM for retention.</li>
            </ul>
            <button className="btn" onClick={copyCheat}>Copy Cheatsheet</button>
          </section>

          <hr className="hr"/>
          <footer className="foot">
            <Link to="/articles" style={{ textDecoration:"none", color:"#0b66c3", fontWeight:600 }}>← Back to Articles</Link>
            <a href="#matrix" className="btn">Back to Top ↑</a>
          </footer>
        </div>
      </div>
    </article>
  );
}

/* Table row helper */
function Row({ k, c, r, m, o }) {
  return (
    <>
      <Cell k>{k}</Cell>
      <Cell>{c}</Cell>
      <Cell>{r}</Cell>
      <Cell>{m}</Cell>
      <Cell>{o}</Cell>
    </>
  );
}
function Cell({ children, head, k }) {
  const cls = head ? "col head" : k ? "col k" : "col";
  return <div className={cls}>{children}</div>;
}

/* Styles */
const styles = `
  .layout { display:grid; grid-template-columns: 1fr; gap:20px; }
  @media(min-width:980px){.layout{grid-template-columns:240px 1fr;}}
  .toc { position:sticky; top:72px; align-self:start; }
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
  .grid.table{display:grid;grid-template-columns:170px repeat(4,minmax(0,1fr));gap:6px}
  .col{padding:8px;border:1px solid #e5e7eb;border-radius:6px}
  .col.k{font-weight:700;background:#f9fafb}
  .col.head{font-weight:800;background:#eef6ff;text-align:center}
  .grid.matrix{display:grid;grid-template-columns:170px repeat(4,minmax(0,1fr));gap:6px}
  .toc nav a{display:block;padding:6px 8px;margin-top:4px;border-radius:6px;text-decoration:none;color:#0b66c3}
  .toc nav a.active{background:#eff6ff;font-weight:700}
  @media print{.toc,.toolbar{display:none}.card{break-inside:avoid}}
`;

const wrap = { maxWidth:1080, margin:"32px auto", padding:"0 16px" };
