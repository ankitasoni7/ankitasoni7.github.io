import { useEffect, useRef, useState } from 'react'

// Same MLMT journey: emotion curve on top + aligned, labelled section cards.
const phases = [
  {
    phase: 'Booking Confirmation',
    level: 86,
    feeling: { emoji: '😎', mood: 'Excited', tone: 'good' },
    actions: ['Books a travel package through MLMT'],
    goal: 'Successfully book a trip package.',
    thoughts: ['“Everything looks great. I can’t wait for my trip.”'],
    pains: ['Details arrive through multiple channels', 'No single place to store information'],
  },
  {
    phase: 'Trip Preparation',
    level: 46,
    feeling: { emoji: '😟', mood: 'Anxious', tone: 'low' },
    actions: ['Searches for hotel details', 'Checks transfer info', 'Reviews activity schedules'],
    goal: 'Prepare for the journey with confidence.',
    thoughts: ['“Do I have everything I need?”', '“Where can I find my pickup info?”'],
    pains: ['Info scattered across email, PDFs & SMS', 'Time spent searching for details'],
  },
  {
    phase: 'During the Journey',
    level: 22,
    feeling: { emoji: '😣', mood: 'Stressed', tone: 'bad' },
    actions: ['Checks daily itinerary', 'Looks for transport details', 'Opens booking confirmations'],
    goal: 'Stay informed and navigate the trip smoothly.',
    thoughts: ['“What’s happening next?”', '“Where do I need to be now?”'],
    pains: ['Constant switching between apps', 'Hard to find info quickly'],
  },
  {
    phase: 'Trip Reflection',
    level: 76,
    feeling: { emoji: '😊', mood: 'Relieved', tone: 'good' },
    actions: ['Reviews full itinerary', 'Downloads invoices / receipts', 'Shares photos & experiences'],
    goal: 'Access trip summary, receipts and memories in one place.',
    thoughts: ['“I want all my trip details in one place.”'],
    pains: ['No consolidated trip summary', 'Receipts scattered across apps'],
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

export default function UserJourneyV4() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`jv4${show ? ' is-in' : ''}`} ref={ref}>
      <div className="jv4-head-row">
        <span className="jv4-eyebrow">Journey map · v4</span>
        <span className="jv4-legend">
          <i className="jv4-dot jv4-dot--good" /> Positive
          <i className="jv4-dot jv4-dot--low" /> Uneasy
          <i className="jv4-dot jv4-dot--bad" /> Frustrated
        </span>
      </div>

      <div className="jv4-scroll">
        <div className="jv4-inner">
          {/* Emotion curve */}
          <div className="jv4-curve">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="jv4grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6f6a61" stopOpacity="0.26" />
                  <stop offset="100%" stopColor="#6f6a61" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="jv4-area" d={area} fill="url(#jv4grad)" />
              <path className="jv4-line" d={line} pathLength="1" />
            </svg>
            {phases.map((p, i) => (
              <span
                key={p.phase}
                className={`jv4-emoji jv4-emoji--${p.feeling.tone}`}
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

          {/* Aligned section cards (subgrid keeps each row the same height) */}
          <div className="jv4-grid">
            {phases.map((p, i) => (
              <article
                className={`jv4-card jv4-card--${p.feeling.tone}`}
                key={p.phase}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="jv4-sec jv4-sec--head">
                  <span className="jv4-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`jv4-mood jv4-mood--${p.feeling.tone}`}>
                    {p.feeling.emoji} {p.feeling.mood}
                  </span>
                  <h4 className="jv4-phase">{p.phase}</h4>
                </div>

                <div className="jv4-sec">
                  <span className="jv4-label jv4-label--action">Actions</span>
                  <ul className="jv4-list">
                    {p.actions.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                </div>

                <div className="jv4-sec jv4-sec--goal">
                  <span className="jv4-label jv4-label--goal">Goal</span>
                  <p>{p.goal}</p>
                </div>

                <div className="jv4-sec">
                  <span className="jv4-label jv4-label--think">Thinking</span>
                  {p.thoughts.map((t) => <p className="jv4-quote" key={t}>{t}</p>)}
                </div>

                <div className="jv4-sec">
                  <span className="jv4-label jv4-label--pain">Pain points</span>
                  <ul className="jv4-list jv4-list--pain">
                    {p.pains.map((pn) => <li key={pn}>{pn}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
