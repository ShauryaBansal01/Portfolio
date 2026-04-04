import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { PanelsTopLeft } from 'lucide-react'
import { startTransition, useDeferredValue, useEffect, useEffectEvent, useRef, useState } from 'react'
import { CommandPalette, type PaletteItem } from './components/layout/CommandPalette'
import { EditorTabs } from './components/layout/EditorTabs'
import { ExplorerSidebar } from './components/layout/ExplorerSidebar'
import { WorkspaceHeader } from './components/layout/WorkspaceHeader'
import { TerminalPanel } from './components/terminal/TerminalPanel'
import { FileHeader } from './components/shared/FileHeader'
import { AboutView } from './components/views/AboutView'
import { ContactView } from './components/views/ContactView'
import { ExperienceView } from './components/views/ExperienceView'
import { ProjectsView } from './components/views/ProjectsView'
import { SkillsView } from './components/views/SkillsView'
import { contactLinks, explorerFiles, profile } from './data/portfolio'
import { useTerminal } from './hooks/use-terminal'
import { useTheme } from './hooks/use-theme'
import type { FileId } from './types/portfolio'
import { fuzzyScore } from './utils/fuzzy-score'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [activeFile, setActiveFile] = useState<FileId>('about')
  const [openTabs, setOpenTabs] = useState<FileId[]>(['about', 'projects', 'experience'])
  const [selectedProjectId, setSelectedProjectId] = useState('lingobridge')
  const [expandedExperienceId, setExpandedExperienceId] = useState('build-phase')
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const paletteInputRef = useRef<HTMLInputElement | null>(null)
  const deferredPaletteQuery = useDeferredValue(paletteQuery)

  const openFile = (fileId: FileId) => {
    startTransition(() => {
      setOpenTabs((currentTabs) =>
        currentTabs.includes(fileId) ? currentTabs : [...currentTabs, fileId],
      )
      setActiveFile(fileId)
    })
  }

  const {
    terminalInput,
    setTerminalInput,
    terminalMessages,
    activeTypedMessage,
    typedLength,
    terminalViewportRef,
    terminalInputRef,
    runTerminalCommand,
    enqueueOutput,
  } = useTerminal({
    onOpenFile: openFile,
    onToggleTheme: toggleTheme,
    nextThemeLabel: theme === 'dark' ? 'light' : 'dark',
  })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email)
      setCopiedEmail(true)
      enqueueOutput([`copied ${contactLinks.email} to clipboard`])
      window.setTimeout(() => {
        setCopiedEmail(false)
      }, 1600)
    } catch {
      enqueueOutput(['clipboard access failed, but the email is visible in contact.js'])
    }
  }

  const focusTerminal = () => {
    terminalInputRef.current?.focus()
  }

  const paletteItems: PaletteItem[] = [
    {
      id: 'open-about',
      title: 'Open About',
      subtitle: 'Jump to about.md',
      run: () => openFile('about'),
    },
    {
      id: 'open-projects',
      title: 'Open Projects',
      subtitle: 'Jump to projects.json',
      run: () => openFile('projects'),
    },
    {
      id: 'open-experience',
      title: 'Open Experience',
      subtitle: 'Jump to experience.log',
      run: () => openFile('experience'),
    },
    {
      id: 'open-skills',
      title: 'Open Skills',
      subtitle: 'Jump to skills.ts',
      run: () => openFile('skills'),
    },
    {
      id: 'open-contact',
      title: 'Open Contact',
      subtitle: 'Jump to contact.js',
      run: () => openFile('contact'),
    },
    {
      id: 'focus-terminal',
      title: 'Focus Terminal',
      subtitle: 'Move cursor to the interactive shell',
      run: focusTerminal,
    },
    {
      id: 'toggle-theme',
      title: theme === 'dark' ? 'Switch To Light Mode' : 'Switch To Dark Mode',
      subtitle: 'Toggle the workspace theme',
      run: toggleTheme,
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      subtitle: `Copy ${contactLinks.email}`,
      run: () => {
        void copyEmail()
      },
    },
    {
      id: 'open-github',
      title: 'Open GitHub',
      subtitle: 'View GitHub profile link',
      run: () => window.open(contactLinks.github, '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'open-linkedin',
      title: 'Open LinkedIn',
      subtitle: 'View LinkedIn profile link',
      run: () => window.open(contactLinks.linkedin, '_blank', 'noopener,noreferrer'),
    },
  ]

  const filteredPaletteItems = paletteItems
    .map((item) => ({
      item,
      score: fuzzyScore(deferredPaletteQuery, `${item.title} ${item.subtitle}`),
    }))
    .filter((entry) => entry.score >= 0)
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.item)

  useEffect(() => {
    if (!isPaletteOpen) {
      return
    }

    window.requestAnimationFrame(() => {
      paletteInputRef.current?.focus()
    })
  }, [isPaletteOpen])

  useEffect(() => {
    if (filteredPaletteItems.length === 0) {
      setPaletteIndex(0)
      return
    }

    setPaletteIndex((currentIndex) => Math.min(currentIndex, filteredPaletteItems.length - 1))
  }, [filteredPaletteItems.length])

  useEffect(() => {
    setPaletteIndex(0)
  }, [deferredPaletteQuery])

  const handleGlobalKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      setIsPaletteOpen(true)
      return
    }

    if (!isPaletteOpen) {
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      setIsPaletteOpen(false)
      setPaletteQuery('')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setPaletteIndex((currentIndex) =>
        filteredPaletteItems.length === 0 ? 0 : (currentIndex + 1) % filteredPaletteItems.length,
      )
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setPaletteIndex((currentIndex) =>
        filteredPaletteItems.length === 0
          ? 0
          : (currentIndex - 1 + filteredPaletteItems.length) % filteredPaletteItems.length,
      )
      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const selectedItem = filteredPaletteItems[paletteIndex]
      if (selectedItem) {
        selectedItem.run()
        setIsPaletteOpen(false)
        setPaletteQuery('')
      }
    }
  })

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      handleGlobalKeyDown(event)
    }

    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [handleGlobalKeyDown])

  const activeFileMeta = explorerFiles.find((file) => file.id === activeFile) ?? explorerFiles[0]

  return (
    <MotionConfig transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
        <div className="mx-auto flex min-h-screen max-w-[1640px] flex-col p-3 sm:p-4 lg:p-6">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[24px] border border-[var(--panel-border)] bg-[var(--panel)] shadow-[var(--panel-shadow)]">
            <WorkspaceHeader
              activeFileLabel={activeFileMeta.label}
              theme={theme}
              onOpenPalette={() => setIsPaletteOpen(true)}
              onToggleTheme={toggleTheme}
            />

            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
              <ExplorerSidebar activeFile={activeFile} theme={theme} onOpenFile={openFile} />

              <main className="flex min-h-0 flex-col">
                <EditorTabs openTabs={openTabs} activeFile={activeFile} onOpenFile={openFile} />

                <div className="editor-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
                  <AnimatePresence mode="wait">
                    <motion.section
                      key={activeFile}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="space-y-4"
                    >
                      <FileHeader file={activeFileMeta.label} description={activeFileMeta.note} />

                      {activeFile === 'about' && <AboutView onFocusTerminal={focusTerminal} />}
                      {activeFile === 'projects' && (
                        <ProjectsView
                          selectedProjectId={selectedProjectId}
                          onSelectProject={setSelectedProjectId}
                        />
                      )}
                      {activeFile === 'experience' && (
                        <ExperienceView
                          expandedExperienceId={expandedExperienceId}
                          onToggleExperience={(entryId) =>
                            setExpandedExperienceId((currentId) => (currentId === entryId ? '' : entryId))
                          }
                        />
                      )}
                      {activeFile === 'skills' && <SkillsView />}
                      {activeFile === 'contact' && (
                        <ContactView copiedEmail={copiedEmail} onCopyEmail={() => void copyEmail()} />
                      )}
                    </motion.section>
                  </AnimatePresence>
                </div>
              </main>
            </div>

            <TerminalPanel
              terminalMessages={terminalMessages}
              activeTypedMessage={activeTypedMessage}
              typedLength={typedLength}
              terminalInput={terminalInput}
              terminalViewportRef={terminalViewportRef}
              terminalInputRef={terminalInputRef}
              setTerminalInput={setTerminalInput}
              runTerminalCommand={runTerminalCommand}
            />

            <footer className="flex items-center justify-between border-t border-[var(--panel-border)] bg-[var(--panel-elevated)] px-4 py-2 text-xs text-[var(--text-secondary)] sm:px-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5">
                  <PanelsTopLeft className="size-3.5 text-[var(--accent)]" />
                  workspace.tsx
                </span>
                <span className="hidden sm:inline">TypeScript</span>
                <span className="hidden sm:inline">UTF-8</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
                <span>{profile.location}</span>
              </div>
            </footer>
          </div>
        </div>

        <CommandPalette
          isOpen={isPaletteOpen}
          query={paletteQuery}
          selectedIndex={paletteIndex}
          items={filteredPaletteItems}
          inputRef={paletteInputRef}
          onClose={() => {
            setIsPaletteOpen(false)
            setPaletteQuery('')
          }}
          onQueryChange={setPaletteQuery}
        />
      </div>
    </MotionConfig>
  )
}

export default App
