import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactLinks } from './data/portfolio'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CommandPalette } from './components/layout/CommandPalette'
import { HeroSection } from './components/sections/HeroSection'
import { AboutSection } from './components/sections/AboutSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ContactSection } from './components/sections/ContactSection'
import { BootSequence } from './components/ui/BootSequence'

type Section = 'hero' | 'about' | 'projects' | 'skills' | 'contact'

export default function App() {
  const [hasBooted, setHasBooted] = useState(false)
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
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'] as Section[]
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
    <>
      <div className="crt-overlay" />
      <AnimatePresence>
        {!hasBooted && (
          <motion.div
            key="boot-sequence"
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
          >
            <BootSequence onComplete={() => setHasBooted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ minHeight: '100vh', background: 'var(--bg)', opacity: hasBooted ? 1 : 0, transition: 'opacity 1s ease', pointerEvents: hasBooted ? 'auto' : 'none' }}>
        <Navbar
          active={active}
          onSearchClick={() => setPaletteOpen(true)}
        />

        <HeroSection onScrollDown={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <ProjectsSection />
        <div className="section-divider" />
        <SkillsSection />
        <div className="section-divider" />
        <ContactSection copiedEmail={copiedEmail} onCopyEmail={() => void copyEmail()} />
        <Footer />

        <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </div>
    </>
  )
}
