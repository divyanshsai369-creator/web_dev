import { useState, useEffect, useRef } from "react";
 
/* ── Google Fonts injected once ── */
const FontLink = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};
 
/* ── CSS-in-JS via <style> tag ── */
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      :root {
        --bg: #050d1a;
        --card: #0a1628;
        --card2: #0f1f38;
        --accent: #00d4ff;
        --accent2: #0077ff;
        --text: #e8f4ff;
        --muted: #4a6a8a;
        --border: #0e2240;
      }
      body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; overflow-x: hidden; }
 
      /* scrollbar */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }
 
      /* cursor */
      .ds-cursor {
        position: fixed; width: 9px; height: 9px;
        background: var(--accent); border-radius: 50%;
        pointer-events: none; z-index: 9999;
        transform: translate(-50%,-50%);
        mix-blend-mode: difference;
        transition: transform .08s;
      }
 
      /* noise */
      .ds-noise {
        position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: .35;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.07'/%3E%3C/svg%3E");
      }
 
      /* reveal */
      .ds-reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s, transform .7s; }
      .ds-reveal.ds-vis { opacity: 1; transform: none; }
 
      /* nav */
      .ds-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(11,11,11,.85); backdrop-filter: blur(18px);
        border-bottom: 1px solid var(--border);
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 10vw; height: 58px;
      }
      .ds-nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; color: var(--accent); font-size: 1rem; letter-spacing: -.02em; }
      .ds-nav-links { display: flex; gap: 2rem; list-style: none; }
      .ds-nav-links a { color: var(--muted); text-decoration: none; font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; transition: color .2s; }
      .ds-nav-links a:hover { color: var(--accent); }
 
      /* hero */
      .ds-hero {
        position: relative; min-height: 100vh; display: flex; flex-direction: column;
        justify-content: center; padding: 6rem 10vw;
        border-bottom: 1px solid var(--border); overflow: hidden;
      }
      .ds-hero-bg {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
        font-family: 'Syne', sans-serif; font-size: clamp(80px, 18vw, 210px);
        font-weight: 800; color: transparent; -webkit-text-stroke: 1px #0d2a50;
        white-space: nowrap; pointer-events: none; user-select: none;
      }
      .ds-hero-tag {
        font-size: .7rem; letter-spacing: .22em; color: var(--accent);
        text-transform: uppercase; margin-bottom: 1.5rem;
        opacity: 0; animation: fadeUp .8s .2s forwards;
      }
      .ds-hero h1 {
        font-family: 'Syne', sans-serif;
        font-size: clamp(2.8rem, 7vw, 6rem);
        font-weight: 800; line-height: .95; letter-spacing: -.03em; margin-bottom: 1.5rem;
        opacity: 0; animation: fadeUp .8s .4s forwards;
      }
      .ds-hero h1 span { color: var(--accent); display: block; }
      .ds-hero-sub {
        font-size: .83rem; color: var(--muted); max-width: 400px; line-height: 1.9;
        opacity: 0; animation: fadeUp .8s .6s forwards;
      }
      .ds-hero-line {
        position: absolute; bottom: 0; left: 10vw; right: 10vw;
        height: 1px; background: linear-gradient(90deg, var(--accent), transparent);
      }
      .ds-scroll-hint {
        position: absolute; bottom: 2rem; right: 10vw;
        font-size: .65rem; letter-spacing: .15em; color: var(--muted);
        text-transform: uppercase;
        opacity: 0; animation: fadeUp .8s .9s forwards;
        display: flex; align-items: center; gap: .5rem;
      }
      .ds-scroll-hint::before {
        content: ''; display: block; width: 1px; height: 30px; background: var(--muted);
      }
 
      /* section */
      .ds-section { padding: 7rem 0; border-bottom: 1px solid var(--border); }
      .ds-section-wrap { max-width: 1100px; margin: 0 auto; padding: 0 10vw; }
      .ds-label {
        font-size: .68rem; letter-spacing: .2em; color: var(--accent); text-transform: uppercase;
        margin-bottom: .75rem; display: flex; align-items: center; gap: .75rem;
      }
      .ds-label::before { content: ''; display: block; width: 30px; height: 1px; background: var(--accent); }
      .ds-title {
        font-family: 'Syne', sans-serif;
        font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 800;
        letter-spacing: -.03em; line-height: 1; margin-bottom: 3rem;
      }
 
      /* about */
      .ds-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
      .ds-about-text p { font-size: .87rem; color: var(--muted); line-height: 1.9; margin-bottom: 1.2rem; }
      .ds-about-text p strong { color: var(--text); font-weight: 400; }
      .ds-linkedin {
        display: inline-flex; align-items: center; gap: .5rem;
        margin-top: .5rem; padding: .65rem 1.25rem;
        background: #0077b5; color: white; text-decoration: none;
        font-size: .72rem; letter-spacing: .08em; text-transform: uppercase;
        border-radius: 2px; transition: background .2s, transform .15s;
      }
      .ds-linkedin:hover { background: #005c8e; transform: translateY(-1px); }
      .ds-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
      .ds-stat-card {
        background: var(--card); border: 1px solid var(--border); border-radius: 2px;
        padding: 1.75rem 1.5rem; position: relative; overflow: hidden;
      }
      .ds-stat-card::before {
        content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: var(--accent);
      }
      .ds-stat-label { font-size: .62rem; letter-spacing: .15em; color: var(--muted); text-transform: uppercase; margin-bottom: .4rem; }
      .ds-stat-value { font-family: 'Syne', sans-serif; font-size: 1.4rem; font-weight: 800; color: var(--accent); }
 
      /* skills */
      .ds-skills-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1.5px; background: var(--border); border: 1px solid var(--border); }
      .ds-skill-card { background: var(--card); padding: 2rem 1.75rem; transition: background .25s; cursor: default; }
      .ds-skill-card:hover { background: var(--card2); }
      .ds-skill-icon { font-size: 2rem; margin-bottom: 1rem; display: block; transition: transform .3s; }
      .ds-skill-card:hover .ds-skill-icon { transform: scale(1.1) rotate(-5deg); }
      .ds-skill-name { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; margin-bottom: .35rem; }
      .ds-skill-level { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
      .ds-skill-bar { margin-top: 1rem; height: 2px; background: var(--border); border-radius: 1px; overflow: hidden; }
      .ds-skill-fill { height: 100%; background: var(--accent); border-radius: 1px; transition: width 1.2s ease; }
 
      /* project */
      .ds-project-card {
        background: var(--card); border: 1px solid var(--border); border-radius: 2px;
        padding: 2.8rem; display: grid; grid-template-columns: 1fr auto; gap: 2rem;
        align-items: start; transition: border-color .3s, transform .3s;
      }
      .ds-project-card:hover { border-color: var(--accent); transform: translateY(-2px); }
      .ds-proj-num { font-size: .68rem; letter-spacing: .15em; color: var(--accent); text-transform: uppercase; margin-bottom: 1rem; }
      .ds-proj-title { font-family: 'Syne', sans-serif; font-size: 1.55rem; font-weight: 800; letter-spacing: -.02em; margin-bottom: .75rem; line-height: 1.1; }
      .ds-proj-desc { font-size: .82rem; color: var(--muted); line-height: 1.85; max-width: 500px; }
      .ds-proj-tags { display: flex; gap: .5rem; margin-top: 1.5rem; flex-wrap: wrap; }
      .ds-tag {
        font-size: .62rem; letter-spacing: .12em; text-transform: uppercase;
        padding: .3rem .75rem; border: 1px solid var(--border); color: var(--muted); border-radius: 1px;
      }
      .ds-proj-arrow { font-size: 2rem; color: var(--border); transition: color .3s, transform .3s; align-self: center; }
      .ds-project-card:hover .ds-proj-arrow { color: var(--accent); transform: translate(4px,-4px); }
 
      /* contact */
      .ds-contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: start; }
      .ds-contact-quote { font-family: 'Syne', sans-serif; font-size: 1.45rem; font-weight: 700; letter-spacing: -.02em; color: var(--accent); line-height: 1.3; margin-bottom: 1.25rem; }
      .ds-contact-sub { font-size: .84rem; color: var(--muted); line-height: 1.9; }
      .ds-form-group { margin-bottom: 1.4rem; }
      .ds-form-label { display: block; font-size: .63rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin-bottom: .55rem; }
      .ds-form-input {
        width: 100%; background: var(--card); border: 1px solid var(--border);
        color: var(--text); font-family: 'DM Mono', monospace; font-size: .84rem;
        padding: .8rem 1rem; border-radius: 2px; outline: none; transition: border-color .2s;
      }
      .ds-form-input:focus { border-color: var(--accent); }
      .ds-form-input::placeholder { color: var(--muted); opacity: .5; }
      textarea.ds-form-input { resize: vertical; min-height: 120px; }
      .ds-submit {
        width: 100%; background: var(--accent); color: #050d1a;
        border: none; font-family: 'Syne', sans-serif; font-size: .83rem;
        font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
        padding: 1rem; cursor: pointer; border-radius: 2px;
        transition: background .2s, transform .15s;
      }
      .ds-submit:hover { background: #33ddff; transform: translateY(-1px); }
      .ds-submit:active { transform: none; }
      .ds-form-msg { margin-top: .75rem; font-size: .77rem; min-height: 1.2em; }
 
      /* footer */
      .ds-footer {
        padding: 1.75rem 10vw; display: flex; justify-content: space-between;
        align-items: center; border-top: 1px solid var(--border);
      }
      .ds-footer-copy { font-size: .7rem; color: var(--muted); letter-spacing: .08em; }
      .ds-footer-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }
 
      @keyframes fadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
      @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.4; transform:scale(.65); } }
 
      @media (max-width: 768px) {
        .ds-hero, .ds-section-wrap { padding-left: 6vw; padding-right: 6vw; }
        .ds-nav { padding: 0 6vw; }
        .ds-footer { padding: 1.5rem 6vw; }
        .ds-about-grid, .ds-contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        .ds-skills-grid { grid-template-columns: 1fr 1fr; }
        .ds-project-card { grid-template-columns: 1fr; }
        .ds-proj-arrow { display: none; }
        .ds-stat-grid { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 480px) {
        .ds-skills-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};
 
/* ── useReveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ds-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("ds-vis"), i * 90);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}
 
/* ── Cursor ── */
function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="ds-cursor" ref={ref} />;
}
 
