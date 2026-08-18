import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Scrollspy from '../components/Scrollspy.jsx'
import MailCard from '../components/MailCard.jsx'
import ResearchChat from '../components/ResearchChat.jsx'
import UserPersona from '../components/UserPersona.jsx'
import UserJourneyV3 from '../components/UserJourneyV3.jsx'
import IssueCards from '../components/IssueCards.jsx'
import DiagramTabs from '../components/DiagramTabs.jsx'
import StyleGuide from '../components/StyleGuide.jsx'
import WireframeMorph from '../components/WireframeMorph.jsx'
import MacbookFrame from '../components/MacbookFrame.jsx'
import WebScreens from '../components/WebScreens.jsx'
import ChapterScreens from '../components/ChapterScreens.jsx'

// Diagrams load from this project's public folder —
// /public/projects/project3/diagram/{information-architecture,userflow}/
const diagramTabs = [
  { label: 'Information Architecture', src: '/projects/project3/diagram/information-architecture/project3_ia.svg' },
  { label: 'User Flow', src: '/projects/project3/diagram/userflow/kaatkut_userflow1.svg' },
]

// ── Project ──────────────────────────────────────────────────────────────
const project = {
  title: 'Kaatkut',
  intro:
    'An at-home grooming marketplace that brings trusted salon professionals to your door — pick a service, choose a verified pro, and book a slot in under a minute.',
  year: '2025',
  role: 'Lead Product Designer',
  services: ['UX Research', 'UI/UX Design', 'Design System'],
  cover: 'https://picsum.photos/seed/kaatkut-cover/1600/900',
  gallery: [
    'https://picsum.photos/seed/kaatkut-final/1200/800',
    'https://picsum.photos/seed/kaatkut-affinity/1200/800',
  ],
  overview:
    'Booking a haircut or grooming service at home should feel as simple as ordering food. Kaatkut lets people browse services, compare verified professionals with real ratings and transparent pricing, reserve a convenient slot, track the pro on the way, pay in-app, and rebook their favourite person in a tap — all in one calm, trustworthy flow.',
  challenge:
    'At-home grooming is booked over scattered WhatsApp chats and phone calls. Prices are negotiated on the spot, professionals are unverified, and no-shows are common — so customers never quite trust who will turn up, or what they will pay.',
  solution:
    'We led with trust and clarity: verified pros with real reviews, upfront fixed pricing, a one-minute booking flow, live arrival tracking, and one-tap rebooking of a favourite professional — turning an anxious, uncertain errand into a dependable ritual.',
  results: [
    { value: '55 sec', label: 'Avg time to book' },
    { value: '+48%', label: 'Repeat bookings' },
    { value: '4.8★', label: 'App store rating' },
  ],
}

// ── Problem / Solution cards ─────────────────────────────────────────────
const problemCards = [
  {
    label: 'No Trust In Who Shows Up',
    text: 'Professionals are unverified — customers can’t see real ratings, skills or history before someone arrives at their home.',
    name: 'Riya Sharma',
    role: 'Working professional',
    avatar: '/avatars/problem-user-1.png',
  },
  {
    label: 'Unclear, Shifting Prices',
    text: 'Rates are negotiated on the spot over chat, so people never know the real cost until the service is done.',
    name: 'Kabir Mehta',
    role: 'Busy dad',
    avatar: '/avatars/problem-user-2.png',
  },
  {
    label: 'No-Shows & Silence',
    text: 'Without live updates, customers wait with no idea whether the professional is coming, late, or has cancelled.',
    name: 'Ananya Desai',
    role: 'New mother',
    avatar: '/avatars/problem-user-3.png',
  },
]

