type CodePanelProps = {
  title: string
  code: string
}

function CodeRow({ lineNumber, content }: { lineNumber: number; content: string }) {
  return (
    <>
      <span className="select-none text-right text-[var(--text-muted)]">{lineNumber}</span>
      <code className="whitespace-pre text-[var(--text-primary)]">{content || ' '}</code>
    </>
  )
}

export function CodePanel({ title, code }: CodePanelProps) {
  const lines = code.split('\n')

  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel)]">
      <div className="flex items-center justify-between border-b border-[var(--panel-border)] bg-[var(--panel-soft)] px-4 py-3">
        <p className="text-sm text-[var(--text-primary)]">{title}</p>
        <span className="text-xs text-[var(--text-muted)]">{lines.length} lines</span>
      </div>

      <div className="overflow-x-auto p-4">
        <div className="grid min-w-full grid-cols-[auto_minmax(0,1fr)] gap-x-4 font-mono text-sm leading-7 text-[var(--text-secondary)]">
          {lines.map((line, index) => (
            <CodeRow key={`${title}-${index + 1}`} lineNumber={index + 1} content={line} />
          ))}
        </div>
      </div>
    </div>
  )
}
