import { useEffect, useRef, useState } from 'react'

// Clustered sticky-note board — grouped observations from the research.
const clusters = [
  {
    title: 'Information is Scattered Across Sources',
    tone: 'yellow',
    notes: [
      'I searched through emails for confirmations.',
      'I had screenshots saved everywhere.',
      'I couldn’t remember where I stored booking details.',
      'Everything was spread across apps and chats.',
    ],
  },
  {
    title: 'Uncertainty During Travel',
    tone: 'blue',
    notes: [
      'I wasn’t sure what was planned next.',
      'I kept checking details repeatedly.',
      'I worried about missing transfers.',
      'Plans were not clear during the trip.',
    ],
  },
  {
    title: 'Difficulty Accessing Information on the Go',
    tone: 'green',
    notes: [
      'Finding tickets quickly was stressful.',
      'I needed info while I was already traveling.',
      'Important details were hard to locate.',
      'Switching apps slowed me down.',
    ],
  },
  {
    title: 'Coordination Issues in Family & Group Travel',
    tone: 'red',
    notes: [
      'Everyone kept asking me what’s next.',
      'I had to repeat travel details many times.',
      'Changes caused confusion in the group.',
      'Information was buried in messages.',
    ],
  },
]

// a few fixed tilt angles so notes look hand-placed but stay stable
const tilts = ['-2.4deg', '1.8deg', '2.2deg', '-1.6deg']

// Research participants, cycled across the notes so each quote is attributed
// to a person rather than to the researcher.
const DEFAULT_PARTICIPANTS = [
  'P1, family planner',
  'P2, business traveller',
  'P3, group organiser',
  'P4, solo traveler',
  'P5, frequent flyer',
  'P6, first-time traveller',
]

export default function AffinityMap({ participants = DEFAULT_PARTICIPANTS }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  let n = 0
  return (
    <div className={`afm${show ? ' is-in' : ''}`} ref={ref}>
      <div className="afm-board">
        {clusters.map((c) => (
          <section className="afm-cluster" key={c.title}>
            <h3 className="afm-cluster-title">{c.title}</h3>
            <div className="afm-notes">
              {c.notes.map((note) => {
                const i = n++
                return (
                  <article
                    className={`afm-note afm-note--${c.tone}`}
                    key={note}
                    style={{ '--tilt': tilts[i % tilts.length], '--d': `${i * 45}ms` }}
                  >
                    <p className="afm-note-text">“{note}”</p>
                    <span className="afm-note-author">{participants[i % participants.length]}</span>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
