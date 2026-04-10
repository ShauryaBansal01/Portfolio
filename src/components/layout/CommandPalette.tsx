import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'

export function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const sections = ['about', 'projects', 'skills', 'contact']

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
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,5,10,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12vh' }}
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
