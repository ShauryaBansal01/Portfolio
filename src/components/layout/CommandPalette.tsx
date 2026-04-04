import { Command, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export type PaletteItem = {
  id: string
  title: string
  subtitle: string
  run: () => void
}

type CommandPaletteProps = {
  isOpen: boolean
  query: string
  selectedIndex: number
  items: PaletteItem[]
  inputRef: React.RefObject<HTMLInputElement | null>
  onClose: () => void
  onQueryChange: (value: string) => void
}

export function CommandPalette({
  isOpen,
  query,
  selectedIndex,
  items,
  inputRef,
  onClose,
  onQueryChange,
}: CommandPaletteProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-[var(--panel-border)] bg-[var(--panel)] shadow-[var(--panel-shadow)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[var(--panel-border)] px-4 py-4 sm:px-5">
              <Command className="size-4 text-[var(--accent)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search commands, files, or actions"
                className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto p-2">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      item.run()
                      onClose()
                    }}
                    className={`flex w-full items-start justify-between rounded-2xl px-3 py-3 text-left transition ${
                      selectedIndex === index
                        ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--panel-soft)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-xs text-[var(--text-muted)]">{item.subtitle}</p>
                    </div>
                    <ChevronRight className="mt-1 size-4" />
                  </button>
                ))
              ) : (
                <div className="px-4 py-12 text-center text-sm text-[var(--text-secondary)]">
                  No command matched that search. Try <span className="text-[var(--accent)]">projects</span> or{' '}
                  <span className="text-[var(--accent)]">linkedin</span>.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
