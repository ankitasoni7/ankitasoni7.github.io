import { Link } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import Reveal from '../components/Reveal.jsx'
import Scrollspy from '../components/Scrollspy.jsx'
import MailCard from '../components/MailCard.jsx'
import ResearchChat from '../components/ResearchChat.jsx'
import UserPersona from '../components/UserPersona.jsx'
import UserJourneyV3 from '../components/UserJourneyV3.jsx'
import JourneyCurve from '../components/JourneyCurve.jsx'
import IssueCards from '../components/IssueCards.jsx'
import DiagramTabs from '../components/DiagramTabs.jsx'
import StyleGuide from '../components/StyleGuide.jsx'
import WireframeMorph from '../components/WireframeMorph.jsx'
import IterationLesson from '../components/IterationLesson.jsx'
import ExplorationBoard from '../components/ExplorationBoard.jsx'
import ItineraryShowcase from '../components/ItineraryShowcase.jsx'
import SideScreens from '../components/SideScreens.jsx'
import NextProject from '../components/NextProject.jsx'
import DesignSystemV2 from '../components/DesignSystemV2.jsx'
import AffinityMap from '../components/AffinityMap.jsx'
import TravelHeroV2 from '../components/TravelHeroV2.jsx'
import IdeationWorkshop from '../components/IdeationWorkshop.jsx'

// Diagrams are loaded from this project's public folder — drop SVGs into
// /public/projects/project1/diagram/{information-architecture,userflow}/
const diagramTabs = [
  { label: 'Information Architecture', src: '/projects/project1/diagram/information-architecture/project1_ia.svg' },
  { label: 'User Flow', src: '/projects/project1/diagram/userflow/project1_userflow1.svg' },
]

// Home-screen features — revealed one by one, alternating sides, as the
// screen scrolls inside the large phone.
const homeFeatures = [
  {
    side: 'right', top: '4%',
    title: 'Flight at a glance',
    text: 'Live status, gate and boarding time sit at the top of the card — the boarding pass is one tap away.',
  },
  {
    side: 'left', top: '20%',
    title: 'Check-in without hunting',
    text: 'The property, arrival window and voucher are grouped together, so nothing has to be searched for on arrival.',
  },
  {
    side: 'right', top: '37%',
    title: 'Activities you can scan',
    text: 'Filter tags, a photo and a rating per card make choosing what to do a quick visual decision.',
  },
  {
    side: 'left', top: '54%',
    title: 'Add your own plans',
    text: 'Auto-suggested places and simple time pickers keep the form to a few taps.',
  },
  {
    side: 'right', top: '70%',
    title: 'Dinner, decided fast',
    text: 'Availability, a menu preview and reviews sit side by side so a table can be picked in seconds.',
  },
  {
    side: 'left', top: '86%',
    title: 'Everything for the stay',
    text: 'Room key, services and hotel details stay in one place for the length of the trip.',
  },
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
          <JourneyCurve />
          <UserJourneyV3 />
        </>
      ),
    },
    {
      id: 'problem',
      label: 'Problem',
      body: (
        <>
          <p>{project.challenge}</p>
          <IssueCards items={problemCards} variant="dark" stacked />
        </>
      ),
    },
    {
      id: 'solution',
      label: 'Solution',
      body: (
        <>
          <p>{project.solution}</p>
          <IssueCards items={solutionCards} stacked />
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
      id: 'design-thinking',
      label: 'Iteration Lesson: Combating the “Everything is Important” Trap',
      body: (
        <>
          <p>
            The first flight card carried every fact we had. It was accurate, and it was
            unusable — so the second pass asked a harder question: what does a traveller
            need <em>on the day</em>, and what can wait behind a tap?
          </p>
          <IterationLesson />
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
      id: 'information-hierarchy',
      label: 'Design Thinking Process',
      body: <ExplorationBoard />,
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

          {/* Stage 1 — the home screen scrolls inside the large phone while
              each feature card lights up on its own side */}
          <ItineraryShowcase
            pinned
            eyebrow="The Home Screen"
            title="The whole trip in one scroll"
            image="/screens/itinearydetail_pageui.png"
            notes={homeFeatures}
          />

          {/* Stage 2 — the two supporting screens */}
          <SideScreens
            eyebrow="Supporting screens"
            title="Where the journey continues"
            items={[
              {
                image: '/screens/final-left.png',
                title: 'Flight Details',
                desc: 'The whole journey on one screen, in the order a traveller needs it.',
                features: [
                  'Route and times lead the hierarchy',
                  'Gate, terminal and seat grouped as one block',
                  'Boarding pass reachable without leaving the screen',
                  'Status shown in colour, not just text',
                ],
              },
              {
                image: '/screens/final-right.png',
                title: 'Hotel Details',
                desc: 'Stay information ordered around what gets used, and when.',
                features: [
                  'Photo and rating anchor the card',
                  'Check-in and check-out as one time range',
                  'Amenities reduced to icons',
                  'Room key kept within thumb reach',
                ],
              },
            ]}
          />
        </>
      ),
    },
  ]
}