const solutionCards = [
  {
    label: 'Verified Professionals',
    text: 'Every pro is background-checked with real ratings, skills and history shown upfront — so customers book with confidence.',
    name: 'Sara Lee',
    role: 'Frequent user',
    avatar: '/avatars/solution-user-1.png',
  },
  {
    label: 'Upfront Fixed Pricing',
    text: 'Transparent, fixed prices per service — what you see at booking is exactly what you pay, no negotiation.',
    name: 'Emma Cole',
    role: 'Student',
    avatar: '/avatars/solution-user-2.png',
  },
  {
    label: 'Live Tracking & Rebook',
    text: 'Track your pro on the way in real time, and rebook a favourite professional in a single tap next time.',
    name: 'Lily Brooks',
    role: 'City dweller',
    avatar: '/avatars/solution-user-3.png',
  },
]

// ── Research interviews ──────────────────────────────────────────────────
const chats = [
  {
    title: 'Interview · Salon Owner',
    who: 'owner',
    messages: [
      { from: 'me', text: 'What makes at-home grooming hard to run today?' },
      { from: 'them', text: 'Trust and scheduling. Customers worry who’s coming, and pros waste time on last-minute cancellations.' },
      { from: 'me', text: 'What builds trust fastest for a first booking?' },
      { from: 'them', text: 'Real reviews, a clear price, and knowing the professional is verified.' },
      { from: 'me', text: 'What keeps customers coming back?' },
      { from: 'them', text: 'The same great person, every time — make rebooking effortless.' },
    ],
  },
  {
    title: 'Interview · Customers',
    who: 'traveler',
    messages: [
      { from: 'me', text: 'How do you book grooming at home now?' },
      { from: 'them', text: 'WhatsApp and calls. It’s messy, and I never know the final price.' },
      { from: 'me', text: 'What worries you most before someone arrives?' },
      { from: 'them', text: 'Whether they’re actually coming, and if they’re any good.' },
      { from: 'me', text: 'What would make you loyal to one app?' },
      { from: 'them', text: 'Fixed prices, tracking, and booking the same person again in one tap.' },
    ],
  },
]

// ── Personas ─────────────────────────────────────────────────────────────
const personas = [
  {
    avatar: 'female',
    name: 'Riya Sharma',
    age: '28 Years',
    location: 'Mumbai',
    quote: 'I just want a trusted stylist at home without haggling over price every single time.',
    bio: 'Riya is a working professional with little free time. She wants a fast, reliable way to book a verified stylist at home, with prices she can see before confirming.',
    needs: [
      { icon: 'search', text: 'Verified pros with real reviews' },
      { icon: 'calendar', text: 'A slot that fits a tight schedule' },
      { icon: 'star', text: 'Consistent, quality service' },
    ],
    frustrations: [
      { icon: 'alert', text: 'Unknown people at her door' },
      { icon: 'target', text: 'Prices that change on the spot' },
      { icon: 'offline', text: 'No updates when running late' },
    ],
  },
  {
    avatar: 'male',
    name: 'Kabir Mehta',
    age: '35 Years',
    location: 'Pune',
    quote: 'On a busy day I won’t chase anyone — I need to book, track, and be done.',
    bio: 'Kabir juggles work and family and books grooming for the whole household. He needs transparent pricing, live tracking and one-tap rebooking of pros he already trusts.',
    needs: [
      { icon: 'home', text: 'One place to book for the family' },
      { icon: 'pin', text: 'Live tracking of the professional' },
      { icon: 'refresh', text: 'One-tap rebooking of favourites' },
    ],
    frustrations: [
      { icon: 'search', text: 'Hunting for a reliable pro again' },
      { icon: 'mail', text: 'Coordinating over scattered chats' },
      { icon: 'alert', text: 'No-shows with no warning' },
    ],
  },
]