/* ── Nav ── */
function Nav() {
  return (
    <nav className="ds-nav">
      <div className="ds-nav-logo">DS</div>
      <ul className="ds-nav-links">
        {["about", "skills", "projects", "contact"].map((s) => (
          <li key={s}>
            <a href={`#${s}`}>{s}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
 
/* ── Hero ── */
function Hero() {
  return (
    <header className="ds-hero">
      <div className="ds-hero-bg">DS</div>
      <p className="ds-hero-tag">Portfolio 2026</p>
      <h1>
        Divyansh
        <span>Saini.</span>
      </h1>
      <p className="ds-hero-sub">
        BCA student · Web Developer in progress ·<br />
        Building things one line at a time.
      </p>
      <div className="ds-hero-line" />
      <div className="ds-scroll-hint">Scroll</div>
    </header>
  );
}
 
/* ── About ── */
function About() {
  return (
    <section className="ds-section" id="about">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">Introduction</p>
        <h2 className="ds-title ds-reveal">About Me</h2>
        <div className="ds-about-grid">
          <div className="ds-about-text ds-reveal">
            <p>
              I'm <strong>Divyansh Saini</strong>, a student currently pursuing
              a Bachelor of Computer Applications (BCA) and actively learning
              Web Development from the ground up.
            </p>
            <p>
              My focus is on building practical, functional projects that solve
              real problems — like automating student result and marksheet
              generation. I'm passionate about coding, problem-solving, and
              growing one skill at a time.
            </p>
            <a
              className="ds-linkedin"
              href="https://www.linkedin.com/in/divyansh-saini-b6462237a/"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
          <div className="ds-stat-grid ds-reveal">
            {[
              { label: "Degree", value: "BCA" },
              { label: "Status", value: "Active" },
              { label: "Focus", value: "Web Dev" },
              { label: "Year", value: "2026" },
            ].map((s) => (
              <div className="ds-stat-card" key={s.label}>
                <div className="ds-stat-label">{s.label}</div>
                <div className="ds-stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
 
/* ── Skills ── */
const SKILLS = [
  { icon: "☕", name: "Java", level: "Programming", pct: 70 },
  { icon: "🖥", name: "MS Office", level: "Productivity", pct: 85 },
  { icon: "🌐", name: "HTML", level: "Web — Learning", pct: 55 },
  { icon: "🎨", name: "CSS", level: "Web — Learning", pct: 50 },
];
 
function SkillCard({ icon, name, level, pct }) {
  const fillRef = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && fillRef.current) {
          fillRef.current.style.width = pct + "%";
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (fillRef.current) obs.observe(fillRef.current.parentElement);
    return () => obs.disconnect();
  }, [pct]);
 
  return (
    <div className="ds-skill-card">
      <span className="ds-skill-icon">{icon}</span>
      <div className="ds-skill-name">{name}</div>
      <div className="ds-skill-level">{level}</div>
      <div className="ds-skill-bar">
        <div className="ds-skill-fill" ref={fillRef} style={{ width: 0 }} />
      </div>
    </div>
  );
}
 
function Skills() {
  return (
    <section className="ds-section" id="skills">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">What I know</p>
        <h2 className="ds-title ds-reveal">Skills</h2>
        <div className="ds-skills-grid ds-reveal">
          {SKILLS.map((s) => (
            <SkillCard key={s.name} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
 
/* ── Projects ── */
function Projects() {
  return (
    <section className="ds-section" id="projects">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">What I've built</p>
        <h2 className="ds-title ds-reveal">Projects</h2>
        <div className="ds-project-card ds-reveal">
          <div>
            <div className="ds-proj-num">Project — 01</div>
            <div className="ds-proj-title">
              Student Result &amp;<br />Marksheet Generator
            </div>
            <p className="ds-proj-desc">
              A system to automate the creation of student result summaries and
              printable marksheets — reducing manual effort and minimising
              errors in academic record-keeping.
            </p>
            <div className="ds-proj-tags">
              {["Java", "Academic", "Automation"].map((t) => (
                <span className="ds-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="ds-proj-arrow">↗</div>
        </div>
      </div>
    </section>
  );
}
 
/* ── Contact ── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState({ text: "", color: "" });
 
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setMsg({ text: "⚠ Please fill in all fields.", color: "#f04a7a" });
      return;
    }
    if (!/^[^ ]+@[^ ]+\.[a-z]{2,4}$/.test(email)) {
      setMsg({ text: "⚠ Invalid email address.", color: "#f04a7a" });
      return;
    }
    setMsg({ text: "✓ Message sent successfully!", color: "#c8f04a" });
    setForm({ name: "", email: "", message: "" });
  };
 
  return (
    <section className="ds-section" id="contact">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">Get in touch</p>
        <h2 className="ds-title ds-reveal">Contact Me</h2>
        <div className="ds-contact-grid">
          <div className="ds-reveal">
            <p className="ds-contact-quote">
              "Every expert was once a beginner."
            </p>
            <p className="ds-contact-sub">
              Whether you have a project idea, a question, or just want to
              connect — I'd love to hear from you. Fill in the form and I'll
              get back to you.
            </p>
          </div>
          <form className="ds-reveal" onSubmit={handleSubmit} noValidate>
            {[
              { label: "Name", name: "name", type: "text", placeholder: "Your name" },
              { label: "Email", name: "email", type: "email", placeholder: "your@email.com" },
            ].map((f) => (
              <div className="ds-form-group" key={f.name}>
                <label className="ds-form-label">{f.label}</label>
                <input
                  className="ds-form-input"
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                />
              </div>
            ))}
            <div className="ds-form-group">
              <label className="ds-form-label">Message</label>
              <textarea
                className="ds-form-input"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={4}
              />
            </div>
            <button className="ds-submit" type="submit">
              Send Message →
            </button>
            {msg.text && (
              <p className="ds-form-msg" style={{ color: msg.color }}>
                {msg.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
 
/* ── Footer ── */
function Footer() {
  return (
    <footer className="ds-footer">
      <span className="ds-footer-copy">© 2026 Divyansh Saini</span>
      <div className="ds-footer-dot" />
    </footer>
  );
}
 
/* ── App ── */
export default function App() {
  useReveal();
  return (
    <>
      <FontLink />
      <GlobalStyles />
      <Cursor />
      <div className="ds-noise" />
      <Hero />
      <Nav />
      <main>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}