import Reveal from './Reveal.jsx'

/* ── sketch primitives ──────────────────────────────────────────────── */

const Head = ({ children, time }) => (
  <div className="sk-head">
    <span className="sk-head-l"><i className="sk-ico" />{children}</span>
    {time && <span className="sk-time">{time}</span>}
  </div>
)

// outlined image placeholder
const Img = ({ h = 46, cap, chip }) => (
  <span className="sk-img" style={{ '--h': `${h}px` }}>
    <svg viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M2 3h56v34H2z" />
      <path d="M2 37 22 18l13 12 9-8 14 15" />
      <circle cx="17" cy="12" r="3.4" />
    </svg>
    {cap && <b className="sk-img-cap">{cap}</b>}
    {chip && <i className="sk-img-chip">{chip}</i>}
  </span>
)

const Rows = ({ items }) => (
  <ul className="sk-rows">
    {items.map((t) => <li key={t}>{t}</li>)}
  </ul>
)

const Cells = ({ items }) => (
  <div className="sk-cells" style={{ '--n': items.length }}>
    {items.map(([k, v]) => (
      <span key={k}><i>{k}</i><b>{v}</b></span>
    ))}
  </div>
)

const Btns = ({ items }) => (
  <div className="sk-btns">{items.map((b) => <span key={b}>{b}</span>)}</div>
)

const Tabs = ({ items }) => (
  <div className="sk-tabs">{items.map((t, i) => <span key={t} className={i === 0 ? 'on' : ''}>{t}</span>)}</div>
)

const Chips = ({ items }) => (
  <div className="sk-chips">{items.map((c) => <span key={c}>{c}</span>)}</div>
)

const Route = () => (
  <div className="sk-route">
    <div className="sk-route-t"><i className="sk-dotmark" />Air India<em>AI 73</em></div>
    <div className="sk-route-b">
      <span><b>Delhi</b><i>05:00 PM</i></span>
      <span className="sk-path" aria-hidden="true"><i /><em>✈</em><i /></span>
      <span className="sk-r"><b>Zurich</b><i>6:00 AM</i></span>
    </div>
  </div>
)

// transit options we explored: modes, fares and distance to the nearest stop
const Transit = () => (
  <div className="sk-transit">
    <span className="sk-transit-h">How to reach</span>
    <ul>
      <li><i>Taxi</i><em>~ CHF 38</em><b>door to door</b></li>
      <li><i>Bus 32</i><em>~ CHF 4.4</em><b>600 m to stop</b></li>
      <li><i>Train S10</i><em>~ CHF 8.2</em><b>1.2 km to station</b></li>
    </ul>
  </div>
)

const Social = () => (
  <div className="sk-social">
    <span className="sk-faces"><i /><i /><i /></span>
    <span>members joined</span>
    <em>View detail ›</em>
  </div>
)

/* ── the four explorations ──────────────────────────────────────────── */

