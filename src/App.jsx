import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { id: "home", icon: "⌂", label: "Home" },
  { id: "about", icon: "◉", label: "About" },
  { id: "skills", icon: "◈", label: "Skills" },
  { id: "projects", icon: "◧", label: "Projects" },
  { id: "contact", icon: "✉", label: "Contact" },
];

const SKILLS = [
  { name: "React", level: 90, icon: "⚛" },
  { name: "Figma / UI Design", level: 85, icon: "◈" },
  { name: "Node.js", level: 75, icon: "⬡" },
  { name: "TypeScript", level: 80, icon: "TS" },
  { name: "CSS / Animation", level: 95, icon: "✦" },
];

const PROJECTS = [
  {
    title: "VLOOMS",
    desc: "Marketing website for VLOOMS® by Vedanta Home Interior — a Jaipur fabric wholesaler est. 1976",
    tags: ["React", "TypeScript", "Next.js"],
    color: "#e8006f",
    link: "https://github.com/lavcharms/vlooms",
    image: "/project1.png",
  },
  {
    title: "DINOSAUR GAME",
    desc: "A web-based version of the classic Chrome Dinosaur Game, built with Vue.js and Firebase for real-time multiplayer functionality.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#c0c0e0",
    link: "https://github.com/lavcharms/DINOSAUR-GAME",
    image: "/project2.png",
  },
];

