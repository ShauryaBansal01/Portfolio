import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { dependencyGraph, skillDomains } from '../../data/portfolio'

export function SkillsView() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.88fr]">
      <div className="space-y-4">
        <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Capability Graph</p>
          <div className="mt-5 space-y-4">
            {skillDomains.map((domain) => (
              <div
                key={domain.id}
                className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-soft)] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--text-primary)]">{domain.name}</h2>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{domain.summary}</p>
                  </div>
                  <span className="text-sm font-medium text-[var(--accent)]">{domain.level}%</span>
                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full border border-[var(--panel-border)] bg-[var(--panel)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${domain.level}%` }}
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-secondary))]"
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {domain.modules.map((moduleName) => (
                    <span
                      key={moduleName}
                      className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                    >
                      {moduleName}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Dependencies</p>
          <div className="mt-4 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-soft)] p-4">
            <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-8 text-[var(--text-secondary)]">
{dependencyGraph.join('\n')}
            </pre>
          </div>
        </div>

        <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">What teams get</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
            <li className="flex gap-2">
              <ChevronRight className="mt-1 size-4 flex-none text-[var(--accent)]" />
              <span>Reusable components and cleaner project structure.</span>
            </li>
            <li className="flex gap-2">
              <ChevronRight className="mt-1 size-4 flex-none text-[var(--accent)]" />
              <span>Projects presented with stronger clarity for recruiters and teams.</span>
            </li>
            <li className="flex gap-2">
              <ChevronRight className="mt-1 size-4 flex-none text-[var(--accent)]" />
              <span>Interfaces that feel modern without becoming noisy or gimmicky.</span>
            </li>
            <li className="flex gap-2">
              <ChevronRight className="mt-1 size-4 flex-none text-[var(--accent)]" />
              <span>A developer who cares about both code quality and product presentation.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
