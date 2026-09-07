import { useEffect, useRef, useState } from 'react'

// Just the emotion curve from UserJourneyV2 — same markup, classes and
// draw-in animation, without the phase columns underneath.
const DEFAULT_PHASES = [
  { phase: 'Booking Confirmation', level: 86, emoji: '😎', tone: 'good' },
  { phase: 'Trip Preparation', level: 46, emoji: '😟', tone: 'low' },
  { phase: 'During the Journey', level: 22, emoji: '😣', tone: 'bad' },
  { phase: 'Trip Reflection', level: 76, emoji: '😊', tone: 'good' },
]

// Catmull-Rom → cubic Bézier for a smooth emotion curve.
function smoothPath(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`
  }
  return d
}

export default function JourneyCurve({ phases = DEFAULT_PHASES, eyebrow = 'Journey at a glance · v2' }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  const pts = phases.map((p, i) => ({
    x: ((i + 0.5) / phases.length) * 100,
    y: 100 - p.level,
  }))
  const line = smoothPath(pts)
  const area = `${line} L 100 100 L 0 100 Z`

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Draws when the curve is properly on screen — and re-arms on the way
    // back out so it replays every time you return to the section.
    const obs = new IntersectionObserver(
      ([e]) => setShow(e.isIntersecting),
      { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`jv2 jv2--curveonly${show ? ' is-in' : ''}`} ref={ref}>
      <div className="jv2-head-row">
        <span className="jv2-eyebrow">{eyebrow}</span>
        <span className="jv2-legend">
          <i className="jv2-dot jv2-dot--good" /> Positive
          <i className="jv2-dot jv2-dot--low" /> Uneasy
          <i className="jv2-dot jv2-dot--bad" /> Frustrated
        </span>
      </div>

      <div className="jv2-curve">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="jvcgrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9aa0a6" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#9aa0a6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="jv2-area" d={area} fill="url(#jvcgrad)" />
          <path className="jv2-line" d={line} pathLength="1" />
        </svg>
        {phases.map((p, i) => (
          <span
            key={p.phase}
            className={`jv2-emoji jv2-emoji--${p.tone}`}
            style={{
              left: `${pts[i].x}%`,
              top: `${pts[i].y}%`,
              animationDelay: `${0.5 + i * 0.15}s`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>
    </div>
  )
}