const TOOLS = [
  { name: "HTML", color: "#e34c26", svg: <svg viewBox="0 0 32 32" width="28" height="28"><polygon fill="#e34c26" points="4,0 6.5,28 16,31 25.5,28 28,0"/><polygon fill="#ff6d00" points="16,2.5 16,28.5 23.5,26.3 25.7,2.5"/><polygon fill="#fff" points="16,13 11,13 10.7,10 16,10 16,7 7.5,7 8.5,18 16,18"/><polygon fill="#fff" points="16,21 15.9,21.3 12.5,20.3 12.3,18 9.3,18 9.7,22.5 15.9,24.3 16,24.3"/><polygon fill="#ebebeb" points="16,13 16,18 20.7,18 20.3,21.3 16,22.5 16,24.3 22.1,22.5 22.2,21 22.7,15.5 23,13"/><polygon fill="#ebebeb" points="16,7 16,9 16,10 23.3,10 23.4,9 23.6,7"/></svg> },
  { name: "CSS", color: "#264de4", svg: <svg viewBox="0 0 32 32" width="28" height="28"><polygon fill="#264de4" points="4,0 6.5,28 16,31 25.5,28 28,0"/><polygon fill="#2965f1" points="16,2.5 16,28.5 23.5,26.3 25.7,2.5"/><polygon fill="#fff" points="16,13 11.3,13 11,10 16,10 16,7 7.8,7 8.8,18 16,18"/><polygon fill="#fff" points="16,21.5 12.7,20.6 12.5,18 9.5,18 9.9,22.5 16,24.3"/><polygon fill="#ebebeb" points="16,13 16,18 20.4,18 20,21.5 16,22.5 16,24.3 22.1,22.5 22.6,16.9 23,13"/><polygon fill="#ebebeb" points="16,7 16,10 22.9,10 23.2,7"/></svg> },
  { name: "JavaScript", color: "#f7df1e", svg: <svg viewBox="0 0 32 32" width="28" height="28"><rect fill="#f7df1e" width="32" height="32"/><path fill="#000" d="M9.7 25.1c.5.9 1.2 1.5 2.4 1.5 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.7-3-3.7 0-1.8 1.4-3.2 3.6-3.2 1.6 0 2.7.5 3.5 1.9l-1.9 1.2c-.4-.8-.9-1.1-1.6-1.1-.7 0-1.2.5-1.2 1.1 0 .8.5 1.1 1.6 1.6l.6.3c2.1.9 3.3 1.8 3.3 3.9 0 2.2-1.7 3.4-4 3.4-2.2 0-3.7-1.1-4.4-2.5l2-.8zm9.9.2c.4.7.8 1.3 1.7 1.3.9 0 1.4-.3 1.4-1.6v-8.6h2.4v8.7c0 2.6-1.5 3.8-3.8 3.8-2 0-3.2-1.1-3.8-2.3l2.1-1.3z"/></svg> },
  { name: "React", color: "#61dafb", svg: <svg viewBox="0 0 32 32" width="28" height="28"><circle fill="#61dafb" cx="16" cy="16" r="2.8"/><ellipse fill="none" stroke="#61dafb" strokeWidth="1.2" cx="16" cy="16" rx="12" ry="4.5"/><ellipse fill="none" stroke="#61dafb" strokeWidth="1.2" cx="16" cy="16" rx="12" ry="4.5" transform="rotate(60 16 16)"/><ellipse fill="none" stroke="#61dafb" strokeWidth="1.2" cx="16" cy="16" rx="12" ry="4.5" transform="rotate(120 16 16)"/></svg> },
  { name: "Next.js", color: "#ffffff", svg: <svg viewBox="0 0 32 32" width="28" height="28"><circle fill="#000" cx="16" cy="16" r="16"/><path fill="#fff" d="M11 10h2v8.5l7-8.5h2v12h-2v-8.5l-7 8.5H11V10z"/></svg> },
  { name: "Python", color: "#3776ab", svg: <svg viewBox="0 0 32 32" width="28" height="28"><path fill="#3776ab" d="M15.9 2C11 2 11.3 4.1 11.3 4.1V6.3h4.7v.7H8.1S5 6.6 5 11.6s2.7 4.8 2.7 4.8H9.4v-2.3s-.1-2.7 2.7-2.7h4.6s2.6.04 2.6-2.5V4.7S19.8 2 15.9 2zm-2.5 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/><path fill="#ffd43b" d="M16.1 30c4.9 0 4.6-2.1 4.6-2.1V25.7H16v-.7h7.9S27 25.4 27 20.4s-2.7-4.8-2.7-4.8H22.6v2.3s.1 2.7-2.7 2.7H15.3s-2.6-.04-2.6 2.5v4.2S12.2 30 16.1 30zm2.5-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/></svg> },
  { name: "C++", color: "#00599c", svg: <svg viewBox="0 0 32 32" width="28" height="28"><path fill="#00599c" d="M16 2L4 8.5v15L16 30l12-6.5v-15L16 2zm0 2.3l9.7 5.3v13L16 27.7 6.3 22.6v-13L16 4.3z"/><text x="8" y="21" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="monospace">C++</text></svg> },
  { name: "SQL", color: "#f29111", svg: <svg viewBox="0 0 32 32" width="28" height="28"><ellipse fill="#f29111" cx="16" cy="9" rx="12" ry="4"/><path fill="#f29111" d="M4 9v5c0 2.2 5.4 4 12 4s12-1.8 12-4V9c0 2.2-5.4 4-12 4S4 11.2 4 9z"/><path fill="#e8820c" d="M4 14v5c0 2.2 5.4 4 12 4s12-1.8 12-4v-5c0 2.2-5.4 4-12 4S4 16.2 4 14z"/><path fill="#d97008" d="M4 19v4c0 2.2 5.4 4 12 4s12-1.8 12-4v-4c0 2.2-5.4 4-12 4S4 21.2 4 19z"/></svg> },
  { name: "VS Code", color: "#007acc", svg: <svg viewBox="0 0 32 32" width="28" height="28"><path fill="#007acc" d="M30.9 5.1L24 1.5l-13 12L4 7.5 1 9v14l3 1.5 7-6 13 12 6.9-3.6.1-21.8zM24 22.5l-9.5-6.5 9.5-6.5v13z"/></svg> },
  { name: "GitHub", color: "#ffffff", svg: <svg viewBox="0 0 32 32" width="28" height="28"><path fill="#fff" d="M16 2C8.3 2 2 8.3 2 16c0 6.2 4 11.4 9.6 13.2.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.8-3.1-.4-6.4-1.6-6.4-7 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.1-.4 3.7 1.4 1.1-.3 2.2-.5 3.4-.5 1.1 0 2.3.2 3.4.5 2.6-1.7 3.7-1.4 3.7-1.4.7 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.4 7 .5.4.9 1.3.9 2.6v3.8c0 .4.3.8 1 .7C26 27.4 30 22.2 30 16c0-7.7-6.3-14-14-14z"/></svg> },
  { name: "Tailwind", color: "#38bdf8", svg: <svg viewBox="0 0 32 32" width="28" height="28"><path fill="#38bdf8" d="M16 6.4c-4.3 0-6.9 2.1-8 6.4 1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3.1 2.2 1.6 1.6 3.4 3.5 7.3 3.5 4.3 0 6.9-2.1 8-6.4-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3.1-2.2C21.7 8.3 19.9 6.4 16 6.4zm-8 9.6c-4.3 0-6.9 2.1-8 6.4 1.6-2.1 3.5-2.9 5.6-2.4 1.2.3 2.1 1.2 3.1 2.2 1.6 1.6 3.4 3.5 7.3 3.5 4.3 0 6.9-2.1 8-6.4-1.6 2.1-3.5 2.9-5.6 2.4-1.2-.3-2.1-1.2-3.1-2.2C13.7 17.9 11.9 16 8 16z"/></svg> },
  { name: "Figma", color: "#f24e1e", svg: <svg viewBox="0 0 32 32" width="28" height="28"><path fill="#f24e1e" d="M10 28a4 4 0 0 0 4-4v-4h-4a4 4 0 0 0 0 8z"/><path fill="#7c3aed" d="M10 16h4v8h-4a4 4 0 0 1 0-8z"/><path fill="#1abcfe" d="M14 16a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/><path fill="#0acf83" d="M10 8a4 4 0 0 1 4-4h4v8h-4a4 4 0 0 1-4-4z"/><path fill="#ff7262" d="M18 4h4a4 4 0 0 1 0 8h-4V4z"/></svg> },
];

function WebPattern() {
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none", zIndex: 0 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="web" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <line x1="60" y1="60" x2="0" y2="0" stroke="#e8006f" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="60" y2="0" stroke="#e8006f" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="120" y2="0" stroke="#e8006f" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="120" y2="60" stroke="#e8006f" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="120" y2="120" stroke="#e8006f" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="60" y2="120" stroke="#e8006f" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="0" y2="120" stroke="#e8006f" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="0" y2="60" stroke="#e8006f" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="20" fill="none" stroke="#e8006f" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="40" fill="none" stroke="#e8006f" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="58" fill="none" stroke="#e8006f" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#web)" />
    </svg>
  );
}

function GlitchText({ text, style }) {
  return (
    <span style={{ position: "relative", display: "inline-block", ...style }}>
      <span style={{ position: "absolute", top: 0, left: "2px", color: "#e8006f", clipPath: "inset(0 0 60% 0)", animation: "glitch1 3s infinite", opacity: 0.7 }}>{text}</span>
      <span style={{ position: "absolute", top: 0, left: "-2px", color: "#a0c0ff", clipPath: "inset(40% 0 0 0)", animation: "glitch2 3s infinite", opacity: 0.7 }}>{text}</span>
      {text}
    </span>
  );
}

function SideNav({ active, onNav }) {
  return (
    <nav style={{ position: "fixed", left: "24px", top: "50%", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: "8px", background: "rgba(10,10,20,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(232,0,111,0.2)", borderRadius: "24px", padding: "16px 10px", boxShadow: "0 0 30px rgba(232,0,111,0.1), inset 0 0 20px rgba(0,0,0,0.5)" }}>
      <div style={{ textAlign: "center", fontSize: "18px", color: "#e8006f", marginBottom: "8px", filter: "drop-shadow(0 0 6px #e8006f)" }}>✦</div>
      {NAV_ITEMS.map((item) => (
        <button key={item.id} onClick={() => onNav(item.id)} title={item.label}
          style={{ background: active === item.id ? "rgba(232,0,111,0.2)" : "transparent", border: active === item.id ? "1px solid rgba(232,0,111,0.6)" : "1px solid transparent", borderRadius: "12px", color: active === item.id ? "#fff" : "rgba(180,180,200,0.6)", width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", cursor: "pointer", transition: "all 0.3s ease", boxShadow: active === item.id ? "0 0 12px rgba(232,0,111,0.4)" : "none", position: "relative" }}>
          {item.icon}
          <span style={{ position: "absolute", left: "calc(100% + 10px)", background: "rgba(10,10,20,0.95)", border: "1px solid rgba(232,0,111,0.4)", color: "#e8006f", fontSize: "11px", fontFamily: "'Courier New', monospace", letterSpacing: "1px", padding: "4px 10px", borderRadius: "6px", whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", transition: "opacity 0.2s" }} className="nav-tooltip">
            {item.label.toUpperCase()}
          </span>
        </button>
      ))}
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e8006f", margin: "8px auto 0", animation: "pulse 2s infinite", boxShadow: "0 0 8px #e8006f" }} />
    </nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const roles = ["UI/UX Designer", "Frontend Developer", "Creative Coder", "Web Weaver"];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    let i = 0; let deleting = false;
    let currentRole = roles[roleIdx];
    const interval = setInterval(() => {
      if (!deleting) {
        setTyped(currentRole.slice(0, i + 1)); i++;
        if (i === currentRole.length) { deleting = true; setTimeout(() => {}, 1200); }
      } else {
        setTyped(currentRole.slice(0, i - 1)); i--;
        if (i === 0) { deleting = false; setRoleIdx((r) => (r + 1) % roles.length); currentRole = roles[(roleIdx + 1) % roles.length]; }
      }
    }, 130);
    return () => clearInterval(interval);
  }, [roleIdx]);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "0 80px 0 160px", overflow: "hidden" }}>
      <div className="hero-orbits" style={{ position: "absolute", right: "-200px", top: "50%", transform: "translateY(-50%)", width: "700px", height: "700px", borderRadius: "50%", border: "1px solid rgba(232,0,111,0.15)", boxShadow: "0 0 80px rgba(232,0,111,0.05)", animation: "rotateSlow 30s linear infinite" }} />
      <div className="hero-orbits" style={{ position: "absolute", right: "-100px", top: "50%", transform: "translateY(-50%)", width: "500px", height: "500px", borderRadius: "50%", border: "1px solid rgba(232,0,111,0.1)", animation: "rotateSlow 20s linear infinite reverse" }} />

      <div className="hero-photo" style={{ position: "absolute", left: "180px", top: "38%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 2 }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: "-12px", borderRadius: "50%", border: "1.5px dashed rgba(232,0,111,0.4)", animation: "rotateSlow 12s linear infinite" }} />
          <div style={{ position: "absolute", inset: "-24px", borderRadius: "50%", border: "1px solid rgba(232,0,111,0.15)", animation: "rotateSlow 20s linear infinite reverse" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,0,111,0.25) 0%, transparent 70%)", filter: "blur(16px)" }} />
          <div style={{ width: "246px", height: "246px", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(232,0,111,0.6)", boxShadow: "0 0 30px rgba(232,0,111,0.35), inset 0 0 20px rgba(0,0,0,0.5)", background: "rgba(10,10,25,0.9)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
            <img src="/me.jpeg" alt="Lavanya Chandel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>

      <div className="hero-spider" style={{ position: "absolute", right: "140px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
        <div style={{ position: "absolute", width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(232,0,111,0.08) 40%, transparent 70%)", filter: "blur(24px)", animation: "pulse 2.5s ease-in-out infinite" }} />
        <svg viewBox="0 0 100 100" width="160" style={{ filter: "drop-shadow(0 0 12px rgba(255,255,255,1)) drop-shadow(0 0 30px rgba(232,0,111,0.7))", animation: "spiderFloat 3s ease-in-out infinite", position: "relative" }}>
          <line x1="50" y1="22" x2="50" y2="2" stroke="white" strokeWidth="1" strokeDasharray="3,3" opacity="0.7" />
          <ellipse cx="50" cy="55" rx="11" ry="15" fill="white" />
          <circle cx="50" cy="36" r="9" fill="white" />
          <circle cx="46.5" cy="35" r="2" fill="#06060f" />
          <circle cx="53.5" cy="35" r="2" fill="#06060f" />
          <line x1="39" y1="48" x2="14" y2="35" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="39" y1="53" x2="12" y2="53" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="39" y1="58" x2="14" y2="67" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="39" y1="63" x2="19" y2="76" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="61" y1="48" x2="86" y2="35" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="61" y1="53" x2="88" y2="53" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="61" y1="58" x2="86" y2="67" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="61" y1="63" x2="81" y2="76" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: "560px" }}>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "4px", color: "#e8006f", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "40px", height: "1px", background: "#e8006f", display: "inline-block" }} />PORTFOLIO 2026<span style={{ width: "40px", height: "1px", background: "#e8006f", display: "inline-block" }} />
        </div>
        <h2 style={{ fontFamily: "'Courier New', monospace", fontSize: "14px", color: "rgba(200,200,220,0.7)", letterSpacing: "2px", marginBottom: "8px", fontWeight: 400 }}>HELLO, I AM</h2>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(52px, 6vw, 82px)", fontWeight: 900, lineHeight: 1, marginBottom: "16px", color: "#ffffff", textShadow: "0 0 40px rgba(232,0,111,0.3)", letterSpacing: "-1px" }}>
          <GlitchText text="LAVANYA CHANDEL" />
        </h1>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(16px, 2vw, 22px)", color: "#e8006f", marginBottom: "28px", minHeight: "32px", letterSpacing: "1px" }}>
          {typed}<span style={{ display: "inline-block", width: "2px", height: "1.1em", background: "#e8006f", marginLeft: "2px", verticalAlign: "text-bottom", animation: "blink 1s infinite" }} />
        </div>
        <p style={{ color: "rgba(180,180,210,0.7)", fontSize: "15px", lineHeight: 1.7, maxWidth: "440px", marginBottom: "40px", fontFamily: "'Georgia', serif" }}>
          Crafting immersive digital experiences from the shadows. Clean code, bold design, every pixel with purpose.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg, #e8006f, #c0003f)", border: "none", color: "#fff", padding: "14px 32px", borderRadius: "30px", fontFamily: "'Courier New', monospace", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", boxShadow: "0 0 20px rgba(232,0,111,0.4)", transition: "all 0.3s" }}>VIEW MY WORK</button>
          <button onClick={() => window.open("/cv.pdf", "_blank")} style={{ background: "transparent", border: "1px solid rgba(232,0,111,0.5)", color: "#e8006f", padding: "14px 32px", borderRadius: "30px", fontFamily: "'Courier New', monospace", fontSize: "12px", letterSpacing: "2px", cursor: "pointer", transition: "all 0.3s" }}>VIEW CV</button>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 80px 80px 100px", position: "relative" }}>
      <div style={{ maxWidth: "960px", width: "100%", margin: "0 auto" }}>
        <SectionLabel label="01 — ABOUT" />
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "#fff", marginBottom: "48px", lineHeight: 1.1, textAlign: "center" }}>
          From the <span style={{ color: "#e8006f" }}>Ghost Dimension</span><br />to your screen.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
          <div>
            <p style={{ color: "rgba(180,180,210,0.8)", lineHeight: 1.8, fontSize: "15px", marginBottom: "20px", fontFamily: "'Georgia', serif" }}>Hi, I'm a Frontend developer and designer who blends aesthetics with functionality. Inspired by the Ghost-Spider universe — I believe the best interfaces are both invisible and unforgettable.</p>
            <p style={{ color: "rgba(180,180,210,0.6)", lineHeight: 1.8, fontSize: "14px", fontFamily: "'Georgia', serif" }}>I learned from building real projects, studying the craft of design, and embracing the weird beautiful spaces between code and art.</p>
            <div style={{ marginTop: "32px", display: "flex", gap: "24px" }}>
              {[["9+", "Projects"], ["5+", "Clients"] ,["∞", "Coffee"]].map(([num, lbl]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#e8006f", fontFamily: "'Georgia', serif" }}>{num}</div>
                  <div style={{ fontSize: "10px", color: "rgba(180,180,210,0.5)", letterSpacing: "2px", fontFamily: "'Courier New', monospace" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(232,0,111,0.04)", border: "1px solid rgba(232,0,111,0.15)", borderRadius: "16px", padding: "28px", marginLeft: "auto", width: "100%" }}>
            {[["Education", "2024 - 2028 · Btech in Smart Manufacturing int AI/ML"], ["Focus", "UI/UX, Motion, Frontend Dev"], ["Based in", "Jaipur, Rajasthan, India"]].map(([key, val]) => (
              <div key={key} style={{ display: "flex", gap: "16px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid rgba(232,0,111,0.08)" }}>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "2px", color: "#e8006f", minWidth: "80px", paddingTop: "2px" }}>{key.toUpperCase()}</span>
                <span style={{ color: "rgba(200,200,220,0.8)", fontSize: "14px", lineHeight: 1.5 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "56px" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "4px", color: "#e8006f", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ width: "24px", height: "1px", background: "#e8006f", display: "inline-block" }} />SOFTWARE &amp; LANGUAGES
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {TOOLS.map((tool) => (
              <div key={tool.name} title={tool.name}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "rgba(10,10,25,0.7)", border: "1px solid rgba(232,0,111,0.1)", borderRadius: "14px", padding: "14px 16px", cursor: "default", transition: "all 0.3s ease", minWidth: "64px" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = tool.color; e.currentTarget.style.boxShadow = `0 0 16px ${tool.color}33`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,0,111,0.1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                {tool.svg}
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "9px", letterSpacing: "1px", color: "rgba(200,200,220,0.6)", whiteSpace: "nowrap" }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 80px 80px 100px", position: "relative" }}>
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <SectionLabel label="02 — SKILLS" />
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "#fff", marginBottom: "12px", lineHeight: 1.1 }}>My <span style={{ color: "#e8006f" }}>Spider-Sense</span></h2>
        <p style={{ color: "rgba(180,180,210,0.6)", fontSize: "14px", marginBottom: "48px", fontFamily: "'Georgia', serif" }}>A web-slinger's arsenal of tools and technologies.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {SKILLS.map((skill, i) => (
            <div key={skill.name} style={{ background: "rgba(10,10,20,0.6)", border: "1px solid rgba(232,0,111,0.12)", borderRadius: "12px", padding: "20px 24px", transition: "border-color 0.3s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#e8006f", fontSize: "18px" }}>{skill.icon}</span>
                  <span style={{ color: "#fff", fontSize: "14px", fontFamily: "'Courier New', monospace", letterSpacing: "1px" }}>{skill.name}</span>
                </div>
                <span style={{ color: "#e8006f", fontSize: "12px", fontFamily: "'Courier New', monospace" }}>{skill.level}%</span>
              </div>
              <div style={{ height: "4px", background: "rgba(232,0,111,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: animated ? `${skill.level}%` : "0%", background: "linear-gradient(90deg, #e8006f, #ff4da6)", borderRadius: "2px", transition: `width 1.2s ease ${i * 0.1}s`, boxShadow: "0 0 8px rgba(232,0,111,0.6)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" style={{ minHeight: "100vh", padding: "80px 80px 80px 100px", position: "relative" }}>
      <SectionLabel label="03 — PROJECTS" />
      <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "#fff", marginBottom: "12px", lineHeight: 1.1 }}>Projects <span style={{ color: "#e8006f" }}></span></h2>
      <p style={{ color: "rgba(180,180,210,0.6)", fontSize: "14px", marginBottom: "48px", fontFamily: "'Georgia', serif" }}>A collection of recent work across dimensions.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", maxWidth: "700px" }}>
        {PROJECTS.map((proj, i) => (
          <div key={proj.title} onClick={() => window.open(proj.link, "_blank")}
            style={{ background: "rgba(10,10,20,0.7)", border: "1px solid rgba(232,0,111,0.15)", borderRadius: "16px", padding: "20px", cursor: "pointer", transition: "all 0.35s ease", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", minHeight: "520px" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(232,0,111,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(232,0,111,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,0,111,0.15)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", opacity: 0.12, background: `radial-gradient(circle at top right, ${proj.color}, transparent)` }} />
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#e8006f", letterSpacing: "3px", marginBottom: "16px", opacity: 0.7 }}>0{i + 1}</div>
            <div style={{ height: "260px", borderRadius: "8px", marginBottom: "20px", overflow: "hidden", border: "1px solid rgba(232,0,111,0.08)", flexShrink: 0 }}>
              <img src={proj.image} alt={proj.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>{proj.title}</h3>
            <p style={{ color: "rgba(180,180,210,0.6)", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px", flexGrow: 1 }}>{proj.desc}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {proj.tags.map((tag) => (
                <span key={tag} style={{ background: "rgba(232,0,111,0.1)", border: "1px solid rgba(232,0,111,0.2)", color: "#e8006f", fontSize: "10px", letterSpacing: "1px", padding: "4px 10px", borderRadius: "20px", fontFamily: "'Courier New', monospace" }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ✅ NEW creative contact section
function ContactSection() {
  const SOCIALS = [
    { platform: "LinkedIn", handle: "Lavanya Chandel", icon: "in", link: "https://linkedin.com/in/lavanyachandel", color: "#0077b5" },
    { platform: "GitHub", handle: "@lavcharms", icon: "◉", link: "https://github.com/lavcharms", color: "#fff" },
    { platform: "Twitter", handle: "@lavcharms", icon: "𝕏", link: "https://twitter.com/lavcharms", color: "#1d9bf0" },
    { platform: "Gmail", handle: "chandellavanya2@gmail.com", icon: "✉", link: "mailto:chandellavanya2@gmail.com", color: "#e8006f" },
  ];

  return (
    <section id="contact" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 80px 80px 100px", position: "relative", overflow: "hidden" }}>

      {/* Decorative web SVG in background */}
      <svg style={{ position: "absolute", right: "-80px", bottom: "-80px", opacity: 0.06, pointerEvents: "none" }} width="400" height="400" viewBox="0 0 200 200">
        {[20,40,60,80,100].map(r => <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#e8006f" strokeWidth="0.8"/>)}
        {[0,45,90,135].map(a => { const rad = a*Math.PI/180; return <line key={a} x1="100" y1="100" x2={100+100*Math.cos(rad)} y2={100+100*Math.sin(rad)} stroke="#e8006f" strokeWidth="0.8"/>; })}
      </svg>

      <div style={{ maxWidth: "860px", width: "100%", margin: "0 auto", textAlign: "center" }}>
        <SectionLabel label="04 — CONTACT" />

        {/* Creative heading */}
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "#fff", marginBottom: "12px", lineHeight: 1.1 }}>
          Caught in my <span style={{ color: "#e8006f" }}>web?</span>
        </h2>
        <p style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "3px", color: "rgba(232,0,111,0.7)", marginBottom: "40px" }}>
          — GOOD. THAT'S WHERE THE MAGIC HAPPENS —
        </p>

        {/* Spider instruction card */}
        <div style={{
          background: "rgba(232,0,111,0.04)",
          border: "1px solid rgba(232,0,111,0.2)",
          borderRadius: "20px",
          padding: "32px 40px",
          marginBottom: "40px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Faint spider icon top-right */}
          <div style={{ position: "absolute", top: "16px", right: "24px", fontSize: "28px", opacity: 0.08, filter: "drop-shadow(0 0 4px #e8006f)" }}>🕷</div>

          <p style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "4px", color: "#e8006f", marginBottom: "24px", opacity: 0.7 }}>
            // HOW TO FIND ME
          </p>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", textAlign: "left" }}>
            {[
              { step: "01", title: "Shoot a web →", desc: "Drop me an email and I'll swing back within 24hrs" },
              { step: "02", title: "Check the web ◈", desc: "Browse my GitHub to see the code behind the curtain" },
              { step: "03", title: "Follow the thread", desc: "Connect on LinkedIn for collabs, opportunities & more" },
              { step: "04", title: "Catch me live 𝕏", desc: "Twitter / X for thoughts, updates & dev musings" },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#e8006f", opacity: 0.5, minWidth: "24px", paddingTop: "2px" }}>{step}</span>
                <div>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: "12px", color: "#fff", letterSpacing: "1px", marginBottom: "4px" }}>{title}</div>
                  <div style={{ color: "rgba(180,180,210,0.55)", fontSize: "12px", lineHeight: 1.6, fontFamily: "'Georgia', serif" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All handles in ONE row — no wrapping */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "48px",
        }}>
          {SOCIALS.map((s) => (
            <div key={s.platform} onClick={() => window.open(s.link, "_blank")}
              style={{ background: "rgba(10,10,20,0.8)", border: "1px solid rgba(232,0,111,0.15)", borderRadius: "14px", padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", transition: "all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 0 20px ${s.color}30`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,0,111,0.15)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <span style={{ fontSize: "20px", color: s.color, fontFamily: "'Courier New', monospace", fontWeight: 700 }}>{s.icon}</span>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: "9px", color: "rgba(180,180,210,0.4)", letterSpacing: "2px" }}>{s.platform.toUpperCase()}</div>
              <div style={{ color: "rgba(200,200,220,0.85)", fontSize: "11px", wordBreak: "break-all", textAlign: "center", lineHeight: 1.4 }}>{s.handle}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(232,0,111,0.1)", paddingTop: "28px", display: "flex", justifyContent: "center", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", color: "rgba(180,180,210,0.25)", letterSpacing: "2px" }}>© 2026 — GHOST-SPIDER PORTFOLIO</span>
          <span style={{ color: "#e8006f", fontSize: "18px", filter: "drop-shadow(0 0 6px #e8006f)" }}>✦</span>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", color: "rgba(180,180,210,0.25)", letterSpacing: "2px" }}>LAVANYA CHANDEL</span>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", letterSpacing: "4px", color: "#e8006f", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px", opacity: 0.8 }}>
      <span style={{ width: "24px", height: "1px", background: "#e8006f", display: "inline-block" }} />{label}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((n) => n.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#06060f", minHeight: "100vh", color: "#fff", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @keyframes glitch1 { 0%,90%,100%{transform:translate(0)} 92%{transform:translate(-3px,1px)} 94%{transform:translate(3px,-1px)} 96%{transform:translate(-1px,2px)} }
        @keyframes glitch2 { 0%,90%,100%{transform:translate(0)} 91%{transform:translate(3px,-2px)} 93%{transform:translate(-3px,1px)} 95%{transform:translate(2px,-1px)} }
        @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes rotateSlow { from{transform:translateY(-50%) rotate(0deg)} to{transform:translateY(-50%) rotate(360deg)} }
        @keyframes spiderFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @media (max-width: 900px) {
          .hero-photo{display:none !important} .hero-spider{display:none !important} .hero-orbits{display:none !important}
          #home{padding:0 24px 0 90px !important}
          #about,#skills,#projects,#contact{padding:60px 24px 60px 90px !important}
        }
        @media (max-width: 600px) {
          #home{padding:0 16px 0 80px !important}
          #about,#skills,#projects,#contact{padding:60px 16px 60px 80px !important}
        }
        button:hover .nav-tooltip{opacity:1 !important}
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#06060f} ::-webkit-scrollbar-thumb{background:#e8006f;border-radius:2px}
      `}</style>
      <WebPattern />
      <SideNav active={activeSection} onNav={handleNav} />
      <main style={{ marginLeft: "0px" }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}