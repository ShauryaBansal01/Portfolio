import { Mail, FileCode2, ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile, contactLinks } from '../../data/portfolio'
import { FadeUp, SectionLabel } from '../ui/Primitives'
import { IdeWindow } from '../ui/IdeWindow'
import { useDevice } from '../../hooks/useDevice'

export function ContactSection({ copiedEmail, onCopyEmail }: { copiedEmail: boolean; onCopyEmail: () => void }) {
  const { isDesktop, isMobile } = useDevice()

  return (
    <section id="contact" className="responsive-section max-w-7xl mx-auto">
      <FadeUp>
        <SectionLabel index="05" name="contact" />
      </FadeUp>

      <div className={`grid ${isDesktop ? 'lg:grid-cols-[1fr_1fr]' : 'grid-cols-1'} gap-8`}>
        <FadeUp delay={0.05}>
          <IdeWindow filename="contact.sh">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem',
                lineHeight: 1.9,
                marginBottom: 20,
              }}
            >
              <div>
                <span style={{ color: 'var(--cyan)' }}>{isMobile ? 'visitor:~$ ' : 'visitor@portfolio:~$ '}</span>
                <span style={{ color: 'var(--text)' }}>status</span>
              </div>
              <div style={{ color: 'var(--text-dim)' }}>→ <span style={{ color: 'var(--cyan)' }}>open to roles</span></div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: 'var(--cyan)' }}>{isMobile ? 'visitor:~$ ' : 'visitor@portfolio:~$ '}</span>
                <span style={{ color: 'var(--text)' }}>cat availability.txt</span>
              </div>
              <div style={{ color: 'var(--text-dim)' }}>→ {profile.availability}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ color: 'var(--cyan)' }}>{isMobile ? 'visitor:~$ ' : 'visitor@portfolio:~$ '}</span>
                <span className="terminal-cursor" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${contactLinks.email}`} className="btn-term text-xs">
                <Mail className="size-4" />[ email ]
              </a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer" className="btn-term text-xs">
                <FileCode2 className="size-4" />[ github ]
              </a>
              {!isMobile && (
                 <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="btn-term text-xs">
                   [ linkedin ]<ArrowUpRight className="size-4" />
                 </a>
              )}
              <button
                type="button"
                onClick={onCopyEmail}
                className="btn-term text-xs"
                style={copiedEmail ? { background: 'rgba(0,240,255,0.15)', borderColor: 'var(--cyan)' } : {}}
              >
                {copiedEmail ? <Check className="size-4" /> : <Copy className="size-4" />}
                [ {copiedEmail ? 'copied' : 'copy'} ]
              </button>
            </div>
          </IdeWindow>
        </FadeUp>

        <FadeUp delay={0.1}>
          <IdeWindow filename="contact.js">
            <div className="code-block text-xs flex-1">
              <span className="tok-kw">export const </span>
              <span className="tok-nm">contact</span>
              <span className="tok-op"> = </span>
              <span className="tok-op">{'{'}</span>{'\n'}
              {'  '}<span className="tok-nm">email</span><span className="tok-op">: </span><span className="tok-str">'{contactLinks.email}'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">github</span><span className="tok-op">: </span><span className="tok-str">'{contactLinks.github}'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">status</span><span className="tok-op">: </span><span className="tok-str">'open to opportunities'</span><span className="tok-op">,</span>{'\n'}
              {'  '}<span className="tok-nm">location</span><span className="tok-op">: </span><span className="tok-str">'{profile.location}'</span><span className="tok-op">,</span>{'\n'}
              <span className="tok-op">{'}'}</span>
            </div>
          </IdeWindow>
        </FadeUp>
      </div>
    </section>
  )
}
