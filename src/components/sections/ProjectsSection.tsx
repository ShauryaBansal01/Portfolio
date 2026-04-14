import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, FileCode2, ChevronRight } from 'lucide-react'
import { projects } from '../../data/portfolio'
import { FadeUp, SectionLabel, Chip } from '../ui/Primitives'
import { IdeWindow } from '../ui/IdeWindow'
import { useDevice } from '../../hooks/useDevice'

export function ProjectsSection() {
  const { isDesktop, isMobile } = useDevice()
  const [selected, setSelected] = useState('streamify')
  const project = projects.find((p) => p.id === selected) ?? projects[0]

  return (
    <section id="projects" className="responsive-section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        opacity: 0.15,
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp>
          <SectionLabel index="02" name="projects" />
        </FadeUp>

        {isDesktop ? (
          <div className="projects-grid mt-12">
            {/* ── COMMAND PALETTE (SIDEBAR) ── */}
            <FadeUp delay={0.1}>
              <div className="projects-sidebar">
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '16px', textTransform: 'uppercase' }}>
                  // local_repositories
                </h3>
                <div className="projects-list">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      className={`project-tab ${p.id === selected ? 'active' : ''}`}
                    >
                      <span className="tab-indicator">{p.id === selected ? '→' : ' '}</span>
                      {p.file}
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* ── ACTIVE PROJECT DETAILS ── */}
            <div className="projects-content" style={{ minWidth: 0 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, x: 25, scale: 0.99 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -25, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="grid lg:grid-cols-[1fr_1fr] gap-6 h-auto lg:h-[540px]"
                >
                  <ProjectDetail project={project} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ── MOBILE VIEW ── */
          <div className="mt-8 space-y-12">
            {projects.map((p, idx) => (
               <FadeUp key={p.id} delay={idx * 0.05}>
                 <div className="mobile-project-card group">
                    <div className="flex justify-between items-center mb-4">
                       <span style={{ fontSize: '0.65rem', color: 'var(--cyan-dim)', fontFamily: 'var(--font-mono)' }}>// {p.file}</span>
                       <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.status}</span>
                    </div>
                    <h3 className="fluid-h3 font-bold mb-4 glow-text">{p.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '20px' }}>{p.summary}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.stack.slice(0, 3).map(s => <Chip key={s} label={s} />)}
                      {p.stack.length > 3 && <span style={{ fontSize: '10px', color: 'var(--text-muted)', alignSelf: 'center' }}>+{p.stack.length - 3} more</span>}
                    </div>

                    <div className="flex gap-4">
                       {p.liveUrl && (
                         <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-term text-xs flex-1 justify-center">
                           [ preview ]
                         </a>
                       )}
                       <a href={p.repoUrl} target="_blank" rel="noreferrer" className="btn-term text-xs flex-1 justify-center opacity-70">
                         [ source ]
                       </a>
                    </div>
                 </div>
               </FadeUp>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 40px;
          align-items: start;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .project-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: transparent;
          border: 1px solid transparent;
          border-left: 1px solid var(--border);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          border-radius: 0 6px 6px 0;
        }

        .project-tab:hover {
          background: var(--surface-hi);
          color: var(--text);
          border-left-color: var(--cyan-dim);
        }

        .project-tab.active {
          background: var(--cyan-soft);
          border-color: var(--cyan-soft);
          border-left-color: var(--cyan);
          border-left-width: 2px;
          color: var(--cyan);
          box-shadow: 10px 0 20px rgba(0, 240, 255, 0.03) inset;
        }

        .tab-indicator {
          display: inline-block;
          width: 14px;
          color: inherit;
          font-weight: bold;
        }

        .mobile-project-card {
           background: var(--surface);
           border: 1px solid var(--border);
           border-radius: 12px;
           padding: 24px;
           position: relative;
           overflow: hidden;
        }
        
        .mobile-project-card::before {
           content: "";
           position: absolute;
           top: 0; left: 0; right: 0; height: 1px;
           background: linear-gradient(90deg, transparent, var(--cyan-dim), transparent);
           opacity: 0.3;
        }

        @media (max-width: 1024px) {
          .responsive-section {
            padding-top: 60px;
            padding-bottom: 60px;
          }
        }
      `}</style>
    </section>
  )
}

function ProjectDetail({ project }: { project: any }) {
  return (
    <>
      {/* Meta Window */}
      <IdeWindow filename={`${project.name.toLowerCase().replace(/ /g, '_')}.info`}>
        <div className="flex flex-col h-full overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--cyan)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
            status.{project.status}
          </p>
          <h2 className="fluid-h2 font-bold tracking-tight glow-text" style={{ fontFamily: 'var(--font-sans)', marginBottom: 16 }}>
            {project.name}
          </h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
            {project.summary}
          </p>

          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>core_stack</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.stack.map((t: string) => <Chip key={t} label={t} />)}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-term">
                <ExternalLink className="size-4" />[ ./live_preview ]
              </a>
            )}
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-term" style={{ background: 'transparent', borderColor: 'transparent', padding: '0.45rem 0' }}>
              <FileCode2 className="size-4" />[ ./source_code ]
            </a>
          </div>
        </div>
      </IdeWindow>

      {/* Code Snippet Window */}
      <IdeWindow filename={project.file}>
        <div className="code-block text-[0.75rem] flex-1 overflow-auto">
          {project.snippet.split('\n').map((line: string, i: number) => (
            <div key={i} className="flex gap-4 hover:bg-[var(--surface-hi)] px-2 py-[2px] rounded transition-colors group">
              <span style={{ color: 'var(--text-muted)', userSelect: 'none', minWidth: '1.5rem', textAlign: 'right', opacity: 0.5 }} className="group-hover:opacity-100 group-hover:text-[var(--cyan)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: line.match(/import|export|const|function|return|=>/) ? 'var(--purple)' : 'var(--text-dim)' }}>
                {line || ' '}
              </span>
            </div>
          ))}
        </div>

        {/* Highlights section attached at the bottom of the code snippet */}
        <div className="mt-6 pt-4" style={{ borderTop: '1px dashed var(--border)' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>sys.highlights</p>
          <ul className="space-y-1">
            {project.highlights.map((h: string) => (
              <li key={h} className="flex gap-2 items-start" style={{ fontSize: '0.75rem', color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--cyan)', flexShrink: 0 }}>*</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </IdeWindow>
    </>
  )
}
