import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Same four projects as the hero deck.
export const featured = [
  {
    key: 'kaatkut',
    title: 'Kaatkut',
    category: 'Food Tech · Marketplace',
    tag: 'UI/UX',
    chip: 'chip-blue',
    to: '/kaatkut-v2',
    image: '/projects/home-v2/kaatkut.png',
  },
  {
    key: 'shifa',
    title: 'Shifa',
    category: 'Healthcare · Mental Health',
    tag: 'UI/UX',
    chip: 'chip-sage',
    to: '/project2',
    tint: 'linear-gradient(150deg, #dfe9f7 0%, #b9cdea 55%, #8fb0dd 100%)',
  },
  {
    key: 'mlmt',
    title: 'My Last Minute Trip',
    category: 'Travel · Planning App',
    tag: 'UI/UX',
    chip: 'chip-blue',
    to: '/mlmt-v2',
    image: '/projects/home-v2/mlmt.png',
  },
  {
    key: 'codetrade',
    title: 'CodeTrade',
    category: 'EdTech · Learning Platform',
    tag: 'UI/UX',
    chip: 'chip-sage',
    to: '/projects',
    tint: 'linear-gradient(150deg, #efe6dc 0%, #d9c7b3 55%, #c2a888 100%)',
  },
]

// Stacked state per card — px jitter, rotation, scale + parallax depth.
// Identical shape to the v1 table; only the anchor it hangs off has moved.
const stack = [
  { jx: -22, jy: -16, rot: -8, scale: 0.20, depth: 1 },
  { jx: 24, jy: -4, rot: 6, scale: 0.19, depth: 2 },
  { jx: -8, jy: 18, rot: 7, scale: 0.185, depth: 3 },
  { jx: 18, jy: 26, rot: -5, scale: 0.18, depth: 4 },
]

const clamp = (v, a, b) => Math.min(Math.max(v, a), b)
const smooth = (t) => t * t * (3 - 2 * t)

export default function FeaturedProjects() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)
  const anchorRef = useRef(null)
  const cardRefs = useRef([])
  const disp = useRef([]) // per-card displacement (thumbnail stack → grid slot)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const head = headRef.current
    const anchor = anchorRef.current
    if (!section || !head || !anchor) return

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches

    let raf = 0
    let running = false
    let current = 0
    let target = 0

    // FLIP measure — the displacement from a card's grid slot to its spot in
    // the little stack beside the title is a constant, so measure it once.
    const measure = () => {
      cardRefs.current.forEach((el) => { if (el) el.style.transform = 'none' })
      const sy = window.scrollY
      const ar = anchor.getBoundingClientRect()
      const anchorX = ar.left + ar.width / 2
      const anchorY = ar.top + sy + ar.height / 2
      disp.current = cardRefs.current.map((el, i) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + sy + r.height / 2
        const s = stack[i % 4]
        return {
          x: (anchorX + s.jx) - cx,
          y: (anchorY + s.jy) - cy + s.depth * 6,
          rot: s.rot,
          scale: s.scale,
        }
      })
    }

    const computeTarget = () => {
      const ih = window.innerHeight
      // Measured off the centered title, not the section top: the cards must
      // still be stacked beside it when it first comes into view, then expand.
      const top = head.getBoundingClientRect().top
      target = clamp((ih * 0.58 - top) / (ih * 0.42), 0, 1)
    }

    const apply = (p) => {
      const e = smooth(p)
      const t = 1 - e
      cardRefs.current.forEach((el, i) => {
        const d = disp.current[i]
        if (!el || !d) return
        const sc = d.scale + (1 - d.scale) * e
        el.style.transform =
          `translate(${d.x * t}px, ${d.y * t}px) scale(${sc}) rotate(${d.rot * t}deg)`
        el.style.zIndex = String(20 - i)
      })
    }

    const tick = () => {
      current += (target - current) * 0.12
      if (Math.abs(target - current) < 0.0004) {
        current = target
        running = false
        apply(current)
        return
      }
      apply(current)
      raf = requestAnimationFrame(tick)
    }

    const ensureRunning = () => {
      if (!running) { running = true; raf = requestAnimationFrame(tick) }
    }

    const setup = () => {
      if (isMobile()) {
        cardRefs.current.forEach((el) => {
          if (el) { el.style.transform = 'none'; el.style.zIndex = '' }
        })
        return
      }
      measure()
      computeTarget()
      current = target
      apply(current)
    }

    const onScroll = () => {
      if (isMobile()) return
      computeTarget()
      ensureRunning()
    }
    const onResize = () => { setup(); computeTarget(); ensureRunning() }

    setup()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="work" className="fp" ref={sectionRef}>
      <div className="container">
        {/* Centered title with the overlapped thumbnails sitting right next to it */}
        {/* Plain element (not <Reveal>) so the anchor never moves under the
            FLIP measurement. */}
        <div className="fp-head" ref={headRef}>
          <h2 className="fp-title">
            Featured Projects
            {/* Where the thumbnails collapse to — absolute, so the title stays
                perfectly centered in the container. */}
            <span className="fp-anchor" ref={anchorRef} aria-hidden="true" />
          </h2>
          <p className="fp-sub">Scroll to open the work</p>
        </div>

        <div className="fp-grid">
          {featured.map((p, i) => (
            <Link
              key={p.key}
              to={p.to}
              className="proj-card fp-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="proj-card-media">
                {p.image ? (
                  <img src={p.image} alt={p.title} loading="lazy" />
                ) : (
                  <span className="fp-card-ph" style={{ background: p.tint }} aria-hidden="true">
                    {p.title.slice(0, 2)}
                  </span>
                )}
                <div className="proj-card-hover">
                  <div className="proj-card-cta">
                    <span>View details</span>
                    <div className="proj-card-arrow">↗</div>
                  </div>
                </div>
              </div>

              <div className="proj-card-info">
                <div className="proj-card-meta">
                  <h3>{p.title}</h3>
                  <p>{p.category}</p>
                </div>
                <span className={`chip ${p.chip}`}>{p.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
