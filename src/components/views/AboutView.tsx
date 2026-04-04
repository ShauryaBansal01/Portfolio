import { ArrowUpRight, FileCode2, TerminalSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { contactLinks, profile, stats } from '../../data/portfolio'
import { ProfilePhotoCard } from '../shared/ProfilePhotoCard'

type AboutViewProps = {
  onFocusTerminal: () => void
}

export function AboutView({ onFocusTerminal }: AboutViewProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] backdrop-blur-md p-5 sm:p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] font-medium text-[var(--accent)]">Overview</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm text-[var(--text-secondary)]">{profile.role}</p>
                <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-4xl">
                  {profile.headline}
                </h2>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-[15px]">
                {profile.summary}
              </p>

              <div className="flex flex-wrap gap-2">
                {profile.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--panel-border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={contactLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel-soft)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                >
                  <FileCode2 className="size-4" />
                  GitHub
                </a>
                <a
                  href={contactLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                >
                  LinkedIn
                  <ArrowUpRight className="size-4" />
                </a>
                <button
                  type="button"
                  onClick={onFocusTerminal}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
                >
                  <TerminalSquare className="size-4" />
                  Open Terminal
                </button>
              </div>
            </div>
          </div>

              <div className="grid gap-4 lg:grid-cols-2">
            <InfoPanel
              title="GitHub Presence"
              accent="text-[var(--accent)] font-medium"
              body={profile.githubSummary}
              ctaLabel="View GitHub"
              ctaUrl={contactLinks.github}
            />
            <InfoPanel
              title="LinkedIn Presence"
              accent="text-[var(--accent-secondary)] font-medium"
              body={profile.linkedinSummary}
              ctaLabel="Open LinkedIn"
              ctaUrl={contactLinks.linkedin}
            />
          </div>
        </div>

        <ProfilePhotoCard />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] backdrop-blur-md p-5 sm:p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] font-medium text-[var(--text-muted)]">Stats</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-soft)] shadow-inner p-4"
              >
                <p className="text-xs uppercase font-semibold tracking-[0.2em] text-[var(--text-muted)]">{stat.label}</p>
                <p className="mt-3 text-xl font-semibold text-[var(--text-primary)]">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] backdrop-blur-md p-5 sm:p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.24em] font-medium text-[var(--text-muted)]">Operating Principles</p>
          <div className="mt-4 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-soft)] shadow-inner p-4">
            <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-7 text-[var(--text-secondary)]">
{`const identity = {
  style: 'developer first',
  product: 'clear and useful',
  code: 'modular and maintainable',
  goal: 'build work that is easy to trust'
}`}
            </pre>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            {profile.principles.map((principle) => (
              <li key={principle} className="flex gap-2">
                <ArrowUpRight className="mt-1 size-4 flex-none text-[var(--accent-secondary)]" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function InfoPanel({
  title,
  body,
  ctaLabel,
  ctaUrl,
  accent,
}: {
  title: string
  body: string
  ctaLabel: string
  ctaUrl: string
  accent: string
}) {
  return (
    <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] backdrop-blur-md p-5 sm:p-6 shadow-sm">
      <p className={`text-xs uppercase tracking-[0.24em] ${accent}`}>{title}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
      <a
        href={ctaUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel-soft)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
      >
        {ctaLabel}
        <ArrowUpRight className="size-4" />
      </a>
    </div>
  )
}
