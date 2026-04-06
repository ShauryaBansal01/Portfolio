import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy, Check, ExternalLink, FileCode2, Mail, Terminal,
  ChevronDown, ArrowUpRight, Search, MoonStar, SunMedium,
} from 'lucide-react'
import { contactLinks, projects, experienceEntries, skillDomains, dependencyGraph, profile, stats } from './data/portfolio'
import { useTheme } from './hooks/use-theme'

/* ─── Types ──────────────────────────────────────────── */
type Section = 'hero' | 'about' | 'projects' | 'experience' | 'skills' | 'contact'

/* ─── Intersection observer helper ──────────────────── */
function useInView(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return visible
}

/* ─── MacOS dots ─────────────────────────────────────── */
function MacDots() {
  return (
    <div className="mac-dots">
      <span className="dot-r" />
      <span className="dot-a" />
      <span className="dot-g" />
    </div>
  )
}

/* ─── Section label ──────────────────────────────────── */
function SectionLabel({ index, name }: { index: string; name: string }) {
  return (
    <p className="section-label">
      <span>// {index} · </span>{name}
    </p>
  )
}

/* ─── Chip ───────────────────────────────────────────── */
function Chip({ label }: { label: string }) {
  return <span className="chip">[{label}]</span>
}

/* ─── Fade-up card wrapper ────────────────────────────── */
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  return (
    <div
      ref={ref}
      className="anim-fade-up"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ─── IDE Window ─────────────────────────────────────── */
function IdeWindow({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div className="ide-window flex flex-col h-full">
      <div className="ide-titlebar">
        <MacDots />
        <span className="ide-filename">{filename}</span>
      </div>
      <div className="flex-1 p-4 flex flex-col">{children}</div>
    </div>
  )
}

/* ─── Navbar ─────────────────────────────────────────── */
function Navbar({
  active,
  theme,
  onToggleTheme,
  onSearchClick,
}: {
  active: Section
  theme: string
  onToggleTheme: () => void
  onSearchClick: () => void
}) {
  const sections: { id: Section; label: string }[] = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'experience', label: 'exp' },
    { id: 'skills', label: 'skills' },
    { id: 'contact', label: 'contact' },
  ]

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        background: 'rgba(14,14,19,0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <a
        href="#hero"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--cyan)', textDecoration: 'none' }}
      >
        shaurya@workspace:~$
      </a>

      <nav className="hidden md:flex items-center gap-6">
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`nav-link ${active === s.id ? 'active' : ''}`}
          >
            {i > 0 && <span style={{ color: 'var(--border)', marginRight: 6 }}>·</span>}
            {s.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSearchClick}
          className="btn-term text-xs hidden sm:inline-flex"
          style={{ borderRadius: 8, padding: '4px 10px' }}
        >
          <Search className="size-3.5" />
          [ctrl+k]
        </button>
        <button
          type="button"
          onClick={onToggleTheme}
          className="btn-term"
          style={{ borderRadius: 8, padding: '5px 8px' }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
        </button>
      </div>
    </header>
  )
}

/* ─── Hero Section ───────────────────────────────────── */
function HeroSection({ onScrollDown }: { onScrollDown: () => void }) {
  const [typed, setTyped] = useState(0)
  const lines = [
    { prompt: 'visitor@portfolio:~$', cmd: ' whoami', out: `→ ${profile.name} · ${profile.role} · ${profile.location}` },
    { prompt: 'visitor@portfolio:~$', cmd: ' cat stack.json', out: '→ React · TypeScript · Node.js · Tailwind CSS' },
    { prompt: 'visitor@portfolio:~$', cmd: ' git log --oneline', out: '→ LingoBridge · CareerLens · Mind Mirror' },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typed < lines.length) setTyped((t) => t + 1)
    }, 700)
    return () => clearTimeout(timer)
  }, [typed, lines.length])

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20 pb-10"
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.14em', marginBottom: '1.5rem' }}>
        // developer.profile
      </p>

      <h1
        className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
        style={{ fontFamily: 'var(--font-sans)', maxWidth: '900px', color: 'var(--text)' }}
      >
        I build{' '}
        <span className="glow-text">developer-friendly</span>
        {' '}products
      </h1>
      <p
        className="mt-5 text-base sm:text-lg"
        style={{ maxWidth: '640px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}
      >
        with clean UI, useful tooling, and interfaces that feel like real working systems.
      </p>

      <div
        className="mt-10 w-full text-left"
        style={{
          maxWidth: '640px',
          background: 'var(--surface)',
          border: '1px solid var(--border-hover)',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(70,241,197,0.08)',
        }}
      >
        <div className="ide-titlebar">
          <MacDots />
          <span className="ide-filename">portfolio.sh — zsh</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)' }}>©2026</span>
        </div>
        <div className="p-5 space-y-3">
          {lines.map((line, i) => (
            <div key={i}>
              {i < typed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1"
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                    <span style={{ color: 'var(--cyan)' }}>{line.prompt}</span>
                    <span style={{ color: 'var(--text)' }}>{line.cmd}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
                    {line.out}
                  </div>
                </motion.div>
              )}
            </div>
          ))}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
            <span style={{ color: 'var(--cyan)' }}>visitor@portfolio:~$</span>
            <span className="terminal-cursor" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#projects" className="btn-term">[ ./view-projects ]</a>
        <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn-term">[ ./open-github ]</a>
        <a href={`mailto:${contactLinks.email}`} className="btn-term">[ ./contact-me ]</a>
      </div>

      <button type="button" onClick={onScrollDown} className="mt-12 flex flex-col items-center gap-2" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>scroll</span>
        <ChevronDown className="size-4 animate-bounce" style={{ color: 'var(--cyan)' }} />
      </button>
    </section>
  )
}

