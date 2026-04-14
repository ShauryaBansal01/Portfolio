import { useState, useEffect } from 'react'

export function useDevice() {
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // Breakpoint: 1024px is usually where tablets/desktops split
    const mobileQuery = window.matchMedia('(max-width: 1024px)')
    
    // Initial check
    setIsMobile(mobileQuery.matches)
    setIsDesktop(!mobileQuery.matches)

    // Listener for resize
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
      setIsDesktop(!e.matches)
    }

    mobileQuery.addEventListener('change', handler)
    return () => mobileQuery.removeEventListener('change', handler)
  }, [])

  return { isMobile, isDesktop }
}
