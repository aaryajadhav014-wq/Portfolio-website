
import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = {
  bg: "#0F172A",
  bgCard: "#111827",
  bgGlass: "rgba(17,24,39,0.7)",
  blue: "#3B82F6",
  cyan: "#06B6D4",
  purple: "#8B5CF6",
  white: "#F8FAFC",
  muted: "#94A3B8",
  border: "rgba(255,255,255,0.08)",
};

const skills = [
  { name: "Python", icon: "🐍", level: 85, color: "#3B82F6" },
  { name: "Java", icon: "☕", level: 80, color: "#8B5CF6" },
  { name: "JavaScript", icon: "⚡", level: 75, color: "#06B6D4" },
  { name: "SQL", icon: "🗄️", level: 82, color: "#3B82F6" },
  { name: "HTML/CSS", icon: "🎨", level: 88, color: "#8B5CF6" },
  { name: "MySQL", icon: "🐬", level: 78, color: "#06B6D4" },
  { name: "Git/GitHub", icon: "🔧", level: 80, color: "#3B82F6" },
  { name: "TensorFlow", icon: "🧠", level: 65, color: "#8B5CF6" },
];

const projects = [
  {
    title: "AI Resume Analyzer",
    desc: "NLP-powered resume evaluation tool that scores resumes against job descriptions, provides keyword analysis, ATS optimization tips, and generates improvement suggestions using Python & transformers.",
    tags: ["Python", "NLP", "TensorFlow", "Flask", "React"],
    color: "#3B82F6",
    icon: "📄",
    stars: 42,
    status: "Live",
  },
  {
    title: "Face Recognition Attendance",
    desc: "Real-time face detection and recognition system for automated attendance tracking using OpenCV, deep learning, and a MySQL backend with admin dashboard.",
    tags: ["Python", "OpenCV", "DeepLearning", "MySQL", "Flask"],
    color: "#8B5CF6",
    icon: "👁️",
    stars: 38,
    status: "Live",
  },
  {
    title: "Big Data Dashboard",
    desc: "Interactive analytics dashboard visualizing large-scale datasets with real-time charts, filters, and drill-down capabilities. Built for processing millions of records efficiently.",
    tags: ["Python", "D3.js", "SQL", "Apache Spark", "React"],
    color: "#06B6D4",
    icon: "📊",
    stars: 55,
    status: "Live",
  },
  {
    title: "Student Management System",
    desc: "Full-stack web application for managing student records, grades, attendance, and fee payments with role-based access control for admins, faculty, and students.",
    tags: ["Java", "Spring Boot", "MySQL", "React", "REST API"],
    color: "#3B82F6",
    icon: "🏫",
    stars: 29,
    status: "Completed",
  },
];

const timeline = [
  { year: "2021", title: "Started B.Tech in AI & Data Science", org: "RTMNU University, Nagpur", icon: "🎓", color: "#3B82F6" },
  { year: "2022", title: "Python & ML Fundamentals", org: "Coursera / Google", icon: "🐍", color: "#8B5CF6" },
  { year: "2023", title: "Built Face Recognition Project", org: "Personal Project", icon: "👁️", color: "#06B6D4" },
  { year: "2023", title: "Data Science Internship", org: "TechSpark Analytics", icon: "💼", color: "#3B82F6" },
  { year: "2024", title: "AI Resume Analyzer Launch", org: "Open Source", icon: "🚀", color: "#8B5CF6" },
  { year: "2025", title: "Seeking Full-time Roles", org: "Available Immediately", icon: "⭐", color: "#06B6D4" },
];

