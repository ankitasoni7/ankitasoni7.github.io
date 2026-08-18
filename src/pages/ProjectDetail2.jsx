import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Scrollspy from '../components/Scrollspy.jsx'
import MailCard from '../components/MailCard.jsx'
import ResearchChat from '../components/ResearchChat.jsx'
import UserPersona from '../components/UserPersona.jsx'
import UserJourney from '../components/UserJourney.jsx'
import IssueCards from '../components/IssueCards.jsx'
import DiagramTabs from '../components/DiagramTabs.jsx'
import StyleGuide from '../components/StyleGuide.jsx'
import WireframeMorph from '../components/WireframeMorph.jsx'
import ItineraryShowcase from '../components/ItineraryShowcase.jsx'

// Diagrams load from this project's public folder —
// /public/projects/project2/diagram/{information-architecture,userflow}/
const diagramTabs = [
  { label: 'Information Architecture', src: '/projects/project2/diagram/information-architecture/project2_ia.svg' },
  { label: 'User Flow', src: '/projects/project2/diagram/userflow/project2_userflow1.svg' },
]

// ── Project ──────────────────────────────────────────────────────────────
const project = {
  title: 'Shifa Mental Health App',
  intro:
    'A calm daily companion that helps people check in with their mind, build small habits, and reach support before a hard day turns into a crisis.',
  year: '2025',
  role: 'Lead Product Designer',
  services: ['UX Research', 'UI/UX Design', 'Design System'],
  cover: 'https://picsum.photos/seed/lumen-cover/1600/900',
  gallery: [
    'https://picsum.photos/seed/lumen-final/1200/800',
    'https://picsum.photos/seed/lumen-affinity/1200/800',
  ],
  overview:
    'Mental healthcare should be accessible, private, and continuous. This app streamlines the entire care journey by helping users find the most suitable psychiatrist through a personalized assessment, book online consultations, securely share pre-session information, communicate with their doctor, and track prescribed medications and therapy tasks—all within a single platform.'
,
  challenge:
    'People in distress rarely open a “mental health app” in the moment they need it most. Existing tools feel clinical, demand long check-ins, and bury support behind menus — so they get abandoned within a week.',
  solution:
    'We led with a ten-second daily check-in, surfaced breathing and grounding one tap away, and kept a human — a coach or helpline — always reachable. The app rewards consistency gently, never with guilt, and turns scattered feelings into a trend people can actually see.',
  results: [
    { value: '2 min', label: 'Avg daily check-in' },
    { value: '+63%', label: '7-day retention' },
    { value: '4.8★', label: 'App store rating' },
  ],
}

// ── Problem / Solution cards ─────────────────────────────────────────────
const problemCards = [
  {
    label: 'Clinical & Cold',
    text: 'Apps feel like medical forms — long questionnaires that make an already heavy day heavier.',
    name: 'Noah Kim',
    role: 'Student',
    avatar: '/avatars/problem-user-1.png',
  },
  {
    label: 'Hidden Support',
    text: 'When things get hard, help is buried behind menus and sign-ups, so people give up before they reach it.',
    name: 'Aisha Khan',
    role: 'New parent',
    avatar: '/avatars/problem-user-2.png',
  },
  {
    label: 'Abandoned Fast',
    text: 'Without a quick, rewarding habit, motivation fades and the app is deleted within a week.',
    name: 'Leo Martins',
    role: 'Shift worker',
    avatar: '/avatars/problem-user-3.png',
  },
]

const solutionCards = [
  {
    label: 'Ten-Second Check-in',
    text: 'A single tap to log how you feel — no forms — building a habit that actually sticks.',
    name: 'Mia Chen',
    role: 'Designer',
    avatar: '/avatars/solution-user-1.png',
  },
  {
    label: 'Calm, One Tap Away',
    text: 'Breathing and grounding exercises are always one tap from home, ready the moment they’re needed.',
    name: 'Ethan Park',
    role: 'Engineer',
    avatar: '/avatars/solution-user-2.png',
  },
  {
    label: 'A Human, Always There',
    text: 'A coach or helpline stays reachable throughout, so no one faces a hard moment alone.',
    name: 'Sofia Reyes',
    role: 'Teacher',
    avatar: '/avatars/solution-user-3.png',
  },
]

// ── Research interviews ──────────────────────────────────────────────────
const chats = [
  {
    title: 'Interview · Clinician',
    who: 'owner',
    messages: [
      { from: 'me', text: 'What stops people from using mental-health apps when they need them most?' },
      { from: 'them', text: 'In the moment, opening an app feels like effort. They need something that takes seconds, not a session.' },
      { from: 'me', text: 'What signals matter clinically for early support?' },
      { from: 'them', text: 'Consistent low mood, sleep changes and withdrawal. A simple daily signal can flag these early.' },
      { from: 'me', text: 'How should the app handle a crisis moment?' },
      { from: 'them', text: 'Never gate it. A clear, immediate path to a human or helpline must always be visible.' },
    ],
  },
  {
    title: 'Interview · Users',
    who: 'traveler',
    messages: [
      { from: 'me', text: 'What do you wish a wellbeing app did differently?' },
      { from: 'them', text: 'Stop making me fill long forms. I just want to say “I’m okay” or “I’m not” and move on.' },
      { from: 'me', text: 'What actually helps on a hard day?' },
      { from: 'them', text: 'Breathing for a minute, and knowing someone is there if I need them.' },
      { from: 'me', text: 'What makes you stick with an app?' },
      { from: 'them', text: 'When it feels kind — small wins, and no guilt for missing a day.' },
    ],
  },
]

