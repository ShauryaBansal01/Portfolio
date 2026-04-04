import { TerminalSquare } from 'lucide-react'
import { TerminalLine } from './TerminalLine'
import type { TerminalMessage } from '../../types/portfolio'

type TerminalPanelProps = {
  terminalMessages: TerminalMessage[]
  activeTypedMessage: TerminalMessage | null
  typedLength: number
  terminalInput: string
  terminalViewportRef: React.RefObject<HTMLDivElement | null>
  terminalInputRef: React.RefObject<HTMLInputElement | null>
  setTerminalInput: (value: string) => void
  runTerminalCommand: (value: string) => void
}

export function TerminalPanel({
  terminalMessages,
  activeTypedMessage,
  typedLength,
  terminalInput,
  terminalViewportRef,
  terminalInputRef,
  setTerminalInput,
  runTerminalCommand,
}: TerminalPanelProps) {
  return (
    <section className="border-t border-[var(--panel-border)] bg-[var(--panel-soft)]">
      <div className="flex items-center justify-between border-b border-[var(--panel-border)] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
          <TerminalSquare className="size-4 text-[var(--accent)]" />
          terminal
        </div>
        <div className="text-xs text-[var(--text-muted)]">
          try <span className="text-[var(--accent)]">help</span>,{' '}
          <span className="text-[var(--accent)]">github</span>,{' '}
          <span className="text-[var(--accent)]">linkedin</span>
        </div>
      </div>

      <div ref={terminalViewportRef} className="terminal-scroll h-[290px] overflow-y-auto px-4 py-4 sm:px-5">
        {terminalMessages.map((message) => (
          <TerminalLine key={message.id} kind={message.kind} text={message.text} />
        ))}

        {activeTypedMessage ? (
          <TerminalLine
            kind={activeTypedMessage.kind}
            text={activeTypedMessage.text.slice(0, typedLength)}
            isTyping
          />
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          runTerminalCommand(terminalInput)
          setTerminalInput('')
        }}
        className="flex items-center gap-3 border-t border-[var(--panel-border)] px-4 py-3 sm:px-5"
      >
        <span className="text-sm text-[var(--accent-secondary)]">visitor@portfolio:~$</span>
        <input
          ref={terminalInputRef}
          value={terminalInput}
          onChange={(event) => setTerminalInput(event.target.value)}
          placeholder='type "help"'
          className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
        />
      </form>
    </section>
  )
}
