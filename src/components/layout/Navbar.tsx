import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Terminal } from 'lucide-react'

type Section = 'hero' | 'about' | 'projects' | 'skills' | 'contact'

export function Navbar({
  active,
  onSearchClick,
}: {
  active: Section
  onSearchClick: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const sections: { id: Section; label: string }[] = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
    { id: 'contact', label: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when active section changes (on mobile)
  useEffect(() => {
    setIsOpen(false)
  }, [active])

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-[60] flex items-center justify-between px-6 py-3 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,10,18,0.92)' : 'rgba(10,10,18,0.7)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(8px)',
          borderBottom: scrolled ? '1px solid var(--border-hover)' : '1px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            className="flex items-center gap-2"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--cyan)', textDecoration: 'none' }}
          >
            <Terminal className="size-4 hidden sm:block" />
            <span>shaurya@workspace:~$</span>
          </a>
        </div>

        {/* Desktop Nav */}
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

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onSearchClick}
            className="btn-term text-xs hidden sm:inline-flex"
            style={{ borderRadius: 8, padding: '4px 12px' }}
          >
            <Search className="size-3.5" />
            [ctrl+k]
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-md transition-colors"
            style={{ color: 'var(--cyan)', background: 'rgba(0,212,170,0.05)', border: '1px solid var(--border)' }}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-[var(--bg)] md:hidden flex flex-col pt-24 px-8"
          >
            {/* Background Grid */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
              opacity: 0.1,
            }} />

            <div className="relative z-10 flex flex-col gap-8">
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--cyan)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: -16
              }}>
                // navigation.system
              </p>

              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-4 py-2"
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{
                    color: active === s.id ? 'var(--cyan)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.25rem',
                    transition: 'all 0.3s'
                  }}>
                    {active === s.id ? '→' : ' '}
                  </span>
                  <span style={{
                    color: active === s.id ? 'var(--text)' : 'var(--text-dim)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.75rem',
                    fontWeight: active === s.id ? 700 : 400,
                    letterSpacing: '-0.02em',
                    transition: 'all 0.3s'
                  }}>
                    {s.label}
                  </span>
                </a>
              ))}

              <div className="mt-8 pt-8 border-t border-[var(--border)]">
                <button
                  onClick={() => { setIsOpen(false); onSearchClick(); }}
                  className="btn-term w-full flex justify-center py-4"
                >
                  <Search className="size-5" />
                  [ open_search ]
                </button>
              </div>
            </div>

            <div className="mt-auto pb-12 opacity-30 text-center">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                CORE_SYSTEM_VERSION_2.0.4<br />
                © 2026 SHAURYA WORKSPACE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
