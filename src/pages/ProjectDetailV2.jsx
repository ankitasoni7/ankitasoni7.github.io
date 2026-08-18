import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import iaUrl from '../assets/mlmt-ia.svg'
import flowUrl from '../assets/mlmt-userflow.svg'

// ── Content (My Last Minute Trip) ─────────────────────────────────────────
const project = {
  title: 'My Last Minute Trip',
  category: 'Travel · Mobile App',
  intro:
    'A post-booking companion that turns scattered travel details into one calm, reliable place.',
  overview:
    'MLMT helps people discover and book trips, but the experience fell apart after checkout — confirmations, tickets and plans scattered across email, SMS and PDFs. We redesigned everything that happens after the booking into a single hub that keeps every detail clear, current and reachable, even offline.',
  meta: [
    { k: 'Role', v: 'Lead Product Designer' },
    { k: 'Year', v: '2025' },
    { k: 'Client', v: 'MLMT' },
    { k: 'Timeline', v: '8 weeks' },
  ],
  services: ['UX Research', 'Product Design', 'Design System', 'Prototyping', 'Motion'],
  cover: 'https://picsum.photos/seed/mlmt-v2-cover/2000/1100',
  challenge:
    'Travelers rarely had a clear view of what was next — details scattered everywhere, no single source of truth, often no signal.',
  solution:
    'One calm hub for every booking, document and itinerary, with a clear daily timeline and offline-ready access.',
  results: [
    { value: '+38%', label: 'Booking conversion' },
    { value: '−42%', label: 'Support tickets' },
    { value: '4.8★', label: 'App store rating' },
    { value: '2 wks', label: 'To full launch' },
  ],
  affinity: 'https://picsum.photos/seed/mlmt-v2-affinity/1400/820',
}

const briefObjectives = [
  'Understand what challenges travelers face after booking a trip',
  'Learn how they currently manage scattered travel information',
  'Discover what support they need before and during the journey',
  'Find opportunities to improve satisfaction and engagement',
]
const briefAsk = ['Post-booking value', 'User research', 'Design exploration', 'A complete journey']

const interviews = [
  { quote: 'Booking works — it’s everything that happens after that we needed to solve.', who: 'Product Owner', tag: 'Stakeholder' },
  { quote: 'There’s no centralized system — users manage travel details across separate tools.', who: 'Product Owner', tag: 'Stakeholder' },
  { quote: 'I spent too much time figuring out where to find information instead of enjoying my trip.', who: 'Family planner', tag: 'Traveler' },
  { quote: 'I don’t want to dig through five apps mid-trip — I want everything in one place.', who: 'Solo traveler', tag: 'Traveler' },
]
const researchStats = [
  { v: '14', l: 'Interviews' },
  { v: '2', l: 'User groups' },
  { v: '120+', l: 'Insights tagged' },
]

const personas = [
  {
    name: 'Rahul Verma', age: '25', loc: 'Ahmedabad', tag: 'The Family Planner',
    quote: 'I just wanted to enjoy my trip, not manage everyone’s logistics.',
    needs: ['Enjoy the trip without worrying about logistics', 'Stay informed about daily plans', 'Explore attractions confidently'],
    frustrations: ['Booking details hard to find quickly', 'Uncertainty about daily schedules', 'Too many emails and confirmations'],
  },
  {
    name: 'Ananya Sharma', age: '29', loc: 'Mumbai', tag: 'The Solo Traveler',
    quote: 'I just want everything in one place — not five apps mid-trip.',
    needs: ['One home for every trip detail', 'Quick access even when offline', 'Recommendations she can trust'],
    frustrations: ['Information scattered across apps', 'No offline access to bookings', 'Feeling unprepared on arrival'],
  },
]

const themes = [
  { title: 'Clarity of value', notes: ['Hard to tell what matters', 'Info buried in email', 'No single source'] },
  { title: 'Speed to action', notes: ['Too many steps', 'Searching wastes time', 'Constant app switching'] },
  { title: 'Confidence', notes: ['Unsure of the schedule', 'Re-checking details', 'Offline anxiety'] },
  { title: 'Proof & trust', notes: ['Confirmations handy', 'Receipts scattered', 'Revisit past trips'] },
]

