import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { experienceEntries } from '../../data/portfolio'
import { iconForExperienceType } from '../../utils/icons'

type ExperienceViewProps = {
  expandedExperienceId: string
  onToggleExperience: (entryId: string) => void
}

export function ExperienceView({
  expandedExperienceId,
  onToggleExperience,
}: ExperienceViewProps) {
  return (
    <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Timeline</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
            Journey through projects, growth, and portfolio building
          </h2>
        </div>
        <div className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel-soft)] px-3 py-2 text-sm text-[var(--text-secondary)]">
          {experienceEntries.length} milestones
        </div>
      </div>

      <div className="relative mt-8 space-y-4 before:absolute before:left-[18px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-[var(--panel-border)]">
        {experienceEntries.map((entry) => {
          const EntryIcon = iconForExperienceType(entry.type)
          const isExpanded = expandedExperienceId === entry.id

          return (
            <motion.button
              key={entry.id}
              type="button"
              layout
              onClick={() => onToggleExperience(entry.id)}
              className="relative block w-full rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel-soft)] p-5 text-left transition hover:border-[var(--accent)]/60"
            >
              <span className="absolute left-[7px] top-6 flex size-6 items-center justify-center rounded-full border border-[var(--panel-border)] bg-[var(--panel)] text-[var(--accent)]">
                <EntryIcon className="size-3.5" />
              </span>

              <div className="ml-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                      {entry.year} · {entry.type}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{entry.duration}</p>
                  </div>
                  <span className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-2 text-xs text-[var(--text-secondary)]">
                    {isExpanded ? 'collapse' : 'expand'}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{entry.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-5 space-y-3 border-t border-[var(--panel-border)] pt-5 text-sm text-[var(--text-secondary)]">
                        {entry.details.map((detail) => (
                          <li key={detail} className="flex gap-2">
                            <ChevronDown className="mt-1 size-4 flex-none text-[var(--accent-secondary)]" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
