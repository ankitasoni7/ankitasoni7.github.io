import { useEffect, useRef, useState } from 'react'

// Ideation notes arranged in a ring around a "mind-blown" emoji.
// x/y = position on the stage (%), r = resting tilt.
const ideas = [
  { text: 'Pull every booking — flights, hotels, transfers — into one timeline.', x: 31, y: 20, r: -5 },
  { text: 'Cache the full itinerary so it works offline, on the move.', x: 69, y: 17, r: 4 },
  { text: 'Keep passports, tickets & vouchers in one secure wallet.', x: 14, y: 50, r: -4 },
  { text: 'Surface a clear “what’s next” card so travellers never feel lost.', x: 86, y: 48, r: 5 },
  { text: 'Send smart nudges: check-in windows, gate changes, weather.', x: 31, y: 80, r: -6 },
  { text: 'Share the whole trip plan with family in a single tap.', x: 69, y: 83, r: 4 },
]

export default function IdeationWorkshop() {
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
    <div className={`idw${show ? ' is-in' : ''}`} ref={ref}>
      <span className="idw-ghost" aria-hidden="true">Ideation Workshop</span>

      <div className="idw-stage">
        <span className="idw-ring idw-ring--out" aria-hidden="true" />
        <span className="idw-ring idw-ring--in" aria-hidden="true" />
        <span className="idw-center" aria-hidden="true">🤯</span>

        {ideas.map((it, i) => (
          <div
            key={i}
            className="idw-note"
            style={{ left: `${it.x}%`, top: `${it.y}%`, '--r': `${it.r}deg`, '--d': `${i * 140}ms` }}
          >
            <span className="idw-pin" aria-hidden="true" />
            <p>{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
