import { useEffect, useRef, useState } from 'react'

const tabs = [
  { label: 'Typography', mark: 'Aa' },
  { label: 'Color' },
  { label: 'Components' },
]

const weights = [
  { name: 'Medium', num: 500 },
  { name: 'Medium Italic', num: 500, italic: true },
  { name: 'Semibold', num: 600 },
  { name: 'Semibold Italic', num: 600, italic: true },
  { name: 'Bold', num: 700 },
  { name: 'Bold Italic', num: 700, italic: true },
]

const colors = [
  { role: 'Primary Color', hex: '#EF2E31' },
  { role: 'Primary Color', hex: '#FFFFFF' },
  { role: 'Primary Color', hex: '#BFD7F5' },
  { role: 'Secondary Color', hex: '#1C1C1C' },
  { role: 'Primary Color', hex: '#262626' },
  { role: 'Primary Color', hex: '#000000' },
]

const bars = [40, 60, 85, 100, 55, 70]
const icons = ['✦', '💬', 'A', '🖼', '↺', '📷']

export default function StyleGuide() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [openComp, setOpenComp] = useState(0)

  // Pin the stage and convert vertical scroll into horizontal movement.
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    const count = tabs.length
    let raf = 0

    const update = () => {
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const progress = Math.min(Math.max(-rect.top / total, 0), 1)
      const maxMove = track.scrollWidth - track.parentElement.clientWidth
      track.style.transform = `translate3d(${-progress * maxMove}px,0,0)`
      setActive(Math.round(progress * (count - 1)))
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const goTo = (i) => {
    const section = sectionRef.current
    if (!section) return
    const total = section.offsetHeight - window.innerHeight
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const progress = tabs.length > 1 ? i / (tabs.length - 1) : 0
    window.scrollTo({ top: sectionTop + progress * total, behavior: 'smooth' })
  }

  return (
    <div className="sg-scroll" ref={sectionRef}>
      <div className="sg-sticky">
        {/* Tabs */}
        <div className="sg-tabs">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              className={`sg-tab${active === i ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
            >
              {t.mark && <span className="sg-tab-mark">{t.mark}</span>}
              <span className="sg-tab-label">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Horizontal track driven by scroll */}
        <div className="sg-track" ref={trackRef}>
        {/* Typography */}
        <section className={`sg-panel${active === 0 ? ' is-active' : ''}`}>
          <div className="sg-typo">
            <div className="sg-typo-left">
              <span className="sg-label">Primary Typeface</span>
              <div className="sg-aa">Aa</div>
              <h3 className="sg-typo-name">Product Sans</h3>
              <p className="sg-typo-desc">
                <strong>Google Sans</strong> is a modern geometric sans-serif typeface
                designed for clarity, simplicity, and strong visual presence across
                digital interfaces. The primary typeface is used for headings and display.
              </p>
            </div>
            <div className="sg-typo-right">
              {weights.map((w) => (
                <div className="sg-weight" key={w.name}>
                  <div>
                    <div className="sg-weight-name">{w.name}</div>
                    <div className="sg-weight-num">{w.num}</div>
                  </div>
                  <span
                    className="sg-weight-aa"
                    style={{ fontWeight: w.num, fontStyle: w.italic ? 'italic' : 'normal' }}
                  >
                    Aa
                  </span>
                </div>
              ))}
              <a href="#" className="sg-download">Download Typeface</a>
            </div>
          </div>
        </section>

        {/* Color */}
        <section className={`sg-panel${active === 1 ? ' is-active' : ''}`}>
          <div className="sg-colors">
            {colors.map((c, i) => (
              <div className="sg-swatch-card" key={i}>
                <span
                  className="sg-swatch"
                  style={{
                    background: c.hex,
                    border: c.hex === '#FFFFFF' ? '1px solid var(--border-light)' : 'none',
                  }}
                />
                <div className="sg-swatch-meta">
                  <span>{c.role}</span>
                  <span className="sg-swatch-hex">{c.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section className={`sg-panel${active === 2 ? ' is-active' : ''}`}>
          <div className="sg-acc-list">
            {/* 1 — Buttons & Input */}
            <div
              className={`sg-acc${openComp === 0 ? ' is-open' : ''}`}
              onMouseEnter={() => setOpenComp(0)}
            >
              <div className="sg-acc-head">
                <span className="sg-comp-title">Buttons &amp; Input</span>
                <span className="sg-acc-icon" />
              </div>
              <div className="sg-acc-body">
                <div className="sg-acc-inner">
                  <div className="sg-comp-row">
                    <button className="sg-btn sg-btn--red">Login</button>
                    <button className="sg-btn sg-btn--dark">Itinerary Detail</button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 — Navigation */}
            <div
              className={`sg-acc${openComp === 1 ? ' is-open' : ''}`}
              onMouseEnter={() => setOpenComp(1)}
            >
              <div className="sg-acc-head">
                <span className="sg-comp-title">Navigation</span>
                <span className="sg-acc-icon" />
              </div>
              <div className="sg-acc-body">
                <div className="sg-acc-inner">
                  <div className="sg-comp-row">
                    <div className="sg-pilltabs">
                      <span className="is-active">Upcoming Trips</span>
                      <span>Past trips</span>
                    </div>
                    <button className="sg-btn sg-btn--red">Copy Link</button>
                    <button className="sg-btn sg-btn--dark">Copied!</button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 — Cards */}
            <div
              className={`sg-acc${openComp === 2 ? ' is-open' : ''}`}
              onMouseEnter={() => setOpenComp(2)}
            >
              <div className="sg-acc-head">
                <span className="sg-comp-title">Cards</span>
                <span className="sg-acc-icon" />
              </div>
              <div className="sg-acc-body">
                <div className="sg-acc-inner">
                  <div className="sg-comp-row">
                    <div className="sg-mini-card">
                      <span className="sg-mini-label">Expenses</span>
                      <span className="sg-mini-value">$523.64</span>
                      <span className="sg-mini-sub">Weekly transactions</span>
                      <div className="sg-bars">
                        {bars.map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="sg-mini-card sg-mini-card--bike">
                      <div>
                        <span className="sg-mini-label">New Bike</span>
                        <span className="sg-mini-value">$549.50</span>
                        <span className="sg-mini-sub">by Nov, 2025</span>
                      </div>
                      <span className="sg-bike">🏍️</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 — Icons */}
            <div
              className={`sg-acc${openComp === 3 ? ' is-open' : ''}`}
              onMouseEnter={() => setOpenComp(3)}
            >
              <div className="sg-acc-head">
                <span className="sg-comp-title">Icons</span>
                <span className="sg-acc-icon" />
              </div>
              <div className="sg-acc-body">
                <div className="sg-acc-inner">
                  <div className="sg-icons">
                    {icons.map((ic, i) => (
                      <span key={i} className="sg-icon">{ic}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>
  )
}
