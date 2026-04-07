import { useEffect, useRef, useState } from 'react'

export function useInView(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])
  return visible
}

export function MacDots() {
  return (
    <div className="mac-dots">
      <span className="dot-r" />
      <span className="dot-a" />
      <span className="dot-g" />
    </div>
  )
}

export function SectionLabel({ index, name }: { index: string; name: string }) {
  return (
    <p className="section-label">
      <span>// {index} · </span>{name}
    </p>
  )
}

export function Chip({ label }: { label: string }) {
  return <span className="chip">[{label}]</span>
}

export function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  return (
    <div
      ref={ref}
      className={`anim-fade-up ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
