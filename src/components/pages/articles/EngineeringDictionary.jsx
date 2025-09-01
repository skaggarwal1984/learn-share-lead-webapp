import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

/**
 * Engineering & Leadership Dictionary — COMPLETE
 * - Searchable reference
 * - Sticky ToC
 * - Print-friendly
 */

export default function EngineeringDictionary() {
  React.useEffect(() => {
    document.title = "Engineering & Leadership Dictionary | Sandeep Aggarwal";
  }, []);

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    const out = {};
    for (const [cat, terms] of Object.entries(data)) {
      const hits = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q)
      );
      if (hits.length) out[cat] = hits;
    }
    return out;
  }, [search]);

  return (
    <article style={wrap}>
      <style>{styles}</style>

      <header>
        <p className="kicker">Dictionary</p>
        <h1 className="title">📘 Engineering & Leadership Dictionary</h1>
        <p className="desc">
          A practical reference for engineers and leaders. From <b>Vision</b> to <b>SRE</b>, from <b>Latency</b> to <b>Customer Success</b>—key concepts explained in one place.
        </p>
        <div className="meta">By Sandeep Kumar Aggarwal · Updated {new Date().toLocaleDateString()}</div>
        <input
          className="search"
          placeholder="🔍 Search dictionary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search dictionary"
        />
        <hr className="hr" />
      </header>

      <div className="layout">
        {/* TOC */}
        <aside className="toc">
          <nav className="card" aria-label="Categories">
            <strong>Categories</strong>
            {Object.keys(data).map((cat) => (
              <a key={cat} href={`#${cat}`} className="toc-link">
                {cat}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div>
          {Object.entries(filtered).map(([cat, terms]) => (
            <section key={cat} id={cat} className="card">
              <h2 className="h2">{cat}</h2>
              <dl className="dl">
                {terms.map((t) => (
                  <React.Fragment key={t.term}>
                    <dt>{t.term}</dt>
                    <dd>{t.desc}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>

      <hr className="hr" />
      <footer className="foot">
        <Link to="/articles" style={{ textDecoration: "none", color: "#0b66c3", fontWeight: 600 }}>
          ← Back to Articles
        </Link>
      </footer>
    </article>
  );
}

/* -------------------------- DATA: A–H (complete) -------------------------- */
const data = {
  "Category A. Strategic & Executive": [
    { term: "Vision", desc: "Long-term aspiration — where we want to go in the future." },
    { term: "Mission", desc: "Our purpose right now — what we do today." },
    { term: "Strategy", desc: "The plan that connects today’s mission to tomorrow’s vision." },
    { term: "North Star", desc: "The single most important quantitative measure that shows if we’re on track toward our vision." },
    { term: "OKRs (Objectives & Key Results)", desc: "Goal-setting method where Objectives state the goal and Key Results measure success." },
    { term: "Business Value", desc: "Measurable benefit delivered to the organization from an initiative." },
    { term: "ROI (Return on Investment)", desc: "Financial benefits gained relative to cost invested." },
    { term: "Net Margin", desc: "Percentage of revenue left after subtracting all expenses." },
    { term: "TCO (Total Cost of Ownership)", desc: "Complete lifecycle cost of a system, including build, operate, and retire." },
    { term: "Value Stream", desc: "End-to-end flow of delivering value from idea to customer." },
    { term: "Business Case", desc: "Justifies costs, benefits, and risks of an initiative." },
    { term: "Go-to-Market (GTM)", desc: "Strategy for launching and scaling solutions in market." },
    { term: "Product-Market Fit (PMF)", desc: "When a product satisfies strong market demand." },
    { term: "Competitive Advantage", desc: "Unique capability that differentiates an organization." },
    { term: "Market Differentiation", desc: "How offerings stand apart from competitors." },
    { term: "Digital Transformation", desc: "Technology-driven fundamental change in operations and customer experience." },
    { term: "Innovation Pipeline", desc: "Portfolio of emerging tech and experimental initiatives." },
    { term: "Build vs Buy vs Partner", desc: "Decision framework for acquiring capabilities via build, purchase, or partnership." },
    { term: "Strategic Partnerships", desc: "Alliances that accelerate delivery and reach." },
    { term: "Run vs Change the Business (RTB vs CTB)", desc: "Balance between maintaining operations (RTB) and innovating (CTB)." },
    { term: "Unit Economics", desc: "Profitability per customer or unit." },
    { term: "Strategic Roadmap", desc: "Long-term plan of major initiatives tied to strategy." },
    { term: "Technology Strategy", desc: "High-level approach for technology adoption and evolution." },
    { term: "Market Positioning", desc: "How capabilities support the organization’s competitive stance." },
    { term: "Technology Radar", desc: "Assessment of emerging technologies to adopt, trial, or hold." },
    { term: "SWOT Analysis", desc: "Framework for strengths, weaknesses, opportunities, and threats." },
    { term: "Transformation", desc: "Enterprise-wide initiative to modernize and scale." },
    { term: "Mission-Critical", desc: "Capabilities or systems that are must-have for success." },
    { term: "AOP (Annual Operating Plan)", desc: "Next-year plan covering budget, headcount, and initiatives." },
    { term: "Strategic Execution", desc: "Translating strategy into coordinated, measurable delivery." },
    { term: "Enterprise Modernisation", desc: "Modernize to evolving customer and business needs." }
  ],

  "Category B. Execution & Delivery": [
    { term: "Agility", desc: "Ability to adapt and deliver quickly in response to change." },
    { term: "Velocity", desc: "Speed at which teams deliver work in a set timeframe." },
    { term: "Throughput", desc: "Amount of work completed per unit of time." },
    { term: "Cycle Time", desc: "Time from starting work to delivering it in production." },
    { term: "Time-to-Market (TTM)", desc: "Duration from idea to customer availability." },
    { term: "Operational Rigour", desc: "Continuous improvement of performance, reliability, and process discipline." },
    { term: "Continuous Delivery (CD)", desc: "Ability to release code to production frequently and safely." },
    { term: "Continuous Deployment", desc: "Automatic release of every change that passes tests." },
    { term: "DORA Metrics", desc: "Deployment Frequency, Lead Time for Changes, Change Failure Rate, and MTTR." },
    { term: "Change Management", desc: "Structured approach for implementing changes safely." },
    { term: "Incident Management", desc: "Detecting, responding to, and resolving incidents." },
    { term: "Post-Mortem", desc: "Structured analysis after an incident to prevent recurrence." },
    { term: "SLA (Service Level Agreement)", desc: "Formal promise of reliability/performance levels to customers." },
    { term: "SLO (Service Level Objective)", desc: "Internal performance target for reliability/latency/uptime." },
    { term: "SLI (Service Level Indicator)", desc: "Metric used to measure a service’s performance." },
    { term: "Error Budget", desc: "Acceptable unreliability within an SLO; exceeding it pauses new feature work." },
    { term: "MTTR (Mean Time To Restore)", desc: "Average time to restore service after failure." },
    { term: "Site Reliability Engineering (SRE)", desc: "Discipline applying software engineering to ops for highly reliable systems." },
    { term: "Chaos Engineering", desc: "Intentionally injecting failures to test resilience and recovery." },
    { term: "KPI (Key Performance Indicator)", desc: "Metric that indicates performance against a target." },
    { term: "RTO (Recovery Time Objective)", desc: "Maximum acceptable downtime after a failure." }
  ],

  "Category C. People & Leadership": [
    { term: "Servant Leadership", desc: "Leadership focused on serving and enabling teams." },
    { term: "Transformational Leadership", desc: "Driving significant organizational and cultural change." },
    { term: "Psychological Safety", desc: "Environment where team members feel safe to speak up and fail." },
    { term: "Engagement", desc: "Emotional and intellectual commitment to work." },
    { term: "Empowerment", desc: "Giving teams autonomy to make decisions and own outcomes." },
    { term: "Culture", desc: "Shared values, behaviors, and practices in an organization." },
    { term: "Succession Planning", desc: "Preparing future leaders within the organization." },
    { term: "Talent Acquisition", desc: "Recruiting and hiring engineering talent." },
    { term: "Retention", desc: "Keeping high-performing employees engaged and committed." },
    { term: "Career Progression", desc: "Clear growth paths for ICs and managers." },
    { term: "Leadership Competency", desc: "Skills and behaviors required for effective leadership." },
    { term: "Technical Competency", desc: "Skills and knowledge required for technical roles." },
    { term: "Engineering Brand", desc: "Internal and external reputation of engineering." },
    { term: "DEI (Diversity, Equity, Inclusion)", desc: "Building balanced, fair, inclusive teams." },
    { term: "eNPS (Employee NPS)", desc: "Metric of employee satisfaction and advocacy." },
    { term: "Span of Control", desc: "Number of direct reports or teams under a leader." },
    { term: "RACI", desc: "Decision framework: Responsible, Accountable, Consulted, Informed." },
    { term: "DACI", desc: "Decision framework: Driver, Approver, Contributor, Informed." },
    { term: "Team Topology", desc: "Patterns of organizing teams for flow and delivery." },
    { term: "Cross-Functional Leadership", desc: "Leading across engineering, product, design, and business." },
    { term: "Decentralized Decision-Making", desc: "Delegating decisions to the lowest level, closest to the customer or problem." }
  ],

  "Category D. Architecture & Technical Excellence": [
    { term: "Latency", desc: "Time taken for a request to receive a response." },
    { term: "TPS (Transactions Per Second)", desc: "Number of successful transactions processed each second." },
    { term: "Reliability", desc: "Probability that a system performs correctly under expected conditions." },
    { term: "Availability", desc: "Percentage of time a system is operational and accessible." },
    { term: "Performance", desc: "Overall responsiveness and efficiency of a system." },
    { term: "Scalability", desc: "Ability of a system to handle increased traffic or data." },
    { term: "Resiliency", desc: "Ability of systems to recover from disruptions." },
    { term: "Fault Tolerance", desc: "Ability to keep operating despite component failures." },
    { term: "Elasticity", desc: "Ability to automatically scale resources up or down." },
    { term: "Durability", desc: "Assurance that data remains intact over time." },

    { term: "CLS (Cumulative Layout Shift)", desc: "Measures unexpected layout shifts during page load." },
    { term: "LCP (Largest Contentful Paint)", desc: "Time to render the largest visible content." },
    { term: "FID (First Input Delay)", desc: "Time between user’s first interaction and system response." },
    { term: "INP (Interaction to Next Paint)", desc: "Core Web Vital measuring interaction responsiveness." },
    { term: "TTFB (Time To First Byte)", desc: "Time from request to receiving first byte." },
    { term: "FCP (First Contentful Paint)", desc: "Time to render first visible content." },
    { term: "TBT (Total Blocking Time)", desc: "Time user input is blocked during load." },
    { term: "Rendering Performance", desc: "Smoothness of UI rendering (e.g., FPS, jank)." },
    { term: "Accessibility Metrics", desc: "Measures usability for people with disabilities." },

    { term: "Monolith", desc: "Single deployable system containing all functionality." },
    { term: "Microservices", desc: "Small, independent, deployable services." },
    { term: "SOA (Service-Oriented Architecture)", desc: "Approach using loosely coupled services." },
    { term: "Event-Driven Architecture", desc: "Systems communicating via events." },
    { term: "Layered Architecture", desc: "Organizing code into tiers (presentation, domain, data)." },
    { term: "Hexagonal Architecture", desc: "Isolates core logic from external systems via ports/adapters." },
    { term: "CQRS", desc: "Separating read and write operations into different models." },
    { term: "Event Sourcing", desc: "Storing system state as an immutable event log." },
    { term: "Serverless Architecture", desc: "Apps built on functions running on demand." },
    { term: "Mesh Architecture", desc: "Distributed service-to-service networking." },
    { term: "Cloud-Native", desc: "Built specifically for cloud environments." },
    { term: "Multi-Cloud", desc: "Using multiple cloud providers simultaneously." },
    { term: "Hybrid", desc: "Mix of on-premises and cloud deployments." },
    { term: "Containers", desc: "Lightweight, portable runtime environments." },
    { term: "Kubernetes", desc: "Orchestration platform for containers." },
    { term: "Service Mesh", desc: "Infrastructure for traffic management, security, observability in microservices." },
    { term: "Infrastructure as Code (IaC)", desc: "Managing infrastructure via code and automation." },
    { term: "Immutable Infrastructure", desc: "Infra is replaced rather than patched in-place." },
    { term: "Blue-Green Deployments", desc: "Parallel environments for safe cutovers." },
    { term: "Canary Deployments", desc: "Rolling out changes to small subsets first." },

    { term: "Technical Debt", desc: "Cost of rework from shortcuts or outdated choices." },
    { term: "Refactoring", desc: "Improving code structure without changing behavior." },
    { term: "Code Quality", desc: "Measure of maintainability, readability, reliability." },
    { term: "Technical Standards", desc: "Agreed guidelines for coding and architecture." },
    { term: "Architecture", desc: "High-level structural design of systems and interactions." },
    { term: "System Design", desc: "Detailed planning of components and their interactions." },
    { term: "Domain-Driven Design (DDD)", desc: "Aligning software design with business domains and ubiquitous language." },
    { term: "Platform Thinking", desc: "Building reusable platforms to accelerate teams." },
    { term: "API-First Design", desc: "Designing APIs before implementation for better contracts." },
    { term: "Interoperability", desc: "Ability of systems to exchange information seamlessly." },
    { term: "Architecture Decision Records (ADR)", desc: "Capturing significant architecture choices and their context." },
    { term: "Observability", desc: "Understanding system behavior via logs, metrics, traces." },
    { term: "Resilient Architecture", desc: "Systems designed to withstand failures and degrade gracefully." },
    { term: "Design Patterns", desc: "Reusable solutions to common design problems." },
    { term: "Technical Documentation", desc: "Written materials describing systems and processes." },
    { term: "Runbooks", desc: "Step-by-step operational procedures for systems." },
    { term: "Knowledge Base / Wikis", desc: "Repository of engineering knowledge and practices." },
    { term: "Edge Architecture", desc: "Deploying compute near data sources or users." },
    { term: "Zero Trust Architecture", desc: "“Never trust, always verify” security model." },
    { term: "Green Software", desc: "Designing software with minimal carbon impact." },
    { term: "Multi-Tenant Architecture", desc: "One system serving multiple customers securely." },
    { term: "Data Mesh", desc: "Decentralized approach to managing data as products with domain ownership." },
    { term: "Data Fabric", desc: "Unified architecture for managing data across silos via virtualization and governance." },
    { term: "AI-Native Architecture", desc: "Systems designed with AI/ML at the core of capabilities." },

    { term: "DevOps", desc: "Cultural movement and practices to unify development and operations end-to-end." },
    { term: "SRE", desc: "Specific engineering discipline applying software to operations to achieve reliability; pairs with SLOs and error budgets." },
    { term: "Chaos Engineering", desc: "Practice of intentionally injecting failures to validate resilience." }
  ],

  "Category E. Business & Financial": [
    { term: "EBITDA", desc: "Profitability metric excluding financing and certain accounting costs." },
    { term: "Gross Margin", desc: "Revenue minus cost of goods sold, as a percentage." },
    { term: "Burn Rate", desc: "Rate at which a company spends money each month." },
    { term: "Runway", desc: "Number of months until funds are depleted at current burn." },
    { term: "ARR (Annual Recurring Revenue)", desc: "Predictable yearly subscription revenue." },
    { term: "MRR (Monthly Recurring Revenue)", desc: "Predictable monthly subscription revenue." },
    { term: "NRR (Net Revenue Retention)", desc: "Revenue growth from existing customers after churn/expansion." },
    { term: "CAC (Customer Acquisition Cost)", desc: "Total cost of acquiring one customer." },
    { term: "LTV (Lifetime Value)", desc: "Revenue generated per customer over their relationship." },
    { term: "Opex", desc: "Ongoing operating expenses." },
    { term: "Capex", desc: "Capital expenditures on long-term assets." },
    { term: "Cost Optimization", desc: "Reducing costs without reducing value delivered." },
    { term: "Engineering Cost Ratio", desc: "Engineering spend as a % of company costs." },
    { term: "Cost per Feature", desc: "Engineering cost divided by features delivered." },
    { term: "Revenue per Engineer", desc: "Company revenue divided by engineering headcount." },
    { term: "P&L (Profit & Loss)", desc: "Financial statement showing revenue, costs, and profit." },
    { term: "Budget Allocation", desc: "Distribution of funds across projects and teams." },
    { term: "Resource Planning", desc: "Assigning people, infrastructure, and tools to initiatives." },
    { term: "Headcount Planning", desc: "Forecasting and managing engineering team size." },
    { term: "Payback Period", desc: "How long it takes to recover the initial investment." },
    { term: "Post-Mortem (Finance context)", desc: "Structured analysis post-incident or investment to learn and prevent recurrence." }
  ],

  "Category F. Risk, Governance & Compliance": [
    { term: "Risk Register", desc: "Central record of identified risks and mitigation plans." },
    { term: "Risk Mitigation", desc: "Actions to reduce likelihood or impact of risks." },
    { term: "Contingency Planning", desc: "Preparing backup plans for risks and failures." },
    { term: "IT Governance", desc: "Framework for decision-making and oversight of technology." },
    { term: "Architecture Governance", desc: "Oversight ensuring compliance with principles and standards." },
    { term: "Data Governance", desc: "Management of data quality, integrity, and security." },
    { term: "Compliance", desc: "Adherence to legal and regulatory standards." },
    { term: "Regulatory Requirements", desc: "Specific laws governing technology operations." },
    { term: "Privacy by Design", desc: "Incorporating privacy protections from the start." },
    { term: "Ethics in AI", desc: "Responsible development and deployment of AI systems." },
    { term: "Business Continuity", desc: "Ability to keep operations running during disruption." },
    { term: "Disaster Recovery", desc: "Processes to restore systems after failures." },
    { term: "Audit", desc: "Independent review of processes and systems." },
    { term: "Control Frameworks", desc: "Policies and controls for managing risks." },
    { term: "Cybersecurity Posture", desc: "Overall maturity of security practices." },
    { term: "Zero Trust (Security)", desc: "Security model requiring verification for every request." }
  ],

  "Category G. Customer & Market Focus": [
    { term: "Customer Experience (CX)", desc: "Overall perception of customer interactions." },
    { term: "User Experience (UX)", desc: "Quality of a user’s interactions with a product." },
    { term: "Customer Journey", desc: "Path customers take from discovery to retention." },
    { term: "Net Promoter Score (NPS)", desc: "Metric measuring customer loyalty." },
    { term: "Customer Satisfaction (CSAT)", desc: "Metric of customer happiness." },
    { term: "Churn", desc: "Percentage of customers leaving a product or service." },
    { term: "Conversion Rate", desc: "Percentage of users completing a desired action." },
    { term: "Retention Rate", desc: "Percentage of customers continuing to use a product." },
    { term: "Product Analytics", desc: "Analysis of user behavior and product usage." },
    { term: "A/B Testing", desc: "Experiment comparing two versions for performance." },
    { term: "Feature Flags", desc: "Enable/disable features without redeploying." },
    { term: "Voice of Customer (VoC)", desc: "Direct feedback from customers." },
    { term: "Customer Success", desc: "Ensuring customers achieve desired outcomes." },
    { term: "Market Analysis", desc: "Assessment of market conditions and opportunities." },
    { term: "Competitive Analysis", desc: "Evaluation of competitors’ strengths and weaknesses." }
  ],

  "Category H. Cross-Functional & Collaboration": [
    { term: "Stakeholder Management", desc: "Aligning and influencing key players for success." },
    { term: "Dependencies", desc: "Work relying on other teams, systems, or vendors." },
    { term: "Trade-Offs", desc: "Balancing speed, cost, quality, and scope." },
    { term: "Cross-Functional Teams", desc: "Teams composed of multiple functions." },
    { term: "Engineering–Product Partnership", desc: "Collaboration between engineering and product to deliver outcomes." },
    { term: "Design–Engineering Collaboration", desc: "Joint work between design and engineering." },
    { term: "Partner Integration", desc: "Technical connection with partner systems." },
    { term: "Escalation", desc: "Raising issues to higher authority for resolution." },
    { term: "Decision Frameworks", desc: "Structured approaches for decision-making (e.g., RACI/DACI/ADR)." },
    { term: "Change Communication", desc: "Sharing info about organizational or technical changes." },
    { term: "Synergy", desc: "Combined effect of collaboration greater than the sum of parts." }
  ]
};

/* -------------------------- STYLES -------------------------- */
const styles = `
  .layout{display:grid;grid-template-columns:1fr;gap:20px}
  @media(min-width:960px){.layout{grid-template-columns:220px 1fr}}
  .toc{position:sticky;top:72px;align-self:start}
  .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px}
  .kicker{text-transform:uppercase;letter-spacing:.08em;font-weight:700;color:#6b7280;font-size:12px}
  .title{font-size:30px;font-weight:800;margin:6px 0}
  .desc{color:#374151;margin:0 0 8px}
  .meta{color:#6b7280;font-size:13px;margin-bottom:8px}
  .search{width:100%;padding:10px;border:1px solid #e5e7eb;border-radius:8px;margin:8px 0 12px}
  .hr{border:0;height:1px;background:#e5e7eb;margin:16px 0}
  .h2{font-size:20px;font-weight:800;margin:0 0 6px}
  .dl dt{font-weight:700;margin-top:8px}
  .dl dd{margin:2px 0 8px;color:#374151;line-height:1.55}
  .toc nav a{display:block;padding:6px 8px;margin-top:4px;border-radius:6px;text-decoration:none;color:#0b66c3}
  .toc nav a:hover{background:#eff6ff}
  @media print{.toc,.search{display:none}.card{break-inside:avoid}}
`;
const wrap = { maxWidth: 1100, margin: "32px auto", padding: "0 16px" };
