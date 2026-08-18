import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Cards start as an overlapping, tilted fan and spread into a clean row.
const fanRot = [-7, 3, 7]
const START = 200 // overlap offset while fanned
const END = 332 // final spread (small gaps between cards)

export default function IssueCards({ items, variant = 'light' }) {
  const stageRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const cards = gsap.utils.toArray('.ps-card', stage)
    if (!cards.length) return
    const mid = Math.floor(cards.length / 2)

    // Desktop only: scroll drives fan → spread, and reverses on the way back up.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 821px)', () => {
      // initial fanned/stacked state
      gsap.set(cards, {
        transformOrigin: 'center 130%',
        x: (i) => (i - mid) * START,
        rotation: (i) => fanRot[i % fanRot.length],
        scale: 0.96,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          // begins once you've arrived at the section, finishes as you scroll
          // through it; scrubbed so scrolling back up restores the fan
          start: 'top 65%',
          end: 'top 25%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.to(cards, {
        x: (i) => (i - mid) * END,
        rotation: 0,
        scale: 1,
        ease: 'power2.out',
        stagger: 0.08,
      })
    })

    // recalc once everything above has settled / images have loaded
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)

    return () => {
      clearTimeout(t)
      mm.revert()
    }
  }, [items])

  return (
    <div className="ps-track">
      <div className="ps-sticky">
        <div
          ref={stageRef}
          className={`ps-stage${variant === 'dark' ? ' ps-stage--dark' : ''}`}
        >
          {items.map((c) => (
            <article key={c.label} className="ps-card">
              <span className="ps-card-label">{c.label}</span>
              <p className="ps-card-text">{c.text}</p>
              <div className="ps-card-footer">
                <span
                  className="ps-card-avatar"
                  style={{ backgroundImage: `url(${c.avatar})` }}
                />
                <div className="ps-card-person">
                  <span className="ps-card-name">{c.name}</span>
                  {c.role && <span className="ps-card-role">{c.role}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