// ── Personas ─────────────────────────────────────────────────────────────
const personas = [
  {
    avatar: 'female',
    name: 'Hana Patel',
    age: '22 Years',
    location: 'Pune',
    quote: 'I don’t want a therapy session every day — I just want to check in and feel a little lighter.',
    bio: 'Hana is a university student managing exam stress and irregular sleep. She wants quick, judgment-free ways to notice her mood and calm down between classes, without committing to anything heavy.',
    needs: [
      { icon: 'smile', text: 'Feel checked-in without effort' },
      { icon: 'refresh', text: 'A gentle daily habit, not guilt' },
      { icon: 'star', text: 'Calm exercises she can trust' },
    ],
    frustrations: [
      { icon: 'alert', text: 'Long forms when she feels low' },
      { icon: 'target', text: 'Generic advice that ignores context' },
      { icon: 'offline', text: 'No quick help in the moment' },
    ],
  },
  {
    avatar: 'male',
    name: 'Daniel Cole',
    age: '34 Years',
    location: 'London',
    quote: 'On a bad day I won’t dig through menus — help has to be right there.',
    bio: 'Daniel works long shifts and struggles with low mood and isolation. He needs immediate, frictionless access to grounding tools and a real person, without clinical jargon or setup.',
    needs: [
      { icon: 'home', text: 'One calm place to land' },
      { icon: 'users', text: 'A human reachable any time' },
      { icon: 'smile', text: 'Small wins that keep him going' },
    ],
    frustrations: [
      { icon: 'search', text: 'Support hidden behind menus' },
      { icon: 'refresh', text: 'Losing streaks and motivation' },
      { icon: 'alert', text: 'Feeling judged for bad days' },
    ],
  },
]

// ── Journey ──────────────────────────────────────────────────────────────
const phases = [
  {
    phase: 'First Open',
    actions: ['Downloads after a hard week', 'Skips long onboarding'],
    goal: 'Feel safe and understood fast.',
    feeling: { emoji: '😟', mood: 'Hesitant', tone: 'low' },
    thoughts: ['“Is this going to be another form?”'],
    pains: ['Heavy onboarding', 'Clinical tone', 'Unclear value'],
  },
  {
    phase: 'Daily Check-in',
    actions: ['Taps a mood', 'Adds a quick note'],
    goal: 'Log feelings in seconds.',
    feeling: { emoji: '🙂', mood: 'Calmer', tone: 'good' },
    thoughts: ['“That was easy — and kind of nice.”'],
    pains: ['Forgetting to open', 'Reminders that don’t fit', 'Streak guilt'],
  },
  {
    phase: 'A Hard Day',
    actions: ['Opens breathing', 'Reaches a coach'],
    goal: 'Find calm and support now.',
    feeling: { emoji: '😣', mood: 'Overwhelmed', tone: 'bad' },
    thoughts: ['“I need this to work right now.”'],
    pains: ['Support buried', 'Slow to load', 'Feeling alone'],
  },
  {
    phase: 'Looking Back',
    actions: ['Views mood trend', 'Celebrates progress'],
    goal: 'See growth over time.',
    feeling: { emoji: '😊', mood: 'Hopeful', tone: 'good' },
    thoughts: ['“I can actually see I’m doing better.”'],
    pains: ['No visible progress', 'Data feels clinical', 'Hard to revisit'],
  },
]

// ── Client brief (mail) ──────────────────────────────────────────────────
const mail = {
  barTitle: 'Inbox — Client',
  avatar: 'SH',
  sender: 'Shifa Health',
  date: 'Jun 24, 2026',
  email: 'product@shifa.health',
  to: 'To: hello@creativebrains.design',
  subject: 'Shifa — Project Brief',
  intro:
    'Shifa helps people support their everyday mental wellbeing. Our clinical pilot works, but day-to-day engagement drops sharply after the first week, and we want to understand why.',
  subhead: 'What We Aim For — Our Core Objectives',
  intro2:
    'We believe the daily experience is too heavy and clinical, but we’re unsure which moments matter most to users.',
  askLabel: 'We would like to better understand:',
  bullets: [
    'What stops people from checking in daily',
    'How they cope in a difficult moment',
    'What support feels safe and reachable',
    'Opportunities to build a kinder habit loop',
  ],
  body2:
    'Our goal is a calm daily ritual that builds long-term wellbeing and keeps support one tap away.',
  body3:
    'We are looking for recommendations grounded in user research and design exploration.',
  signName: 'Head of Product',
  signOrg: 'Shifa Health',
}

