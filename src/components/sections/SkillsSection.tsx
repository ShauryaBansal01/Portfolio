import { skillDomains, dependencyGraph } from '../../data/portfolio'
import { FadeUp, SectionLabel } from '../ui/Primitives'
import { IdeWindow } from '../ui/IdeWindow'
import { useDevice } from '../../hooks/useDevice'

export function SkillsSection() {
  const { isDesktop, isMobile } = useDevice()

  return (
    <section id="skills" className="responsive-section" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        opacity: 0.15,
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp>
          <SectionLabel index="04" name="skills" />
        </FadeUp>

        {isDesktop ? (
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 mt-12">
            {/* Left Column: Skill Domains */}
            <FadeUp delay={0.05}>
              <IdeWindow filename="sys.skill_domains">
                <div className="space-y-8 p-1">
                  {skillDomains.map((d) => (
                    <div key={d.id}>
                      <div className="mb-3">
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text)', fontWeight: 600, letterSpacing: '0.05em' }}>{d.name}</p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.70rem', color: 'var(--text-muted)', marginTop: 4 }}>► {d.summary}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {d.modules.map((m) => (
                          <span key={m} style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)', padding: '2px 8px', border: '1px dashed var(--border-hover)', background: 'var(--cyan-soft)' }}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </IdeWindow>
            </FadeUp>

            {/* Right Column */}
            <div className="space-y-8">
              <FadeUp delay={0.1}>
                <IdeWindow filename="sys.dependencies">
                  <div className="code-block text-[0.75rem] p-1">
                    {dependencyGraph.map((line, i) => {
                      const [from, ...rest] = line.split(' -> ')
                      return (
                        <div key={i} className="mb-2">
                          <span style={{ color: 'var(--purple)', fontWeight: 600 }}>{from}</span>
                          {rest.map((part, j) => (
                            <span key={j}>
                              <span style={{ color: 'var(--cyan)', opacity: 0.6, margin: '0 6px' }}>─►</span>
                              <span style={{ color: j === rest.length - 1 ? 'var(--cyan)' : 'var(--text)', textShadow: j === rest.length - 1 ? '0 0 8px rgba(0, 240, 255, 0.4)' : 'none' }}>{part}</span>
                            </span>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </IdeWindow>
              </FadeUp>

              <FadeUp delay={0.15}>
                <IdeWindow filename="team_value.ts">
                  <div className="code-block text-[0.75rem] p-1">
                    <span style={{ color: 'var(--purple)' }}>const</span> <span style={{ color: 'var(--text)' }}>team_value</span> <span style={{ color: 'var(--cyan)' }}>:</span> <span style={{ color: 'var(--text-muted)' }}>string[]</span> <span style={{ color: 'var(--text-muted)' }}>=</span> <span style={{ color: 'var(--cyan)' }}>[</span>
                    <div className="pl-4 py-2 space-y-2">
                      {[
                        'Reusable components and cleaner project structure',
                        'Projects presented with stronger clarity for recruiters',
                        'Interfaces that feel modern without being noisy',
                        'A developer who cares about code quality + product',
                      ].map((txt, idx, arr) => (
                        <div key={txt}>
                          <span style={{ color: 'var(--text-dim)' }}>"{txt}"</span>
                          {idx < arr.length - 1 && <span style={{ color: 'var(--text-muted)' }}>,</span>}
                        </div>
                      ))}
                    </div>
                    <span style={{ color: 'var(--cyan)' }}>]</span><span style={{ color: 'var(--text-muted)' }}>;</span>
                  </div>
                </IdeWindow>
              </FadeUp>
            </div>
          </div>
        ) : (
          /* ── MOBILE VIEW ── */
          <div className="mt-8 space-y-6">
             {skillDomains.map((d, idx) => (
               <FadeUp key={d.id} delay={idx * 0.05}>
                 <div className="p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                   <h3 className="fluid-h3 font-bold mb-2 glow-text">{d.name}</h3>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '16px' }}>{d.summary}</p>
                   <div className="flex flex-wrap gap-2">
                      {d.modules.map(m => (
                        <span key={m} style={{ fontSize: '0.65rem', padding: '1px 8px', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--text-dim)', background: 'var(--surface-hi)' }}>
                          {m}
                        </span>
                      ))}
                   </div>
                 </div>
               </FadeUp>
             ))}
          </div>
        )}
      </div>
    </section>
  )
}
