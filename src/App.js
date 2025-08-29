// App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./components/pages/home/Home";
import MyProfile from "./components/pages/MyProfile/MyProfile";
// NEW
import ArticlesIndex from "./components/pages/articles/ArticlesIndex";
import KeyTermsModernEngineering from "./components/pages/articles/KeyTermsModernEngineering";
import DatabasesComparison from "./components/pages/articles/DatabasesComparison";
import LLMTransformerPrimer from "./components/pages/articles/LLMTransformerPrimer";
import EngineeringDictionary from "./components/pages/articles/EngineeringDictionary";
import LeadershipFrameworksForEngineering from "./components/pages/articles/LeadershipFrameworksForEngineering";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={navStyles.nav}>
        <NavLink to="/" style={navStyles.link} end>🏠 Home</NavLink>
        <NavLink to="/profile" style={navStyles.link}>👤 My Profile</NavLink>
        {/* NEW */}
        <NavLink to="/articles" style={navStyles.link}>🧠 Articles</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<MyProfile />} />
        {/* NEW */}
        <Route path="/articles" element={<ArticlesIndex />} />
        <Route
          path="/articles/key-terms-modern-engineering"
          element={<KeyTermsModernEngineering />}
          
        />
        <Route path="/articles/databases-comparison" element={<DatabasesComparison />} />
        <Route path="/articles/engineering-dictionary" element={<EngineeringDictionary />} />
        <Route path="/articles/transformers-primer" element={<LLMTransformerPrimer />} />
        <Route path="/articles/leadership-frameworks" element={<LeadershipFrameworksForEngineering />} />
      </Routes>
    </BrowserRouter>
  );
}

const navStyles = {
  nav: { display: "flex", gap: 16, padding: "12px 16px", borderBottom: "1px solid #eee" },
  link: ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#0b66c3" : "#111",
    fontWeight: isActive ? 700 : 500,
  }),
};
