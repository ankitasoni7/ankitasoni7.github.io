import { useEffect, useRef, useState } from 'react'

// Same MLMT journey, told as a modern emotion-curve map.
const phases = [
  {
    phase: 'Booking Confirmation',
    level: 86,
    feeling: { emoji: '😎', mood: 'Excited', tone: 'good' },
    actions: ['Books a travel package through MLMT'],
    goal: 'Successfully book a trip package.',
    thoughts: ['“Everything looks great. I can’t wait for my trip.”'],
    pains: ['Details arrive through multiple channels', 'No single place to store information', 'Hard to know what matters most'],
  },
  {
    phase: 'Trip Preparation',
    level: 46,
    feeling: { emoji: '😟', mood: 'Anxious', tone: 'low' },
    actions: ['Searches for hotel details', 'Checks transfer info', 'Reviews activity schedules', 'Looks for documents'],
    goal: 'Prepare for the journey with confidence.',
    thoughts: ['“Do I have everything I need?”', '“Where can I find my pickup info?”'],
    pains: ['Info scattered across email, PDFs & SMS', 'Time spent searching for details', 'Uncertainty before departure'],
  },
  {
    phase: 'During the Journey',
    level: 22,
    feeling: { emoji: '😣', mood: 'Stressed', tone: 'bad' },
    actions: ['Checks daily itinerary', 'Looks for transport details', 'Opens booking confirmations', 'Shares plans with family'],
    goal: 'Stay informed and navigate the trip smoothly.',
    thoughts: ['“What’s happening next?”', '“Where do I need to be now?”'],
    pains: ['Constant switching between apps', 'Hard to find info quickly', 'Confusion when plans change'],
  },
  {
    phase: 'Trip Reflection',
    level: 76,
    feeling: { emoji: '😊', mood: 'Relieved', tone: 'good' },
    actions: ['Reviews full itinerary', 'Downloads invoices / receipts', 'Shares photos & experiences'],
    goal: 'Access trip summary, receipts and memories in one place.',
    thoughts: ['“I want all my trip details in one place.”', '“It’d be nice to relive the trip easily.”'],
    pains: ['No consolidated trip summary', 'Receipts scattered across apps', 'Hard to revisit past trips'],
  },
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

const pts = phases.map((p, i) => ({
  x: ((i + 0.5) / phases.length) * 100,
  y: 100 - p.level,
}))
const line = smoothPath(pts)
const area = `${line} L 100 100 L 0 100 Z`

export default function UserJourneyV2() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`jv2${show ? ' is-in' : ''}`} ref={ref}>
      <div className="jv2-head-row">
        <span className="jv2-eyebrow">Journey at a glance · v2</span>
        <span className="jv2-legend">
          <i className="jv2-dot jv2-dot--good" /> Positive
          <i className="jv2-dot jv2-dot--low" /> Uneasy
          <i className="jv2-dot jv2-dot--bad" /> Frustrated
        </span>
      </div>

      <div className="jv2-scroll">
      <div className="jv2-inner">
      {/* Emotion curve */}
      <div className="jv2-curve">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="jv2grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="jv2-area" d={area} fill="url(#jv2grad)" />
          <path className="jv2-line" d={line} pathLength="1" />
        </svg>
        {phases.map((p, i) => (
          <span
            key={p.phase}
            className={`jv2-emoji jv2-emoji--${p.feeling.tone}`}
            style={{
              left: `${pts[i].x}%`,
              top: `${pts[i].y}%`,
              animationDelay: `${0.5 + i * 0.15}s`,
            }}
          >
            {p.feeling.emoji}
          </span>
        ))}
      </div>

      {/* Phase columns */}
        <div className="jv2-grid">
          {phases.map((p, i) => (
            <div
              className={`jv2-col jv2-col--${p.feeling.tone}`}
              key={p.phase}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="jv2-colhead">
                <span className="jv2-num">{String(i + 1).padStart(2, '0')}</span>
                <span className={`jv2-mood jv2-mood--${p.feeling.tone}`}>
                  {p.feeling.emoji} {p.feeling.mood}
                </span>
              </div>
              <h4 className="jv2-phase">{p.phase}</h4>

              <div className="jv2-block">
                <span className="jv2-label">Actions</span>
                <ul className="jv2-list">
                  {p.actions.map((a) => <li key={a}>{a}</li>)}
                </ul>
              </div>

              <div className="jv2-block jv2-goal">
                <span className="jv2-label">Goal</span>
                <p>{p.goal}</p>
              </div>

              <div className="jv2-block">
                <span className="jv2-label">Thinking</span>
                {p.thoughts.map((t) => <p className="jv2-quote" key={t}>{t}</p>)}
              </div>

              <div className="jv2-block">
                <span className="jv2-label">Pain points</span>
                <ul className="jv2-list jv2-list--pain">
                  {p.pains.map((pn) => <li key={pn}>{pn}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