// ── Journey (v3 step-flow) ───────────────────────────────────────────────
const journeyPhases = [
  {
    phase: 'Discover & Search',
    emoji: '🙂',
    mood: 'Curious',
    tone: 'good',
    actions: ['Browses services', 'Compares nearby pros'],
    goal: 'Find a trusted professional nearby.',
    thought: '“Can I trust whoever shows up?”',
    pain: 'Profiles feel unverified and thin.',
  },
  {
    phase: 'Booking a Slot',
    emoji: '😟',
    mood: 'Unsure',
    tone: 'low',
    actions: ['Picks a time', 'Reviews the price'],
    goal: 'Book without any surprises.',
    thought: '“Will the price change later?”',
    pain: 'Hidden charges and vague totals.',
  },
  {
    phase: 'The Appointment',
    emoji: '😣',
    mood: 'Anxious',
    tone: 'bad',
    actions: ['Tracks arrival', 'Waits for the pro'],
    goal: 'Know exactly when they’ll arrive.',
    thought: '“Are they even coming?”',
    pain: 'No live updates, risk of no-shows.',
  },
  {
    phase: 'After Service',
    emoji: '😊',
    mood: 'Satisfied',
    tone: 'good',
    actions: ['Pays & rates', 'Rebooks the pro'],
    goal: 'Rebook the same pro easily.',
    thought: '“I’d love the same person again.”',
    pain: 'Hard to find that pro next time.',
  },
]

// ── Client brief (mail) ──────────────────────────────────────────────────
const mail = {
  barTitle: 'Inbox — Client',
  avatar: 'KK',
  sender: 'Kaatkut',
  date: 'Jun 24, 2026',
  email: 'product@kaatkut.app',
  to: 'To: hello@creativebrains.design',
  subject: 'Kaatkut — Project Brief',
  intro:
    'Kaatkut brings salon and grooming professionals to people’s homes. Our pilot has demand, but bookings still happen over chat and trust is low — customers hesitate, and repeat rates are weak.',
  subhead: 'What We Aim For — Our Core Objectives',
  intro2:
    'We believe uncertainty around trust and pricing is the biggest blocker, but we’re unsure which moments break confidence most.',
  askLabel: 'We would like to better understand:',
  bullets: [
    'Why customers hesitate before a first booking',
    'What makes pricing feel trustworthy',
    'How to reassure people during the wait',
    'What would drive repeat bookings',
  ],
  body2:
    'Our goal is a fast, dependable booking ritual people trust enough to use again and again.',
  body3:
    'We are looking for recommendations grounded in user research and design exploration.',
  signName: 'Head of Product',
  signOrg: 'Kaatkut',
}