const journey = [
  { phase: 'Booking', emoji: '😎', mood: 'Excited', y: 26, note: 'Everything looks great — I can’t wait.' },
  { phase: 'Preparation', emoji: '😟', mood: 'Anxious', y: 62, note: 'Do I have everything I need?' },
  { phase: 'During trip', emoji: '😣', mood: 'Stressed', y: 80, note: 'What’s happening next?' },
  { phase: 'Reflection', emoji: '😊', mood: 'Relieved', y: 34, note: 'I want it all in one place.' },
]

const problems = [
  { t: 'Fragmented Information', d: 'Details live across email, SMS, PDFs and chats — slow and stressful to gather.' },
  { t: 'Uncertainty During Travel', d: 'No clear view of what’s next, so travelers re-check the same things over and over.' },
  { t: 'Poor Access On The Go', d: 'Critical info is hard to reach quickly — especially offline.' },
]
const solutions = [
  { icon: '◎', t: 'One Unified Hub', d: 'Every booking, document and itinerary in a single, searchable place.', big: true },
  { icon: '↗', t: 'Clear Daily Plan', d: 'A timeline of what’s next keeps travelers oriented.' },
  { icon: '⤓', t: 'Offline Ready', d: 'Key details cached for instant access — no signal required.' },
]

const dsColors = [
  { n: 'Ink', hex: '#101010' }, { n: 'Slate', hex: '#1C1C1C' }, { n: 'Sky', hex: '#BFD7F5' },
  { n: 'Signal', hex: '#EF2E31' }, { n: 'Paper', hex: '#FFFFFF' },
]

const wires = [
  { low: 'https://picsum.photos/seed/mlmt-low-1/600/1300?grayscale', high: 'https://picsum.photos/seed/mlmt-hi-1/600/1300' },
  { low: 'https://picsum.photos/seed/mlmt-low-2/600/1300?grayscale', high: 'https://picsum.photos/seed/mlmt-hi-2/600/1300' },
  { low: 'https://picsum.photos/seed/mlmt-low-3/600/1300?grayscale', high: 'https://picsum.photos/seed/mlmt-hi-3/600/1300' },
]

// ── Helpers ───────────────────────────────────────────────────────────────
function ProgressBar() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="rx-progress"><span style={{ transform: `scaleX(${p})` }} /></div>
}

function CountUp({ value }) {
  const ref = useRef(null)
  const m = String(value).match(/^([^\d-−+]*[-−+]?)(\d+(?:\.\d+)?)(.*)$/) || [null, '', value, '']
  const target = parseFloat(m[2]) || 0
  const decimals = (String(m[2]).split('.')[1] || '').length
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / 1200, 1)
        setN(target * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
  }, [target])
  return <span ref={ref}>{m[1]}{n.toFixed(decimals)}{m[3]}</span>
}

const Kicker = ({ n, children }) => (
  <Reveal as="div" className="rx-kicker"><span>{n}</span>{children}</Reveal>
)

