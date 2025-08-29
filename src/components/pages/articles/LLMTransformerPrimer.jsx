import React from "react";
import { Link } from "react-router-dom";

/**
 * LLMTransformerPrimer — The Transformer / LLM Architecture Primer
 * ----------------------------------------------------------------
 * - Dependency-free React (responsive + print-ready)
 * - Sticky ToC, copyable cheat sheet, downloadable .md
 * - Clear pipeline diagram + Q/K/V formulas
 * - Interactive causal-mask visual (decoder attention)
 * - Designed for engineers to *remember* the essentials
 */

export default function LLMTransformerPrimer() {
  React.useEffect(() => {
    document.title = "Transformer Architecture — The LLM Primer | Sandeep Aggarwal";
  }, []);

  const [activeId, setActiveId] = React.useState("breakthrough");
  React.useEffect(() => {
    const ids = [
      "breakthrough","after","table","pipeline","attention","positional",
      "stacks","training","tokenization","decoding","scaling","mask","ritual","glossary"
    ];
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) cur = id;
      }
      setActiveId(cur);
      // store last section for convenience (browser only)
      try { localStorage.setItem("llmprimer:lastId", cur); } catch {}
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyCheat = async () => {
    const text = `Transformer/LLM Cheat Sheet

Core idea: Self-Attention
Attention(Q,K,V) = softmax((QK^T)/sqrt(d_k)) · V

Q/K/V origin: Q=W_q x, K=W_k x, V=W_v x
Multi-Head: run attention in parallel heads; concat; project.

Causal Mask (decoder): position i attends only to j ≤ i.

Pipeline:
Tokens → Embeddings(+Positional) → [Self-Attn + FFN + Residual + LayerNorm] × N → Linear → Softmax → Next token

Encoder-only (BERT): bidirectional; masked LM. Decoder-only (GPT): causal; next-token. Encoder-Decoder (T5): text→text.

Training: pretrain (self-supervised) → task adapt (SFT/LoRA) → align (RLHF).
Decoding: greedy, beam, top-k, nucleus(p). Temperature ↑ = more creative.

Rules of thumb:
- Context drives capability; attention is O(n^2).
- Good prompts = better conditioning; RAG for freshness.
- Track p95 latency, tokens/s, VRAM, prompt+response tokens (cost).`;
    try { await navigator.clipboard.writeText(text); alert("✅ Cheat sheet copied."); }
    catch { alert("Copy failed. Select text and Cmd/Ctrl+C."); }
  };

  const downloadMarkdown = () => {
    const md = `# Transformer Architecture — The LLM Primer

Key formula: Attention(Q,K,V) = softmax((QK^T)/sqrt(d_k)) · V
Pipeline: Tokens → Embeddings(+Pos) → [Self-Attn + FFN + Res + LN]^N → Linear → Softmax → Next token
Stacks: BERT (encoder), GPT (decoder), T5 (encoder-decoder)
Training: Pretrain → SFT/LoRA → RLHF
Decoding: greedy, beam, top-k, nucleus(p), temperature
`;
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "transformer-llm-primer.md"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <article style={wrap}>
      <style>{styles}</style>

      <header>
        <p className="kicker">LLMs</p>
        <h1 className="title">⚡ Transformer Architecture: The LLM Primer</h1>
        <p className="desc">
          A practical, engineering-first guide to how Transformers work—so you can design, reason, and ship with confidence.
        </p>
        <div className="meta">By Sandeep Kumar Aggarwal · Updated {new Date().toLocaleDateString()}</div>
        <div className="toolbar">
          <button className="btn" onClick={copyCheat}>Copy Cheat Sheet</button>
          <button className="btn ghost" onClick={downloadMarkdown}>Download .md</button>
          <a className="btn ghost" href="#mask">Try Causal Mask ↓</a>
        </div>
        <hr className="hr" />
      </header>

      <div className="layout">
        {/* Sticky ToC */}
        <aside className="toc">
          <nav className="card" aria-label="On this page">
            <strong>On this page</strong>
            {[
              ["breakthrough","The Breakthrough"],
              ["after","What Transformers Enabled"],
              ["table","Before vs After"],
              ["pipeline","Core Pipeline"],
              ["attention","Self-Attention (Q/K/V)"],
              ["positional","Positional Encoding"],
              ["stacks","Model Stacks"],
              ["training","Training & Alignment"],
              ["tokenization","Tokenization & Context"],
              ["decoding","Decoding Strategies"],
              ["scaling","Scaling & Limits"],
              ["mask","Hands-on: Causal Mask"],
              ["ritual","Weekly Learning Ritual"],
              ["glossary","Glossary"],
            ].map(([id,label]) => (
              <a key={id} href={`#${id}`} className={activeId===id? "active":""}>{label}</a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div>
          <section id="breakthrough" className="card">
            <h2 className="h2">⚡ The Breakthrough: Transformer (2017)</h2>
            <p className="lead">
              “Attention Is All You Need” replaced recurrence with <b>self-attention</b>—unlocking full-sequence context,
              <b> parallel training</b>, and <b> massive scalability</b>.
            </p>
            <ul className="list">
              <li>Full context across sequences (no left-to-right memory loss).</li>
              <li>Parallelism on GPUs/TPUs (no recurrent dependency chain).</li>
              <li>Scales to 100B+ parameters without collapsing.</li>
            </ul>
          </section>

          <section id="after" className="card">
            <h2 className="h2">🟢 After: What Transformers Enabled</h2>
            <ul className="list">
              <li><b>Parallelization:</b> whole paragraphs processed at once; faster training.</li>
              <li><b>Global Context:</b> relate distant tokens across documents, codebases, conversations.</li>
              <li><b>Scalability:</b> deeper, wider models (GPT-3/4, Gemini, Claude).</li>
              <li><b>Generalization:</b> one architecture for language, code, vision (ViT), and multimodal.</li>
            </ul>
          </section>

          <section id="table" className="card">
            <h2 className="h2">🔁 Before vs. After</h2>
            <div className="grid table">
              <Cell head />
              <Cell head>Pre-Transformer (RNN/LSTM)</Cell>
              <Cell head>Transformer-Based (GPT/BERT)</Cell>
              <Cell k>Input context</Cell><Cell>Limited (short memory)</Cell><Cell>Full sequence, all tokens</Cell>
              <Cell k>Training speed</Cell><Cell>Sequential, slow</Cell><Cell>Parallel, fast</Cell>
              <Cell k>Long-range reasoning</Cell><Cell>Poor</Cell><Cell>Excellent</Cell>
              <Cell k>Scalability</Cell><Cell>Limited</Cell><Cell>Massive (100B+)</Cell>
              <Cell k>Code/logic</Cell><Cell>Weak</Cell><Cell>Strong</Cell>
              <Cell k>Use cases</Cell><Cell>Simple NLP</Cell><Cell>ChatGPT, Copilot, Claude, Gemini</Cell>
            </div>
          </section>

          <section id="pipeline" className="card">
            <h2 className="h2">🧭 Core Pipeline</h2>
            <pre className="diagram">{`[Input Token Embeddings]
        ↓
[Layer 1: Self-Attention → Feedforward]
        ↓
[Layer 2: Self-Attention → Feedforward]
        ↓
     ...
        ↓
[Final Layer Output]
        ↓
   [Linear → Softmax]
        ↓
[Next Token Prediction]`}</pre>
            <div className="note">
              <strong>Layer depth → capability:</strong> 1–2 syntax; 3–6 phrase structure; 7–12 semantics; 13–48+ multi-sentence reasoning, code, abstraction.
            </div>
          </section>

          <section id="attention" className="card">
            <h2 className="h2">🎯 Self-Attention: the core mechanic</h2>
            <p className="lead">Each token creates a <b>Query</b> (what I’m looking for), a <b>Key</b> (how others may match), and a <b>Value</b> (what I’ll pass along).</p>
            <div className="note">
              <span className="code">Q = W_q · x</span> · <span className="code">K = W_k · x</span> · <span className="code">V = W_v · x</span><br/>
              <span className="code">Attention(Q,K,V) = softmax( (QKᵀ) / √d_k ) · V</span>
            </div>
            <ul className="list">
              <li><b>Multi-Head:</b> run several attentions in parallel → capture different relations; concat + project.</li>
              <li><b>Residual + LayerNorm:</b> stabilize updates and preserve signal.</li>
              <li><b>Feed-Forward (MLP):</b> expand (e.g., 4×) then contract channels to enrich features (often GELU).</li>
              <li><b>Causal Mask vs Bidirectional:</b> GPT uses causal (no peeking forward). BERT attends bidirectionally.</li>
            </ul>
          </section>

          <section id="positional" className="card">
            <h2 className="h2">🧭 Positional Encoding</h2>
            <p className="lead">Attention is permutation-invariant; positions give order.</p>
            <ul className="list">
              <li><b>Sinusoidal:</b> fixed <span className="code">PE(pos,2i)=sin(pos/10000^(2i/d))</span>, <span className="code">PE(pos,2i+1)=cos(pos/10000^(2i/d))</span></li>
              <li><b>Learned:</b> trainable position embeddings (common).</li>
              <li><b>Relative/RoPE:</b> encode relative offsets; helps long-context generalization.</li>
            </ul>
          </section>

          <section id="stacks" className="card">
            <h2 className="h2">🏗 Model Stacks</h2>
            <ul className="list">
              <li><b>Encoder-only:</b> BERT, DistilBERT — bidirectional; great for classify/search/encode.</li>
              <li><b>Decoder-only:</b> GPT family — causal; next-token generation.</li>
              <li><b>Encoder-Decoder:</b> T5/FLAN — text-to-text; powerful for translation, summarization.</li>
            </ul>
          </section>

          <section id="training" className="card">
            <h2 className="h2">🏋️ Training & Alignment</h2>
            <ul className="list">
              <li><b>Pretraining:</b> self-supervised (next-token for GPT; masked-LM for BERT).</li>
              <li><b>Supervised Finetuning (SFT):</b> task instructions + examples.</li>
              <li><b>Parameter-Efficient Finetuning:</b> LoRA/adapters/QLoRA to save memory + keep base frozen.</li>
              <li><b>RLHF / DPO:</b> align outputs to human preference/safety.</li>
              <li><b>RAG:</b> retrieve facts into the prompt for freshness & truthfulness.</li>
            </ul>
          </section>

          <section id="tokenization" className="card">
            <h2 className="h2">🔤 Tokenization & Context</h2>
            <ul className="list">
              <li><b>Subword units:</b> BPE/WordPiece reduce OOV; code often tokenizes differently.</li>
              <li><b>Context window:</b> attention is <span className="code">O(n²)</span>; long prompts are costly.</li>
              <li><b>Prompt budgeting:</b> track prompt+response tokens (latency/cost), chunk long docs, use RAG.</li>
            </ul>
          </section>

          <section id="decoding" className="card">
            <h2 className="h2">🧪 Decoding Strategies</h2>
            <ul className="list">
              <li><b>Greedy:</b> pick argmax each step (deterministic, can be dull).</li>
              <li><b>Beam:</b> keep top-k sequences; good for structured tasks.</li>
              <li><b>Top-k / Nucleus (p):</b> sample from top-k or smallest mass ≥ p; balances quality/variety.</li>
              <li><b>Temperature:</b> scales logits; ↑ creative, ↓ precise.</li>
            </ul>
          </section>

          <section id="scaling" className="card">
            <h2 className="h2">📈 Scaling & Limits</h2>
            <ul className="list">
              <li><b>Scaling laws:</b> more data/params/compute → predictable loss curves (until data/optimization limits).</li>
              <li><b>Bottlenecks:</b> attention <span className="code">O(n²)</span>, KV cache memory, I/O throughput.</li>
              <li><b>Optimizations:</b> FlashAttention, KV-cache reuse, quantization, batching.</li>
            </ul>
          </section>

          <section id="mask" className="card">
            <h2 className="h2">🧩 Hands-on: Causal Mask (decoder attention)</h2>
            <p className="lead">In a decoder, token <span className="code">i</span> can only attend to positions <span className="code">≤ i</span>. Try it:</p>
            <CausalMaskDemo />
            <div className="note" style={{ marginTop: 10 }}>
              <b>Why it matters:</b> prevents “peeking” at future tokens during training; enforces left-to-right generation.
            </div>
          </section>

          <section id="ritual" className="card">
            <h2 className="h2">📅 Weekly Learning Ritual (15 minutes)</h2>
            <ol className="list">
              <li>Review the cheat sheet (Q/K/V, pipeline, stacks).</li>
              <li>Explain attention to a teammate in 2 minutes.</li>
              <li>Skim a paper summary (e.g., positional encodings/RAG/LoRA).</li>
              <li>Build or tweak a prompt and note output changes.</li>
            </ol>
          </section>

          <section id="glossary" className="card">
            <h2 className="h2">🗂 Glossary</h2>
            <dl className="dl">
              <dt>Self-Attention</dt><dd>Each token attends to others based on learned similarity.</dd>
              <dt>Heads</dt><dd>Independent attention subspaces; concatenated then projected.</dd>
              <dt>Residual</dt><dd>Skip connection adding input to output; stabilizes deep nets.</dd>
              <dt>LayerNorm</dt><dd>Normalizes features per token; stabilizes training.</dd>
              <dt>FFN</dt><dd>Position-wise MLP (e.g., d → 4d → d) with GELU/ReLU.</dd>
              <dt>Causal Mask</dt><dd>Lower-triangular mask that blocks future tokens.</dd>
              <dt>RAG</dt><dd>Retrieve docs and feed into the prompt; boosts freshness.</dd>
            </dl>
            <div className="toolbar">
              <button className="btn" onClick={copyCheat}>Copy Cheat Sheet</button>
              <Link to="/articles" className="btn ghost">← Back to Articles</Link>
            </div>
          </section>

          <hr className="hr" />
          <footer className="foot">
            <Link to="/articles" style={{ textDecoration:"none", color:"#0b66c3", fontWeight:600 }}>← Back to Articles</Link>
            <a href="#breakthrough" className="btn">Back to Top ↑</a>
          </footer>
        </div>
      </div>
    </article>
  );
}

/* ---------- Small interactive causal mask demo ---------- */
function CausalMaskDemo() {
  const [n, setN] = React.useState(6); // sequence length
  const cells = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      const allowed = j <= i; // decoder rule
      row.push(
        <div
          key={`${i}-${j}`}
          className="mask-cell"
          title={`Query ${i} → Key ${j} ${allowed ? "(allowed)" : "(masked)"}`}
          style={{
            background: allowed ? "#e6ffed" : "#ffe8e8",
            borderColor: allowed ? "#a7f3d0" : "#fecaca",
          }}
        >
          {allowed ? "✓" : "×"}
        </div>
      );
    }
    cells.push(<div key={`r-${i}`} className="mask-row">{row}</div>);
  }
  return (
    <div>
      <div className="mask-ctrl">
        <label>Sequence length:&nbsp;</label>
        <input
          type="number"
          min={3}
          max={12}
          value={n}
          onChange={(e) => setN(Math.max(3, Math.min(12, parseInt(e.target.value || "0", 10))))}
          className="mask-input"
        />
        <span className="mask-hint">Decoder can only look left (lower-triangle).</span>
      </div>
      <div className="mask-grid" style={{ gridTemplateColumns: `repeat(${n}, 28px)` }}>
        {cells}
      </div>
      <div className="mask-legend">
        <span className="leg allowed" /> allowed &nbsp;&nbsp;
        <span className="leg blocked" /> masked
      </div>
    </div>
  );
}

/* ---------- Small table helpers ---------- */
function Cell({ children, head, k }) {
  const cls = head ? "col head" : k ? "col k" : "col";
  return <div className={cls}>{children}</div>;
}

/* ---------- Styles (scoped) ---------- */
const styles = `
  .layout{display:grid;grid-template-columns:1fr;gap:20px}
  @media(min-width:980px){.layout{grid-template-columns:240px 1fr}}
  .toc{position:sticky;top:72px;align-self:start}
  .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px}
  .kicker{text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:#6b7280;font-size:12px;margin:0}
  .title{font-size:34px;margin:6px 0 8px;font-weight:800;line-height:1.15}
  .desc{color:#374151;margin:0 0 8px}
  .meta{color:#6b7280;font-size:13px;margin:4px 0 10px}
  .toolbar{display:flex;gap:8px;flex-wrap:wrap}
  .btn{background:#0b66c3;color:#fff;padding:8px 12px;border-radius:8px;font-weight:600;cursor:pointer;text-decoration:none;border:0}
  .btn.ghost{background:#f3f4f6;color:#111827}
  .hr{border:0;height:1px;background:#e5e7eb;margin:16px 0}
  .h2{font-size:22px;margin:0 0 8px;font-weight:800}
  .lead{color:#4b5563;margin-bottom:8px}
  .list{margin:0 0 8px 18px;color:#374151;line-height:1.65}
  .dl dt{font-weight:700;margin-top:8px}
  .dl dd{margin:4px 0 8px;color:#374151;line-height:1.65}
  .note{color:#374151;background:#f8fafc;border:1px solid #e5e7eb;padding:8px 10px;border-radius:8px}
  .code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:#f8fafc;padding:2px 6px;border:1px solid #e5e7eb;border-radius:6px}
  .diagram{background:#0f172a;color:#e2e8f0;padding:12px;border-radius:8px;overflow:auto}
  .grid.table{display:grid;grid-template-columns:170px repeat(2,minmax(0,1fr));gap:6px}
  .col{padding:8px;border:1px solid #e5e7eb;border-radius:6px}
  .col.k{font-weight:700;background:#f9fafb}
  .col.head{font-weight:800;background:#eef6ff;text-align:center}
  .toc nav a{display:block;padding:6px 8px;margin-top:4px;border-radius:6px;text-decoration:none;color:#0b66c3}
  .toc nav a.active{background:#eff6ff;font-weight:700}

  /* Causal mask demo */
  .mask-ctrl{display:flex;align-items:center;gap:8px;margin-bottom:8px}
  .mask-input{width:64px;padding:6px 8px;border-radius:8px;border:1px solid #e5e7eb}
  .mask-hint{color:#6b7280;font-size:12px}
  .mask-grid{display:grid;gap:4px}
  .mask-row{display:contents}
  .mask-cell{width:28px;height:28px;border:1px solid;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:12px}
  .mask-legend{margin-top:8px;color:#4b5563}
  .leg{display:inline-block;width:14px;height:14px;border-radius:3px;border:1px solid #d1fae5;vertical-align:middle;margin-right:6px}
  .leg.allowed{background:#e6ffed;border-color:#a7f3d0}
  .leg.blocked{background:#ffe8e8;border-color:#fecaca}

  @media print{.toc,.toolbar{display:none}.card{break-inside:avoid}}
`;

const wrap = { maxWidth: 1080, margin: "32px auto", padding: "0 16px" };
