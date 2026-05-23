// Portfolio app — Prasad Shinde
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ============ DATA ============
const PROJECTS = [
{
  n: "01",
  name: "Synthetic-Bull",
  namedTail: "a crypto exchange, from scratch",
  tag: "Team · OpenSoft'26 · C++ · React",
  year: "'26",
  glyph: "S",
  prv: "prv-1",
  href: "https://github.com/rkhall-iitkgp/SyntheticBullApp.git",
  desc: "Low-latency limit order book + matching engine in C++ processing 100+ events/sec, paired with a TradingView terminal. Built with a 12-person hall team — won 1st place at OpenSoft'26."
},
{
  n: "02",
  name: "VibeMeter",
  namedTail: "AI wellness chatbot",
  tag: "Team · OpenSoft'25 · LangGraph · FastAPI",
  year: "'25",
  glyph: "V",
  prv: "prv-3",
  href: "https://github.com/rkhall-iitkgp/vibemeter-frontend-2025.git",
  desc: "LangGraph multi-agent system with an ANOVA-inspired risk-scoring engine across 6+ HR datasets. Built for the Deloitte South Asia Coding Challenge."
},
{
  n: "03",
  name: "WanderLust",
  namedTail: "a booking platform",
  tag: "Node · Express · Mongo",
  year: "'25",
  glyph: "W",
  prv: "prv-4",
  href: "https://github.com/Prasad8830/Wanderlust.git",
  desc: "A full-stack hotel booking app with Passport.js auth, Mapbox geolocation and Cloudinary storage. MVC architecture, deployed on Render."
},
{
  n: "04",
  name: "Fugacity'25",
  namedTail: "a department fest platform",
  tag: "React · Node.js",
  year: "'25",
  glyph: "F",
  prv: "prv-2",
  href: "https://github.com/Prasad8830/ChEA_Fugacity.git",
  desc: "Full-stack website for ChEA's annual fest — 500+ participants. Dynamic modules for event listings, sponsor highlights, schedules and real-time announcements; tuned with lazy-loading, image compression and state optimisation."
}];


const EXPERIENCE = [
{
  year: "Mar 2026 — Now",
  role: "Software Development Intern",
  roleIt: " · Pranissa",
  org: "Building a subscription-based longevity intelligence platform",
  desc: "Driving Next.js + FastAPI + Postgres work powering 120+ APIs and 50M+ biomarker pipelines. Migrating 87+ TSX components & 24K+ lines of CSS off legacy React/Vite onto a modular Next.js stack on AWS.",
  tags: ["Next.js", "FastAPI", "Postgres", "AWS"]
},
{
  year: "Mar — Apr 2026",
  role: "Full-Stack Development Intern",
  roleIt: " · Atom Pluton Technology",
  org: "PromptVault — an AI prompt marketplace",
  desc: "Architected core modules of an AI prompt marketplace (Next.js 14, NestJS, Redis) supporting 100K+ prompts. Shipped a metadata-driven Prompt Detail system rendering 10+ output formats, plus semantic search and creator analytics, in a 7-person team.",
  tags: ["Next.js 14", "NestJS", "Redis"]
},
{
  year: "Jun — Oct 2025",
  role: "Full-Stack Development Intern",
  roleIt: " · Gigglz",
  org: "A real-time gig-work platform",
  desc: "Shipped 10+ scalable features across React, FastAPI and Postgres. Cut group-chat latency by ~40% by overhauling backend pipelines and API response handling. Delivered 15+ responsive UI components inside an 8-person agile team.",
  tags: ["React", "FastAPI", "Postgres"]
}];


const EDUCATION = [
{
  year: "2023 — 2027",
  role: "B.Tech (Hons.), Chemical Engineering",
  roleIt: " · with a coding minor of my own",
  org: "Indian Institute of Technology, Kharagpur",
  desc: "CGPA 8.65 / 10. Coursework spans Data Structures, Computer-Aided Process Engineering, Probability & Statistics, Transform Calculus, plus core ChE — Thermodynamics, Reaction Engineering, Mass + Heat Transfer.",
  tags: ["ChE + CS", "CGPA 8.65"]
}];


