import { useEffect, useState } from 'react'

export function CoderScene3D() {
  const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set())

  useEffect(() => {
    const interval = setInterval(() => {
      const count = Math.floor(Math.random() * 3) + 1
      const keys = new Set<number>()
      while (keys.size < count) keys.add(Math.floor(Math.random() * 44))
      setActiveKeys(keys)
    }, 140)
    return () => clearInterval(interval)
  }, [])

  const keyRows = [13, 13, 11, 9, 8]
  let keyIdx = 0

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 580 }}>
      <style>{`
        @keyframes csFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes csPulse { 0%,100%{opacity:.12} 50%{opacity:.22} }
        @keyframes csBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes csDrift1 { 0%{transform:translate(0,0) rotate(0deg);opacity:.5}
          50%{transform:translate(-8px,-22px) rotate(4deg);opacity:.25}
          100%{transform:translate(0,0) rotate(0deg);opacity:.5} }
        @keyframes csDrift2 { 0%{transform:translate(0,0);opacity:.35}
          50%{transform:translate(6px,-28px);opacity:.6}
          100%{transform:translate(0,0);opacity:.35} }
        @keyframes csDrift3 { 0%{transform:translate(0,0);opacity:.2}
          50%{transform:translate(-4px,-18px);opacity:.45}
          100%{transform:translate(0,0);opacity:.2} }
        @keyframes csMouse { 0%,100%{transform:translateX(0)} 40%{transform:translateX(4px)} 70%{transform:translateX(-3px)} }
        .cs-scene { animation: csFloat 7s ease-in-out infinite; }
        .cs-pulse { animation: csPulse 3.5s ease-in-out infinite; }
        .cs-blink { animation: csBlink 1.1s step-end infinite; }
        .cs-d1 { animation: csDrift1 4.2s ease-in-out infinite; }
        .cs-d2 { animation: csDrift2 5.5s ease-in-out infinite 1.2s; }
        .cs-d3 { animation: csDrift3 3.8s ease-in-out infinite 0.7s; }
        .cs-d4 { animation: csDrift1 6s ease-in-out infinite 2s; }
        .cs-mouse { animation: csMouse 2.8s ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 580 500" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <defs>
          <filter id="cs-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cs-blur"><feGaussianBlur stdDeviation="5" /></filter>
          <filter id="cs-softglow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <radialGradient id="cs-screenGlow" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity=".18" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cs-ambient" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#00d4aa" stopOpacity=".01" />
            <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cs-desk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1c1c28" />
            <stop offset="50%" stopColor="#22222e" />
            <stop offset="100%" stopColor="#181824" />
          </linearGradient>
          <linearGradient id="cs-monFace" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a26" />
            <stop offset="100%" stopColor="#12121c" />
          </linearGradient>
          <linearGradient id="cs-monSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0f0f18" />
            <stop offset="100%" stopColor="#0a0a12" />
          </linearGradient>
          <clipPath id="cs-screenClip">
            <rect x="222" y="79" width="184" height="140" />
          </clipPath>
        </defs>

        {/* Background ambient */}
        <rect x="0" y="0" width="580" height="500" fill="url(#cs-ambient)" />

        {/* Floating code particles */}
        <g className="cs-d1" style={{ transformOrigin: '55px 75px' }}>
          <text x="18" y="75" fontFamily="'JetBrains Mono',monospace" fontSize="9.5" fill="#00d4aa" opacity=".38">const hero = () =&gt; {'{'}</text>
        </g>
        <g className="cs-d2" style={{ transformOrigin: '490px 110px' }}>
          <text x="445" y="110" fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill="#d2bbff" opacity=".32">import React</text>
        </g>
        <g className="cs-d3" style={{ transformOrigin: '530px 205px' }}>
          <text x="490" y="205" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#00d4aa" opacity=".28">useState(null)</text>
        </g>
        <g className="cs-d4" style={{ transformOrigin: '28px 195px' }}>
          <text x="8" y="195" fontFamily="'JetBrains Mono',monospace" fontSize="8" fill="#d2bbff" opacity=".22">useEffect()</text>
        </g>
        <g className="cs-d2" style={{ transformOrigin: '460px 310px' }}>
          <text x="425" y="310" fontFamily="'JetBrains Mono',monospace" fontSize="7.5" fill="#00d4aa" opacity=".18">return &lt;App /&gt;</text>
        </g>

        {/* Floating dots */}
        <circle className="cs-d1" cx="32" cy="260" r="2" fill="#00d4aa" opacity=".38" />
        <circle className="cs-d2" cx="92" cy="140" r="1.5" fill="#00d4aa" opacity=".3" />
        <circle className="cs-d3" cx="555" cy="185" r="2" fill="#d2bbff" opacity=".32" />
        <circle className="cs-d1" cx="542" cy="390" r="1.5" fill="#00d4aa" opacity=".22" style={{ animationDelay: '1.1s' }} />
        <circle className="cs-d2" cx="68" cy="335" r="1.5" fill="#d2bbff" opacity=".2" />
        <circle className="cs-d3" cx="510" cy="72" r="2" fill="#00d4aa" opacity=".18" />

        {/* Main scene with float animation */}
        <g className="cs-scene">

          {/* Screen glow halo behind monitor */}
          <ellipse cx="314" cy="160" rx="130" ry="90" fill="#00d4aa" opacity=".06" filter="url(#cs-softglow)" />

          {/* ── DESK ── */}
          <polygon points="100,320 480,278 515,308 135,350" fill="url(#cs-desk)" />
          <polygon points="100,320 480,278 480,296 100,338" fill="#111118" />
          <polygon points="480,278 515,308 515,326 480,296" fill="#0d0d14" />
          {/* Desk top edge highlight */}
          <line x1="100" y1="320" x2="480" y2="278" stroke="#2e2e42" strokeWidth="1" opacity=".7" />
          {/* Desk cyan underglow */}
          <ellipse cx="308" cy="335" rx="190" ry="22" fill="#00d4aa" opacity=".025" filter="url(#cs-blur)" />

          {/* ── MONITOR STAND ── */}
          <rect x="284" y="276" width="60" height="8" rx="1" fill="#1a1a24" stroke="#252532" strokeWidth=".5" />
          <rect x="303" y="228" width="14" height="52" rx="1" fill="#171720" stroke="#222230" strokeWidth=".5" />

          {/* ── MONITOR HOUSING ── */}
          {/* Left depth face */}
          <polygon points="202,64 218,56 218,228 202,236" fill="#131320" stroke="#1c1c2a" strokeWidth=".5" />
          {/* Top depth face */}
          <polygon points="218,56 408,56 424,64 218,64" fill="#1d1d2c" stroke="#272736" strokeWidth=".5" />
          {/* Bottom depth */}
          <polygon points="218,228 408,228 424,236 202,236" fill="#0e0e1a" stroke="#1a1a26" strokeWidth=".5" />
          {/* Right depth face */}
          <polygon points="408,56 424,64 424,236 408,228" fill="#0f0f1c" stroke="#181824" strokeWidth=".5" />
          {/* Front face */}
          <rect x="218" y="64" width="190" height="164" fill="url(#cs-monFace)" stroke="#1c1c2a" strokeWidth=".5" />

          {/* ── SCREEN ── */}
          <rect x="222" y="68" width="182" height="156" rx="2" fill="#02100c" />
          {/* Screen glow overlay */}
          <rect x="222" y="68" width="182" height="156" rx="2" fill="url(#cs-screenGlow)" className="cs-pulse" />

          {/* Code content */}
          <g clipPath="url(#cs-screenClip)">
            {/* Line numbers gutter */}
            <rect x="222" y="79" width="24" height="140" fill="#010d08" />
            {/* Code area */}
            <rect x="246" y="79" width="160" height="140" fill="#020e09" />

            {/* Line 1 */}
            <text x="226" y="91" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">1</text>
            <text x="248" y="91" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#c678dd">import </tspan><tspan fill="#abb2bf">{'{ '}</tspan>
              <tspan fill="#61afef">useState</tspan><tspan fill="#abb2bf">, </tspan>
              <tspan fill="#61afef">useEffect</tspan><tspan fill="#abb2bf"> {'}'}</tspan>
            </text>

            {/* Line 2 */}
            <text x="226" y="101" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">2</text>
            <text x="248" y="101" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#c678dd">from </tspan><tspan fill="#98c379">'react'</tspan>
            </text>

            {/* Line 3 */}
            <text x="226" y="111" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">3</text>

            {/* Line 4 */}
            <text x="226" y="121" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">4</text>
            <text x="248" y="121" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#c678dd">function </tspan><tspan fill="#e5c07b">Portfolio</tspan><tspan fill="#abb2bf">() {'{'}</tspan>
            </text>

            {/* Line 5 */}
            <text x="226" y="131" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">5</text>
            <text x="255" y="131" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#c678dd">const </tspan><tspan fill="#e4e1e9">[</tspan>
              <tspan fill="#00d4aa">data</tspan><tspan fill="#e4e1e9">, </tspan>
              <tspan fill="#00d4aa">setData</tspan><tspan fill="#e4e1e9">] =</tspan>
            </text>

            {/* Line 6 */}
            <text x="226" y="141" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">6</text>
            <text x="262" y="141" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#e5c07b">useState</tspan><tspan fill="#e4e1e9">(</tspan>
              <tspan fill="#d19a66">null</tspan><tspan fill="#e4e1e9">)</tspan>
            </text>

            {/* Line 7 */}
            <text x="226" y="151" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">7</text>

            {/* Line 8 */}
            <text x="226" y="161" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">8</text>
            <text x="255" y="161" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#e5c07b">useEffect</tspan><tspan fill="#e4e1e9">{'(() => {'}</tspan>
            </text>

            {/* Line 9 */}
            <text x="226" y="171" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">9</text>
            <text x="264" y="171" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#61afef">fetchProjects</tspan><tspan fill="#e4e1e9">()</tspan>
            </text>

            {/* Line 10 */}
            <text x="226" y="181" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">10</text>
            <text x="255" y="181" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#abb2bf">{'  .then(res =>'}</tspan>
            </text>

            {/* Line 11 */}
            <text x="226" y="191" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">11</text>
            <text x="264" y="191" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#00d4aa">setData</tspan><tspan fill="#e4e1e9">(res))</tspan>
            </text>

            {/* Line 12 */}
            <text x="226" y="201" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">12</text>
            <text x="255" y="201" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#abb2bf">{'}, [])'}</tspan>
            </text>

            {/* Line 13 */}
            <text x="226" y="211" fontFamily="'JetBrains Mono',monospace" fontSize="7" fill="#2a4a3a">13</text>
            <text x="248" y="211" fontFamily="'JetBrains Mono',monospace" fontSize="7">
              <tspan fill="#c678dd">return </tspan><tspan fill="#00d4aa">&lt;App </tspan>
              <tspan fill="#e5c07b">data</tspan><tspan fill="#abb2bf">={'{'}data{'}'} /&gt;</tspan>
            </text>

            {/* Blinking cursor */}
            <rect x="248" y="215" width="5" height="9" fill="#00d4aa" className="cs-blink" />
          </g>

          {/* Screen border glow */}
          <rect x="222" y="68" width="182" height="156" rx="2" fill="none" stroke="#00d4aa" strokeWidth=".6" opacity=".25" />

          {/* Monitor brand dot */}
          <circle cx="309" cy="226" r="2.5" fill="#00d4aa" opacity=".35" />

          {/* ── KEYBOARD ── */}
          {/* Keyboard body */}
          <polygon points="182,290 388,270 410,286 204,306" fill="#191922" stroke="#252535" strokeWidth=".6" />
          <polygon points="182,290 388,270 388,282 182,302" fill="#101018" stroke="#1c1c28" strokeWidth=".5" />
          <polygon points="388,270 410,286 410,298 388,282" fill="#0d0d14" stroke="#181820" strokeWidth=".5" />

          {/* Keys - rendered as isometric mini-rectangles */}
          {keyRows.map((count, row) => {
            const rowStartIdx = keyIdx
            const rowKeys = Array.from({ length: count }, (_, col) => {
              const idx = rowStartIdx + col
              const isActive = activeKeys.has(idx % 44)
              // isometric offset per row and col
              const bx = 190 + col * 17 + row * 2
              const by = 275 + col * 1.4 + row * 10
              return { idx, isActive, bx, by }
            })
            keyIdx += count
            return rowKeys.map(({ idx, isActive, bx, by }) => (
              <g key={idx}>
                <polygon
                  points={`${bx},${by} ${bx+13},${by-1.8} ${bx+13},${by+6.5} ${bx},${by+8.3}`}
                  fill={isActive ? '#00d4aa' : '#232332'}
                  stroke={isActive ? '#00e5bb' : '#2c2c3e'}
                  strokeWidth=".6"
                  opacity={isActive ? .85 : 1}
                />
                {isActive && (
                  <polygon
                    points={`${bx},${by} ${bx+13},${by-1.8} ${bx+13},${by+6.5} ${bx},${by+8.3}`}
                    fill="#00d4aa"
                    opacity=".35"
                    filter="url(#cs-blur)"
                  />
                )}
              </g>
            ))
          })}

          {/* ── MOUSE ── */}
          <g className="cs-mouse">
            <ellipse cx="442" cy="292" rx="14" ry="19" fill="#1a1a26" stroke="#252535" strokeWidth=".6" />
            <path d="M 434,277 Q 436,273 442,273 L 442,290 L 434,290 Z" fill="#202030" stroke="#2a2a3e" strokeWidth=".5" />
            <path d="M 450,277 Q 448,273 442,273 L 442,290 L 450,290 Z" fill="#1c1c2c" stroke="#2a2a3e" strokeWidth=".5" />
            <rect x="440" y="280" width="4" height="10" rx="2" fill="#00d4aa" opacity=".55" />
            <ellipse cx="442" cy="292" rx="14" ry="19" fill="none" stroke="#00d4aa" strokeWidth=".5" opacity=".18" />
            {/* Cable */}
            <path d="M 442,273 Q 468,248 505,238" stroke="#252535" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>

          {/* ── COFFEE MUG ── */}
          <g>
            <rect x="136" y="298" width="24" height="26" rx="2" fill="#1e1e2a" stroke="#2a2a3a" strokeWidth=".6" />
            <path d="M 160,304 Q 170,308 170,314 Q 170,320 160,322" stroke="#242434" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="148" cy="298" rx="12" ry="4" fill="#232335" stroke="#2c2c3e" strokeWidth=".5" />
            <ellipse cx="148" cy="298" rx="10" ry="3" fill="#1a0e08" />
            {/* Steam */}
            <path className="cs-d1" d="M 144,294 Q 142,289 144,284" stroke="#33334a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".5" />
            <path className="cs-d2" d="M 148,293 Q 150,287 148,282" stroke="#33334a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".4" />
            <path className="cs-d3" d="M 152,294 Q 154,289 152,284" stroke="#33334a" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".3" />
          </g>

          {/* ── HEADPHONES ── */}
          <g>
            <path d="M 462,312 Q 462,296 475,296 Q 488,296 488,312" stroke="#222232" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <rect x="458" y="310" width="9" height="11" rx="3" fill="#1e1e2c" stroke="#2a2a3c" strokeWidth=".5" />
            <rect x="483" y="310" width="9" height="11" rx="3" fill="#1e1e2c" stroke="#2a2a3c" strokeWidth=".5" />
            <rect x="459" y="311" width="7" height="9" rx="2" fill="#5200b8" opacity=".45" />
            <rect x="484" y="311" width="7" height="9" rx="2" fill="#5200b8" opacity=".45" />
          </g>

          {/* ── CODER FIGURE ── */}
          {/* Body / hoodie */}
          <ellipse cx="308" cy="262" rx="30" ry="20" fill="#181826" stroke="#222232" strokeWidth=".5" />
          {/* Left arm */}
          <path d="M 280,265 Q 258,274 228,290" stroke="#181826" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 280,265 Q 258,274 228,290" stroke="#20202e" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Right arm */}
          <path d="M 334,265 Q 354,274 370,287" stroke="#181826" strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 334,265 Q 354,274 370,287" stroke="#20202e" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Hands */}
          <ellipse cx="228" cy="292" rx="9" ry="5.5" fill="#2c2018" />
          <ellipse cx="372" cy="289" rx="9" ry="5.5" fill="#2c2018" />
          {/* Hoodie pocket */}
          <path d="M 292,268 Q 308,264 324,268 L 324,275 Q 308,276 292,275 Z" fill="#141422" stroke="#1e1e2e" strokeWidth=".5" />
          {/* Neck */}
          <rect x="302" y="246" width="14" height="19" rx="5" fill="#2c2018" />
          {/* Head */}
          <ellipse cx="309" cy="237" rx="21" ry="23" fill="#2c2018" />
          {/* Hair */}
          <ellipse cx="309" cy="222" rx="21" ry="11" fill="#0e0e1a" />
          <rect x="288" y="218" width="42" height="12" rx="3" fill="#0e0e1a" />
          {/* Hoodie hood */}
          <path d="M 288,222 Q 287,209 309,209 Q 331,209 330,222" fill="#121220" stroke="#1c1c2c" strokeWidth=".5" />
          {/* Glasses */}
          <rect x="294" y="233" width="12" height="8" rx="2" fill="#091510" stroke="#00d4aa" strokeWidth=".9" opacity=".95" />
          <rect x="312" y="233" width="12" height="8" rx="2" fill="#091510" stroke="#00d4aa" strokeWidth=".9" opacity=".95" />
          <line x1="306" y1="237" x2="312" y2="237" stroke="#00d4aa" strokeWidth=".9" opacity=".9" />
          <line x1="294" y1="237" x2="290" y2="237" stroke="#00d4aa" strokeWidth=".7" opacity=".7" />
          <line x1="324" y1="237" x2="328" y2="237" stroke="#00d4aa" strokeWidth=".7" opacity=".7" />
          {/* Lens screen reflection */}
          <rect x="295" y="234" width="10" height="6" rx="1" fill="#00d4aa" opacity=".1" />
          <rect x="313" y="234" width="10" height="6" rx="1" fill="#00d4aa" opacity=".1" />
          {/* Screen light on face */}
          <ellipse cx="309" cy="237" rx="20" ry="22" fill="#00d4aa" opacity=".04" filter="url(#cs-softglow)" />

        </g>
        {/* End .cs-scene group */}

        {/* Final screen glow corona */}
        <ellipse cx="314" cy="148" rx="115" ry="82" fill="#00d4aa" opacity=".02" filter="url(#cs-softglow)" />
      </svg>
    </div>
  )
}
