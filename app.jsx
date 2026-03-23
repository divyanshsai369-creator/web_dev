import { useState, useEffect, useRef } from "react";

/* ── Google Fonts ── */
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

/* ── Global CSS ── */
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      :root {
        --bg: #050d1a; --card: #0a1628; --card2: #0f1f38;
        --accent: #00d4ff; --accent2: #0077ff;
        --text: #e8f4ff; --muted: #4a6a8a; --border: #0e2240;
        --red: #f04a7a; --green: #c8f04a;
      }
      body { background: var(--bg); color: var(--text); font-family: 'DM Mono', monospace; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

      .ds-cursor {
        position: fixed; width: 9px; height: 9px;
        background: var(--accent); border-radius: 50%;
        pointer-events: none; z-index: 9999;
        transform: translate(-50%,-50%); mix-blend-mode: difference;
      }
      .ds-noise {
        position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: .35;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.07'/%3E%3C/svg%3E");
      }
      .ds-reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s, transform .7s; }
      .ds-reveal.ds-vis { opacity: 1; transform: none; }

      /* nav */
      .ds-nav {
        position: sticky; top: 0; z-index: 100;
        background: rgba(5,13,26,.9); backdrop-filter: blur(18px);
        border-bottom: 1px solid var(--border);
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 10vw; height: 58px;
      }
      .ds-nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; color: var(--accent); font-size: 1rem; letter-spacing: -.02em; }
      .ds-nav-links { display: flex; gap: 1.6rem; list-style: none; }
      .ds-nav-links a { color: var(--muted); text-decoration: none; font-size: .68rem; letter-spacing: .14em; text-transform: uppercase; transition: color .2s; }
      .ds-nav-links a:hover { color: var(--accent); }

      /* hero */
      .ds-hero {
        position: relative; min-height: 100vh; display: flex; flex-direction: column;
        justify-content: center; padding: 6rem 10vw;
        border-bottom: 1px solid var(--border); overflow: hidden;
      }
      .ds-hero-bg {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
        font-family: 'Syne', sans-serif; font-size: clamp(80px,18vw,210px);
        font-weight: 800; color: transparent; -webkit-text-stroke: 1px #0d2a50;
        white-space: nowrap; pointer-events: none; user-select: none;
      }
      .ds-hero-tag { font-size: .7rem; letter-spacing: .22em; color: var(--accent); text-transform: uppercase; margin-bottom: 1.5rem; opacity: 0; animation: fadeUp .8s .2s forwards; }
      .ds-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(2.8rem,7vw,6rem); font-weight: 800; line-height: .95; letter-spacing: -.03em; margin-bottom: 1.5rem; opacity: 0; animation: fadeUp .8s .4s forwards; }
      .ds-hero h1 span { color: var(--accent); display: block; }
      .ds-hero-sub { font-size: .83rem; color: var(--muted); max-width: 400px; line-height: 1.9; opacity: 0; animation: fadeUp .8s .6s forwards; }
      .ds-hero-line { position: absolute; bottom: 0; left: 10vw; right: 10vw; height: 1px; background: linear-gradient(90deg, var(--accent), transparent); }
      .ds-scroll-hint { position: absolute; bottom: 2rem; right: 10vw; font-size: .65rem; letter-spacing: .15em; color: var(--muted); text-transform: uppercase; opacity: 0; animation: fadeUp .8s .9s forwards; display: flex; align-items: center; gap: .5rem; }
      .ds-scroll-hint::before { content: ''; display: block; width: 1px; height: 30px; background: var(--muted); }

      /* section */
      .ds-section { padding: 7rem 0; border-bottom: 1px solid var(--border); }
      .ds-section-wrap { max-width: 1100px; margin: 0 auto; padding: 0 10vw; }
      .ds-label { font-size: .68rem; letter-spacing: .2em; color: var(--accent); text-transform: uppercase; margin-bottom: .75rem; display: flex; align-items: center; gap: .75rem; }
      .ds-label::before { content: ''; display: block; width: 30px; height: 1px; background: var(--accent); }
      .ds-title { font-family: 'Syne', sans-serif; font-size: clamp(2rem,4vw,3.2rem); font-weight: 800; letter-spacing: -.03em; line-height: 1; margin-bottom: 3rem; }

      /* about */
      .ds-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
      .ds-about-text p { font-size: .87rem; color: var(--muted); line-height: 1.9; margin-bottom: 1.2rem; }
      .ds-about-text p strong { color: var(--text); font-weight: 400; }
      .ds-linkedin { display: inline-flex; align-items: center; gap: .5rem; margin-top: .5rem; padding: .65rem 1.25rem; background: #0077b5; color: white; text-decoration: none; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; border-radius: 2px; transition: background .2s, transform .15s; }
      .ds-linkedin:hover { background: #005c8e; transform: translateY(-1px); }
      .ds-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
      .ds-stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 2px; padding: 1.75rem 1.5rem; position: relative; overflow: hidden; }
      .ds-stat-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: var(--accent); }
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
      .ds-project-card { background: var(--card); border: 1px solid var(--border); border-radius: 2px; padding: 2.8rem; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: start; transition: border-color .3s, transform .3s; margin-bottom: 1.5rem; }
      .ds-project-card:hover { border-color: var(--accent); transform: translateY(-2px); }
      .ds-proj-num { font-size: .68rem; letter-spacing: .15em; color: var(--accent); text-transform: uppercase; margin-bottom: 1rem; }
      .ds-proj-title { font-family: 'Syne', sans-serif; font-size: 1.55rem; font-weight: 800; letter-spacing: -.02em; margin-bottom: .75rem; line-height: 1.1; }
      .ds-proj-desc { font-size: .82rem; color: var(--muted); line-height: 1.85; max-width: 500px; }
      .ds-proj-tags { display: flex; gap: .5rem; margin-top: 1.5rem; flex-wrap: wrap; }
      .ds-tag { font-size: .62rem; letter-spacing: .12em; text-transform: uppercase; padding: .3rem .75rem; border: 1px solid var(--border); color: var(--muted); border-radius: 1px; }
      .ds-tag-accent { border-color: var(--accent); color: var(--accent); }
      .ds-proj-arrow { font-size: 2rem; color: var(--border); transition: color .3s, transform .3s; align-self: center; }
      .ds-project-card:hover .ds-proj-arrow { color: var(--accent); transform: translate(4px,-4px); }

      /* ── TTS ── */
      .tts-bar {
        display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
        background: #071422; border: 1px solid #0e2240;
        border-radius: 2px; padding: 10px 14px; margin-top: 20px;
      }
      .tts-lbl { font-size: .62rem; letter-spacing: .18em; color: var(--muted); text-transform: uppercase; flex-shrink: 0; }
      .tts-btn {
        padding: 5px 13px; border: 1px solid var(--border); border-radius: 2px;
        background: var(--card); color: var(--text); font-family: 'DM Mono', monospace;
        font-size: .7rem; cursor: pointer; flex-shrink: 0; transition: all .15s;
      }
      .tts-btn:hover, .tts-btn.active { background: var(--accent); color: #050d1a; border-color: var(--accent); }
      .tts-btn.stop:hover { background: var(--red); border-color: var(--red); color: #fff; }
      .tts-speed { display: flex; align-items: center; gap: 6px; margin-left: auto; }
      .tts-speed label { font-size: .6rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
      .tts-speed select { background: var(--card); border: 1px solid var(--border); color: var(--text); font-family: 'DM Mono', monospace; font-size: .7rem; padding: 4px 7px; border-radius: 2px; cursor: pointer; }
      .tts-status { font-size: .62rem; color: var(--accent); min-width: 55px; }
      @keyframes tts-pulse { 0%,100%{opacity:1}50%{opacity:.3} }
      .tts-playing .tts-status { animation: tts-pulse .9s infinite; }

      /* read-all */
      .read-all-wrap { display: flex; justify-content: flex-end; margin-bottom: 3rem; }
      .read-all-btn {
        display: inline-flex; align-items: center; gap: .5rem;
        padding: .7rem 1.4rem; background: transparent;
        border: 1px solid var(--accent); color: var(--accent);
        font-family: 'DM Mono', monospace; font-size: .72rem;
        letter-spacing: .12em; text-transform: uppercase;
        cursor: pointer; border-radius: 2px; transition: all .2s;
      }
      .read-all-btn:hover { background: var(--accent); color: #050d1a; }

      /* ── WEATHER ── */
      .weather-wrap { background: var(--card); border: 1px solid var(--border); border-radius: 2px; overflow: hidden; }
      .weather-top {
        background: linear-gradient(135deg,#061428 0%,#0a1e3d 60%,#0d2a52 100%);
        padding: 2rem 2.4rem 1.6rem; position: relative; overflow: hidden;
        border-bottom: 1px solid var(--border);
      }
      .weather-top::before { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(0,212,255,.07), transparent 70%); }
      .weather-top-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: var(--accent); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 1rem; display: flex; align-items: center; gap: .5rem; }
      .weather-search { display: flex; gap: .75rem; }
      .weather-input {
        flex: 1; background: rgba(255,255,255,.05); border: 1px solid rgba(0,212,255,.15);
        color: var(--text); font-family: 'DM Mono', monospace; font-size: .82rem;
        padding: .65rem 1rem; border-radius: 2px; outline: none; transition: border-color .2s;
      }
      .weather-input::placeholder { color: var(--muted); }
      .weather-input:focus { border-color: var(--accent); }
      .weather-go {
        padding: .65rem 1.4rem; background: var(--accent); color: #050d1a;
        border: none; font-family: 'Syne', sans-serif; font-weight: 700;
        font-size: .78rem; letter-spacing: .08em; text-transform: uppercase;
        cursor: pointer; border-radius: 2px; transition: background .2s; white-space: nowrap;
      }
      .weather-go:hover { background: #33ddff; }
      .weather-body { padding: 1.8rem 2.4rem; min-height: 140px; }
      .weather-idle { display: flex; align-items: center; gap: 1rem; color: var(--muted); font-size: .78rem; opacity: .6; padding: 1rem 0; }
      .weather-idle-icon { font-size: 2.4rem; }
      .weather-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.5rem; }
      .weather-main-card { background: var(--card2); border: 1px solid var(--border); border-radius: 2px; padding: 1.5rem; display: flex; flex-direction: column; gap: .3rem; }
      .weather-city { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; letter-spacing: -.02em; }
      .weather-country { font-size: .65rem; color: var(--muted); letter-spacing: .15em; text-transform: uppercase; }
      .weather-temp { font-family: 'Syne', sans-serif; font-size: 3.2rem; font-weight: 800; color: var(--accent); line-height: 1; margin: .6rem 0 .3rem; }
      .weather-desc { font-size: .75rem; color: var(--muted); text-transform: capitalize; }
      .weather-icon { font-size: 3rem; margin-top: auto; align-self: flex-end; }
      .weather-stats { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
      .weather-stat { background: var(--card2); border: 1px solid var(--border); border-radius: 2px; padding: 1rem 1.1rem; }
      .weather-stat-lbl { font-size: .58rem; color: var(--muted); text-transform: uppercase; letter-spacing: .14em; margin-bottom: .3rem; }
      .weather-stat-val { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; }
      .weather-error { color: var(--red); font-size: .78rem; padding: 1rem 0; }
      .weather-loading { color: var(--muted); font-size: .78rem; padding: 1rem 0; display: flex; align-items: center; gap: .75rem; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .w-spin { width: 14px; height: 14px; border: 2px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin .7s linear infinite; flex-shrink: 0; }
      .weather-credit { font-size: .58rem; color: var(--muted); text-align: right; margin-top: 1rem; opacity: .6; }

      /* ── GITHUB ── */
      .gh-wrap {
        background: var(--card); border: 1px solid var(--border); border-radius: 2px;
        padding: 2.4rem; display: flex; align-items: flex-start; gap: 2rem; flex-wrap: wrap;
        transition: border-color .3s;
      }
      .gh-wrap:hover { border-color: #30363d; }
      .gh-octo { font-size: 3.5rem; flex-shrink: 0; line-height: 1; filter: drop-shadow(0 0 18px rgba(0,212,255,.25)); }
      .gh-info { flex: 1; min-width: 0; }
      .gh-name { font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800; letter-spacing: -.02em; margin-bottom: 2px; }
      .gh-handle { font-size: .72rem; color: var(--accent); letter-spacing: .1em; margin-bottom: .75rem; }
      .gh-url { font-size: .72rem; color: var(--muted); margin-bottom: 1.25rem; word-break: break-all; }
      .gh-badges { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
      .gh-badge { font-size: .6rem; letter-spacing: .12em; text-transform: uppercase; padding: .28rem .75rem; border: 1px solid var(--border); color: var(--muted); border-radius: 1px; }
      .gh-badge-accent { border-color: var(--accent); color: var(--accent); }
      .gh-cta-row { display: flex; gap: .75rem; flex-wrap: wrap; }
      .gh-btn {
        display: inline-flex; align-items: center; gap: .5rem;
        padding: .65rem 1.4rem; text-decoration: none; border-radius: 2px;
        font-family: 'DM Mono', monospace; font-size: .73rem; font-weight: 400;
        letter-spacing: .06em; text-transform: uppercase; transition: all .2s;
      }
      .gh-btn-primary { background: var(--text); color: #050d1a; }
      .gh-btn-primary:hover { background: var(--accent); }
      .gh-btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--muted); }
      .gh-btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
      .gh-repo-pill {
        background: var(--card2); border: 1px solid var(--border); border-radius: 2px;
        padding: .5rem 1rem; display: inline-flex; align-items: center; gap: .5rem;
        text-decoration: none; color: var(--muted); font-size: .7rem; transition: all .2s;
      }
      .gh-repo-pill:hover { border-color: var(--accent); color: var(--accent); }
      .gh-repo-dot { width: 7px; height: 7px; background: #f1e05a; border-radius: 50%; flex-shrink: 0; }

      /* contact */
      .ds-contact-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: start; }
      .ds-contact-quote { font-family: 'Syne', sans-serif; font-size: 1.45rem; font-weight: 700; letter-spacing: -.02em; color: var(--accent); line-height: 1.3; margin-bottom: 1.25rem; }
      .ds-contact-sub { font-size: .84rem; color: var(--muted); line-height: 1.9; }
      .ds-form-group { margin-bottom: 1.4rem; }
      .ds-form-label { display: block; font-size: .63rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); margin-bottom: .55rem; }
      .ds-form-input { width: 100%; background: var(--card); border: 1px solid var(--border); color: var(--text); font-family: 'DM Mono', monospace; font-size: .84rem; padding: .8rem 1rem; border-radius: 2px; outline: none; transition: border-color .2s; }
      .ds-form-input:focus { border-color: var(--accent); }
      .ds-form-input::placeholder { color: var(--muted); opacity: .5; }
      textarea.ds-form-input { resize: vertical; min-height: 120px; }
      .ds-submit { width: 100%; background: var(--accent); color: #050d1a; border: none; font-family: 'Syne', sans-serif; font-size: .83rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 1rem; cursor: pointer; border-radius: 2px; transition: background .2s, transform .15s; }
      .ds-submit:hover { background: #33ddff; transform: translateY(-1px); }
      .ds-form-msg { margin-top: .75rem; font-size: .77rem; min-height: 1.2em; }

      /* footer */
      .ds-footer { padding: 1.75rem 10vw; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); }
      .ds-footer-copy { font-size: .7rem; color: var(--muted); letter-spacing: .08em; }
      .ds-footer-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; }

      @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }
      @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)} }

      @media(max-width:768px){
        .ds-hero,.ds-section-wrap{padding-left:6vw;padding-right:6vw;}
        .ds-nav,.ds-footer{padding-left:6vw;padding-right:6vw;}
        .ds-about-grid,.ds-contact-grid{grid-template-columns:1fr;gap:2.5rem;}
        .ds-skills-grid{grid-template-columns:1fr 1fr;}
        .ds-project-card{grid-template-columns:1fr;}
        .ds-proj-arrow{display:none;}
        .ds-stat-grid{grid-template-columns:1fr 1fr;}
        .weather-grid{grid-template-columns:1fr;}
        .weather-top,.weather-body{padding:1.2rem 1.4rem;}
        .tts-speed{margin-left:0;}
      }
      @media(max-width:480px){
        .ds-skills-grid{grid-template-columns:1fr;}
        .ds-nav-links{gap:.8rem;}
        .ds-nav-links a{font-size:.6rem;}
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

/* ── useReveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ds-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e, i) => {
        if (e.isIntersecting) { setTimeout(() => e.target.classList.add("ds-vis"), i * 90); obs.unobserve(e.target); }
      }),
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
    const move = (e) => { if (ref.current) { ref.current.style.left = e.clientX + "px"; ref.current.style.top = e.clientY + "px"; } };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div className="ds-cursor" ref={ref} />;
}

/* ═══════════════════════════════════════
   TTS ENGINE
═══════════════════════════════════════ */
function useTTS() {
  const stateRef = useRef({ utterance: null, barId: null, textId: null, paused: false });
  const [, forceUpdate] = useState(0);
  const update = () => forceUpdate(n => n + 1);

  const getSpeed = (barId) => {
    const sel = document.getElementById("tts-speed-" + barId);
    return sel ? parseFloat(sel.value) : 1;
  };

  const stop = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    stateRef.current = { utterance: null, barId: null, textId: null, paused: false };
    update();
  };

  const toggle = (textId, barId) => {
    if (!("speechSynthesis" in window)) return;
    const s = stateRef.current;
    if (s.barId === barId && s.utterance) {
      if (s.paused) { window.speechSynthesis.resume(); s.paused = false; }
      else { window.speechSynthesis.pause(); s.paused = true; }
      update(); return;
    }
    stop();
    const el = document.getElementById(textId);
    if (!el) return;
    const u = new SpeechSynthesisUtterance(el.innerText || el.textContent);
    u.rate = getSpeed(barId); u.pitch = 1; u.lang = "en-US";
    u.onstart = () => { stateRef.current = { utterance: u, barId, textId, paused: false }; update(); };
    u.onend = u.onerror = () => { stateRef.current = { utterance: null, barId: null, textId: null, paused: false }; update(); };
    stateRef.current.utterance = u;
    window.speechSynthesis.speak(u);
  };

  const isPlaying = (barId) => stateRef.current.barId === barId && !!stateRef.current.utterance && !stateRef.current.paused;
  const isPaused = (barId) => stateRef.current.barId === barId && stateRef.current.paused;

  return { toggle, stop, isPlaying, isPaused };
}

/* TTS Bar Component */
function TTSBar({ textId, barId, tts }) {
  const playing = tts.isPlaying(barId);
  const paused = tts.isPaused(barId);
  const active = playing || paused;
  return (
    <div className={`tts-bar${playing ? " tts-playing" : ""}`}>
      <span className="tts-lbl">🎙 TTS</span>
      <button className={`tts-btn${active ? " active" : ""}`} onClick={() => tts.toggle(textId, barId)}>
        {playing ? "⏸ Pause" : paused ? "▶ Resume" : "▶ Play"}
      </button>
      <button className="tts-btn stop" onClick={tts.stop}>■ Stop</button>
      <div className="tts-speed">
        <label>Speed</label>
        <select id={"tts-speed-" + barId} defaultValue="1">
          <option value="0.75">0.75×</option>
          <option value="1">1×</option>
          <option value="1.25">1.25×</option>
          <option value="1.5">1.5×</option>
          <option value="2">2×</option>
        </select>
      </div>
      <span className="tts-status">{playing ? "▶ Playing…" : paused ? "⏸ Paused" : ""}</span>
    </div>
  );
}

/* Read-All Button */
function ReadAllButton({ tts }) {
  const sections = [
    { text: "About Me. My name is Divyansh Saini. I am pursuing a Bachelor of Computer Applications, BCA, and actively learning web development." },
    { text: "Skills. I know Java, Microsoft Office, HTML, CSS and JavaScript." },
    { text: "Projects. I built a Student Result and Marksheet Generator using Java, and a Weather Web Application using public REST APIs." },
    { text: "GitHub. You can find my code at github dot com slash divyanshsai369-creator." },
  ];
  const [active, setActive] = useState(false);
  const idxRef = useRef(0);

  const start = () => {
    if (!("speechSynthesis" in window)) return;
    tts.stop();
    setActive(true);
    idxRef.current = 0;
    speak();
  };

  const speak = () => {
    if (idxRef.current >= sections.length) { setActive(false); return; }
    const u = new SpeechSynthesisUtterance(sections[idxRef.current].text);
    u.rate = 1; u.lang = "en-US";
    u.onend = () => { idxRef.current++; setTimeout(speak, 350); };
    u.onerror = () => setActive(false);
    window.speechSynthesis.speak(u);
  };

  const stop = () => { tts.stop(); window.speechSynthesis.cancel(); idxRef.current = 999; setActive(false); };

  return (
    <div className="read-all-wrap">
      {active
        ? <button className="read-all-btn" onClick={stop}>■ Stop Reading</button>
        : <button className="read-all-btn" onClick={start}>🔊 Read Entire Portfolio</button>
      }
    </div>
  );
}

/* ── Nav ── */
function Nav() {
  return (
    <nav className="ds-nav">
      <div className="ds-nav-logo">DS</div>
      <ul className="ds-nav-links">
        {["about", "skills", "projects", "weather", "github", "contact"].map((s) => (
          <li key={s}><a href={`#${s}`}>{s}</a></li>
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
      <h1>Divyansh<span>Saini.</span></h1>
      <p className="ds-hero-sub">BCA student · Web Developer in progress ·<br />Building things one line at a time.</p>
      <div className="ds-hero-line" />
      <div className="ds-scroll-hint">Scroll</div>
    </header>
  );
}

/* ── About ── */
function About({ tts }) {
  return (
    <section className="ds-section" id="about">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">Introduction</p>
        <h2 className="ds-title ds-reveal">About Me</h2>
        <div className="ds-about-grid">
          <div className="ds-about-text ds-reveal">
            <div id="tts-about-text">
              <p>I'm <strong>Divyansh Saini</strong>, a student currently pursuing a Bachelor of Computer Applications (BCA) and actively learning Web Development from the ground up.</p>
              <p>My focus is on building practical, functional projects that solve real problems — like automating student result and marksheet generation. I'm passionate about coding, problem-solving, and growing one skill at a time.</p>
            </div>
            <a className="ds-linkedin" href="https://www.linkedin.com/in/divyansh-saini-b6462237a/" target="_blank" rel="noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
            <TTSBar textId="tts-about-text" barId="about" tts={tts} />
          </div>
          <div className="ds-stat-grid ds-reveal">
            {[{ label: "Degree", value: "BCA" }, { label: "Status", value: "Active" }, { label: "Focus", value: "Web Dev" }, { label: "Year", value: "2026" }].map((s) => (
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
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && fillRef.current) { fillRef.current.style.width = pct + "%"; obs.disconnect(); }
    }, { threshold: 0.3 });
    if (fillRef.current) obs.observe(fillRef.current.parentElement);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="ds-skill-card">
      <span className="ds-skill-icon">{icon}</span>
      <div className="ds-skill-name">{name}</div>
      <div className="ds-skill-level">{level}</div>
      <div className="ds-skill-bar"><div className="ds-skill-fill" ref={fillRef} style={{ width: 0 }} /></div>
    </div>
  );
}

function Skills({ tts }) {
  return (
    <section className="ds-section" id="skills">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">What I know</p>
        <h2 className="ds-title ds-reveal">Skills</h2>
        <div className="ds-skills-grid ds-reveal">
          {SKILLS.map((s) => <SkillCard key={s.name} {...s} />)}
        </div>
        <span id="tts-skills-text" style={{ display: "none" }}>My skills include Java programming at 70 percent proficiency, Microsoft Office at 85 percent, HTML and CSS which I am actively learning.</span>
        <TTSBar textId="tts-skills-text" barId="skills" tts={tts} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   WEATHER APP  (Open-Meteo — no API key)
═══════════════════════════════════════ */
const WMO_DESC = { 0:"Clear Sky ☀️",1:"Mainly Clear 🌤",2:"Partly Cloudy ⛅",3:"Overcast ☁️",45:"Foggy 🌫",48:"Icy Fog 🌫",51:"Light Drizzle 🌦",53:"Drizzle 🌦",55:"Heavy Drizzle 🌧",61:"Light Rain 🌧",63:"Rain 🌧",65:"Heavy Rain 🌧",71:"Light Snow 🌨",73:"Snow 🌨",75:"Heavy Snow ❄️",77:"Snow Grains 🌨",80:"Light Showers 🌦",81:"Showers 🌦",82:"Violent Showers ⛈",85:"Snow Showers 🌨",86:"Heavy Snow Showers ❄️",95:"Thunderstorm ⛈",96:"Thunderstorm+Hail ⛈",99:"Severe Thunderstorm ⛈" };
const WMO_ICON = { 0:"☀️",1:"🌤",2:"⛅",3:"☁️",45:"🌫",48:"🌫",51:"🌦",53:"🌦",55:"🌧",61:"🌧",63:"🌧",65:"🌧",71:"🌨",73:"🌨",75:"❄️",77:"🌨",80:"🌦",81:"🌦",82:"⛈",85:"🌨",86:"❄️",95:"⛈",96:"⛈",99:"⛈" };

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState({ status: "idle", data: null, error: "" });

  const search = async () => {
    const city = query.trim();
    if (!city) return;
    setState({ status: "loading", data: null, error: "" });
    try {
      const gr = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
      const gd = await gr.json();
      if (!gd.results?.length) { setState({ status: "error", data: null, error: "City not found. Try a different name." }); return; }
      const loc = gd.results[0];
      const wr = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,surface_pressure&wind_speed_unit=kmh&temperature_unit=celsius&timezone=auto`);
      const wd = await wr.json();
      setState({ status: "ok", data: { loc, cur: wd.current }, error: "" });
    } catch {
      setState({ status: "error", data: null, error: "Network error. Check your connection." });
    }
  };

  const { status, data } = state;

  return (
    <section className="ds-section" id="weather">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">Live Data</p>
        <h2 className="ds-title ds-reveal">Weather App</h2>
        <div className="weather-wrap ds-reveal">
          <div className="weather-top">
            <div className="weather-top-title">🌤 Live Weather Search</div>
            <div className="weather-search">
              <input
                className="weather-input"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && search()}
                placeholder="Search city — e.g. Raipur, Mumbai, London…"
              />
              <button className="weather-go" onClick={search}>Search</button>
            </div>
          </div>
          <div className="weather-body">
            {status === "idle" && (
              <div className="weather-idle">
                <span className="weather-idle-icon">🌍</span>
                <span>Type a city name and press Search to see live weather</span>
              </div>
            )}
            {status === "loading" && <div className="weather-loading"><span className="w-spin" />Fetching weather for <strong style={{ color: "var(--text)", marginLeft: 4 }}>{query}</strong>…</div>}
            {status === "error" && <div className="weather-error">⚠ {state.error}</div>}
            {status === "ok" && data && (() => {
              const { loc, cur } = data;
              const code = cur.weather_code;
              return (
                <>
                  <div className="weather-grid">
                    <div className="weather-main-card">
                      <div className="weather-city">{loc.name}{loc.admin1 ? `, ${loc.admin1}` : ""}</div>
                      <div className="weather-country">{loc.country || ""}</div>
                      <div className="weather-temp">{Math.round(cur.temperature_2m)}°C</div>
                      <div className="weather-desc">{WMO_DESC[code] || "Unknown"}</div>
                      <div className="weather-icon">{WMO_ICON[code] || "🌡"}</div>
                    </div>
                    <div className="weather-stats">
                      {[
                        { l: "Feels Like", v: `${Math.round(cur.apparent_temperature)}°C` },
                        { l: "Humidity", v: `${cur.relative_humidity_2m}%` },
                        { l: "Wind", v: `${Math.round(cur.wind_speed_10m)} km/h` },
                        { l: "Pressure", v: `${Math.round(cur.surface_pressure)} hPa` },
                      ].map(s => (
                        <div className="weather-stat" key={s.l}>
                          <div className="weather-stat-lbl">{s.l}</div>
                          <div className="weather-stat-val">{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="weather-credit">{loc.latitude.toFixed(3)}, {loc.longitude.toFixed(3)} · Powered by Open-Meteo (free, no API key)</div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   PROJECTS
═══════════════════════════════════════ */
function Projects({ tts }) {
  return (
    <section className="ds-section" id="projects">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">What I've built</p>
        <h2 className="ds-title ds-reveal">Projects</h2>

        {/* Project 01 */}
        <div className="ds-project-card ds-reveal">
          <div>
            <div className="ds-proj-num">Project — 01</div>
            <div className="ds-proj-title">Student Result &amp;<br />Marksheet Generator</div>
            <p className="ds-proj-desc">A system to automate the creation of student result summaries and printable marksheets — reducing manual effort and minimising errors in academic record-keeping.</p>
            <div className="ds-proj-tags">
              {["Java", "Academic", "Automation"].map(t => <span className="ds-tag" key={t}>{t}</span>)}
            </div>
          </div>
          <div className="ds-proj-arrow">↗</div>
        </div>

        {/* Project 02 */}
        <div className="ds-project-card ds-reveal">
          <div>
            <div className="ds-proj-num">Project — 02</div>
            <div className="ds-proj-title">Weather Web<br />Application</div>
            <p className="ds-proj-desc">A live weather search app using the free Open-Meteo &amp; Geocoding APIs. Search any city worldwide for real-time temperature, humidity, wind speed and more — no API key required.</p>
            <div className="ds-proj-tags">
              {["HTML", "CSS", "JavaScript", "REST API"].map(t => <span className="ds-tag" key={t}>{t}</span>)}
              <span className="ds-tag ds-tag-accent">Live ↑</span>
            </div>
          </div>
          <div className="ds-proj-arrow">↗</div>
        </div>

        <span id="tts-projects-text" style={{ display: "none" }}>
          I have built two projects. First, a Student Result and Marksheet Generator in Java that automates academic record keeping. Second, a Weather Web Application using public REST APIs to show live weather for any city worldwide.
        </span>
        <TTSBar textId="tts-projects-text" barId="projects" tts={tts} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   GITHUB SECTION
═══════════════════════════════════════ */
function GitHub({ tts }) {
  return (
    <section className="ds-section" id="github">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">Source Code</p>
        <h2 className="ds-title ds-reveal">GitHub</h2>
        <div className="gh-wrap ds-reveal">
          <div className="gh-octo">🐙</div>
          <div className="gh-info">
            <div className="gh-name">Divyansh Saini</div>
            <div className="gh-handle">@divyanshsai369-creator</div>
            <div className="gh-url">github.com/divyanshsai369-creator</div>
            <div className="gh-badges">
              <span className="gh-badge gh-badge-accent">BCA Student</span>
              <span className="gh-badge">Web Developer</span>
              <span className="gh-badge">☕ Java</span>
              <span className="gh-badge">🌐 HTML · CSS · JS</span>
              <span className="gh-badge">📍 India</span>
            </div>
            <div className="gh-cta-row">
              <a className="gh-btn gh-btn-primary" href="https://github.com/divyanshsai369-creator" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
                View Profile →
              </a>
              <a className="gh-btn gh-btn-secondary" href="https://github.com/divyanshsai369-creator/web_dev" target="_blank" rel="noopener noreferrer">
                📦 web_dev repo →
              </a>
            </div>
            <div style={{ marginTop: "1.25rem" }}>
              <a className="gh-repo-pill" href="https://github.com/divyanshsai369-creator/web_dev" target="_blank" rel="noopener noreferrer">
                <span className="gh-repo-dot" />
                <span>web_dev</span>
                <span style={{ opacity: .45, marginLeft: 4, fontSize: ".62rem" }}>JavaScript</span>
              </a>
            </div>
          </div>
        </div>
        <span id="tts-github-text" style={{ display: "none" }}>
          You can find my source code on GitHub at github dot com slash divyanshsai369-creator. My web development repository is available there too.
        </span>
        <TTSBar textId="tts-github-text" barId="github" tts={tts} />
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState({ text: "", color: "" });
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) { setMsg({ text: "⚠ Please fill in all fields.", color: "var(--red)" }); return; }
    if (!/^[^ ]+@[^ ]+\.[a-z]{2,4}$/.test(email)) { setMsg({ text: "⚠ Invalid email address.", color: "var(--red)" }); return; }
    setMsg({ text: "✓ Message sent successfully!", color: "var(--green)" });
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <section className="ds-section" id="contact">
      <div className="ds-section-wrap">
        <p className="ds-label ds-reveal">Get in touch</p>
        <h2 className="ds-title ds-reveal">Contact Me</h2>
        <div className="ds-contact-grid">
          <div className="ds-reveal">
            <p className="ds-contact-quote">"Every expert was once a beginner."</p>
            <p className="ds-contact-sub">Whether you have a project idea, a question, or just want to connect — I'd love to hear from you.</p>
          </div>
          <form className="ds-reveal" onSubmit={handleSubmit} noValidate>
            {[{ label: "Name", name: "name", type: "text", placeholder: "Your name" }, { label: "Email", name: "email", type: "email", placeholder: "your@email.com" }].map(f => (
              <div className="ds-form-group" key={f.name}>
                <label className="ds-form-label">{f.label}</label>
                <input className="ds-form-input" type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder} />
              </div>
            ))}
            <div className="ds-form-group">
              <label className="ds-form-label">Message</label>
              <textarea className="ds-form-input" name="message" value={form.message} onChange={handleChange} placeholder="What's on your mind?" rows={4} />
            </div>
            <button className="ds-submit" type="submit">Send Message →</button>
            {msg.text && <p className="ds-form-msg" style={{ color: msg.color }}>{msg.text}</p>}
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

/* ═══════════════════════════════════════
   APP ROOT
═══════════════════════════════════════ */
export default function App() {
  useReveal();
  const tts = useTTS();
  return (
    <>
      <FontLink />
      <GlobalStyles />
      <Cursor />
      <div className="ds-noise" />
      <Hero />
      <Nav />
      <main>
        <div style={{ padding: "2rem 10vw 0", maxWidth: 1100, margin: "0 auto" }}>
          <ReadAllButton tts={tts} />
        </div>
        <About tts={tts} />
        <Skills tts={tts} />
        <Projects tts={tts} />
        <WeatherApp />
        <GitHub tts={tts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}