import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Injects an inline SVG diagram and "builds" it step by step — nodes and
// arrows fade in from top to bottom as the section scrolls into view.
// Pass either a raw `svg` string, or a `src` URL (e.g. a file in /public) that
// is fetched at runtime — so diagrams can just be dropped into project folders.
export default function FlowDiagram({ svg, src }) {
  const hostRef = useRef(null)
  const [markup, setMarkup] = useState(svg || '')

  // resolve markup from a raw string or a fetched file
  useEffect(() => {
    if (svg) { setMarkup(svg); return }
    if (!src) { setMarkup(''); return }
    let alive = true
    setMarkup('')
    fetch(src)
      .then((r) => (r.ok ? r.text() : ''))
      .then((t) => { if (alive) setMarkup(t.trim().startsWith('<svg') ? t : '') })
      .catch(() => { if (alive) setMarkup('') })
    return () => { alive = false }
  }, [svg, src])

  useEffect(() => {
    const host = hostRef.current
    if (!host || !markup) return

    host.innerHTML = markup
    const svgEl = host.querySelector('svg')
    if (!svgEl) return

    // make it scale to the container
    svgEl.removeAttribute('width')
    svgEl.removeAttribute('height')
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    // order the shapes top-to-bottom so the flow assembles in reading order
    const items = Array.from(svgEl.children)
      .map((el) => {
        let y = 0
        try {
          y = el.getBBox().y
        } catch {
          y = 0
        }
        return { el, y }
      })
      .sort((a, b) => a.y - b.y)
      .map((o) => o.el)

    const ctx = gsap.context(() => {
      // every shape (boxes, arrows, labels AND the icons) pops in with a slight
      // scale + fade, top to bottom
      gsap.set(items, { opacity: 0, scale: 0.8, transformOrigin: 'center center' })
      gsap.to(items, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.6)',
        stagger: 0.03,
        scrollTrigger: {
          trigger: host,
          // begins only once you've scrolled onto the section (not as its top
          // edge first peeks in)
          start: 'top 62%',
          toggleActions: 'play none none reverse',
        },
      })
    }, host)

    return () => ctx.revert()
  }, [markup])

  if (!markup) {
    return (
      <div className="flowdiagram flowdiagram--empty">
        <div className="flowdiagram-ph">
          <span>Diagram</span>
          <p>Drop an <code>.svg</code> into this project’s diagram folder.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flowdiagram">
      <div className="flowdiagram-inner" ref={hostRef} />
    </div>
  )
}
