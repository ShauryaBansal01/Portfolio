import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { contactLinks, profile } from '../../data/portfolio'
import { MacDots } from '../ui/Primitives'
import { CoderScene3D } from '../ui/CoderScene3D'

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
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 48px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        opacity: 0.18,
      }} />

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
      }}
        className="hero-grid"
      >
        {/* ── LEFT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          {/* Label */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--cyan)',
            letterSpacing: '0.16em',
            margin: 0,
          }}>
            // developer.profile
          </p>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: 'var(--text)',
            margin: 0,
          }}>
            I build{' '}
            <span className="glow-text glitch-effect">user-friendly</span>
            {' '}products
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            margin: 0,
            maxWidth: '480px',
          }}>
            with clean UI, useful tooling, and interfaces that feel like real working systems.
          </p>

          {/* Terminal window */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-hover)',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: 'var(--cyan-glow)',
          }}>
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
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--cyan)' }}>{line.prompt}</span>
                        <span style={{ color: 'var(--text)' }}>{line.cmd}</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        {line.out}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--cyan)' }}>visitor@portfolio:~$</span>
                <span className="terminal-cursor" />
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <a href="/resume.pdf" download className="btn-term glow-text">[ ./download-resume ]</a>
            <a href="#projects" className="btn-term">[ ./view-projects ]</a>
            <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn-term">[ ./open-github ]</a>
            <a href={`mailto:${contactLinks.email}`} className="btn-term">[ ./contact-me ]</a>
          </div>
        </motion.div>

        <motion.div
          className="hero-right-col"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Outer glow halo */}
          <div style={{
            position: 'absolute',
            inset: '10%',
            background: 'radial-gradient(ellipse at center, rgba(0,212,170,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
          <CoderScene3D />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '56px', position: 'relative' }}>
        <button
          type="button"
          onClick={onScrollDown}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
        >
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>scroll</span>
          <ChevronDown className="size-4 animate-bounce" style={{ color: 'var(--cyan)' }} />
        </button>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        .hero-right-col {
          padding-left: 50px;
        }
        @media (max-width: 860px) {
          #hero {
            padding: 80px 24px 40px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            text-align: left;
          }
          .hero-right-col {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
