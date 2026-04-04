import { explorerFiles } from '../../data/portfolio'
import { iconForFile } from '../../utils/icons'
import type { FileId } from '../../types/portfolio'

type EditorTabsProps = {
  openTabs: FileId[]
  activeFile: FileId
  onOpenFile: (fileId: FileId) => void
}

export function EditorTabs({ openTabs, activeFile, onOpenFile }: EditorTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-[var(--panel-border)] bg-[var(--panel)] px-3 py-2 sm:px-4">
      {openTabs.map((tabId) => {
        const tab = explorerFiles.find((file) => file.id === tabId)
        if (!tab) {
          return null
        }

        const TabIcon = iconForFile(tab.id)
        const isActive = tab.id === activeFile

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onOpenFile(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
              isActive
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]'
                : 'border-transparent bg-transparent text-[var(--text-secondary)] hover:border-[var(--panel-border)] hover:bg-[var(--panel-soft)]'
            }`}
          >
            <TabIcon className="size-4" />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
