import { Link, useParams } from 'react-router-dom'
import { getProject, projects } from '../data/projects.js'
import Reveal from '../components/Reveal.jsx'
import Scrollspy from '../components/Scrollspy.jsx'
import MailCard from '../components/MailCard.jsx'
import ResearchChat from '../components/ResearchChat.jsx'
import UserPersona from '../components/UserPersona.jsx'
import UserJourney from '../components/UserJourney.jsx'
import UserJourneyV2 from '../components/UserJourneyV2.jsx'
import UserJourneyV3 from '../components/UserJourneyV3.jsx'
import UserJourneyV4 from '../components/UserJourneyV4.jsx'
import IssueCards from '../components/IssueCards.jsx'
import DiagramTabs from '../components/DiagramTabs.jsx'
import StyleGuide from '../components/StyleGuide.jsx'
import WireframeMorph from '../components/WireframeMorph.jsx'
import ItineraryShowcase from '../components/ItineraryShowcase.jsx'
import DesignSystemV2 from '../components/DesignSystemV2.jsx'
import AffinityMap from '../components/AffinityMap.jsx'
import TravelHero from '../components/TravelHero.jsx'
import TravelHeroV2 from '../components/TravelHeroV2.jsx'
import IdeationWorkshop from '../components/IdeationWorkshop.jsx'

// Diagrams are loaded from this project's public folder — drop SVGs into
// /public/projects/project1/diagram/{information-architecture,userflow}/
const diagramTabs = [
  { label: 'Information Architecture', src: '/projects/project1/diagram/information-architecture/project1_ia.svg' },
  { label: 'User Flow', src: '/projects/project1/diagram/userflow/project1_userflow1.svg' },
]

const problemCards = [
  {
    label: 'Fragmented Information',
    text: 'Travelers rely on disconnected sources — email, SMS, PDFs and chats — to find their booking details, making it slow and stressful.',
    name: 'Priya Nair',
    role: 'Solo traveler',
    avatar: '/avatars/problem-user-1.png',
  },
  {
    label: 'Uncertainty During Travel',
    text: 'Without a clear view of what’s next, travelers second-guess schedules and re-check details over and over while on the move.',
    name: 'Meera Joshi',
    role: 'Weekend tripper',
    avatar: '/avatars/problem-user-2.png',
  },
  {
    label: 'Poor Access On The Go',
    text: 'Critical trip info is hard to reach quickly — especially offline — leaving travelers unprepared at the moments they need it most.',
    name: 'Arjun Rao',
    role: 'Family planner',
    avatar: '/avatars/problem-user-3.png',
  },
]

const solutionCards = [
  {
    label: 'One Unified Hub',
    text: 'Every booking, document and itinerary lives in a single place, so travelers always know exactly where to look.',
    name: 'Sara Lee',
    role: 'Frequent flyer',
    avatar: '/avatars/solution-user-1.png',
  },
  {
    label: 'Clear Daily Plan',
    text: 'A simple timeline of what’s happening next keeps travelers confident and oriented throughout the whole trip.',
    name: 'Emma Cole',
    role: 'Backpacker',
    avatar: '/avatars/solution-user-2.png',
  },
  {
    label: 'Offline-Ready Access',
    text: 'Key details are cached for instant, offline access — ready the moment they’re needed, with no signal required.',
    name: 'Lily Brooks',
    role: 'City explorer',
    avatar: '/avatars/solution-user-3.png',
  },
]

