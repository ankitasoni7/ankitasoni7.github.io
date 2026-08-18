import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { projects } from '../data/projects.js'

const filters = ['All', 'UI/UX', 'Poster design', 'Logo design', 'Packaging']

// stacked-state (over the hero) per card — px jitter, rotation, scale + parallax depth
const stack = [
  { jx: -36, jy: -24, rot: -8, scale: 0.52, depth: 1 },
  { jx: 44, jy: -8, rot: 6, scale: 0.50, depth: 2 },
  { jx: -16, jy: 30, rot: 7, scale: 0.49, depth: 3 },
  { jx: 30, jy: 44, rot: -5, scale: 0.47, depth: 4 },
]

const clamp = (v, a, b) => Math.min(Math.max(v, a), b)
const smooth = (t) => t * t * (3 - 2 * t)

export default function HeroProjects() {
  const [active, setActive] = useState('All')

  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const cardRefs = useRef([])
  const disp = useRef([]) // per-card displacement (hero stack → grid), scroll-independent

  const visible = active === 'All'
    ? projects
    : projects.filter((p) => p.tag === active)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const projectsEl = projectsRef.current
    if (!hero || !projectsEl) return

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches

    let raf = 0
    let running = false
    let current = 0
    let target = 0

    // FLIP measure — because the page scroll cancels out, each card's
    // displacement from its grid slot to the hero stack is a constant.
    const measure = () => {
      cardRefs.current.forEach((el) => { if (el) el.style.transform = 'none' })
      const sy = window.scrollY
      const hr = hero.getBoundingClientRect()
      const anchorX = hr.left + hr.width * 0.72
      const anchorY = hr.top + sy + hr.height * 0.5
      disp.current = cardRefs.current.map((el, i) => {
        if (!el) return null
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + sy + r.height / 2
        const s = stack[i % 4]
        return {
          x: (anchorX + s.jx) - cx,
          y: (anchorY + s.jy) - cy + s.depth * 12,
          rot: s.rot,
          scale: s.scale,
        }
      })
    }

    const computeTarget = () => {
      const ih = window.innerHeight
      const top = projectsEl.getBoundingClientRect().top
      // 0 while the projects section is below the fold, 1 once it scrolls up near the top
      target = clamp((ih * 0.95 - top) / (ih * 0.7), 0, 1)
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
  }, [active, visible.length])

  return (
    <>
      {/* Hero banner */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="container">
          <div className="hero-text-only">
            <span className="hero-tag">
              <span className="availability-dot" />
              Available for August '25
            </span>
            <h1>Design that delivers results.</h1>
            <p className="hero-sub">
              Strategic design that drives growth, not just looks good. Everything
              your brand needs to attract customers and turn them into sales.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Book a call with me →</a>
              <div className="social-proof">
                <div className="social-proof-avatars">
                  {['A', 'B', 'C'].map((l) => (
                    <div key={l} className="avatar">{l}</div>
                  ))}
                </div>
                <span>99+ Happy clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects — cards live here and fly up into a stack over the hero */}
      <section id="work" className="projects section" ref={projectsRef}>
        <div className="container">
          <Reveal className="section-header">
            <h2>Latest Projects</h2>
            <div className="filter-tabs">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-tab${active === f ? ' active' : ''}`}
                  onClick={() => setActive(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="proj-grid">
            {visible.map((p, i) => (
              <Link
                key={p.id}
                to={`/project/${p.slug}`}
                className="proj-card"
                ref={(el) => (cardRefs.current[i] = el)}
              >
                {/* Image with zoom + hover CTA */}
                <div className="proj-card-media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="proj-card-hover">
                    <div className="proj-card-cta">
                      <span>View details</span>
                      <div className="proj-card-arrow">↗</div>
                    </div>
                  </div>
                </div>

                {/* Meta below image */}
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
    </>
  )
}
