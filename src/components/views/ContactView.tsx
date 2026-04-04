import { ArrowUpRight, Copy, FileCode2, Mail } from 'lucide-react'
import { contactLinks, profile } from '../../data/portfolio'
import { CodePanel } from '../shared/CodePanel'

type ContactViewProps = {
  copiedEmail: boolean
  onCopyEmail: () => void
}

export function ContactView({ copiedEmail, onCopyEmail }: ContactViewProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-4">
        <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
            Let&apos;s build something useful.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{profile.linkedinSummary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${contactLinks.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel-soft)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
            >
              <Mail className="size-4" />
              Email
            </a>
            <a
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
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
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
            >
              <Copy className="size-4" />
              {copiedEmail ? 'Copied' : 'Copy Email'}
            </button>
          </div>
        </div>

        <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Professional Presence</p>
          <div className="mt-4 space-y-4">
            <SocialCard
              title="GitHub"
              description={profile.githubSummary}
              href={contactLinks.github}
              label="Open GitHub"
            />
            <SocialCard
              title="LinkedIn"
              description={profile.linkedinSummary}
              href={contactLinks.linkedin}
              label="Open LinkedIn"
            />
          </div>
        </div>
      </div>

      <CodePanel
        title="contact.js"
        code={`export const contact = {
  email: '${contactLinks.email}',
  github: '${contactLinks.github}',
  linkedin: '${contactLinks.linkedin}',
  resume: '${contactLinks.resume}',
  status: 'open to software engineering opportunities',
}`}
      />
    </div>
  )
}

function SocialCard({
  title,
  description,
  href,
  label,
}: {
  title: string
  description: string
  href: string
  label: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-soft)] p-4">
      <p className="text-sm font-medium text-[var(--text-primary)]">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{description}</p>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
      >
        {label}
        <ArrowUpRight className="size-4" />
      </a>
    </div>
  )
}
