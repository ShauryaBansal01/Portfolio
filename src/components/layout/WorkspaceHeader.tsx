import { MoonStar, Search, SunMedium } from 'lucide-react'
import { profile } from '../../data/portfolio'
import type { Theme } from '../../types/portfolio'

type WorkspaceHeaderProps = {
  activeFileLabel: string
  theme: Theme
  onOpenPalette: () => void
  onToggleTheme: () => void
}

export function WorkspaceHeader({
  activeFileLabel,
  theme,
  onOpenPalette,
  onToggleTheme,
}: WorkspaceHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[var(--panel-border)] bg-[var(--panel-soft)] px-4 py-3 sm:px-5">
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 sm:flex">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Portfolio Workspace</p>
          <p className="text-sm text-[var(--text-secondary)]">
            {profile.handle} / {activeFileLabel}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenPalette}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
        >
          <Search className="size-4" />
          <span className="hidden sm:inline">Command Palette</span>
          <span className="rounded-md border border-[var(--panel-border)] px-1.5 py-0.5 text-[11px] text-[var(--text-muted)]">
            Ctrl K
          </span>
        </button>
        <button
          type="button"
          onClick={onToggleTheme}
          className="inline-flex size-11 items-center justify-center rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
        </button>
      </div>
    </header>
  )
}