const SKILLS = [
{
  title: "Languages",
  items: [
  ["Java", "proficient"],
  ["JavaScript", "proficient"],
  ["Python", "proficient"],
  ["TypeScript", "proficient"],
  ["C / C++", "familiar"],
  ["Go / SQL", "familiar"]]

},
{
  title: "Frontend",
  items: [
  ["React.js", "proficient"],
  ["Next.js", "proficient"],
  ["Tailwind CSS", "proficient"],
  ["Redux / Zustand", "proficient"],
  ["Bootstrap", "proficient"]]

},
{
  title: "Backend",
  items: [
  ["Node + Express", "proficient"],
  ["FastAPI", "proficient"],
  ["WebSockets / Socket.IO", "proficient"],
  ["REST + JWT auth", "proficient"],
  ["Passport.js", "proficient"],
  ["Prisma", "familiar"]]

},
{
  title: "Data & Cloud",
  items: [
  ["PostgreSQL", "proficient"],
  ["MongoDB", "proficient"],
  ["Redis", "familiar"],
  ["AWS", "familiar"],
  ["Cloudinary / Firebase", "familiar"]]

},
{
  title: "AI / Agents",
  items: [
  ["LangGraph", "proficient"],
  ["LangChain", "proficient"],
  ["OpenAI / Gemini / Whisper", "proficient"],
  ["DeepSeek", "familiar"],
  ["SQLAlchemy", "familiar"]]

},
{
  title: "Tools",
  items: [
  ["Git + GitHub", "proficient"],
  ["Docker", "proficient"],
  ["Kubernetes", "familiar"],
  ["Vercel / Render", "proficient"],
  ["Figma", "familiar"],
  ["MATLAB", "familiar"]]

}];


const ACHIEVEMENTS = [
{ rank: "01", title: "Open-source contributor across Rocket.Chat, IntelOwl, Aden-Hive, Traceroot AI & The Honeynet Project", where: "6+ orgs · 20+ PRs, 30+ issues" },
{ rank: "02", title: "1st place · OpenSoft'26 — Inter-Hall General Championship at IIT Kharagpur", where: "Vice-Captain, 12-person team" },
{ rank: "03", title: "Top 4.2% in JEE Advanced 2023 among 190K+ candidates nationwide", where: "earned my IIT-KGP seat" },
{ rank: "04", title: "Top 0.9% in JEE Mains 2023 among 1M+ candidates", where: "All-India" },
{ rank: "05", title: "Top 0.88% in MHT-CET 2023 among 600K+ candidates", where: "Maharashtra" }];


const PORS = [
{
  role: "Open Source Contributor",
  org: "Rocket.Chat · IntelOwl · Aden-Hive · Traceroot AI · Honeynet",
  desc: "Recurring contributor across 6+ production OSS projects. 20+ PRs merged and 30+ substantive issues raised across infrastructure, security tooling, and developer experience.",
  meta: ["Jan 2026 — Now", "6+ orgs"]
},
{
  role: "Tech Team Head",
  org: "Chemical Engineering Association",
  desc: "Built Fugacity'25 — the official fest platform for 500+ participants. Optimised state, lazy-loading and image compression for cross-device performance.",
  meta: ["Apr 2025 — Apr 2026", "500+ users"]
},
{
  role: "Vice-Captain",
  org: "OpenSoft'26, IIT Kharagpur",
  desc: "Led a 12-person hall team to 1st place at the Inter-Hall General Championship. Owned engine architecture and orchestrated frontend + backend tracks.",
  meta: ["Mar — Apr 2026", "1st place"]
}];


// ============ CUSTOM CURSOR ============
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const onOver = (e) => {
      const tgt = e.target;
      const interactive = tgt.closest("a, button, .project, .skill-card, .por-card, .magnetic, .theme-toggle");
      if (ring.current) ring.current.classList.toggle("hovering", !!interactive);
    };
    let raf;
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return (
    <>
      <div ref={ring} className="cursor-ring" />
      <div ref={dot} className="cursor-dot" />
    </>);

}

// ============ MAGNETIC LINK ============
function Magnetic({ children, strength = 0.35, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <span className="magnetic" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </span>);

}

