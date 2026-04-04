type FileHeaderProps = {
  file: string
  description: string
}

export function FileHeader({ file, description }: FileHeaderProps) {
  return (
    <div className="rounded-[22px] border border-[var(--panel-border)] bg-[var(--panel-soft)] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-[var(--text-muted)]">Editor</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-3xl">
            {file}
          </h1>
        </div>
        <div className="rounded-xl border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--text-secondary)]">
          {description}
        </div>
      </div>
    </div>
  )
}