// ── Sections ─────────────────────────────────────────────────────────────
function buildSections() {
  const [, g1] = project.gallery
  const img = (src) => <img className="spy-img" src={src} alt="" loading="lazy" />

  return [
    { id: 'overview', label: 'Overview', body: <p>{project.overview}</p> },
    { id: 'client-requirement', label: 'Client Requirement', body: <MailCard data={mail} /> },
    {
      id: 'research',
      label: 'Research',
      body: (
        <>
          <p>
            To shape a trustworthy booking experience, I ran two rounds of interviews — one
            with a salon owner running at-home services, and one with the customers who book them.
          </p>
          <ResearchChat chats={chats} />
        </>
      ),
    },
    {
      id: 'user-persona',
      label: 'User Persona',
      body: (
        <>
          <p>
            Two primary personas emerged — a time-poor professional who wants a verified stylist
            with clear pricing, and a busy parent who books for the household and rebooks favourites.
          </p>
          <UserPersona personas={personas} />
        </>
      ),
    },
    {
      id: 'affinity-map',
      label: 'Affinity Map',
      body: (
        <>
          <p>
            Hundreds of quotes clustered into a few clear themes: prove trust early, make pricing
            obvious, reassure during the wait, and make rebooking effortless.
          </p>
          {img(g1)}
        </>
      ),
    },
    {
      id: 'user-journey',
      label: 'User Journey',
      body: (
        <>
          <p>
            Mapping the journey from discovery to after-service showed exactly where confidence
            dips — and where trust, clarity and live updates matter most.
          </p>
          <UserJourneyV3 phases={journeyPhases} />
        </>
      ),
    },
    {
      id: 'problem',
      label: 'Problem',
      body: (
        <>
          <p>{project.challenge}</p>
          <IssueCards items={problemCards} variant="dark" />
        </>
      ),
    },
    {
      id: 'solution',
      label: 'Solution',
      body: (
        <>
          <p>{project.solution}</p>
          <IssueCards items={solutionCards} />
        </>
      ),
    },
    {
      id: 'diagram',
      label: 'Diagram',
      body: (
        <>
          <p>
            We mapped the structure and the flows — how services are organised, and how a customer
            moves from search to a confirmed booking in as few steps as possible.
          </p>
          <DiagramTabs tabs={diagramTabs} />
        </>
      ),
    },
    {
      id: 'design-system',
      label: 'Design System',
      body: (
        <>
          <p>
            A clean, accessible system of tokens, components and patterns keeps Kaatkut consistent
            and trustworthy — and lets the team ship new screens without losing the tone.
          </p>
          <StyleGuide />
        </>
      ),
    },
    {
      id: 'high-fidelity-wireframes',
      label: 'High Fidelity Wireframes',
      body: (
        <>
          <p>
            High-fidelity wireframes brought the system to life — each screen resolves from a
            mid-fidelity layout into the final interface as you scroll.
          </p>
          <WireframeMorph project="project3" theme="light" />
        </>
      ),
    },
    {
      id: 'final-screens',
      label: 'Final Screens',
      body: (
        <>
          <p>
            The final screens deliver on the brief: trusted, fast and clear — with motion used to
            reassure and guide, never to distract.
          </p>
          <MacbookFrame
            image="/projects/project3/final-screens/desktop.png"
            label="Web store — browse, cart & checkout"
          />
          <WebScreens />
        </>
      ),
    },
  ]
}

export default function ProjectDetail3() {
  const sections = buildSections()

  return (
    <main className="pd">
      {/* Hero */}
      <section className="pd-hero">
        <div className="container">
          <Reveal>
            <Link to="/#work" className="pd-back">← All projects</Link>
          </Reveal>
          <Reveal as="h1" className="pd-title" delay={60}>
            {project.title}
          </Reveal>
          <Reveal as="p" className="pd-intro" delay={120}>
            {project.intro}
          </Reveal>

          <Reveal className="pd-meta" delay={180}>
            <div className="pd-meta-item">
              <span className="pd-meta-label">Year</span>
              <span className="pd-meta-value">{project.year}</span>
            </div>
            <div className="pd-meta-item">
              <span className="pd-meta-label">Role</span>
              <span className="pd-meta-value">{project.role}</span>
            </div>
            <div className="pd-meta-item">
              <span className="pd-meta-label">Services</span>
              <span className="pd-meta-value">{project.services.join(', ')}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cover image */}
      <Reveal className="pd-cover container">
        <img src={project.cover} alt={project.title} />
      </Reveal>

      {/* Scrollspy case-study sections */}
      <Scrollspy sections={sections} />

      {/* Final Screens — chapter-by-chapter reveal: paper cuts away, then each screen
          scrolls through the viewport 1:1 (full-width, needs its own sticky context) */}
      <ChapterScreens />

      {/* Results */}
      <section className="pd-section container">
        <Reveal as="span" className="pd-eyebrow">Results</Reveal>
        <div className="pd-results">
          {project.results.map((r, i) => (
            <Reveal key={r.label} className="pd-result" delay={i * 100}>
              <span className="pd-result-value">{r.value}</span>
              <span className="pd-result-label">{r.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="pd-next container">
        <Reveal>
          <Link to="/project/kora" className="pd-next-link">
            <span className="pd-next-label">Next project</span>
            <span className="pd-next-title">My Last Minute Trip</span>
            <span className="pd-next-arrow">→</span>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