/* ─── About Section ──────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
      <FadeUp>
        <SectionLabel index="01" name="about" />
      </FadeUp>

      <div className="grid lg:grid-cols-[1fr_0.7fr] gap-6">
        <FadeUp delay={0.05}>
          <IdeWindow filename="about.md">
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: '0.12em' }}>
                // {profile.role}
              </p>
              <h2
                className="text-3xl font-bold leading-snug tracking-tight"
                style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}
              >
                {profile.headline}
              </h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
                {profile.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {profile.focus.map((f) => <Chip key={f} label={f} />)}
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn-term">
                  <FileCode2 className="size-4" />[ github ]
                </a>
                <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn-term">
                  [ linkedin ]<ArrowUpRight className="size-4" />
                </a>
                <a href="#hero" className="btn-term" onClick={(e) => { e.preventDefault(); document.querySelector<HTMLInputElement>('#hero-input')?.focus() }}>
                  <Terminal className="size-4" />[ terminal ]
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: 'var(--surface-hi)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '12px 14px',
                  }}
                >
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{s.label}</p>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{s.value}</p>
                </div>
              ))}
            </div>
          </IdeWindow>
        </FadeUp>

        <FadeUp delay={0.12}>
          <IdeWindow filename="identity.ts">
            <div className="code-block text-xs">
              <span className="tok-kw">const </span>
              <span className="tok-nm">identity</span>
              <span className="tok-op"> = </span>
              <span className="tok-op">{'{'}</span>{'\n'}
              {'  '}<span className="tok-nm">style</span><span className="tok-op">: </span><span className="tok-str">'developer first'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">product</span><span className="tok-op">: </span><span className="tok-str">'clear and useful'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">code</span><span className="tok-op">: </span><span className="tok-str">'modular + maintainable'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">goal</span><span className="tok-op">: </span><span className="tok-str">'build work that is easy to trust'</span>{'\n'}
              <span className="tok-op">{'}'}</span>
            </div>

            <div className="mt-6">
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                principles
              </p>
              <ul className="space-y-3">
                {profile.principles.map((p) => (
                  <li key={p} className="flex gap-2 items-start" style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--cyan)', marginTop: 2, flexShrink: 0 }}>→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                github · linkedin
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', lineHeight: 1.75 }}>
                {profile.githubSummary}
              </p>
            </div>
          </IdeWindow>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Projects Section ───────────────────────────────── */
function ProjectsSection() {
  const [selected, setSelected] = useState('lingobridge')
  const project = projects.find((p) => p.id === selected) ?? projects[0]

  return (
    <section id="projects" className="px-6 py-24" style={{ background: 'var(--surface-lo)' }}>
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <SectionLabel index="02" name="projects" />
        </FadeUp>

        <FadeUp delay={0.05}>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p.id)}
                className="btn-term shrink-0"
                style={{
                  borderColor: p.id === selected ? 'var(--cyan)' : 'var(--border)',
                  background: p.id === selected ? 'var(--cyan-soft)' : 'transparent',
                  color: p.id === selected ? 'var(--cyan)' : 'var(--text-muted)',
                  boxShadow: p.id === selected ? 'var(--cyan-glow)' : 'none',
                  borderRadius: 8,
                }}
              >
                {p.file}
              </button>
            ))}
          </div>
        </FadeUp>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid lg:grid-cols-[1fr_1.05fr] gap-6"
          >
            <IdeWindow filename={project.file}>
              <div>
                <p style={{ fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                  {project.status}
                </p>
                <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)', marginBottom: 12 }}>
                  {project.name}
                </h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((t) => <Chip key={t} label={t} />)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-term">
                      <ExternalLink className="size-4" />[ ./live-preview ]
                    </a>
                  )}
                  <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-term">
                    <FileCode2 className="size-4" />[ ./source ]
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>highlights</p>
                <ul className="space-y-2.5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2 items-start" style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </IdeWindow>

            <IdeWindow filename={project.file}>
              <div className="code-block text-xs flex-1 overflow-auto">
                {project.snippet.split('\n').map((line, i) => (
                  <div key={i} className="flex gap-4">
                    <span style={{ color: 'var(--text-muted)', userSelect: 'none', minWidth: 24, textAlign: 'right' }}>{i + 1}</span>
                    <span>{line || ' '}</span>
                  </div>
                ))}
              </div>
            </IdeWindow>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ─── Experience Section ─────────────────────────────── */
