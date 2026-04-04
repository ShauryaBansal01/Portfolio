import type { TerminalMessageKind } from '../../types/portfolio'

type TerminalLineProps = {
  kind: TerminalMessageKind
  text: string
  isTyping?: boolean
}

export function TerminalLine({ kind, text, isTyping = false }: TerminalLineProps) {
  const prefix =
    kind === 'input' ? 'visitor@portfolio:~$' : kind === 'system' ? '[system]' : '[output]'

  return (
    <div className="flex gap-3 text-sm leading-7">
      <span
        className={`flex-none ${
          kind === 'input'
            ? 'text-[var(--accent-secondary)]'
            : kind === 'system'
              ? 'text-[var(--text-muted)]'
              : 'text-[var(--accent)]'
        }`}
      >
        {prefix}
      </span>
      <span className="min-w-0 break-words text-[var(--text-primary)]">
        {text}
        {isTyping ? <span className="terminal-cursor" /> : null}
      </span>
    </div>
  )
}
