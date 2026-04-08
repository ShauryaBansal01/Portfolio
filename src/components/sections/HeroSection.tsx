import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { contactLinks, profile } from '../../data/portfolio'
import { MacDots } from '../ui/Primitives'

export function HeroSection({ onScrollDown }: { onScrollDown: () => void }) {
  const [typed, setTyped] = useState(0)
  const lines = [
    { prompt: 'visitor@portfolio:~$', cmd: ' whoami', out: `→ ${profile.name} · ${profile.role} · ${profile.location}` },
    { prompt: 'visitor@portfolio:~$', cmd: ' cat stack.json', out: '→ React · JavaScript · Node.js · Tailwind CSS' },
    { prompt: 'visitor@portfolio:~$', cmd: ' git log --oneline', out: '→ Streamify · CareerLens · Mind Mirror' },
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
        <span className="glow-text glitch-effect">user-friendly</span>
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
          boxShadow: 'var(--cyan-glow)',
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
        <a href="/resume.pdf" download className="btn-term glow-text">[ ./download-resume ]</a>
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
