import { useEffect, useRef, useState } from 'react'
import { contactLinks, initialTerminalMessages, profile, projects } from '../data/portfolio'
import type { FileId, TerminalMessage } from '../types/portfolio'

type UseTerminalOptions = {
  onOpenFile: (fileId: FileId) => void
  onToggleTheme: () => void
  nextThemeLabel: 'dark' | 'light'
}

export function useTerminal({
  onOpenFile,
  onToggleTheme,
  nextThemeLabel,
}: UseTerminalOptions) {
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalMessages, setTerminalMessages] = useState<TerminalMessage[]>(initialTerminalMessages)
  const [typingQueue, setTypingQueue] = useState<TerminalMessage[]>([])
  const [activeTypedMessage, setActiveTypedMessage] = useState<TerminalMessage | null>(null)
  const [typedLength, setTypedLength] = useState(0)
  const terminalViewportRef = useRef<HTMLDivElement | null>(null)
  const terminalInputRef = useRef<HTMLInputElement | null>(null)
  const nextMessageId = useRef(initialTerminalMessages.length + 1)

  const enqueueOutput = (lines: string[]) => {
    setTypingQueue((currentQueue) => [
      ...currentQueue,
      ...lines.map((line) => ({
        id: nextMessageId.current++,
        kind: 'output' as const,
        text: line,
      })),
    ])
  }

  const runTerminalCommand = (rawCommand: string) => {
    const trimmedCommand = rawCommand.trim()
    if (!trimmedCommand) {
      return
    }

    const normalizedCommand = trimmedCommand.toLowerCase()
    const [command, ...args] = normalizedCommand.split(/\s+/)

    setTerminalMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nextMessageId.current++,
        kind: 'input',
        text: trimmedCommand,
      },
    ])

    if (command === 'clear') {
      setTypingQueue([])
      setActiveTypedMessage(null)
      setTypedLength(0)
      setTerminalMessages([])
      return
    }

    if (command === 'help') {
      enqueueOutput([
        'available commands: help, about, projects, experience, skills, contact, github, linkedin, theme, ls, whoami, coffee, sudo hire-me, clear',
        'navigation tip: press Ctrl+K or Cmd+K to open the command palette',
      ])
      return
    }

    if (command === 'about') {
      onOpenFile('about')
      enqueueOutput(['opening about.md', 'Loaded intro, profile photo, GitHub, and LinkedIn details.'])
      return
    }

    if (command === 'projects') {
      onOpenFile('projects')
      enqueueOutput([
        'opening projects.json',
        `${projects.length} featured projects loaded: ${projects.map((project) => project.name).join(', ')}`,
      ])
      return
    }

    if (command === 'experience') {
      onOpenFile('experience')
      enqueueOutput(['opening experience.log', 'Timeline loaded with project milestones and growth points.'])
      return
    }

    if (command === 'skills') {
      onOpenFile('skills')
      enqueueOutput(['opening skills.ts', 'Loaded frontend, architecture, tooling, and product thinking skills.'])
      return
    }

    if (command === 'contact') {
      onOpenFile('contact')
      enqueueOutput(['opening contact.js', `Reach me via email, GitHub, or LinkedIn.`])
      return
    }

    if (command === 'github') {
      enqueueOutput([profile.githubSummary, contactLinks.github])
      return
    }

    if (command === 'linkedin') {
      enqueueOutput([profile.linkedinSummary, contactLinks.linkedin])
      return
    }

    if (command === 'theme') {
      onToggleTheme()
      enqueueOutput([`theme switched to ${nextThemeLabel} mode`])
      return
    }

    if (command === 'ls') {
      enqueueOutput(['about.md', 'projects.json', 'experience.log', 'skills.ts', 'contact.js'])
      return
    }

    if (command === 'whoami') {
      enqueueOutput([`${profile.name} // ${profile.role}`, profile.summary])
      return
    }

    if (command === 'coffee') {
      enqueueOutput(['brewing...', 'Done. Focus increased, bugs intimidated, system stable.'])
      return
    }

    if (command === 'sudo' && args.join(' ') === 'hire-me') {
      enqueueOutput([
        'permission granted',
        'This system ships polished UI, practical products, and clean project presentation.',
      ])
      return
    }

    enqueueOutput([`command not found: ${trimmedCommand}`, 'Try "help" for available commands.'])
  }

  useEffect(() => {
    if (activeTypedMessage || typingQueue.length === 0) {
      return
    }

    const [nextMessage, ...rest] = typingQueue
    setTypingQueue(rest)
    setActiveTypedMessage(nextMessage)
    setTypedLength(0)
  }, [activeTypedMessage, typingQueue])

  useEffect(() => {
    if (!activeTypedMessage) {
      return
    }

    if (typedLength >= activeTypedMessage.text.length) {
      const completionTimeout = window.setTimeout(() => {
        setTerminalMessages((currentMessages) => [...currentMessages, activeTypedMessage])
        setActiveTypedMessage(null)
        setTypedLength(0)
      }, 90)

      return () => {
        window.clearTimeout(completionTimeout)
      }
    }

    const typingTimeout = window.setTimeout(() => {
      setTypedLength((currentLength) => currentLength + 1)
    }, 12)

    return () => {
      window.clearTimeout(typingTimeout)
    }
  }, [activeTypedMessage, typedLength])

  useEffect(() => {
    terminalViewportRef.current?.scrollTo({
      top: terminalViewportRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [terminalMessages, activeTypedMessage, typedLength])

  return {
    terminalInput,
    setTerminalInput,
    terminalMessages,
    activeTypedMessage,
    typedLength,
    terminalViewportRef,
    terminalInputRef,
    runTerminalCommand,
    enqueueOutput,
  }
}