// ============ REVEAL ON SCROLL ============
function Reveal({ children, stagger = false, as: As = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = `${stagger ? "reveal-stagger" : "reveal"} ${seen ? "in" : ""} ${className}`.trim();
  return (
    <As ref={ref} className={cls} {...rest}>
      {children}
    </As>);

}

// ============ HERO ============
function Hero() {
  const ref = useRef(null);
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const t = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }).format(d);
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 30000);
    // trigger animation
    const t = setTimeout(() => ref.current?.classList.add("in"), 100);
    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, []);

  const heading = useMemo(() => {
    // "Prasad Shinde — shipping software at startup speed."
    const lines = [
    { text: "Prasad", italic: false },
    { text: "Shinde—", italic: false, br: true },
    { text: "shipping", italic: true },
    { text: "software", italic: true, br: true },
    { text: "at", italic: false },
    { text: "startup", italic: false },
    { text: "speed.", italic: false }];

    return lines;
  }, []);

  let charIdx = 0;
  return (
    <header ref={ref} className="hero" id="hero">
      <div>
        <div className="hero-eyebrow reveal in">
          <span><i className="dot"></i>Open to full-time SDE · 2027</span>
          <span>IIT Kharagpur · ChE '27</span>
        </div>
        <h1>
          {heading.map((w, i) =>
          <React.Fragment key={i}>
              <span className={"word " + (w.italic ? "it" : "")}>
                {[...w.text].map((c, j) => {
                const delay = charIdx * 0.025;
                charIdx++;
                return (
                  <span
                    key={j}
                    className="char"
                    style={{ animationDelay: `${delay}s` }}>
                    
                      {c === " " ? "\u00A0" : c}
                    </span>);

              })}
              </span>
              {i < heading.length - 1 ? "\u00A0" : ""}
              {w.br ? <br /> : null}
            </React.Fragment>
          )}
        </h1>
      </div>

      <div className="hero-bottom">
        <Reveal className="hero-bio">
          A <em>chemical engineering</em> undergrad at IIT Kharagpur turning
          algorithms, AI and full-stack ideas into real-world products —
          with startup speed and a builder mindset.
          <div className="hero-cta">
            <Magnetic strength={0.25}>
              <a
                className="cv-button"
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer">
                Download CV
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 4v13m0 0l-5-5m5 5l5-5M5 20h14"/>
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                className="cv-button cv-button-ghost"
                href="mailto:prasadshinde8830@gmail.com">
                Get in touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal className="hero-meta">
          <div><b>Lat / Lon</b><br />22.31°N, 87.30°E</div>
          <div><b>Local time</b><br /><span className="hero-time">{time} IST</span></div>
          <div><b>Currently</b><br />Shipping @ Pranissa</div>
        </Reveal>
      </div>
    </header>);

}

// ============ MARQUEE ============
function Marquee() {
  const items = ["systems thinking", "research × shipping", "calm interfaces", "fast iteration", "first principles"];
  const track =
  <span>
      {items.map((t, i) =>
    <React.Fragment key={i}>
          {t} <span className="star">✦</span>
        </React.Fragment>
    )}
    </span>;

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track}{track}{track}
      </div>
    </div>);

}

// ============ ABOUT + STATS ============
function About() {
  return (
    <section id="about">
      <Reveal className="section-label">About / 01</Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I'm a builder who lives at the seam between{" "}
            <span className="accent">research-rigor</span> and{" "}
            <span className="accent">startup-speed</span>.
          </p>
          <p className="muted">
            Officially I'm a Chemical Engineering undergrad at IIT Kharagpur —
            unofficially I've spent the last two years shipping production
            full-stack and AI systems for startups: real-time platforms,
            multi-agent chatbots, biomarker pipelines, low-latency exchanges.
            I like calm interfaces, code that ages well, and getting from
            zero → one fast.
          </p>
        </Reveal>
        <Reveal className="about-side" stagger>
          <div>
            <h4>Focus areas</h4>
            <ul>
              <li><span>Full-stack web</span><span>Next · FastAPI</span></li>
              <li><span>Applied AI & agents</span><span>LangGraph</span></li>
              <li><span>Real-time systems</span><span>WebSockets</span></li>
              <li><span>Founder-mode</span><span>0 → 1</span></li>
            </ul>
          </div>
          <div>
            <h4>Off the keyboard</h4>
            <ul>
              <li><span>Open source</span><span>20+ PRs</span></li>
              <li><span>From Pune, MH</span><span>2005</span></li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ============ COUNT-UP ============
function CountUp({ to, suffix = "", duration = 1400, prefix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased * 100) / 100);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{Number.isInteger(to) ? Math.floor(val) : val.toFixed(2)}{suffix}</span>;
}

function Stats() {
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-num it"><CountUp to={8.65} /></div>
        <div className="stat-label">CGPA · IIT KGP</div>
      </div>
      <div className="stat">
        <div className="stat-num"><CountUp to={4.2} suffix="%" /></div>
        <div className="stat-label">JEE Adv. percentile (190K+)</div>
      </div>
      <div className="stat">
        <div className="stat-num"><CountUp to={3} /></div>
        <div className="stat-label">Internships shipped</div>
      </div>
      <div className="stat">
        <div className="stat-num it"><CountUp to={20} suffix="+" /></div>
        <div className="stat-label">Open-source PRs merged</div>
      </div>
    </div>);

}

