import Reveal from './Reveal.jsx'

// ── The sketch that started it: every field a flight has, ticked off ──
const askedFor = [
  'Flight number', 'Departure / arrival', 'Terminal', 'Gate', 'Seat',
  'Boarding time', 'Baggage allowance', 'Meal preference', 'Flight duration',
  'Aircraft type', 'Check-in status', 'Boarding pass', 'Airline contact / support',
]

const kept = ['Flight route', 'Date & time', 'Terminal', 'Gate', 'Flight number']

// A wobbly, hand-drawn tick box
function Tick({ on = true }) {
  return (
    <svg className="itl-tick" viewBox="0 0 24 24" aria-hidden="true">
      <path
        className="itl-tick-box"
        d="M4.4 5.2c4.6-.7 9.4-.9 14.3-.5.6 3.3.7 9.1.2 13.6-4.8.6-9.6.7-14.4.2C3.9 14.6 3.9 9.4 4.4 5.2Z"
      />
      {on && <path className="itl-tick-mark" d="M7.6 12.4c1.6 1.1 2.7 2.3 3.5 3.6 1.6-3.5 3.7-6.4 6.2-8.7" />}
    </svg>
  )
}

const notes = [
  {
    tag: 'The problem',
    tone: 'bad',
    title: 'Everything on one card',
    points: [
      'Initial setup packed all data — seats, baggage rules, plane types, booking codes — straight onto the main card.',
      'The result was visual noise that bloated the timeline and forced excessive scrolling.',
    ],
  },
  {
    tag: 'The UX fix',
    tone: 'good',
    title: 'Prioritise, then segment',
    points: [
      'Stripped the card back to travel-day essentials: time, flight status, duration, terminal and gate.',
      'Boarding Pass — instant access to the digital barcode for transit security.',
      'Flight Details — a secondary view holding seats, baggage rules and booking references.',
    ],
  },
  {
    tag: 'The outcome',
    tone: 'win',
    title: '45% shorter, twice as scannable',
    points: [
      'The main card’s vertical footprint shrank by 45%.',
      'Flight and the upcoming hotel check-in now fit in a single mobile viewport, with no aggressive scrolling.',
    ],
  },
]

export default function IterationLesson() {
  return (
    <div className="itl">
      {/* ── The thinking, before a single screen was drawn ── */}
      <div className="itl-think">
        <Reveal className="itl-side itl-side--before">
          <span className="itl-side-step">Step 01 · First instinct</span>
          <h4 className="itl-side-h">Put everything on the card</h4>
          <p className="itl-side-why">
            The brief was “travellers can’t find their details” — so I made sure nothing was
            hidden. Every field the airline sent went on the card, because <b>hiding data
            felt like repeating the original problem</b>.
          </p>
          <ul className="itl-list">
            {askedFor.map((t, i) => (
              <li key={t} style={{ '--d': `${i * 45}ms` }}><Tick /><span>{t}</span></li>
            ))}
          </ul>
          <p className="itl-side-note itl-side-note--bad">
            13 fields. Nothing is emphasised, so nothing is findable.
          </p>
        </Reveal>

        <Reveal className="itl-side itl-side--after" delay={120}>
          <span className="itl-side-step">Step 02 · The question that cut it</span>

          <p className="itl-pivot-q">What does the traveller need <em>at a glance</em>?</p>
          <p className="itl-pivot-a">
            Seeing them all ticked off was the moment it broke. At a gate nobody reads
            thirteen rows — they check one thing and move. So I re-sorted every field by a
            single test: <b>is this needed in the next hour?</b>
          </p>

          <h4 className="itl-side-h">Only the travel-day facts survived</h4>
          <p className="itl-side-why">
            Five fields answer “where am I going, and where do I stand?”. The rest is still
            useful — <b>it just belongs one tap away, not in the timeline</b>.
          </p>
          <ul className="itl-list itl-list--kept">
            {kept.map((t, i) => (
              <li key={t} style={{ '--d': `${i * 70}ms` }}><Tick /><span>{t}</span></li>
            ))}
          </ul>
          <p className="itl-side-note itl-side-note--good">
            5 fields on the card · 8 moved behind Boarding Pass &amp; Flight Details.
          </p>
        </Reveal>
      </div>

      <div className="itl-notes">
        {notes.map((n, i) => (
          <Reveal className={`itl-note itl-note--${n.tone}`} key={n.tag} delay={i * 110}>
            <span className="itl-note-tag">{n.tag}</span>
            <h4>{n.title}</h4>
            <ul>
              {n.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