function ExperienceSection() {
  const [expanded, setExpanded] = useState('build-phase')
  const toggle = (id: string) => setExpanded((c) => (c === id ? '' : id))

  return (
    <section id="experience" className="px-6 py-24 max-w-6xl mx-auto">
      <FadeUp>
        <SectionLabel index="03" name="experience" />
      </FadeUp>

      <div className="space-y-4">
        {experienceEntries.map((entry, idx) => {
          const isOpen = expanded === entry.id
          return (
            <FadeUp key={entry.id} delay={idx * 0.06}>
              <div
                className="ide-window"
                style={{
                  borderColor: isOpen ? 'rgba(70,241,197,0.35)' : 'var(--border)',
                  boxShadow: isOpen ? '0 0 20px rgba(70,241,197,0.07)' : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(entry.id)}
                  className="w-full text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <div className="ide-titlebar" style={{ background: isOpen ? 'var(--surface-hi)' : 'var(--surface-mid)' }}>
                    <MacDots />
                    <span className="ide-filename">{entry.year} / {entry.title}.log</span>
                    <span style={{ marginLeft: 'auto', color: isOpen ? 'var(--cyan)' : 'var(--text-muted)', fontSize: 11 }}>
                      {isOpen ? '[-]' : '[+]'}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                          {entry.type} · {entry.duration}
                        </p>
                        <h3 className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)' }}>
                          {entry.title}
                        </h3>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginTop: 6, lineHeight: 1.7 }}>
                          {entry.summary}
                        </p>
                      </div>
                      <ChevronDown
                        className="size-5 shrink-0 mt-1 transition-transform duration-300"
                        style={{ color: 'var(--cyan)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {entry.stack.map((t) => <Chip key={t} label={t} />)}
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <ul
                        className="space-y-3"
                        style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)', paddingTop: 14 }}
                      >
                        {entry.details.map((d) => (
                          <li key={d} className="flex gap-2 items-start" style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                            <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>→</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          )
        })}
      </div>
    </section>
  )
}

/* ─── Skills Section ─────────────────────────────────── */
function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, 0.1)

  return (
    <section id="skills" className="px-6 py-24" style={{ background: 'var(--surface-lo)' }}>
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <SectionLabel index="04" name="skills" />
        </FadeUp>

        <div ref={ref} className="grid lg:grid-cols-[1fr_0.9fr] gap-6">
          <FadeUp delay={0.05}>
            <IdeWindow filename="capability-graph.ts">
              <div className="space-y-6">
                {skillDomains.map((d, i) => (
                  <div key={d.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text)', fontWeight: 600 }}>{d.name}</p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{d.summary}</p>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--cyan)', fontWeight: 700, minWidth: 38, textAlign: 'right' }}>
                        {d.level}%
                      </span>
                    </div>
                    <div className="skill-track">
                      <div
                        className="skill-fill"
                        style={{ width: visible ? `${d.level}%` : '0%', transitionDelay: `${i * 0.12}s` }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {d.modules.map((m) => <Chip key={m} label={m} />)}
                    </div>
                  </div>
                ))}
              </div>
            </IdeWindow>
          </FadeUp>

          <div className="space-y-4">
            <FadeUp delay={0.1}>
              <IdeWindow filename="dependency-graph.ts">
                <div className="code-block text-xs">
                  {dependencyGraph.map((line, i) => {
                    const [from, ...rest] = line.split(' -> ')
                    return (
                      <div key={i}>
                        <span className="tok-nm">{from}</span>
                        {rest.map((part, j) => (
                          <span key={j}>
                            <span className="tok-op"> → </span>
                            <span className={j === rest.length - 1 ? 'tok-str' : 'tok-nm'}>{part}</span>
                          </span>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </IdeWindow>
            </FadeUp>

            <FadeUp delay={0.15}>
              <IdeWindow filename="team-value.md">
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                  what teams get
                </p>
                <ul className="space-y-2.5">
                  {[
                    'Reusable components and cleaner project structure.',
                    'Projects presented with stronger clarity for recruiters.',
                    'Interfaces that feel modern without being noisy.',
                    'A developer who cares about code quality + product.',
                  ].map((txt) => (
                    <li key={txt} className="flex gap-2 items-start" style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>→</span>
                      {txt}
                    </li>
                  ))}
                </ul>
              </IdeWindow>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Contact Section ────────────────────────────────── */
function ContactSection({ copiedEmail, onCopyEmail }: { copiedEmail: boolean; onCopyEmail: () => void }) {
  return (
    <section id="contact" className="px-6 py-24 max-w-6xl mx-auto">
      <FadeUp>
        <SectionLabel index="05" name="contact" />
      </FadeUp>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        <FadeUp delay={0.05}>
          <IdeWindow filename="contact.sh">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.9,
                marginBottom: 20,
              }}
            >
              <div>
                <span style={{ color: 'var(--cyan)' }}>visitor@portfolio:~$</span>
                <span style={{ color: 'var(--text)' }}> status</span>
              </div>
              <div style={{ color: 'var(--text-dim)' }}>→ <span style={{ color: 'var(--cyan)' }}>open to software engineering roles</span></div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: 'var(--cyan)' }}>visitor@portfolio:~$</span>
                <span style={{ color: 'var(--text)' }}> cat availability.txt</span>
              </div>
              <div style={{ color: 'var(--text-dim)' }}>→ {profile.availability}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: 'var(--cyan)' }}>visitor@portfolio:~$</span>
                <span className="terminal-cursor" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${contactLinks.email}`} className="btn-term">
                <Mail className="size-4" />[ email ]
              </a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn-term">
                <FileCode2 className="size-4" />[ github ]
              </a>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn-term">
                [ linkedin ]<ArrowUpRight className="size-4" />
              </a>
              <button
                type="button"
                onClick={onCopyEmail}
                className="btn-term"
                style={copiedEmail ? { background: 'rgba(70,241,197,0.15)', borderColor: 'var(--cyan)' } : {}}
              >
                {copiedEmail ? <Check className="size-4" /> : <Copy className="size-4" />}
                [ {copiedEmail ? 'copied!' : 'copy email'} ]
              </button>
            </div>
          </IdeWindow>
        </FadeUp>

        <FadeUp delay={0.1}>
          <IdeWindow filename="contact.js">
            <div className="code-block text-xs flex-1">
              <span className="tok-kw">export const </span>
              <span className="tok-nm">contact</span>
              <span className="tok-op"> = </span>
              <span className="tok-op">{'{'}</span>{'\n'}
              {'  '}<span className="tok-nm">email</span><span className="tok-op">: </span><span className="tok-str">'{contactLinks.email}'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">github</span><span className="tok-op">: </span><span className="tok-str">'{contactLinks.github}'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">linkedin</span><span className="tok-op">: </span><span className="tok-str">'{contactLinks.linkedin}'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">status</span><span className="tok-op">: </span><span className="tok-str">'open to opportunities'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">location</span><span className="tok-op">: </span><span className="tok-str">'{profile.location}'</span><span className="tok-op">,</span>{'\n'}
              <span className="tok-op">{'}'}</span>
            </div>
          </IdeWindow>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────── */
function Footer({ theme }: { theme: string }) {
  return (
    <footer
      className="text-center py-8 px-6"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)' }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
        {profile.handle} · {profile.location} · 2026
        <span style={{ margin: '0 10px', color: 'var(--border)' }}>|</span>
        TypeScript · UTF-8 · {theme === 'dark' ? 'Dark' : 'Light'}
      </p>
    </footer>
  )
}

/* ─── Command Palette ────────────────────────────────── */
function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const sections = ['about', 'projects', 'experience', 'skills', 'contact']

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const filtered = sections.filter((s) => s.includes(q.toLowerCase()))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(10,10,15,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: 480, background: 'var(--surface)', border: '1px solid var(--border-hover)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
              <Search className="size-4" style={{ color: 'var(--cyan)' }} />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Navigate to section..."
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
              />
              <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px' }}>ESC</kbd>
            </div>
            <div style={{ padding: 8 }}>
              {filtered.map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 12px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-hi)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                >
                  <span style={{ color: 'var(--cyan)' }}>→</span>
                  ./go-to-{s}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [active, setActive] = useState<Section>('hero')
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Active section tracking
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'contact'] as Section[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as Section)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' },
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 1800)
    } catch {
      // ignore
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar
        active={active}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSearchClick={() => setPaletteOpen(true)}
      />

      <HeroSection onScrollDown={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <ExperienceSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <ContactSection copiedEmail={copiedEmail} onCopyEmail={() => void copyEmail()} />
      <Footer theme={theme} />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}