// ============ WORK ============
function Work() {
  return (
    <section id="work">
      <Reveal className="section-label">Selected work / 04</Reveal>
      <div className="work-head">
        <h2 className="work-title">
          Things I've <span className="it">made</span>,<br />
          shipped, and shown people.
        </h2>
      </div>
      <div className="work-list">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.n}
            as="a"
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project">
            <div className="project-row">
              <div className="project-num">{p.n}</div>
              <div className="project-name">
                {p.name} <span className="it">— {p.namedTail}</span>
              </div>
              <div className="project-tag">{p.tag}</div>
              <div className="project-year">{p.year}</div>
              <div className="project-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ============ EXPERIENCE ============
function Experience() {
  return (
    <section id="experience">
      <Reveal className="section-label">Experience / 03</Reveal>
      <div className="work-head">
        <h2 className="work-title">
          Where I've <span className="it">shipped</span><br />
          production code.
        </h2>
      </div>
      <div className="exp-grid">
        {EXPERIENCE.map((e, i) =>
        <Reveal key={i} className="exp-row">
            <div className="exp-year">{e.year}</div>
            <div>
              <div className="exp-role">
                {e.role}<span className="it">{e.roleIt}</span>
              </div>
              <div className="exp-org">{e.org}</div>
            </div>
            <div className="exp-desc">{e.desc}</div>
            <div className="exp-tags">
              {e.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </Reveal>
        )}
      </div>
    </section>);

}

// ============ EDUCATION ============
function Education() {
  return (
    <section id="education">
      <Reveal className="section-label">Education / 02</Reveal>
      <div className="work-head">
        <h2 className="work-title">
          School <span className="it">+ self-study,</span><br />
          in roughly that order.
        </h2>
      </div>
      <div className="exp-grid">
        {EDUCATION.map((e, i) =>
        <Reveal key={i} className="exp-row">
            <div className="exp-year">{e.year}</div>
            <div>
              <div className="exp-role">
                {e.role}<span className="it">{e.roleIt}</span>
              </div>
              <div className="exp-org">{e.org}</div>
            </div>
            <div className="exp-desc">{e.desc}</div>
            <div className="exp-tags">
              {e.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </Reveal>
        )}
      </div>
    </section>);

}

// ============ SKILLS ============
function Skills() {
  return (
    <section id="skills">
      <Reveal className="section-label">Skills / 05</Reveal>
      <div className="work-head">
        <h2 className="work-title">
          Stack I reach for <span className="it">first.</span>
        </h2>
      </div>
      <Reveal className="skills-grid" stagger>
        {SKILLS.map((s) =>
        <div key={s.title} className="skill-card">
            <h4>{s.title}</h4>
            <ul>
              {s.items.map(([n, l]) =>
            <li key={n}><span>{n}</span><span className="level">{l}</span></li>
            )}
            </ul>
          </div>
        )}
      </Reveal>
    </section>);

}

// ============ ACHIEVEMENTS ============
function Achievements() {
  return (
    <section id="achievements">
      <Reveal className="section-label">Achievements / 06</Reveal>
      <div className="work-head">
        <h2 className="work-title">
          A few <span className="it">milestones</span> I'm proud of.
        </h2>
      </div>
      <div className="ach-list">
        {ACHIEVEMENTS.map((a) =>
        <Reveal key={a.rank} className="ach">
            <div className="ach-rank">{a.rank}</div>
            <div className="ach-title">{a.title}</div>
            <div className="ach-where">{a.where}</div>
          </Reveal>
        )}
      </div>
    </section>);

}

// ============ POR ============
function Por() {
  const onMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) / r.width * 100 + "%");
    card.style.setProperty("--my", (e.clientY - r.top) / r.height * 100 + "%");
  };
  return (
    <section id="leadership">
      <Reveal className="section-label">Leadership & activities / 07</Reveal>
      <div className="work-head">
        <h2 className="work-title">
          What I do <span className="it">outside</span> the editor.
        </h2>
      </div>
      <Reveal className="por-grid" stagger>
        {PORS.map((p) =>
        <div key={p.role} className="por-card" onMouseMove={onMove}>
            <h3 className="por-role">{p.role}</h3>
            <div className="por-org">{p.org}</div>
            <p className="por-desc">{p.desc}</p>
            <div className="por-meta">
              {p.meta.map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>
        )}
      </Reveal>
    </section>);

}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="footer" id="contact">
      <Reveal className="section-label">Contact / 08</Reveal>
      <Reveal>
        <h2 className="footer-big">
          Let's build<br />
          <span className="it">something</span>{" "}
          <Magnetic strength={0.2}>
            <a href="mailto:prasadshinde8830@gmail.com">together →</a>
          </Magnetic>
        </h2>
      </Reveal>
      <div className="footer-meta">
        <div className="socials">
          <Magnetic><a href="https://github.com/Prasad8830" target="_blank" rel="noopener noreferrer">github</a></Magnetic>
          <Magnetic><a href="https://www.linkedin.com/in/prasad-shinde-87a559289/" target="_blank" rel="noopener noreferrer">linkedin</a></Magnetic>
          <Magnetic><a href="mailto:prasadshinde8830@gmail.com">prasadshinde8830@gmail.com</a></Magnetic>
          <Magnetic><a href="tel:+919604329368">+91 96043 29368</a></Magnetic>
        </div>
      </div>
    </footer>);

}