// Build the 13 case-study sections from the project data.
function buildSections(project) {
  const [, g1] = project.gallery
  const img = (src) => <img className="spy-img" src={src} alt="" loading="lazy" />

  return [
    {
      id: 'overview',
      label: 'Overview',
      body: <p>{project.overview}</p>,
    },
    {
      id: 'client-requirement',
      label: 'Client Requirement',
      body: <MailCard />,
    },
    {
      id: 'research',
      label: 'Research',
      body: (
        <>
          <p>
            To shape the post-booking experience, I ran two rounds of interviews — one
            with the MLMT product owner, and one with the travelers who use the app.
          </p>
          <ResearchChat />
        </>
      ),
    },
    {
      id: 'user-persona',
      label: 'User Persona',
      body: (
        <>
          <p>
            Synthesizing the interviews produced two primary personas — the family planner
            juggling logistics for everyone, and the spontaneous solo traveler living out
            of her phone. Every design choice was weighed against both.
          </p>
          <UserPersona />
        </>
      ),
    },
    {
      id: 'affinity-map',
      label: 'Affinity Map',
      body: (
        <>
          <p>
            We grouped hundreds of observations into themes, surfacing the patterns that
            mattered most: clarity of value, speed to action, and proof.
          </p>
          {img(g1)}
          <AffinityMap />
        </>
      ),
    },
    {
      id: 'user-journey',
      label: 'User Journey',
      body: (
        <>
          <p>
            Mapping the journey from booking to return surfaced exactly where confidence
            dips — and where a single source of truth would help travelers most.
          </p>
          <UserJourney />
          <UserJourneyV2 />
          <UserJourneyV3 />
          <UserJourneyV4 />
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
          <IdeationWorkshop />
        </>
      ),
    },
    {
      id: 'diagram',
      label: 'Diagram',
      body: (
        <>
          <p>
            We mapped the structure and the flows — how content is organised, and how users
            move through it to reach their goal in as few steps as possible.
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
            A modular system of tokens, components and patterns gives the team a consistent,
            flexible toolkit — so new pages ship fast and on-brand without a designer in the loop.
          </p>
          <StyleGuide />
          <DesignSystemV2 />
        </>
      ),
    },
    {
      id: 'high-fidelity-wireframes',
      label: 'High Fidelity Wireframes',
      body: (
        <>
          <p>
            High-fidelity wireframes brought the system to life — each screen resolves
            from a mid-fidelity layout into the final interface as you scroll.
          </p>
          <WireframeMorph project="project1" theme="dark" />
        </>
      ),
    },
    {
      id: 'final-screens',
      label: 'Final Screens',
      body: (
        <>
          <p>
            The final screens deliver on the brief: clear, fast and confident — with motion
            used to guide attention, not decorate it.
          </p>
          <ItineraryShowcase
            pinned
            image="/screens/itinearydetail_pageui.png"
            notes={[]}
            eyebrow=""
            title=""
            sides={[
              {
                image: '/screens/final-left.png',
                title: 'Home & Discovery',
                desc: 'A calm landing that surfaces the next trip and quick actions first.',
              },
              {
                image: '/screens/final-right.png',
                title: 'Booking & Payment',
                desc: 'A focused checkout with clear pricing and one confident CTA.',
              },
            ]}
          />
        </>
      ),
    },
  ]
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) {
    return (
      <main className="pd">
        <div className="container pd-missing">
          <h1>Project not found</h1>
          <Link to="/" className="link-arrow">← Back to home</Link>
        </div>
      </main>
    )
  }

  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]
  const sections = buildSections(project)

  return (
    <main className="pd">
      {/* Storytelling hero — story copy left, chaos→dashboard animation right */}
      <section className="pd-hero pds">
        <div className="container pds-grid">
          <div className="pds-left">
            <Reveal>
              <Link to="/#work" className="pd-back">← All projects</Link>
            </Reveal>
            <Reveal className="pds-logo" delay={60}>
              <span className="pds-logo-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path d="M12 2l2.6 6.8L21 11l-6.4 2.2L12 22l-2.6-8.8L3 11l6.4-2.2z" fill="currentColor" />
                </svg>
              </span>
              <b>mlmt</b>
            </Reveal>
            <Reveal as="h1" className="pds-title" delay={120}>
              {project.title}
            </Reveal>
            <Reveal as="p" className="pds-desc" delay={180}>
              {project.intro}
            </Reveal>
            <Reveal className="pds-facts" delay={220}>
              <div className="pds-fact">
                <span>Role</span>
                <b>{project.role}</b>
              </div>
              <div className="pds-fact">
                <span>Duration</span>
                <b>{project.year}</b>
              </div>
            </Reveal>
            <Reveal className="pds-actions" delay={280}>
              <a href="#overview" className="pds-cta">
                Explore the case study
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </Reveal>
          </div>

          <div className="pds-right">
            <TravelHero />
          </div>
        </div>
      </section>

      {/* Hero — version 2: character reacts to notifications, then the dashboard */}
      <TravelHeroV2 project={project} />

      {/* Scrollspy case-study sections */}
      <Scrollspy sections={sections} />

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
          <Link to={`/project/${next.slug}`} className="pd-next-link">
            <span className="pd-next-label">Next project</span>
            <span className="pd-next-title">{next.title}</span>
            <span className="pd-next-arrow">→</span>
          </Link>
        </Reveal>
      </section>
    </main>
  )
}