const rows = [
  {
    n: '01',
    label: 'Flight',
    before: (
      <>
        <Head time="5:00 PM – 6:30 AM">Flight</Head>
        <Route />
        <Rows items={['Departure / Arrival', 'Terminal', 'Gate', 'Boarding', 'Seat', 'Baggage', 'Meal', 'Flight status', 'Aircraft']} />
        <span className="sk-link">View more ›</span>
      </>
    ),
    after: (
      <>
        <Head time="5:00 PM – 6:30 AM">Flight</Head>
        <Route />
        <Cells items={[['Boarding', '04:20 PM'], ['Duration', '12h 20m'], ['Terminal', '1'], ['Gate', 'A12']]} />
        <Btns items={['Boarding Pass', 'Flight Details']} />
      </>
    ),
    notes: ['Too much information', 'Which details are actually needed here?', 'Primary vs secondary'],
    keep: { label: 'Keep visible', items: ['Time', 'Route', 'Terminal', 'Gate'] },
    move: { label: 'Move to details', items: ['Seat', 'Baggage', 'Meal', 'Aircraft'] },
  },
  {
    n: '02',
    label: 'Hotel',
    before: (
      <>
        <Head time="6:30 AM">Hotel Check-In</Head>
        <Img h={44} />
        <Rows items={['Hotel name', 'Check-in', 'Check-out', 'Room type', 'Guests', 'Address', 'Contact', 'Confirmation ID', 'Amenities']} />
        <span className="sk-link">View more ›</span>
      </>
    ),
    after: (
      <>
        <Head time="6:30 AM">Hotel Check-In</Head>
        <Img h={58} cap="The Dolder Grand" chip="Prime 9.5" />
        <Cells items={[['Agency ref', 'MLMT-ZRH-48213'], ['Check in', '7 Jan · 09:00 PM']]} />
        <Btns items={['Booking Voucher', 'Hotel Details']} />
      </>
    ),
    notes: ['Complete booking information', 'Too dense for itinerary scanning'],
    keep: { label: 'Essential', items: ['Hotel', 'Check-in', 'Confirmation'] },
    move: { label: 'Secondary', items: ['Room', 'Address', 'Amenities', 'Full booking info'] },
  },
  {
    n: '03',
    label: 'Sightseeing',
    before: (
      <>
        <Head time="08:00 AM – 08:15 PM">Sightseeing</Head>
        <Tabs items={['Attractions', 'Shopping', 'Night life']} />
        <Img h={50} />
        <Rows items={['Location name', 'Description', 'Duration', 'Distance', 'Entry fee', 'Best time', 'What to bring']} />
        <Transit />
        <Rows items={['Reviews', 'Friends going']} />
        <span className="sk-link">View more ›</span>
      </>
    ),
    after: (
      <>
        <Head time="08:00 AM – 08:15 PM">Sightseeing</Head>
        <Tabs items={['Attractions', 'Shopping', 'Night life']} />
        <Img h={58} cap="Uetliberg" />
        <p className="sk-desc">Best views of the city and the lake · hiking trails</p>
        <Chips items={['5–6 pm', '5°C', '19 km', 'Free entry']} />
        <Social />
        <Img h={38} cap="Limmatquai" />
        <span className="sk-more">Show more ⌄</span>
      </>
    ),
    notes: ['Discovery vs information', 'Too much detail reduces scanability'],
    cut: 'I also explored live routes — taxi, bus and train options with fares and the walk to the nearest stop. Talking it through with the developers, transit and pricing feeds don’t exist consistently across every country we sell, so the feature was cut rather than shipped half-accurate.',
    keep: { label: 'Show first', items: ['Image', 'Name', 'Key tags', 'Social context'] },
    move: { label: 'Explore later', items: ['Fees', 'Distance', 'Transport', 'Full description'] },
  },
  {
    n: '04',
    label: 'Dinner',
    before: (
      <>
        <Head time="08:00 PM – 09:30 PM">Dinner</Head>
        <Img h={42} />
        <Rows items={['Restaurant name', 'Cuisine', 'Reservation', 'Dietary preference']} />
        <div className="sk-menu">
          <span className="sk-menu-h">Menu</span>
          <ul>{['Dish', 'Dish', 'Dish', 'Dish', 'Dish', 'Dish'].map((d, i) => <li key={i}>{d}</li>)}</ul>
        </div>
        <Rows items={['Address', 'Contact', 'Dress code', 'Special request']} />
        <span className="sk-link">View more ›</span>
      </>
    ),
    after: (
      <>
        <Head time="08:00 PM – 09:30 PM">Dinner</Head>
        <Img h={52} cap="Tamarind Hill Restaurant" />
        <div className="sk-toggle">
          <span>Pre-paid · 1 per person</span>
          <i className="on">Veg</i><i>Non-veg</i>
        </div>
        <div className="sk-dishes">
          {['Paneer Tikka', 'Dal Makhani', 'Gulab Jamun'].map((d) => (
            <span key={d}><Img h={30} /><b>{d}</b></span>
          ))}
        </div>
        <p className="sk-note">Extra orders are paid directly at the venue</p>
      </>
    ),
    notes: ['Too many choices', 'Is the itinerary becoming a restaurant menu?'],
    keep: { label: 'Keep', items: ['Restaurant', 'Time', 'Meal status', 'Dietary information'] },
    move: { label: 'Move to details', items: ['Menu', 'Dishes', 'Restaurant information'] },
  },
]

const Arrow = () => (
  <svg className="xpl-arrow" viewBox="0 0 90 24" aria-hidden="true">
    <path d="M2 13c14-3.4 30-4.6 46-3.8 12 .6 24 2 40 4.4" />
    <path d="M78 6.4c3.4 2.6 6.6 4.6 10 6.2-3.6 1.4-7 3.4-10.2 6" />
  </svg>
)

export default function ExplorationBoard() {
  return (
    <div className="xpl">
      <Reveal className="xpl-head">
        <h3>Exploring Information Hierarchy</h3>
        <p>
          Before finalizing the itinerary UI, I explored how much information each activity
          should reveal at a glance. The goal was to keep the itinerary useful without
          overwhelming users.
        </p>
      </Reveal>

      {rows.map((r, i) => (
        <Reveal className="xpl-row" key={r.n} delay={i * 60}>
          <span className="xpl-n">{r.n} <i>—</i> {r.label}</span>

          <div className="xpl-grid">
            <div className="xpl-cell">
              <span className="xpl-tag">Explored</span>
              <div className="sk sk--dense">{r.before}</div>
            </div>

            <div className="xpl-cell xpl-cell--notes">
              <ul className="xpl-notes">
                {r.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
              <div className="xpl-step">
                <span>Explore</span>
                <Arrow />
                <span>Prioritize</span>
              </div>
              {r.cut && (
                <p className="xpl-cut">
                  <span>Cut after dev review</span>
                  {r.cut}
                </p>
              )}
            </div>

            <div className="xpl-cell">
              <span className="xpl-tag xpl-tag--on">Resolved</span>
              <div className="sk">{r.after}</div>
            </div>
          </div>

          <div className="xpl-prios">
            <div className="xpl-prio">
              <span className="xpl-prio-l">{r.keep.label}</span>
              <ul>{r.keep.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
            <div className="xpl-prio xpl-prio--muted">
              <span className="xpl-prio-l">{r.move.label}</span>
              <ul>{r.move.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          </div>
        </Reveal>
      ))}

    </div>
  )
}
