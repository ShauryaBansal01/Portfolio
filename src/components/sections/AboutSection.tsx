import { FileCode2, ArrowUpRight, Terminal, Download } from 'lucide-react'
import { contactLinks, profile, stats } from '../../data/portfolio'
import { FadeUp, SectionLabel, Chip } from '../ui/Primitives'
import { IdeWindow } from '../ui/IdeWindow'

export function AboutSection() {
  return (
    <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
      <FadeUp>
        <SectionLabel index="01" name="about" />
      </FadeUp>

      <div className="grid lg:grid-cols-12 gap-6">
        <FadeUp delay={0.02} className="lg:col-span-3 h-full">
          <IdeWindow filename="sys_id_badge.exe">
            <div className="flex flex-col h-full bg-[var(--surface-lo)] relative overflow-hidden h-full">

              {/* Photo Area */}
              <div className="relative w-full aspect-[4/5] border-b border-[var(--border)] overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--cyan)] shadow-[var(--cyan-glow)] animate-[gridMove_3s_linear_infinite] z-20 pointer-events-none" />
                <img
                  src={profile.photoUrl}
                  alt="Identity"
                  className="w-full h-full object-cover filter grayscale contrast-125 sepia-[0.3] hue-rotate-[180deg] opacity-80 group-hover:opacity-100 transition-duration-500"
                />
                <div className="absolute inset-0 bg-[var(--cyan)] opacity-10 mix-blend-overlay pointer-events-none" />

                {/* Tech Corners */}
                <div className="absolute top-2 left-2 size-2 border-t border-l border-[var(--cyan)] pointer-events-none" />
                <div className="absolute top-2 right-2 size-2 border-t border-r border-[var(--cyan)] pointer-events-none" />
                <div className="absolute bottom-2 left-2 size-2 border-b border-l border-[var(--cyan)] pointer-events-none" />
                <div className="absolute bottom-2 right-2 size-2 border-b border-r border-[var(--cyan)] pointer-events-none" />
              </div>

              {/* Data Area */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p style={{ fontSize: '0.65rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
                        // ID_ACTIVE
                      </p>
                      <h3 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)', lineHeight: 1.2 }}>
                        {profile.name}
                      </h3>
                    </div>
                    <div className="px-1.5 py-0.5 bg-[var(--cyan-soft)] border border-[var(--cyan)] rounded-sm">
                      <p style={{ fontSize: '0.6rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>A1</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 mt-4">
                    <div className="flex justify-between items-center" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      <span>CLASS</span>
                      <span style={{ color: 'var(--text-dim)', textAlign: 'right' }}>{profile.role.split(' ')[0]}</span>
                    </div>
                    <div className="flex justify-between items-center" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      <span>CLEARANCE</span>
                      <span style={{ color: 'var(--text-dim)', textAlign: 'right' }}>TOP_SECRET</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-[var(--border)] pt-3">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', letterSpacing: '-1px', color: 'var(--cyan)', opacity: 0.4, width: '100%', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    ||||| ||| | || ||||| | ||
                  </div>
                  <p style={{ fontSize: '0.5rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', marginTop: '6px', textAlign: 'center' }}>
                    SERIAL_88-X001-GHOST
                  </p>
                </div>
              </div>

            </div>
          </IdeWindow>
        </FadeUp>

        <FadeUp delay={0.05} className="lg:col-span-5">
          <IdeWindow filename="about.md">
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 12, letterSpacing: '0.12em' }}>
                // {profile.role}
              </p>
              <h2
                className="text-3xl font-bold leading-snug tracking-tight"
                style={{ fontFamily: 'var(--font-sans)', color: 'var(--text)', marginBottom: 16 }}
              >
                {profile.headline}
              </h2>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
                {profile.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {profile.focus.map((f) => <Chip key={f} label={f} />)}
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a href="/resume.pdf" download className="btn-term">
                  <Download className="size-4" />[ resume.pdf ]
                </a>
                <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn-term">
                  <FileCode2 className="size-4" />[ github ]
                </a>
                <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn-term">
                  [ linkedin ]<ArrowUpRight className="size-4" />
                </a>
                <a href="#hero" className="btn-term">
                  <Terminal className="size-4" />[ terminal ]
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: 'var(--surface-hi)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    padding: '12px 14px',
                  }}
                >
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{s.label}</p>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>{s.value}</p>
                </div>
              ))}
            </div>
          </IdeWindow>
        </FadeUp>

        <FadeUp delay={0.12} className="lg:col-span-4">
          <IdeWindow filename="identity.ts">
            <div className="code-block text-xs">
              <span className="tok-kw">const </span>
              <span className="tok-nm">identity</span>
              <span className="tok-op"> = </span>
              <span className="tok-op">{'{'}</span>{'\n'}
              {'  '}<span className="tok-nm">style</span><span className="tok-op">: </span><span className="tok-str">'user first'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">product</span><span className="tok-op">: </span><span className="tok-str">'clear and useful'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">code</span><span className="tok-op">: </span><span className="tok-str">'modular + maintainable'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">goal</span><span className="tok-op">: </span><span className="tok-str">'build work that is easy to trust'</span>{'\n'}
              <span className="tok-op">{'}'}</span>
            </div>

            <div className="mt-6">
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                principles
              </p>
              <ul className="space-y-3">
                {profile.principles.map((p) => (
                  <li key={p} className="flex gap-2 items-start" style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--cyan)', marginTop: 2, flexShrink: 0 }}>→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                github · linkedin
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', lineHeight: 1.75 }}>
                {profile.githubSummary}
              </p>
            </div>
          </IdeWindow>
        </FadeUp>
      </div>
    </section>
  )
}