export default function ProjectDetailMLMT() {
  const project = getProject('kora')

  if (!project) {
    return (
      <main className="pd pd--mlmt">
        <div className="container pd-missing">
          <h1>Project not found</h1>
          <Link to="/" className="link-arrow">← Back to home</Link>
        </div>
      </main>
    )
  }

  const sections = buildSections(project)

  return (
    <main className="pd pd--mlmt">
      {/* Hero — version 2: character reacts to notifications, then the dashboard */}
      <TravelHeroV2 project={project} />

      {/* Summary — the block that actually gets read */}
      <section className="pd-summary container">
        <Reveal className="pds-grid-4">
          {[
            ['Role', 'Lead Product Designer', 'Research → IA → UI → handoff'],
            ['Team', '1 designer, 3 engineers', 'Product owner + QA'],
            ['Timeline', '10 weeks', '2025 · Discovery to handoff'],
            ['Platform', 'iOS & Android', 'Native app, design system'],
          ].map(([k, v, sub]) => (
            <div className="pds-col" key={k}>
              <span className="pds-col-k">{k}</span>
              <b className="pds-col-v">{v}</b>
              <span className="pds-col-sub">{sub}</span>
            </div>
          ))}
        </Reveal>

        <Reveal as="p" className="pd-summary-outcome" delay={120}>
          MLMT’s travellers had their bookings confirmed but their trips scattered across
          email, PDFs and chat threads. I designed a single post-booking home screen that
          collects every flight, transfer, stay and activity in one scroll — cutting the time
          to find a live travel detail from around 40 seconds to under 10.
        </Reveal>
      </section>

      {/* Scrollspy case-study sections */}
      <Scrollspy sections={sections} />

      {/* Outcome */}
      <section className="pd-section container">
        <Reveal as="span" className="pd-eyebrow">Outcome</Reveal>
        <Reveal className="pd-outcome" delay={80}>
          <p className="pd-outcome-lead">
            In usability testing, <strong>5&nbsp;of&nbsp;5 participants</strong> found their
            transfer details in <strong>under 10 seconds</strong> — versus an average of
            <strong> 40 seconds</strong> switching between email and WhatsApp.
          </p>
          <div className="pd-outcome-meta">
            <div>
              <span>Method</span>
              <b>Moderated usability test</b>
            </div>
            <div>
              <span>Participants</span>
              <b>5 travellers</b>
            </div>
            <div>
              <span>Task</span>
              <b>Find today’s airport transfer</b>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Next project */}
      <NextProject
        to="/project3"
        title="Kaatkut"
        category="Food Tech · Marketplace"
        tag="UI/UX · 2025"
        image="/projects/home-v2/kaatkut.png"
      />

    </main>
  )
}
