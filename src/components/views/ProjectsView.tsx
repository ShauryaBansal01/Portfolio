import { ArrowUpRight, ExternalLink, FileCode2 } from 'lucide-react'
import { projects } from '../../data/portfolio'
import { CodePanel } from '../shared/CodePanel'

type ProjectsViewProps = {
  selectedProjectId: string
  onSelectProject: (projectId: string) => void
}

export function ProjectsView({ selectedProjectId, onSelectProject }: ProjectsViewProps) {
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0]

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelectProject(project.id)}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              project.id === selectedProject.id
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                : 'border-[var(--panel-border)] bg-[var(--panel)] text-[var(--text-secondary)] hover:border-[var(--accent)]/60'
            }`}
          >
            {project.file}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent)]">{selectedProject.status}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                  {selectedProject.name}
                </h2>
              </div>
              <span className="rounded-full border border-[var(--panel-border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs text-[var(--text-secondary)]">
                {selectedProject.impact}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{selectedProject.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedProject.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--panel-border)] bg-[var(--panel-soft)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel-soft)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
              >
                Live Preview
                <ExternalLink className="size-4" />
              </a>
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-sm text-[var(--text-primary)] transition hover:border-[var(--accent)]"
              >
                Source
                <FileCode2 className="size-4" />
              </a>
            </div>
          </div>

          <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Highlights</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
              {selectedProject.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <ArrowUpRight className="mt-1 size-4 flex-none text-[var(--accent-secondary)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CodePanel title={selectedProject.file} code={selectedProject.snippet} />
      </div>
    </div>
  )
}