// ============ NAV ============
function Nav({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <a href="#hero" className="nav-mark">
        <span className="nav-mark-icon" aria-hidden="true"></span>
        Prasad Shinde
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#experience">Experience</a>
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#achievements">Awards</a>
        <a href="#leadership">Leadership</a>
        <a href="#contact">Contact</a>
        <a
          className="nav-cv"
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer">
          CV
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4v13m0 0l-5-5m5 5l5-5"/>
          </svg>
        </a>
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label="Toggle theme">
          
          <span className="theme-toggle-thumb">{theme === "dark" ? "☾" : "☀"}</span>
        </button>
      </div>
    </nav>);

}

// ============ APP ============
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "style": "studio",
  "accent": ["#6a7d31", "#9bb35a"],
  "density": "comfortable",
  "theme": "dark"
} /*EDITMODE-END*/;

const CV_URL = "https://drive.google.com/file/d/14YNsv-QUAzL5fMBdUFaAiN6L4iR7XvxW/view?usp=sharing";

// Accent options as [light-mode hex, dark-mode hex]
const ACCENT_OPTIONS = [
["#b9602c", "#d6884a"], // terracotta
["#2a5fb8", "#6ea3ff"], // cobalt
["#6a7d31", "#9bb35a"], // olive
["#7e2b56", "#b5638a"], // plum
["#0a0a0a", "#fafafa"]  // ink
];

const ACCENT_NAME_TO_PAIR = {
  terracotta: ACCENT_OPTIONS[0],
  cobalt:     ACCENT_OPTIONS[1],
  olive:      ACCENT_OPTIONS[2],
  plum:       ACCENT_OPTIONS[3],
  ink:        ACCENT_OPTIONS[4],
};
const ACCENT_PAIR_TO_NAME = (pair) => {
  if (!Array.isArray(pair)) return "cobalt";
  for (const [name, p] of Object.entries(ACCENT_NAME_TO_PAIR)) {
    if (p[0].toLowerCase() === (pair[0] || "").toLowerCase()) return name;
  }
  return "cobalt";
};

// Curated presets per audience
const PRESETS = {
  faang:  { label: "FAANG",     style: "studio",    theme: "light", accent: "ink"        },
  quant:  { label: "Quant",     style: "engineer",  theme: "dark",  accent: "cobalt"     },
  big4:   { label: "Big 4",     style: "editorial", theme: "light", accent: "cobalt"     },
  studio: { label: "Founder",   style: "engineer",  theme: "dark",  accent: "olive"      },
  warm:   { label: "Editorial", style: "editorial", theme: "light", accent: "terracotta" },
};

// hex → "r g b" for oklch-soft fallback via rgb()
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(x, 16);
  return `${n >> 16 & 255} ${n >> 8 & 255} ${n & 255}`;
}