// ── Showcase: callouts + a mental-health "Today" phone screen ─────────────
const showcaseNotes = [
  { side: 'right', top: '4%', title: 'Mood Check-in', text: 'A single tap logs how you feel — no forms, just a moment of honesty.' },
  { side: 'left', top: '21%', title: 'Breathing', text: 'Guided breathing and grounding, always one tap from home.' },
  { side: 'right', top: '38%', title: 'Guided Sessions', text: 'Short audio sessions for sleep, focus and calm.' },
  { side: 'left', top: '55%', title: 'Journal', text: 'Gentle prompts to reflect, kept private and simple.' },
  { side: 'right', top: '71%', title: 'Progress', text: 'Your mood over time, shown with warmth — never clinical.' },
  { side: 'left', top: '87%', title: 'Reach a Human', text: 'A coach or helpline stays reachable whenever you need it.' },
]

const photo = (seed) => `https://picsum.photos/seed/${seed}/400/240`

function MoodScreen() {
  return (
    <div className="iti" aria-hidden="true">
      <div className="iti-hero">
        <img src={photo('lumen-calm')} alt="" />
        <div className="iti-hero-cap">
          <strong>GOOD MORNING, SAM</strong>
          <span>Tuesday, 24 June</span>
        </div>
      </div>

      <div className="iti-date">🌤 &nbsp;How are you feeling today?</div>

      <div className="iti-card">
        <div className="iti-cat">Mood check-in</div>
        <div className="iti-tabs">
          <span>😞</span>
          <span>😕</span>
          <span>😐</span>
          <span className="is-on">🙂</span>
          <span>😄</span>
        </div>
      </div>

      <div className="iti-card">
        <div className="iti-time">2 min · Anytime</div>
        <div className="iti-cat">Breathing</div>
        <div className="iti-hotel">
          <img src={photo('lumen-breathe')} alt="" />
          <div>
            <strong>Box Breathing</strong>
            <span className="iti-dim">Calm your nervous system</span>
            <span className="iti-row">Tap to begin</span>
          </div>
        </div>
      </div>

      <div className="iti-card">
        <div className="iti-cat">Today’s session</div>
        <div className="iti-hotel">
          <img src={photo('lumen-sleep')} alt="" />
          <div>
            <strong>Calm before sleep</strong>
            <span className="iti-dim">Guided audio · 8 min</span>
            <span className="iti-row">Play</span>
          </div>
        </div>
      </div>

      <div className="iti-card">
        <div className="iti-cat">Journal</div>
        <div className="iti-search">✎ One small thing that went okay today…</div>
      </div>

      <div className="iti-card">
        <div className="iti-cat">This week</div>
        <div className="iti-transport">
          <ul className="iti-route">
            <li>🌱 Calmer 4 of 7 days</li>
            <li className="iti-dim">Sleep improving</li>
            <li className="iti-dim">3-day streak</li>
          </ul>
          <img className="iti-map" src={photo('lumen-trend')} alt="" />
        </div>
      </div>

      <div className="iti-card iti-card--add">
        <div className="iti-cat">Need to talk?</div>
        <button className="iti-add">💬 Talk to someone now</button>
      </div>
    </div>
  )
}

// ── Sections ─────────────────────────────────────────────────────────────
function buildSections() {
  const [g0, g1] = project.gallery
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
            To shape a kinder daily experience, I ran two rounds of interviews — one with a
            clinician guiding the product, and one with the people who’d use Shifa every day.
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
            Two primary personas emerged — a stressed student wanting quick, judgment-free
            check-ins, and a shift worker who needs immediate support on a hard day.
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
            Hundreds of quotes clustered into a few clear themes: keep it effortless, keep
            it kind, and never hide support when it matters most.
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
            Mapping the journey from first open to looking back showed exactly where
            confidence dips — and where a gentle nudge or a human helps most.
          </p>
          <UserJourney phases={phases} />
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
            We mapped how the daily ritual is structured and how someone moves from a hard
            moment to calm and support in as few steps as possible.
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
            A soft, accessible system of tokens, components and patterns keeps Shifa calm
            and consistent — and lets the team ship new screens without losing the tone.
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
          <WireframeMorph project="project2" theme="dark" />
        </>
      ),
    },
    {
      id: 'final-screens',
      label: 'Final Screens',
      body: (
        <>
          <p>
            The final screens feel calm, fast and kind — motion used to reassure, never to
            demand attention.
          </p>
          <img
            className="spy-img"
            src="/projects/project2/final-screens/final.png"
            alt=""
            loading="lazy"
            onError={(e) => { e.currentTarget.src = g0 }}
          />
        </>
      ),
    },
  ]
}

export default function ProjectDetail2() {
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

      {/* Showcase — auto-scrolling phone with annotation callouts */}
      <ItineraryShowcase
        eyebrow="The Daily Ritual"
        title="Everyday wellbeing, in one calm screen"
        topbar="Today"
        notes={showcaseNotes}
        screen={<MoodScreen />}
      />

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
