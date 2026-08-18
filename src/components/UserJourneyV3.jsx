import { useEffect, useRef, useState } from 'react'

// Same MLMT journey told as a connected "step flow" of pretty cards.
const DEFAULT_PHASES = [
  {
    phase: 'Booking Confirmation',
    emoji: '😎',
    mood: 'Excited',
    tone: 'good',
    actions: ['Books a package', 'Gets confirmations'],
    goal: 'Book a trip with confidence.',
    thought: '“Everything looks great — I can’t wait!”',
    pain: 'Details arrive across email, SMS & PDFs.',
  },
  {
    phase: 'Trip Preparation',
    emoji: '😟',
    mood: 'Anxious',
    tone: 'low',
    actions: ['Hunts for hotel info', 'Checks transfers'],
    goal: 'Feel ready before departure.',
    thought: '“Do I have everything I need?”',
    pain: 'Info scattered, slow to find.',
  },
  {
    phase: 'During the Journey',
    emoji: '😣',
    mood: 'Stressed',
    tone: 'bad',
    actions: ['Checks daily plan', 'Finds transport'],
    goal: 'Navigate the trip smoothly.',
    thought: '“What’s happening next?”',
    pain: 'Switching apps to find things fast.',
  },
  {
    phase: 'Trip Reflection',
    emoji: '😊',
    mood: 'Relieved',
    tone: 'good',
    actions: ['Reviews summary', 'Saves receipts'],
    goal: 'Keep memories in one place.',
    thought: '“I want it all in one place.”',
    pain: 'No consolidated trip summary.',
  },
]

export default function UserJourneyV3({ phases = DEFAULT_PHASES }) {
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
    <div className={`jv3${show ? ' is-in' : ''}`} ref={ref}>
      <div className="jv3-head">
        <span className="jv3-eyebrow">Journey map · v3</span>
        <span className="jv3-sub">From booking to memories</span>
      </div>

      <div className="jv3-flow">
        {phases.map((p, i) => (
          <div className="jv3-stepwrap" key={p.phase}>
            <article
              className={`jv3-card jv3-card--${p.tone}`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className="jv3-top">
                <span className="jv3-badge">{p.emoji}</span>
                <div>
                  <span className="jv3-step">Step 0{i + 1}</span>
                  <span className={`jv3-mood jv3-mood--${p.tone}`}>{p.mood}</span>
                </div>
              </div>

              <h4 className="jv3-phase">{p.phase}</h4>

              <div className="jv3-actions">
                {p.actions.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>

              <div className="jv3-goal">
                <b>Goal</b>
                {p.goal}
              </div>

              <p className="jv3-quote">{p.thought}</p>

              <div className="jv3-pain">
                <i>✕</i>
                {p.pain}
              </div>
            </article>

            {i < phases.length - 1 && <span className="jv3-arrow">→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
