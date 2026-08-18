import { useEffect, useRef } from 'react'

const hide = (e) => { e.currentTarget.style.display = 'none' }

// A tall screen image that scrolls slowly on its own, pauses on hover/touch, and
// lets the user scroll it up/down manually while paused. Resumes on leave.
export default function AutoScrollImg({ image, speed = 0.35 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let paused = false
    let dir = 1

    const loop = () => {
      if (!paused) {
        const max = el.scrollHeight - el.clientHeight
        if (max > 1) {
          el.scrollTop += speed * dir
          if (el.scrollTop >= max) dir = -1
          else if (el.scrollTop <= 0) dir = 1
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
  }, [image, speed])

  return (
    <div className="autoscroll no-scrollbar" ref={ref}>
      <img src={image} alt="" onError={hide} />
    </div>
  )
}
