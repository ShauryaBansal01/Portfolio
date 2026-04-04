import { Activity, LayoutPanelLeft } from 'lucide-react'
import { explorerFiles } from '../../data/portfolio'
import { iconForFile } from '../../utils/icons'
import type { FileId, Theme } from '../../types/portfolio'

type ExplorerSidebarProps = {
  activeFile: FileId
  theme: Theme
  onOpenFile: (fileId: FileId) => void
}

export function ExplorerSidebar({ activeFile, theme, onOpenFile }: ExplorerSidebarProps) {
  return (
    <aside className="border-b border-[var(--panel-border)] bg-[var(--panel-soft)] lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-3 sm:px-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">Explorer</p>
            <p className="text-sm text-[var(--text-secondary)]">system files</p>
          </div>
          <LayoutPanelLeft className="size-4 text-[var(--text-muted)]" />
        </div>

        <div className="flex gap-2 overflow-x-auto px-3 pb-4 lg:flex-col lg:overflow-visible lg:px-4">
          {explorerFiles.map((file) => {
            const FileIcon = iconForFile(file.id)
            const isActive = file.id === activeFile

            return (
              <button
                key={file.id}
                type="button"
                onClick={() => onOpenFile(file.id)}
                className={`min-w-[220px] rounded-2xl border px-3 py-3 text-left transition lg:min-w-0 ${
                  isActive
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                    : 'border-[var(--panel-border)] bg-[var(--panel)] hover:border-[var(--accent)]/60 hover:bg-[var(--panel)]/90'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg border border-[var(--panel-border)] bg-[var(--panel-elevated)] p-2 text-[var(--accent)]">
                    <FileIcon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">{file.label}</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{file.note}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mx-4 mb-4 mt-auto rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] p-4 sm:mx-5">
          <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
            <Activity className="size-4 text-[var(--accent-secondary)]" />
            System Snapshot
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <InfoCard label="Mode" value="Building" />
            <InfoCard label="Focus" value="Projects" />
            <InfoCard label="Theme" value={theme === 'dark' ? 'Dark' : 'Light'} />
            <InfoCard label="Status" value="Available" accent />
          </div>
        </div>
      </div>
    </aside>
  )
}

function InfoCard({
  label,
  value,
  accent = false,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel-elevated)] p-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
      <p className={`mt-2 ${accent ? 'text-[var(--accent-secondary)]' : 'text-[var(--text-primary)]'}`}>
        {value}
      </p>
    </div>
  )
}