const certifications = [
  { name: "Google Data Analytics", issuer: "Google / Coursera", year: "2023", color: "#3B82F6" },
  { name: "Machine Learning Specialization", issuer: "Stanford / Coursera", year: "2023", color: "#8B5CF6" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024", color: "#06B6D4" },
  { name: "Python for Data Science", issuer: "IBM / edX", year: "2022", color: "#3B82F6" },
  { name: "Deep Learning Fundamentals", issuer: "NVIDIA DLI", year: "2024", color: "#8B5CF6" },
];

const achievements = [
  { title: "Smart India Hackathon", desc: "Top 10 finalist among 5000+ teams nationwide", icon: "🏆", color: "#3B82F6" },
  { title: "AI Research Paper", desc: "Published in IEEE student conference on ML applications", icon: "📰", color: "#8B5CF6" },
  { title: "Open Source Contributor", desc: "150+ GitHub contributions, 3 merged PRs to major repos", icon: "💻", color: "#06B6D4" },
  { title: "Dean's List", desc: "Top 5% of class for 3 consecutive semesters", icon: "🎯", color: "#3B82F6" },
  { title: "State-level Coding Contest", desc: "2nd place in Maharashtra State Data Science Competition", icon: "🥈", color: "#8B5CF6" },
];

const navLinks = ["About", "Skills", "Projects", "Timeline", "Achievements", "Contact"];

const commands = [
  { id: "about", label: "Go to About", action: "about" },
  { id: "skills", label: "Go to Skills", action: "skills" },
  { id: "projects", label: "View Projects", action: "projects" },
  { id: "contact", label: "Contact Arya", action: "contact" },
  { id: "resume", label: "Download Resume", action: "resume" },
  { id: "github", label: "Open GitHub", action: "github" },
  { id: "linkedin", label: "Open LinkedIn", action: "linkedin" },
  { id: "dark", label: "Toggle Theme", action: "theme" },
];

function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color: [COLORS.blue, COLORS.cyan, COLORS.purple][Math.floor(Math.random() * 3)],
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "88";
        ctx.fill();
      });
      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = COLORS.blue + Math.floor((1 - d / 100) * 40).toString(16).padStart(2, "0");
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setP((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 3, zIndex: 9999, background: "rgba(255,255,255,0.05)" }}>
      <div style={{ height: "100%", width: `${p}%`, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan}, ${COLORS.purple})`, transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
}

function CommandPalette({ open, onClose, darkMode, setDarkMode }) {
  const [q, setQ] = useState("");
  const filtered = commands.filter(c => c.label.toLowerCase().includes(q.toLowerCase()));
  const [sel, setSel] = useState(0);

  const exec = useCallback((cmd) => {
    if (cmd.action === "theme") { setDarkMode(d => !d); onClose(); return; }
    if (cmd.action === "github") { window.open("https://github.com/aryajadhav", "_blank"); onClose(); return; }
    if (cmd.action === "linkedin") { window.open("https://linkedin.com/in/aryajadhav", "_blank"); onClose(); return; }
    if (cmd.action === "resume") { alert("Resume download triggered!"); onClose(); return; }
    const el = document.getElementById(cmd.action);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    onClose();
  }, [onClose, setDarkMode]);

  useEffect(() => { setSel(0); }, [q]);
  useEffect(() => {
    if (!open) setQ("");
    const handler = (e) => {
      if (!open) return;
      if (e.key === "ArrowDown") setSel(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSel(s => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[sel]) exec(filtered[sel]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, sel, exec]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 10000, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "15vh", backdropFilter: "blur(8px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 520, background: "#1E293B", borderRadius: 16, border: `1px solid ${COLORS.border}`, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <span style={{ color: COLORS.muted, fontSize: 18 }}>⌘</span>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Type a command..." style={{ flex: 1, background: "none", border: "none", outline: "none", color: COLORS.white, fontSize: 15, fontFamily: "inherit" }} />
          <span onClick={onClose} style={{ color: COLORS.muted, cursor: "pointer", fontSize: 12, padding: "2px 6px", border: `1px solid ${COLORS.border}`, borderRadius: 4 }}>ESC</span>
        </div>
        {filtered.map((c, i) => (
          <div key={c.id} onClick={() => exec(c)} onMouseEnter={() => setSel(i)}
            style={{ padding: "12px 16px", cursor: "pointer", background: i === sel ? "rgba(59,130,246,0.15)" : "transparent", color: i === sel ? COLORS.white : COLORS.muted, borderLeft: i === sel ? `2px solid ${COLORS.blue}` : "2px solid transparent", transition: "all 0.1s", fontSize: 14 }}>
            {c.label}
          </div>
        ))}
        <div style={{ padding: "10px 16px", borderTop: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.muted, display: "flex", gap: 12 }}>
          <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
        </div>
      </div>
    </div>
  );
}

function SkillBar({ skill, index }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(skill.level), 200 + index * 80); return () => clearTimeout(t); }, [skill.level, index]);
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: COLORS.white, fontSize: 14, fontWeight: 500 }}>{skill.icon} {skill.name}</span>
        <span style={{ color: COLORS.muted, fontSize: 13 }}>{skill.level}%</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`, borderRadius: 3, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

