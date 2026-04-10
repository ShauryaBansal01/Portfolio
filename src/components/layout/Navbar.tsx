import { Search } from 'lucide-react'

type Section = 'hero' | 'about' | 'projects' | 'skills' | 'contact'

export function Navbar({
  active,
  onSearchClick,
}: {
  active: Section
  onSearchClick: () => void
}) {
  const sections: { id: Section; label: string }[] = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
    { id: 'contact', label: 'contact' },
  ]

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-3"
      style={{
        background: 'rgba(10,10,18,0.8)',
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
      </div>
    </header>
  )
}