function App() {
  const [tweaks, setTweak] = window.useTweaks(DEFAULTS);
  const [theme, setThemeState] = useState(tweaks.theme || "dark");
  const [copied, setCopied] = useState(false);

  // Apply URL params on first mount — overrides defaults for shareable deep-links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const updates = {};
    const style = params.get("style");
    if (["editorial","engineer","studio"].includes(style)) updates.style = style;
    const t = params.get("theme");
    if (["light","dark"].includes(t)) {
      updates.theme = t;
      setThemeState(t);
    }
    const accent = params.get("accent");
    if (accent && ACCENT_NAME_TO_PAIR[accent]) updates.accent = ACCENT_NAME_TO_PAIR[accent];
    const density = params.get("density");
    if (["compact","comfortable","airy"].includes(density)) updates.density = density;
    if (Object.keys(updates).length) {
      Object.entries(updates).forEach(([k, v]) => setTweak(k, v));
    }
  }, []);

  const applyPreset = (key) => {
    const p = PRESETS[key];
    if (!p) return;
    setTweak("style", p.style);
    setTweak("accent", ACCENT_NAME_TO_PAIR[p.accent]);
    setTweak("theme", p.theme);
    setThemeState(p.theme);
  };

  const copyShareLink = () => {
    const params = new URLSearchParams();
    params.set("style", tweaks.style || "studio");
    params.set("theme", theme);
    params.set("accent", ACCENT_PAIR_TO_NAME(tweaks.accent));
    if (tweaks.density && tweaks.density !== "comfortable") {
      params.set("density", tweaks.density);
    }
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url);
    } else {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // sync theme + style to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-style", tweaks.style || "engineer");
  }, [tweaks.style]);

  const setTheme = (t) => {
    setThemeState(t);
    setTweak("theme", t);
  };

  // sync accent
  useEffect(() => {
    const a = Array.isArray(tweaks.accent) ? tweaks.accent : ACCENT_OPTIONS[0];
    const isDark = theme === "dark";
    const c = isDark ? a[1] || a[0] : a[0];
    document.documentElement.style.setProperty("--accent", c);
    document.documentElement.style.setProperty(
      "--accent-soft",
      `rgb(${hexToRgb(c)} / ${isDark ? 0.18 : 0.14})`
    );
  }, [tweaks.accent, theme]);

  // density
  useEffect(() => {
    const map = { compact: "16px", comfortable: "clamp(20px, 4vw, 56px)", airy: "clamp(28px, 6vw, 96px)" };
    document.documentElement.style.setProperty("--pad", map[tweaks.density] || map.comfortable);
  }, [tweaks.density]);

  const { TweaksPanel, TweakSection, TweakColor, TweakSelect, TweakRadio, TweakButton } = window;

  return (
    <>
      <Cursor />
      <Nav theme={theme} setTheme={setTheme} />
      <Hero />
      <Marquee />
      <About />
      <Stats />
      <Education />
      <Experience />
      <Work />
      <Skills />
      <Achievements />
      <Por />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Presets">
          <div className="preset-row">
            {Object.entries(PRESETS).map(([key, p]) => (
              <button
                key={key}
                className="preset-btn"
                onClick={() => applyPreset(key)}
                title={`${p.style} · ${p.theme} · ${p.accent}`}>
                {p.label}
              </button>
            ))}
          </div>
          <button className="share-btn" onClick={copyShareLink}>
            {copied ? "✓ Copied" : "Copy share link →"}
          </button>
        </TweakSection>
        <TweakSection label="Aesthetic">
          <TweakRadio
            label="Style"
            value={tweaks.style}
            onChange={(v) => setTweak("style", v)}
            options={[
              { value: "editorial", label: "Editorial" },
              { value: "engineer",  label: "Engineer" },
              { value: "studio",    label: "Studio" }
            ]} />
          <TweakRadio
            label="Mode"
            value={theme}
            onChange={(v) => setTheme(v)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark",  label: "Dark"  }
            ]} />
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            onChange={(v) => setTweak("accent", v)}
            options={ACCENT_OPTIONS} />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakRadio
            label="Density"
            value={tweaks.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "compact",     label: "Compact" },
              { value: "comfortable", label: "Comfy"   },
              { value: "airy",        label: "Airy"    }
            ]} />
        </TweakSection>
      </TweaksPanel>
    </>);

}

// Wait for tweaks panel to load
function mount() {
  if (!window.useTweaks || !window.TweaksPanel) {
    setTimeout(mount, 50);
    return;
  }
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}
mount();