export default function ProjectDetailV2() {
  const coverRef = useRef(null)
  const [flow, setFlow] = useState('ia')
  const [fi, setFi] = useState('high')

  useEffect(() => {
    const el = coverRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--p', Math.max(0, Math.min(1, 1 - r.top / window.innerHeight)).toFixed(3))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <main className="rx">
      <ProgressBar />

      {/* ── HERO (dark, full height) ── */}
      <section className="rx-hero">
        <div className="rx-hero-glow" aria-hidden="true" />
        <div className="container">
          <Reveal><Link to="/projects" className="rx-back">← All work</Link></Reveal>
          <Reveal as="span" className="rx-chip" delay={60}>{project.category}</Reveal>
          <h1 className="rx-hero-title">
            {project.title.split(' ').map((w, i) => (
              <Reveal as="span" className="rx-hero-word" key={i} delay={120 + i * 70}>{w} </Reveal>
            ))}
          </h1>
          <Reveal as="p" className="rx-hero-lead" delay={360}>{project.intro}</Reveal>
          <Reveal className="rx-hero-foot" delay={440}>
            {project.meta.map((m) => (
              <div key={m.k}><span>{m.k}</span><b>{m.v}</b></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── COVER (full-bleed parallax) ── */}
      <div className="rx-cover" ref={coverRef}>
        <img src={project.cover} alt={project.title} />
      </div>

      {/* ── 01 OVERVIEW (asymmetric split) ── */}
      <section className="rx-sec container">
        <div className="rx-overview">
          <Kicker n="01">Overview</Kicker>
          <Reveal as="p" className="rx-display">{project.overview}</Reveal>
        </div>
        <div className="rx-tags">
          {project.services.map((s, i) => (
            <Reveal as="span" className="rx-tag" key={s} delay={i * 60}>{s}</Reveal>
          ))}
        </div>
      </section>

      {/* ── 02 BRIEF (tinted memo) ── */}
      <section className="rx-brief">
        <div className="container">
          <Kicker n="02">The Brief</Kicker>
          <Reveal as="p" className="rx-brief-quote">
            “We want to extend value beyond booking — but we’re unsure what travelers
            actually need after checkout.”
          </Reveal>
          <div className="rx-brief-grid">
            <ol className="rx-obj">
              {briefObjectives.map((o, i) => (
                <Reveal as="li" key={o} delay={i * 70}><b>{String(i + 1).padStart(2, '0')}</b>{o}</Reveal>
              ))}
            </ol>
            <Reveal className="rx-brief-ask">
              <span className="rx-brief-ask-label">Deliver on</span>
              <div className="rx-pills">
                {briefAsk.map((a) => <span key={a} className="rx-pill">{a}</span>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 RESEARCH (alternating pull-quotes + stats) ── */}
      <section className="rx-sec container">
        <Kicker n="03">Research</Kicker>
        <div className="rx-stats">
          {researchStats.map((s, i) => (
            <Reveal className="rx-stat" key={s.l} delay={i * 80}>
              <b><CountUp value={s.v} /></b><span>{s.l}</span>
            </Reveal>
          ))}
        </div>
        <div className="rx-quotes">
          {interviews.map((q, i) => (
            <Reveal className={`rx-quote ${i % 2 ? 'is-right' : ''}`} key={i} delay={i * 80}>
              <span className="rx-quote-tag">{q.tag}</span>
              <p>“{q.quote}”</p>
              <span className="rx-quote-who">— {q.who}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 04 PERSONAS (full-width bands) ── */}
      <section className="rx-sec container">
        <Kicker n="04">Personas</Kicker>
      </section>
      {personas.map((p, i) => (
        <section className={`rx-persona ${i % 2 ? 'is-alt' : ''}`} key={p.name}>
          <div className="container rx-persona-in">
            <Reveal className="rx-persona-id">
              <span className="rx-mono">{p.name.split(' ').map((x) => x[0]).join('')}</span>
              <span className="rx-persona-tag">{p.tag}</span>
              <h3>{p.name}</h3>
              <span className="rx-persona-meta">{p.age} · {p.loc}</span>
              <p className="rx-persona-quote">“{p.quote}”</p>
            </Reveal>
            <div className="rx-persona-cols">
              <Reveal className="rx-needs" delay={80}>
                <span className="rx-col-label">Needs</span>
                <ul>{p.needs.map((n) => <li key={n}><i>+</i>{n}</li>)}</ul>
              </Reveal>
              <Reveal className="rx-frust" delay={140}>
                <span className="rx-col-label">Frustrations</span>
                <ul>{p.frustrations.map((n) => <li key={n}><i>−</i>{n}</li>)}</ul>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── 05 AFFINITY (sticky-note cluster) ── */}
      <section className="rx-sec container">
        <Kicker n="05">Affinity Map</Kicker>
        <div className="rx-affinity">
          {themes.map((t, ti) => (
            <Reveal className="rx-theme" key={t.title} delay={ti * 90}>
              <span className="rx-theme-title">{t.title}</span>
              <div className="rx-notes">
                {t.notes.map((nt, ni) => (
                  <span className={`rx-note rx-note--${(ti + ni) % 4}`} key={nt}>{nt}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 06 JOURNEY (horizontal mood timeline) ── */}
      <section className="rx-sec container">
        <Kicker n="06">User Journey</Kicker>
        <div className="rx-journey">
          <svg className="rx-journey-line" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
            <polyline
              points={journey.map((p, i) => `${((i + 0.5) / journey.length) * 100},${(p.y / 100) * 30}`).join(' ')}
            />
          </svg>
          <div className="rx-journey-row">
            {journey.map((p, i) => (
              <Reveal className="rx-stage" key={p.phase} delay={i * 90}>
                <span className="rx-stage-emoji">{p.emoji}</span>
                <span className="rx-stage-mood">{p.mood}</span>
                <span className="rx-stage-phase">{p.phase}</span>
                <p>“{p.note}”</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 PROBLEM (dark numbered list) ── */}
      <section className="rx-problem">
        <div className="container">
          <Kicker n="07">Problem</Kicker>
          <Reveal as="p" className="rx-problem-lead">{project.challenge}</Reveal>
          <div className="rx-plist">
            {problems.map((p, i) => (
              <Reveal className="rx-prow" key={p.t} delay={i * 80}>
                <span className="rx-prow-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 SOLUTION (bento) ── */}
      <section className="rx-sec container">
        <Kicker n="08">Solution</Kicker>
        <Reveal as="p" className="rx-intro">{project.solution}</Reveal>
        <div className="rx-bento">
          {solutions.map((s, i) => (
            <Reveal className={`rx-bento-cell ${s.big ? 'is-big' : ''}`} key={s.t} delay={i * 90}>
              <span className="rx-bento-icon">{s.icon}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 09 IA & FLOW (blueprint viewer) ── */}
      <section className="rx-sec container">
        <Kicker n="09">IA &amp; User Flow</Kicker>
        <Reveal className="rx-seg">
          <button className={flow === 'ia' ? 'is-on' : ''} onClick={() => setFlow('ia')}>Information Architecture</button>
          <button className={flow === 'flow' ? 'is-on' : ''} onClick={() => setFlow('flow')}>User Flow</button>
        </Reveal>
        <Reveal className="rx-blueprint">
          <img src={flow === 'ia' ? iaUrl : flowUrl} alt={flow === 'ia' ? 'Information architecture' : 'User flow'} />
        </Reveal>
      </section>

      {/* ── 10 DESIGN SYSTEM (specimen bento) ── */}
      <section className="rx-sec container">
        <Kicker n="10">Design System</Kicker>
        <div className="rx-ds">
          <Reveal className="rx-ds-type">
            <span className="rx-ds-aa">Aa</span>
            <div>
              <h3>Switzer</h3>
              <p>Geometric grotesk for a calm, confident voice across the product.</p>
            </div>
          </Reveal>
          <Reveal className="rx-ds-colors" delay={80}>
            {dsColors.map((c) => (
              <span className="rx-ds-swatch" key={c.n} style={{ background: c.hex }}>
                <em style={{ color: c.hex === '#FFFFFF' || c.hex === '#BFD7F5' ? '#111' : '#fff' }}>
                  {c.n}<br />{c.hex}
                </em>
              </span>
            ))}
          </Reveal>
          <Reveal className="rx-ds-comp" delay={140}>
            <button className="rx-ds-btn rx-ds-btn--p">Primary</button>
            <button className="rx-ds-btn">Secondary</button>
            <span className="rx-ds-tab"><i className="is-on">Tab</i><i>Tab</i></span>
            <span className="rx-ds-input">Search…</span>
          </Reveal>
        </div>
      </section>

      {/* ── 11 WIREFRAMES (low/high toggle gallery) ── */}
      <section className="rx-sec container">
        <Kicker n="11">Low → High Fidelity</Kicker>
        <Reveal className="rx-seg rx-seg--center">
          <button className={fi === 'low' ? 'is-on' : ''} onClick={() => setFi('low')}>Low-fi</button>
          <button className={fi === 'high' ? 'is-on' : ''} onClick={() => setFi('high')}>High-fi</button>
        </Reveal>
        <div className="rx-wires">
          {wires.map((w, i) => (
            <Reveal className="rx-phone" key={i} delay={i * 90}>
              <img src={fi === 'low' ? w.low : w.high} alt="" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── RESULTS (accent band) ── */}
      <section className="rx-results">
        <div className="container">
          <Reveal as="span" className="rx-results-eye">The outcome</Reveal>
          <div className="rx-results-grid">
            {project.results.map((r, i) => (
              <Reveal className="rx-result" key={r.label} delay={i * 90}>
                <b><CountUp value={r.value} /></b>
                <span>{r.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT ── */}
      <section className="rx-next container">
        <Reveal>
          <Link to="/project2" className="rx-next-link">
            <span>Next project</span>
            <b>Lumen — Mental Health App</b>
            <i>→</i>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