function GitHubStats() {
  const stats = [
    { label: "Total Repos", value: "24", icon: "📁" },
    { label: "Total Stars", value: "164", icon: "⭐" },
    { label: "Contributions", value: "482", icon: "🟩" },
    { label: "Pull Requests", value: "37", icon: "🔀" },
  ];
  const weeks = Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => Math.random() > 0.55 ? Math.floor(Math.random() * 4) + 1 : 0)
  );
  const colors = ["#1E293B", "#1e3a5f", "#1d4ed8", "#3b82f6", "#93c5fd"];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "20px 16px", textAlign: "center", border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ color: COLORS.white, fontSize: 24, fontWeight: 700, marginBottom: 2 }}>{s.value}</div>
            <div style={{ color: COLORS.muted, fontSize: 12 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 3, minWidth: "fit-content" }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {week.map((val, di) => (
                <div key={di} title={`${val} contributions`} style={{ width: 12, height: 12, borderRadius: 2, background: colors[val], transition: "transform 0.1s" }} onMouseEnter={e => e.target.style.transform = "scale(1.4)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState("");
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => { if (form.name && form.email && form.message) setSent(true); };
  const inputStyle = (field) => ({
    width: "100%", background: focused === field ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? COLORS.blue : COLORS.border}`,
    borderRadius: 10, padding: "12px 16px", color: COLORS.white, fontSize: 14, fontFamily: "inherit",
    outline: "none", transition: "all 0.2s", boxSizing: "border-box",
  });
  if (sent) return (
    <div style={{ textAlign: "center", padding: "48px 0" }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
      <div style={{ color: COLORS.white, fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Message Sent!</div>
      <div style={{ color: COLORS.muted }}>I'll get back to you within 24 hours.</div>
      <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} style={{ marginTop: 20, padding: "10px 24px", background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.muted, cursor: "pointer", fontSize: 13 }}>Send another</button>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6, display: "block" }}>Your Name</label>
          <input value={form.name} onChange={handle("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused("")} placeholder="Jane Smith" style={inputStyle("name")} />
        </div>
        <div>
          <label style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6, display: "block" }}>Email Address</label>
          <input value={form.email} onChange={handle("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} placeholder="jane@company.com" style={inputStyle("email")} />
        </div>
      </div>
      <div>
        <label style={{ color: COLORS.muted, fontSize: 12, marginBottom: 6, display: "block" }}>Message</label>
        <textarea value={form.message} onChange={handle("message")} onFocus={() => setFocused("message")} onBlur={() => setFocused("")} placeholder="I'd love to discuss a role or collaboration..." rows={5} style={{ ...inputStyle("message"), resize: "none" }} />
      </div>
      <button onClick={submit} style={{ padding: "14px 32px", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, border: "none", borderRadius: 10, color: "#fff", fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s" }} onMouseEnter={e => e.target.style.opacity = 0.88} onMouseLeave={e => e.target.style.opacity = 1}>
        Send Message →
      </button>
    </div>
  );
}

function Section({ id, children, style = {} }) {
  return (
    <section id={id} style={{ padding: "80px 0", ...style }}>
      {children}
    </section>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 48, textAlign: "center" }}>
      <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.white, margin: "0 0 10px", letterSpacing: "-0.5px" }}>{children}</h2>
      {sub && <p style={{ color: COLORS.muted, fontSize: 16, margin: 0 }}>{sub}</p>}
      <div style={{ width: 48, height: 3, background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.cyan})`, borderRadius: 2, margin: "16px auto 0" }} />
    </div>
  );
}

function GlassCard({ children, style = {}, hover = true }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${hov && hover ? "rgba(59,130,246,0.3)" : COLORS.border}`, borderRadius: 16, padding: 24, transition: "all 0.3s", transform: hov && hover ? "translateY(-3px)" : "none", boxShadow: hov && hover ? "0 16px 40px rgba(0,0,0,0.3)" : "none", ...style }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [tagline, setTagline] = useState(0);

  const taglines = ["AI & Data Science Student", "Aspiring Software Engineer", "ML Enthusiast", "Open Source Contributor"];
  useEffect(() => { const t = setInterval(() => setTagline(i => (i + 1) % taglines.length), 2800); return () => clearInterval(t); }, []);

  useEffect(() => {
    const handler = (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(o => !o); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.3 });
    ["hero", "about", "skills", "projects", "timeline", "achievements", "contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileMenu(false); };

  const bg = darkMode ? COLORS.bg : "#F1F5F9";
  const cardBg = darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
  const textColor = darkMode ? COLORS.white : "#0F172A";
  const mutedColor = darkMode ? COLORS.muted : "#475569";
  const borderColor = darkMode ? COLORS.border : "rgba(0,0,0,0.08)";

  return (
    <div style={{ background: bg, color: textColor, minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", transition: "all 0.3s", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <ScrollProgress />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Navbar */}
      <nav style={{ position: "fixed", top: 8, left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "calc(100% - 48px)", maxWidth: 960, background: darkMode ? "rgba(15,23,42,0.85)" : "rgba(241,245,249,0.9)", backdropFilter: "blur(20px)", border: `1px solid ${borderColor}`, borderRadius: 14, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AJ</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())}
              style={{ padding: "6px 14px", background: activeSection === link.toLowerCase() ? `rgba(59,130,246,0.15)` : "transparent", border: "none", borderRadius: 8, color: activeSection === link.toLowerCase() ? COLORS.blue : mutedColor, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
              {link}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setCmdOpen(true)} title="Ctrl+K" style={{ padding: "6px 10px", background: "transparent", border: `1px solid ${borderColor}`, borderRadius: 8, color: mutedColor, cursor: "pointer", fontSize: 11, fontFamily: "inherit" }}>⌘K</button>
          <button onClick={() => setDarkMode(d => !d)} style={{ padding: "6px 10px", background: "transparent", border: `1px solid ${borderColor}`, borderRadius: 8, color: mutedColor, cursor: "pointer", fontSize: 14 }}>{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "80px 24px 0" }}>
        {darkMode && <ParticleField />}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 60%, rgba(59,130,246,0.12) 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ textAlign: "center", position: "relative", maxWidth: 720, zIndex: 1 }}>
          {/* Avatar */}
          <div style={{ width: 120, height: 120, borderRadius: "50%", margin: "0 auto 28px", position: "relative", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})`, padding: 3 }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: darkMode ? "#1E293B" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, fontWeight: 700, color: COLORS.blue, fontFamily: "'Space Grotesk',sans-serif" }}>
              AJ
            </div>
            <div style={{ position: "absolute", bottom: 4, right: 4, width: 18, height: 18, borderRadius: "50%", background: "#10B981", border: `2px solid ${bg}` }} title="Available for work" />
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "4px 14px", marginBottom: 20, fontSize: 12, color: COLORS.blue }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} /> Available for full-time roles
          </div>

          <h1 style={{ fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, margin: "0 0 12px", letterSpacing: "-2px", fontFamily: "'Space Grotesk',sans-serif", lineHeight: 1.1 }}>
            Arya Jadhav
          </h1>

          <div style={{ height: 36, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <span style={{ fontSize: "clamp(16px,2.5vw,22px)", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 600, transition: "opacity 0.5s" }}>
              {taglines[tagline]}
            </span>
          </div>

          <p style={{ color: mutedColor, fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
            Building intelligent systems at the intersection of AI, Data Science, and Software Engineering. Passionate about creating real-world impact through code.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "📄 Resume", primary: true, href: "#" },
              { label: "💻 GitHub", href: "https://github.com" },
              { label: "🔗 LinkedIn", href: "https://linkedin.com" },
              { label: "✉️ Contact", action: () => scrollTo("contact") },
            ].map(btn => (
              <a key={btn.label} href={btn.href || "#"} onClick={btn.action ? (e) => { e.preventDefault(); btn.action(); } : undefined} target={btn.href && btn.href !== "#" ? "_blank" : undefined} rel="noreferrer"
                style={{ padding: "12px 24px", background: btn.primary ? `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.purple})` : "transparent", border: `1px solid ${btn.primary ? "transparent" : borderColor}`, borderRadius: 10, color: btn.primary ? "#fff" : textColor, fontWeight: 600, fontSize: 14, cursor: "pointer", textDecoration: "none", transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
                {btn.label}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
            {[["24+", "Projects Built"], ["482", "GitHub Commits"], ["5+", "Certifications"], ["3", "Internships"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif", background: `linear-gradient(135deg, ${COLORS.blue}, ${COLORS.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                <div style={{ fontSize: 12, color: mutedColor, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* About */}
        <Section id="about">
          <SectionTitle sub="A bit about who I am and what drives me">About Me</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <GlassCard>
              <h3 style={{ color: COLORS.white, fontSize: 20, fontWeight: 600, marginBottom: 16 }}>🎓 The Student</h3>
              <p style={{ color: mutedColor, lineHeight: 1.8, margin: 0, fontSize: 15 }}>
                I'm a final-year B.Tech student in <strong style={{ color: COLORS.white }}>Artificial Intelligence & Data Science</strong> from Nagpur, Maharashtra. My academic journey has given me a strong foundation in machine learning, algorithms, and software development.
              </p>
              <p style={{ color: mutedColor, lineHeight: 1.8, marginTop: 12, fontSize: 15, marginBottom: 0 }}>
                I believe in building things that matter—not just for assignments, but projects that solve real problems. Every line of code is an opportunity to learn something new.
              </p>
            </GlassCard>
            <GlassCard>
              <h3 style={{ color: COLORS.white, fontSize: 20, fontWeight: 600, marginBottom: 16 }}>🚀 The Builder</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "🤖", t: "AI & Machine Learning", d: "NLP, Computer Vision, Deep Learning" },
                  { icon: "📊", t: "Data Science", d: "Analytics, Visualization, Big Data" },
                  { icon: "💻", t: "Full-Stack Dev", d: "React, Spring Boot, REST APIs" },
                  { icon: "☁️", t: "Cloud & DevOps", d: "AWS, Git, Docker basics" },
                ].map(item => (
                  <div key={item.t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: COLORS.white, fontWeight: 500, fontSize: 14 }}>{item.t}</div>
                      <div style={{ color: mutedColor, fontSize: 12 }}>{item.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills">
          <SectionTitle sub="Technologies I work with">Technical Skills</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <GlassCard>
              <h3 style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Proficiency Levels</h3>
              {skills.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
            </GlassCard>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <GlassCard>
                <h3 style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Tech Stack</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Python", "Java", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3", "React", "Spring Boot", "Flask", "TensorFlow", "OpenCV", "MySQL", "PostgreSQL", "Git", "GitHub", "Docker", "AWS", "Linux", "REST APIs"].map(tech => (
                    <span key={tech} style={{ padding: "5px 12px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 20, color: COLORS.blue, fontSize: 12, fontWeight: 500 }}>{tech}</span>
                  ))}
                </div>
              </GlassCard>
              <GlassCard>
                <h3 style={{ color: COLORS.white, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Currently Learning</h3>
                {["LLM Fine-tuning & Prompt Engineering", "MLOps & Model Deployment", "Kubernetes & Cloud-Native", "Rust for Systems Programming"].map(item => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.cyan, flexShrink: 0 }} />
                    <span style={{ color: mutedColor, fontSize: 13 }}>{item}</span>
                  </div>
                ))}
              </GlassCard>
            </div>
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects">
          <SectionTitle sub="Selected work and side projects">Featured Projects</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {projects.map(p => (
              <GlassCard key={p.title} style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, ${p.color}66)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{p.icon}</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ padding: "3px 8px", background: p.status === "Live" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)", borderRadius: 20, fontSize: 11, color: p.status === "Live" ? "#10B981" : mutedColor, fontWeight: 500, border: `1px solid ${p.status === "Live" ? "rgba(16,185,129,0.3)" : borderColor}` }}>
                      {p.status === "Live" ? "🟢 Live" : "✅ Done"}
                    </span>
                    <span style={{ color: mutedColor, fontSize: 12 }}>⭐ {p.stars}</span>
                  </div>
                </div>
                <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif" }}>{p.title}</h3>
                <p style={{ color: mutedColor, fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: "3px 8px", background: "rgba(255,255,255,0.04)", border: `1px solid ${borderColor}`, borderRadius: 6, fontSize: 11, color: mutedColor }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                  <a href="#" style={{ fontSize: 13, color: p.color, textDecoration: "none", fontWeight: 500 }}>View Code →</a>
                  <a href="#" style={{ fontSize: 13, color: mutedColor, textDecoration: "none" }}>Live Demo</a>
                </div>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* Timeline */}
        <Section id="timeline">
          <SectionTitle sub="Experience, education & career roadmap">Journey & Timeline</SectionTitle>
          <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
            <div style={{ position: "absolute", left: 31, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${COLORS.blue}, ${COLORS.purple}, ${COLORS.cyan})` }} />
            {timeline.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 24, marginBottom: 32, position: "relative" }}>
                <div style={{ width: 62, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: `2px solid ${item.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, zIndex: 1 }}>{item.icon}</div>
                </div>
                <GlassCard style={{ flex: 1, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <h3 style={{ color: COLORS.white, fontSize: 15, fontWeight: 600, margin: 0 }}>{item.title}</h3>
                    <span style={{ color: item.color, fontSize: 12, fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif", flexShrink: 0, marginLeft: 8 }}>{item.year}</span>
                  </div>
                  <p style={{ color: mutedColor, fontSize: 13, margin: 0 }}>{item.org}</p>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ marginTop: 60 }}>
            <SectionTitle sub="Professional certifications earned">Certifications</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {certifications.map(c => (
                <GlassCard key={c.name} style={{ padding: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12 }}>🏅</div>
                  <h4 style={{ color: COLORS.white, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.name}</h4>
                  <p style={{ color: mutedColor, fontSize: 12, margin: "0 0 8px" }}>{c.issuer}</p>
                  <span style={{ fontSize: 11, color: c.color, fontWeight: 600 }}>{c.year}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </Section>

        {/* GitHub Stats */}
        <Section id="github">
          <SectionTitle sub="Open source activity & GitHub contributions">GitHub Activity</SectionTitle>
          <GlassCard hover={false}>
            <GitHubStats />
          </GlassCard>
        </Section>

        {/* Achievements */}
        <Section id="achievements">
          <SectionTitle sub="Recognition, awards & highlights">Achievements</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {achievements.map(a => (
              <GlassCard key={a.title} style={{ textAlign: "center", padding: 28 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{a.icon}</div>
                <h3 style={{ color: COLORS.white, fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Space Grotesk',sans-serif" }}>{a.title}</h3>
                <p style={{ color: mutedColor, fontSize: 13, margin: 0, lineHeight: 1.6 }}>{a.desc}</p>
              </GlassCard>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact">
          <SectionTitle sub="Let's build something great together">Get In Touch</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <GlassCard hover={false}>
                <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Open to opportunities</h3>
                <p style={{ color: mutedColor, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
                  I'm actively seeking full-time software engineering and data science roles. I'm especially interested in AI/ML, backend development, and data-intensive applications.
                </p>
                {[
                  { icon: "📧", label: "Email", val: "arya.jadhav@email.com" },
                  { icon: "📍", label: "Location", val: "Nagpur, Maharashtra, IN" },
                  { icon: "💼", label: "Status", val: "Available Immediately" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <div>
                      <div style={{ color: mutedColor, fontSize: 11 }}>{item.label}</div>
                      <div style={{ color: COLORS.white, fontSize: 13, fontWeight: 500 }}>{item.val}</div>
                    </div>
                  </div>
                ))}
              </GlassCard>
              <div style={{ display: "flex", gap: 10 }}>
                {[["GitHub", "💻", "https://github.com"], ["LinkedIn", "🔗", "https://linkedin.com"], ["Twitter", "🐦", "https://twitter.com"]].map(([n, i, h]) => (
                  <a key={n} href={h} target="_blank" rel="noreferrer" style={{ flex: 1, padding: "12px 0", background: "rgba(255,255,255,0.04)", border: `1px solid ${borderColor}`, borderRadius: 10, textAlign: "center", textDecoration: "none", color: mutedColor, fontSize: 20, transition: "all 0.2s" }} onMouseEnter={e => { e.target.style.background = "rgba(59,130,246,0.1)"; e.target.style.color = COLORS.blue; }} onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.color = mutedColor; }}>
                    {i}
                  </a>
                ))}
              </div>
            </div>
            <GlassCard hover={false}>
              <h3 style={{ color: COLORS.white, fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Send a message</h3>
              <ContactForm />
            </GlassCard>
          </div>
        </Section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${borderColor}`, padding: "24px", textAlign: "center", color: mutedColor, fontSize: 13 }}>
        <span>Designed & built by <strong style={{ color: COLORS.white }}>Arya Jadhav</strong> · {new Date().getFullYear()}</span>
        <span style={{ margin: "0 12px", opacity: 0.3 }}>|</span>
        <span>Press <kbd style={{ padding: "2px 6px", background: "rgba(255,255,255,0.06)", border: `1px solid ${borderColor}`, borderRadius: 4, fontSize: 11 }}>⌘ K</kbd> for quick navigation</span>
      </footer>
    </div>
  );
}
