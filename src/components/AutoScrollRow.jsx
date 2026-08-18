import { useEffect, useRef } from 'react'

// A horizontal strip that drifts sideways on its own, pauses on hover/touch, and
// lets the user scroll it left/right (and zoom the cards) while paused.
export default function AutoScrollRow({ children, speed = 0.4, reverse = false, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let paused = false
    let dir = reverse ? -1 : 1
    el.scrollLeft = reverse ? el.scrollWidth : 0

    const loop = () => {
      if (!paused) {
        const max = el.scrollWidth - el.clientWidth
        if (max > 1) {
          el.scrollLeft += speed * dir
          if (el.scrollLeft >= max) dir = -1
          else if (el.scrollLeft <= 0) dir = 1
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const pause = () => { paused = true }
    const resume = () => { paused = false }
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', resume, { passive: true })

    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
    }
  }, [reverse, speed])

  return (
    <div className={`asr no-scrollbar ${className}`} ref={ref}>
      {children}
    </div>
  )
}
