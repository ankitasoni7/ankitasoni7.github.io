import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-driven text reveal — each unit (word or character) fades from
 * faint to solid one after another, scrubbed to the scroll position as the
 * block passes through the viewport.
 */
export default function ScrollText({
  text,
  className = '',
  as: Tag = 'p',
  split = 'word',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const units = el.querySelectorAll('.st-unit')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        units,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: 'none',
          stagger: split === 'char' ? 0.2 : 0.4,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [text, split])

  const units = split === 'char' ? Array.from(text) : text.split(' ')

  return (
    <Tag ref={ref} className={`scroll-text ${className}`}>
      {units.map((unit, i) => (
        <span key={i} className="st-unit">
          {unit === ' ' ? ' ' : unit}
          {split === 'word' && i < units.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
