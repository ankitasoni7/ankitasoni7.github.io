import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProject } from '../data/projects.js'
import Reveal from '../components/Reveal.jsx'
import TravelHeroV2 from '../components/TravelHeroV2.jsx'
import ItineraryShowcase, { WmPhone } from '../components/ItineraryShowcase.jsx'
import PhoneDashboard from '../components/PhoneDashboard.jsx'
import NextProject from '../components/NextProject.jsx'

gsap.registerPlugin(ScrollTrigger)

/* Screens — the same assets the /mlmt case study uses */
const IMG = {
  home: '/screens/itinearydetail_pageui.png',
  itinerary: '/screens/itinearydetail_pageui.png',
  flight: '/screens/final-left.png',
  hotel: '/screens/final-right.png',
  upcoming: '/screens/itinearydetail_pageui_a.png',
  detail: '/screens/itinearydetail_pageui_b.png',
}

/* ── data ───────────────────────────────────────────────────────────── */

const meta = [
  ['Role', 'Lead Product Designer', 'Research → IA → UI → handoff'],
  ['Timeline', '10 weeks', 'Discovery to handoff'],
  ['Team', '1 Designer · 3 Engineers', 'Product owner + QA'],
  ['Platform', 'iOS & Android', 'Native · design system'],
  ['Tools', 'Figma', 'Prototyping · handoff'],
]

const tags = ['Research', 'UX Strategy', 'Information Architecture', 'Wireframing',
  'Interaction Design', 'UI Design', 'Prototyping', 'Developer Handoff']

const tldr = [
  ['The problem', 'A booked trip still lived in a dozen places — email, PDFs, SMS and provider apps. Finding one live detail meant hunting across all of them.'],
  ['My approach', 'Two rounds of interviews, affinity synthesis, then a time-based itinerary — pressure-tested against a single question: what’s next?'],
  ['The outcome', 'One post-booking home that gathers every flight, stay, transfer and activity into a single scroll — a design-phase benchmark cut finding a live detail from ~40s to under 10s.'],
]

const objectives = [
  ['Understand', 'Post-booking pain points once a trip is underway.'],
  ['Discover', 'How travelers actually manage their trip information today.'],
  ['Identify', 'What travelers need to know during a journey, and when.'],
  ['Explore', 'Opportunities beyond booking — one home for the whole trip.'],
]

const chats = [
  {
    av: 'M', tone: 'a', who: 'MLMT · Product Owner', role: 'How details reach the traveler today',
    msgs: [
      ['q', 'How are trip details delivered after booking?'],
      ['a', 'Through email, and in some cases SMS or third-party providers.'],
      ['q', 'What’s most commonly reported after booking?'],
      ['a', 'People struggle to find their details quickly when info is spread across platforms.'],
      ['q', 'Any centralized system for managing a trip?'],
      ['a', 'No — travelers manage it manually across separate tools.'],
    ],
  },
  {
    av: 'T', tone: 'b', who: 'Travelers', role: 'What the trip feels like from their side',
    msgs: [
      ['q', 'What’s hard during travel?'],
      ['a', 'Finding the right detail takes time — especially in a hurry or offline.'],
      ['q', 'What do you check most often on a trip?'],
      ['a', 'Flight status, hotel details, directions and weather.'],
      ['q', 'What would make travel easier?'],
      ['a', 'Having everything in one place so I don’t search across apps.'],
    ],
  },
]

const personas = [
  {
    ini: 'RV', name: 'Rahul Verma', type: 'Frequent business traveler · 25',
    quote: '“I just wanted to enjoy my trip, but I spent too much time figuring out where to find information.”',
    facts: [
      ['Goal', 'Move through a packed trip without stopping to figure out what’s next.'],
      ['Need', 'Instant access to the next thing and its essentials, no digging.'],
      ['Frustration', 'Re-opening emails and PDFs to confirm a gate or reference.'],
    ],
  },
  {
    ini: 'AS', name: 'Ananya Sharma', type: 'Leisure & planning-minded · 29',
    quote: '“I don’t want to dig through five different apps mid-trip — I just want everything in one place.”',
    facts: [
      ['Goal', 'Feel confident nothing important will slip through the cracks.'],
      ['Need', 'Clear chronological context and reassurance the plan is complete.'],
      ['Frustration', 'Piecing a day together from scattered confirmations and threads.'],
    ],
  },
]

const bothNeeds = [
  'One reliable source of trip information',
  'Faster access to upcoming activities',
  'Clear chronological context for the day',
  'Less switching between apps and sources',
  'Confidence that details won’t be missed',
]

const affinity = [
  ['01', 'Information scattered', 'y', [
    ['“I couldn’t remember where I stored booking details.”', 'P3 · group organiser', -2.2],
    ['“Everything was spread across apps and chats.”', 'P4 · solo traveller', 1.6],
  ]],
  ['02', 'Uncertainty during travel', 'b', [
    ['“I worried about missing transfers.”', 'P1 · family planner', 2],
    ['“Plans were not clear during the trip.”', 'P2 · business traveller', -1.8],
  ]],
  ['03', 'Access on the go', 'g', [
    ['“Finding tickets quickly was stressful.”', 'P3 · group organiser', -1.6],
    ['“I needed info while I was already travelling.”', 'P4 · solo traveller', 2.2],
    ['“Switching apps slowed me down.”', 'P5 · frequent flyer', -2],
  ]],
  ['04', 'Group & family coordination', 'c', [
    ['“Everyone kept asking me what’s next.”', 'P1 · family planner', 1.8],
    ['“I had to repeat travel details many times.”', 'P2 · business traveller', -2.2],
    ['“Information was buried in messages.”', 'P4 · solo traveller', 1.4],
  ]],
]

const journey = [
  ['Stage 01', 'Booking confirmation', 'Book a trip with confidence.', '“Everything looks great — I can’t wait!”', 'Details arrive across email, SMS & PDFs.'],
  ['Stage 02', 'Trip preparation', 'Feel ready before departure.', '“Do I have everything I need?”', 'Info scattered, slow to find.'],
  ['Stage 03', 'During the journey', 'Navigate the trip smoothly.', '“What’s happening next?”', 'Switching apps to find things fast.'],
]

const ideas = [
  ['Pull every booking — flights, hotels, transfers — into one timeline.', -2.5],
  ['Cache the full itinerary so it works offline, on the move.', 2],
  ['Keep passports, tickets & vouchers in one secure wallet.', -1.6],
  ['Surface a clear “what’s next” card so no one feels lost.', 2.4],
  ['Send smart nudges: check-in windows, gate changes, weather.', -2],
  ['Share the whole trip plan with family in a single tap.', 1.8],
]

const takeaways = [
  ['01', 'Structure was the feature.', 'Every detail already existed — what was missing was order. The highest-leverage move was arranging information around the lived day, not adding anything new. The best work here was sequencing and subtraction, not more surface.'],
  ['02', 'Behaviour, not taste, settled the hard calls.', 'Timeline over calendar, five fields over thirteen, time over booking-type — each contested decision was resolved by how travellers actually phrase “what’s next,” not by preference. Choices anchored to observed behaviour hold up in review and in use.'],
  ['03', 'Saying no protected the product.', 'Cutting live routes once the transit data couldn’t be trusted kept the itinerary credible — a half-accurate feature would have cost more than the one I dropped. Deciding what not to build is design work, not compromise.'],
  ['04', 'What I’d explore next.', 'Run the evaluative test with 5–7 travellers, then extend the single-timeline model to what still lives elsewhere — offline access, group coordination and smart nudges, all surfaced in ideation and deliberately held out of v1.'],
]

const finalNotes = [
  { side: 'right', top: '4%', title: 'Day tabs', text: 'Pick a day; the active one is unmistakable.' },
  { side: 'left', top: '20%', title: 'Flight card', text: 'Route, times, terminal and gate without opening anything.' },
  { side: 'right', top: '37%', title: 'Drive segment', text: 'Airport → hotel, driver one tap away.' },
  { side: 'left', top: '54%', title: 'Hotel check-in', text: 'Property, timing and reference, in place in the day.' },
  { side: 'right', top: '70%', title: 'Sightseeing', text: 'Optional stops, filterable and clearly secondary.' },
  { side: 'left', top: '86%', title: 'Night return', text: 'Evening drive, room ready, tomorrow already in view.' },
]

const gallery = [
  [IMG.flight, 'Flight details', 'Boarding pass, passenger and seat map — the deeper layer, one tap from the timeline.'],
  [IMG.hotel, 'Hotel details', 'Booking status and reference first, then amenities and reviews.'],
  ['/projects/project1/high-fidelity/screen-01.png', 'Upcoming trips', 'Every booked trip with a live countdown and cities at a glance.', true],
]

const before = ['Information fragmented across sources', 'Multiple apps, emails and PDFs',
  'Manual searching for every detail', 'High cognitive load on the traveller',
  'Sequence of the day held in your head']
const after = ['One centralised itinerary', 'Time-based organisation of the day',
  'Progressive disclosure of detail', 'The next action is always clear',
  'Sequence built into the structure']

const tasks = [
  ['Task 01', 'Find today’s next activity', 'Pass: located without opening any secondary screen.'],
  ['Task 02', 'Find hotel check-in information', 'Pass: reference and timing found in ≤ 2 taps.'],
  ['Task 03', 'Find flight timing and gate', 'Pass: read directly from the timeline card.'],
  ['Task 04', 'Add a custom activity to the trip', 'Pass: completed from the itinerary unaided.'],
]

const metrics = [
  ['Time to locate a detail', 'Target <10s', 'From ~40s across scattered apps today to a gate, reference or timing in one glance.'],
  ['Task completion', 'Target 5 / 5', 'All four core tasks completed unaided, without a secondary screen.'],
  ['Confidence in “what’s next”', 'Clear lift', 'A measurable rise in self-reported certainty about the next step after use.'],
]

/* ── hand-drawn sketch primitives (ported from the case-study markup) ── */

const SkAccordion = () => (
  <svg viewBox="0 0 150 112" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#mvRough)">
      <rect className="hd" x="14" y="10" width="104" height="19" rx="5" />
      <path className="hd" d="M104 16 l6 6 6 -6" />
      <rect className="hd" x="14" y="35" width="104" height="19" rx="5" />
      <path className="hd" d="M104 41 l6 6 6 -6" />
      <rect className="hd" x="14" y="60" width="104" height="19" rx="5" />
      <path className="hd" d="M104 66 l6 6 6 -6" />
      <rect className="hd faint" x="14" y="85" width="104" height="16" rx="5" />
    </g>
    <text className="hnote" x="120" y="24" transform="rotate(8 120 24)">tap</text>
  </svg>
)

const SkCards = () => (
  <svg viewBox="0 0 150 112" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#mvRough)">
      <rect className="hd faint" x="40" y="26" width="86" height="70" rx="10" />
      <rect className="hd faint" x="30" y="20" width="86" height="76" rx="10" />
      <rect className="hd" x="18" y="14" width="86" height="82" rx="10" />
      <path className="hd" d="M34 34 h56 M34 50 h40 M34 66 h50" />
      <path className="hd" d="M118 56 h20 M130 49 l8 7 -8 7" />
    </g>
    <text className="hnote" x="112" y="34" transform="rotate(-7 112 34)">swipe</text>
  </svg>
)

const SkTimeline = () => (
  <svg viewBox="0 0 150 112" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#mvRough)">
      <path className="hd spine" d="M28 8 V104" />
      <circle className="hd dot" cx="28" cy="22" r="5" /><rect className="hd" x="44" y="13" width="90" height="19" rx="5" />
      <circle className="hd dot" cx="28" cy="54" r="5" /><rect className="hd" x="44" y="45" width="90" height="19" rx="5" />
      <circle className="hd dot" cx="28" cy="86" r="5" /><rect className="hd" x="44" y="77" width="90" height="19" rx="5" />
    </g>
    <text className="hnote" x="104" y="108" transform="rotate(6 104 108)">scroll ↓</text>
  </svg>
)

const CardFlight = () => (
  <svg viewBox="0 0 264 208" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#mvRough2)">
      <rect className="hd" x="8" y="8" width="248" height="192" />
      <rect className="hd" x="20" y="22" width="15" height="15" rx="3" />
      <path className="hd faint" d="M150 24 h96" />
      <path className="hd faint dash" d="M14 46 H250" />
      <rect className="hd faint" x="196" y="58" width="52" height="18" rx="9" />
      <text className="hlabel" x="22" y="86">DEL</text>
      <path className="hd rt" d="M84 80 H176" /><path className="hd" d="M150 74 l10 6 -10 6" />
      <text className="hlabel" x="196" y="86">ZRH</text>
      <rect className="hd" x="18" y="108" width="52" height="30" rx="6" />
      <rect className="hd" x="76" y="108" width="52" height="30" rx="6" />
      <rect className="hd" x="134" y="108" width="52" height="30" rx="6" />
      <rect className="hd" x="192" y="108" width="52" height="30" rx="6" />
      <rect className="hd btn" x="18" y="160" width="108" height="26" rx="13" />
      <rect className="hd btn" x="136" y="160" width="108" height="26" rx="13" />
    </g>
    <text className="htitle" x="42" y="35">Flight</text>
    <text className="hsm faintx" x="150" y="38">5:00–6:30</text>
    <text className="hsm" x="42" y="70">Air India · AI 73</text>
    <text className="hsm faintx" x="207" y="70">On time</text>
    <text className="hxs" x="24" y="120">Board</text><text className="hsm" x="24" y="133">04:10</text>
    <text className="hxs" x="82" y="120">Dur</text><text className="hsm" x="82" y="133">12h20</text>
    <text className="hxs" x="140" y="120">Term</text><text className="hsm" x="140" y="133">1</text>
    <text className="hxs" x="198" y="120">Gate</text><text className="hsm" x="198" y="133">A12</text>
    <text className="hsm" x="40" y="177">Boarding Pass</text>
    <text className="hsm" x="158" y="177">Flight Details</text>
  </svg>
)


const CardHotel = () => (
  <svg viewBox="0 0 264 214" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#mvRough2)">
      <rect className="hd" x="8" y="8" width="248" height="198" />
      <rect className="hd" x="21" y="23" width="14" height="14" rx="3" />
      <path className="hd faint dash" d="M14 46 H250" />
      <rect className="hd faint" x="18" y="56" width="228" height="44" rx="8" />
      <ellipse className="hd faint" cx="150" cy="72" rx="13" ry="7" />
      <path className="hd faint" d="M60 92 l34 -18 22 12 26 -16 40 22" />
      <rect className="hd faint dash" x="18" y="112" width="112" height="40" rx="6" />
      <rect className="hd faint dash" x="138" y="112" width="108" height="40" rx="6" />
      <rect className="hd" x="18" y="164" width="112" height="28" rx="14" />
      <rect className="hd" x="138" y="164" width="108" height="28" rx="14" />
    </g>
    <text className="htitle" x="40" y="35">Hotel Check-In</text>
    <text className="hsm faintx" x="196" y="35">6:30 AM</text>
    <text className="hsm" x="24" y="96">The Dolder Grand</text>
    <text className="hxs" x="200" y="72">Prime 9.5</text>
    <text className="hxs" x="26" y="128">Agency ref</text>
    <text className="hsm" x="26" y="145">MLMT-ZRH-48213</text>
    <text className="hxs" x="146" y="128">Check in</text>
    <text className="hsm" x="146" y="145">7 Jan · 9:00 PM</text>
    <text className="hsm" x="30" y="182">Booking Voucher</text>
    <text className="hsm" x="152" y="182">Hotel Details</text>
  </svg>
)

const CardDinner = () => (
  <svg viewBox="0 0 264 224" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#mvRough2)">
      <rect className="hd" x="8" y="8" width="248" height="208" />
      <rect className="hd" x="21" y="23" width="14" height="14" rx="3" />
      <rect className="hd faint" x="18" y="44" width="228" height="40" rx="8" />
      <ellipse className="hd faint" cx="150" cy="58" rx="12" ry="6" />
      <path className="hd faint" d="M60 76 l34 -16 22 10 26 -14 40 20" />
      <rect className="hd" x="150" y="100" width="42" height="18" rx="5" />
      <rect className="hd faint dash" x="198" y="100" width="48" height="18" rx="5" />
      <rect className="hd faint" x="18" y="128" width="68" height="40" rx="6" />
      <ellipse className="hd faint" cx="40" cy="140" rx="7" ry="4" /><path className="hd faint" d="M26 160 l14 -10 10 6 12 -8 10 8" />
      <rect className="hd faint" x="98" y="128" width="68" height="40" rx="6" />
      <ellipse className="hd faint" cx="120" cy="140" rx="7" ry="4" /><path className="hd faint" d="M106 160 l14 -10 10 6 12 -8 10 8" />
      <rect className="hd faint" x="178" y="128" width="68" height="40" rx="6" />
      <ellipse className="hd faint" cx="200" cy="140" rx="7" ry="4" /><path className="hd faint" d="M186 160 l14 -10 10 6 12 -8 10 8" />
      <rect className="hd faint dash" x="18" y="182" width="228" height="26" rx="6" />
    </g>
    <text className="htitle" x="40" y="32">Dinner</text>
    <text className="hsm" x="24" y="98">Tamarind Hill Restaurant</text>
    <text className="hsm" x="18" y="114">Pre-paid · 1 per person</text>
    <text className="hxs" x="158" y="113">Veg</text>
    <text className="hxs faintx" x="206" y="113">Non-veg</text>
    <text className="hxs" x="26" y="180">Paneer Tikka</text>
    <text className="hxs" x="106" y="180">Dal Makhani</text>
    <text className="hxs" x="186" y="180">Gulab Jamun</text>
    <text className="hsm" x="26" y="200">Extra orders paid at the venue</text>
  </svg>
)

const CardSight = () => (
  <svg viewBox="0 0 264 224" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#mvRough2)">
      <rect className="hd" x="8" y="8" width="248" height="208" />
      <rect className="hd" x="21" y="23" width="14" height="14" rx="3" />
      <rect className="hd" x="18" y="44" width="66" height="20" rx="10" />
      <rect className="hd faint" x="90" y="44" width="60" height="20" rx="10" />
      <rect className="hd faint" x="156" y="44" width="66" height="20" rx="10" />
      <rect className="hd faint" x="18" y="74" width="228" height="40" rx="8" />
      <ellipse className="hd faint" cx="150" cy="88" rx="12" ry="6" />
      <path className="hd faint" d="M60 106 l34 -16 22 10 26 -14 40 20" />
      <rect className="hd faint dash" x="18" y="150" width="44" height="18" rx="9" />
      <rect className="hd faint dash" x="68" y="150" width="40" height="18" rx="9" />
      <rect className="hd faint dash" x="114" y="150" width="46" height="18" rx="9" />
      <rect className="hd faint dash" x="166" y="150" width="52" height="18" rx="9" />
      <circle className="hd faint" cx="26" cy="190" r="6" /><circle className="hd faint" cx="36" cy="190" r="6" /><circle className="hd faint" cx="46" cy="190" r="6" />
    </g>
    <text className="htitle" x="40" y="32">Sightseeing</text>
    <text className="hxs" x="26" y="58">Attractions</text>
    <text className="hxs" x="98" y="58">Shopping</text>
    <text className="hxs" x="164" y="58">Night life</text>
    <text className="hsm" x="20" y="134">Uetliberg · best city &amp; lake views</text>
    <text className="hxs" x="24" y="163">5–6pm</text><text className="hxs" x="74" y="163">5°C</text>
    <text className="hxs" x="120" y="163">19 km</text><text className="hxs" x="172" y="163">Free entry</text>
    <text className="hxs" x="60" y="194">joined</text>
    <text className="hxs faintx" x="188" y="194">View detail ›</text>
  </svg>
)


const panels = [
  {
    note: 'Flight card · first pass',
    all: ['Flight number', 'Departure / arrival', 'Terminal', 'Gate', 'Seat', 'Boarding time',
      'Baggage allowance', 'Meal preference', 'Flight duration', 'Aircraft type',
      'Check-in status', 'Boarding pass', 'Airline contact'],
    bad: '13 fields. Nothing emphasised, so nothing is findable.',
    title: 'Only the travel-day facts survived',
    body: 'I asked one question of every field — “is this needed in the next hour?” Five earned a place on the card. The rest stayed useful, just one tap away.',
    Card: CardFlight,
    kept: ['Route · DEL → ZRH', 'Date & time', 'Terminal', 'Gate', 'Flight number'],
    good: '5 on the card · 8 moved behind Boarding Pass & Flight Details.',
  },
  {
    note: 'Hotel card · first pass',
    all: ['Hotel name', 'Check-in', 'Check-out', 'Room type', 'Guests', 'Address', 'Contact',
      'Confirmation ID', 'Amenities'],
    bad: '9 fields. Everything the front desk knows, none of it prioritised.',
    title: 'The three facts that unlock the day',
    body: 'At check-in a traveller needs where, when and under what reference. Room, amenities and policies wait behind the voucher.',
    Card: CardHotel,
    kept: ['Hotel · name', 'Check-in time', 'Agency reference'],
    good: '3 on the card · room, address & amenities one tap away.',
  },
  {
    note: 'Sightseeing card · first pass',
    all: ['Location name', 'Description', 'Duration', 'Distance', 'Entry fee', 'Best time',
      'What to bring', 'Taxi / bus / train', 'Reviews', 'Friends going'],
    bad: '12 fields — an itinerary card turning into a travel guide.',
    title: 'Discovery, not a data dump',
    body: 'An optional stop earns a glance, not a study: name, one line of why, and the few facts that decide “shall we?”',
    Card: CardSight,
    kept: ['Name & image', 'One-line why', 'Key tags · time, temp, distance'],
    good: '4 on the card · full description & routes a tap away.',
    cut: 'I also planned live routes for each stop — taxi, bus and train options with fares and the walk to the nearest stop. Talking it through with engineering, reliable transit and pricing feeds don’t exist consistently across every country MLMT sells, so I cut the feature rather than ship it half-accurate. Scoping against real data is part of the design.',
  },
  {
    note: 'Dinner card · first pass',
    all: ['Restaurant name', 'Cuisine', 'Reservation', 'Dietary preference', 'Full menu',
      'Dishes ×6', 'Address', 'Contact', 'Dress code', 'Special request'],
    bad: '14 fields — the itinerary was becoming a restaurant menu.',
    title: 'A booking, not the whole menu',
    body: 'Dinner is booked and paid — the card confirms that and previews a few dishes. The full menu lives at the venue.',
    Card: CardDinner,
    kept: ['Restaurant & time', 'Meal status · pre-paid', 'A few dishes'],
    good: '5 on the card · full menu & policies at the venue.',
  },
]

/* ── problem illustrations ── */
const PChar1 = () => (
  <svg viewBox="0 0 200 210" className="mv-pchar-illus" fill="none" stroke="#1A1A18" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g strokeWidth="2.4"><rect x="12" y="20" width="30" height="21" rx="5" /><path d="M18 28h16M18 34h10" /><rect x="158" y="15" width="30" height="21" rx="5" /><path d="M164 23h16M164 29h10" /><rect x="162" y="70" width="30" height="21" rx="5" /><path d="M168 78h16M168 84h10" /></g>
    <g strokeWidth="1.8" strokeDasharray="2 5"><path d="M72 54 q-16 -12 -30 -18" /><path d="M128 50 q16 -14 30 -20" /><path d="M131 74 q16 0 30 4" /></g>
    <ellipse cx="100" cy="60" rx="30" ry="31" fill="#fff" />
    <path d="M86 33 q8 -7 15 -2" />
    <circle cx="90" cy="58" r="4.2" fill="#fff" /><circle cx="90" cy="59" r="2" fill="#1A1A18" stroke="none" />
    <circle cx="110" cy="58" r="4.2" fill="#fff" /><circle cx="110" cy="59" r="2" fill="#1A1A18" stroke="none" />
    <path d="M82 47 l10 3" strokeWidth="3" /><path d="M118 47 l-10 3" strokeWidth="3" />
    <path d="M90 74 q5 4 10 0 q5 -4 10 0" strokeWidth="3" />
    <path d="M100 91 v8" />
    <path d="M100 104 q-20 4 -25 18" /><path d="M100 104 q20 4 25 18" />
    <rect x="82" y="118" width="36" height="24" rx="3" transform="rotate(-5 100 130)" fill="#fff" />
    <path d="M88 126h22M88 132h14" strokeWidth="2.2" />
    <path d="M100 104 v34" />
    <path d="M100 138 l-14 50" /><path d="M100 138 l14 50" />
    <path d="M86 188 l-9 3M114 188 l9 3" />
  </svg>
)

const PChar2 = () => (
  <svg viewBox="0 0 200 210" className="mv-pchar-illus" fill="none" stroke="#1A1A18" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <text className="qm" x="150" y="52">?</text>
    <ellipse cx="100" cy="60" rx="30" ry="31" fill="#fff" />
    <path d="M86 33 q8 -7 15 -2" />
    <circle cx="90" cy="58" r="3.6" fill="#1A1A18" stroke="none" />
    <circle cx="110" cy="58" r="3.6" fill="#1A1A18" stroke="none" />
    <path d="M82 50 l10 2" strokeWidth="3" /><path d="M118 44 l-10 4" strokeWidth="3" />
    <path d="M91 74 q9 -5 18 0" strokeWidth="3" />
    <path d="M100 91 v8" />
    <path d="M100 104 q-22 3 -27 19" />
    <rect x="66" y="120" width="34" height="23" rx="3" transform="rotate(-7 83 131)" fill="#fff" />
    <path d="M72 127h20M72 133h13" strokeWidth="2.2" />
    <path d="M100 104 q20 -2 30 -16" />
    <path d="M100 104 v34" />
    <path d="M100 138 l-14 50" /><path d="M100 138 l14 50" />
    <path d="M86 188 l-9 3M114 188 l9 3" />
  </svg>
)

const PChar3 = () => (
  <svg viewBox="0 0 200 210" className="mv-pchar-illus" fill="none" stroke="#1A1A18" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g strokeWidth="2.6"><path d="M150 40 a16 16 0 0 1 26 0" /><path d="M156 48 a9 9 0 0 1 14 0" /><circle cx="163" cy="55" r="1.8" fill="#1A1A18" stroke="none" /><path d="M150 34 l26 26" strokeWidth="3" /></g>
    <ellipse cx="96" cy="58" rx="30" ry="31" fill="#fff" />
    <path d="M82 31 q8 -7 15 -2" />
    <circle cx="86" cy="56" r="3.4" fill="#1A1A18" stroke="none" />
    <circle cx="106" cy="56" r="3.4" fill="#1A1A18" stroke="none" />
    <path d="M78 50 l10 -3" strokeWidth="3" /><path d="M114 50 l-10 -3" strokeWidth="3" />
    <path d="M86 72 l4 3 4 -3 4 3 4 -3" strokeWidth="3" />
    <path d="M96 89 v9" />
    <path d="M96 102 q18 -2 30 -14" />
    <rect x="120" y="80" width="30" height="22" rx="3" transform="rotate(10 135 91)" fill="#fff" />
    <path d="M126 87h18M126 93h11" strokeWidth="2.2" />
    <path d="M96 102 q-18 6 -22 22" />
    <path d="M96 102 v32" />
    <path d="M96 134 l-20 46 M76 180 l-10 1" />
    <path d="M96 134 l20 40 M116 174 l10 3" />
    <g strokeWidth="2" strokeLinecap="round"><path d="M52 150h-12M56 164h-16M60 178h-12" /></g>
  </svg>
)

const problems = [
  [PChar1, '01', 'Fragmented information', 'One trip lived across email, SMS, PDFs and chat threads. Reconstructing it meant hunting — slow, and stressful under time pressure.', 'Priya Nair · Solo traveller', 'one unified hub for every booking, document and itinerary.'],
  [PChar2, '02', 'Uncertainty during travel', 'Without a clear view of what’s next, travellers second-guessed schedules and re-checked the same details over and over on the move.', 'Meera Joshi · Weekend tripper', 'a clear daily plan that keeps the next step always in view.'],
  [PChar3, '03', 'Poor access on the go', 'The one detail that mattered was hard to reach fast — especially offline — exactly when a traveller was standing at a gate or a counter.', 'Arjun Rao · Family planner', 'offline-ready access, cached for the moment it’s needed.'],
]

/* the mid-fidelity wireframe that dissolves into the finished screen */
const LoFi = () => (
  <svg viewBox="0 0 300 610" className="mv-lofi-svg" aria-hidden="true">
    <rect x="0" y="0" width="300" height="610" rx="30" fill="#fff" stroke="#DEDEDA" />
    <rect x="24" y="34" width="120" height="14" rx="4" fill="#E7E7E3" />
    <rect x="24" y="70" width="252" height="26" rx="6" fill="#EFEFEC" />
    {[118, 224, 330, 436].map((y, i) => (
      <g key={y}>
        <rect x="24" y={y} width="252" height="86" rx="10" fill="#F4F4F1" stroke="#E7E7E3" />
        <circle cx="44" cy={y + 22} r="8" fill="#DEDEDA" />
        <rect x="60" y={y + 14} width={[80, 90, 70, 86][i]} height="10" rx="3" fill="#DEDEDA" />
        <rect x="60" y={y + 32} width={[120, 110, 130, 100][i]} height="8" rx="3" fill="#E7E7E3" />
      </g>
    ))}
  </svg>
)

/* Sticky chapter nav — sits under the site header and tracks the active section. */
const STEPS = [
  ['01', 'Brief', 'brief'], ['02', 'Research', 'research'], ['03', 'Problem', 'problem'],
  ['04', 'Explore', 'explore'], ['05', 'Decide', 'decide'], ['06', 'Solution', 'solution'],
  ['07', 'Final', 'final'], ['08', 'Outcome', 'outcome'],
]

function ChapterNav() {
  const [active, setActive] = useState('brief')
  const root = useRef(null)

  useEffect(() => {
    // pin below whatever the sticky site header currently measures
    const header = document.querySelector('.header')
    const setTop = () => {
      const h = header ? Math.round(header.getBoundingClientRect().height) : 0
      root.current?.style.setProperty('--mv-nav-top', h + 'px')
      return h
    }

    let ticking = false
    const update = () => {
      const line = window.scrollY + setTop() + 140
      let current = STEPS[0][2]
      STEPS.forEach(([, , id]) => {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= line) current = id
      })
      setActive(current)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { update(); ticking = false })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const header = document.querySelector('.header')
    const offset = (header ? header.getBoundingClientRect().height : 0) + 28
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
  }

  return (
    <nav className="mv-nav" ref={root} aria-label="Case study sections">
      <div className="container mv-nav-inner">
        <span className="mv-nav-brand">MLMT · Case study</span>
        <ul>
          {STEPS.map(([n, label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                className={active === id ? 'is-on' : undefined}
                aria-current={active === id ? 'true' : undefined}
              >
                <i>{n}</i>{label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#final" onClick={(e) => go(e, 'final')} className="mv-nav-cta">See the product</a>
      </div>
    </nav>
  )
}

const Head = ({ n, eyebrow, title, lead, wide, sub }) => (
  <Reveal className={`mv-head${wide ? ' mv-head--wide' : ''}`}>
    <span className="mv-eyebrow"><i>{n}</i>{eyebrow}</span>
    {title && (sub ? <h3>{title}</h3> : <h2>{title}</h2>)}
    {lead && <p>{lead}</p>}
  </Reveal>
)

/* ── page ───────────────────────────────────────────────────────────── */

export default function ProjectMLMTv2() {
  const base = getProject('kora')
  const project = { ...base, title: 'My Last Minute Trip' }

  const lofiRef = useRef(null)

  /* lo-fi → hi-fi crossfade */
  useEffect(() => {
    const el = lofiRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: 'top 62%', end: 'top 22%', scrub: true }
      gsap.to('.mv-layer--lofi', { opacity: 0, scrollTrigger: st })
      gsap.fromTo('.mv-layer--hifi', { opacity: 0 }, { opacity: 1, scrollTrigger: st })
    }, el)
    return () => ctx.revert()
  }, [])

  const heroLeft = (
    <>
      <Reveal as="span" className="mv-kicker">
        <span className="mv-kicker-dot" aria-hidden="true">m</span>
        My Last Minute Trip · Travel companion app
      </Reveal>
      <Reveal as="h1" className="mv-h1" delay={60}>
        Where do I need to be <em>next?</em>
      </Reveal>
      <Reveal as="p" className="mv-h1-sub" delay={120}>
        Redesigning a fragmented post-booking travel experience into one clear, time-based trip.
      </Reveal>
      <Reveal className="mv-hero-actions" delay={180}>
        <a className="mv-btn mv-btn--dark" href="#final">See the product <span aria-hidden="true">→</span></a>
        <a className="mv-btn mv-btn--ghost" href="#problem">Read the story</a>
      </Reveal>
    </>
  )

  return (
    <main className="mv pd--mlmt">
      {/* rough-edge filters used by every hand-drawn sketch */}
      <svg width="0" height="0" className="mv-defs" aria-hidden="true"><defs>
        <filter id="mvRough" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.7" />
        </filter>
        <filter id="mvRough2" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="19" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.9" />
        </filter>
      </defs></svg>

      {/* ══ HERO — case-study copy left, the hv2 stage right ══ */}
      <TravelHeroV2 project={project} left={heroLeft} />

      <ChapterNav />

      {/* ══ META · TAGS · TL;DR ══ */}
      <section id="brief" className="mv-sec mv-sec--tight">
        <div className="container">
          <Reveal className="mv-meta">
            {meta.map(([k, v, s]) => <div key={k}><span>{k}</span><b>{v}</b><i>{s}</i></div>)}
          </Reveal>
          <Reveal className="mv-tags" delay={80}>{tags.map((t) => <span key={t}>{t}</span>)}</Reveal>
          <Reveal className="mv-tldr" delay={120}>
            {tldr.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
          </Reveal>
        </div>
      </section>

      {/* ══ 01 · THE BRIEF ══ */}
      <section className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="01" eyebrow="The brief" title="The ask arrived as one question"
            lead="MLMT’s travelers had their bookings confirmed — but their trips lived scattered across email, PDFs and chat threads. The client wanted the after-booking experience owned in one place." />

          <Reveal className="mv-mail">
            <div className="mv-mail-top">
              <span className="mv-mail-dots"><i /><i /><i /></span>
              <span className="mv-mail-lbl">Inbox — Client</span>
            </div>
            <div className="mv-mail-head">
              <span className="mv-mail-av">M</span>
              <div>
                <div className="mv-mail-from">My Last Minute Trip <span>product@mylastminutetrip.com</span></div>
                <div className="mv-mail-to">To: hello@creativebrains.design</div>
              </div>
              <span className="mv-mail-date">Mon, 21 Jun · 09:14</span>
            </div>
            <div className="mv-mail-body">
              <h4>MLMT App Overview</h4>
              <p>Hi team — quick context before we kick off. My Last Minute Trip helps travelers plan, organize and manage their journeys from a single platform: itineraries, bookings, transport, travel documents, weather and destination recommendations, plus shared activities with fellow travelers.</p>
              <p>Booking already works well. The problem starts <em>after</em> the booking is confirmed. Right now those details reach the traveler through email, SMS and third-party providers — so the trip ends up spread across half a dozen apps and inboxes.</p>
              <p>We’d like you to own the post-booking experience: understand where travelers get stuck once they’re on the move, and design a single home for everything a trip contains. The goal is a calmer, more organized experience — less searching, less overwhelm.</p>
              <div className="mv-mail-sign">Thanks,<br /><strong>The MLMT Product Team</strong></div>
            </div>
          </Reveal>

          <Reveal className="mv-obj" delay={80}>
            {objectives.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
          </Reveal>
        </div>
      </section>

      {/* ══ 02 · RESEARCH ══ */}
      <section id="research" className="mv-sec">
        <div className="container">
          <Head n="02" eyebrow="Research" title="Two rounds of conversations"
            lead="To shape the post-booking experience I ran two rounds of interviews — two sessions with the MLMT product owner, and five with travelers who use the app. A small sample, but consistent enough that the same three frustrations surfaced in every conversation." />
          <div className="mv-chats">
            {chats.map((c, i) => (
              <Reveal className="mv-chat" key={c.who} delay={i * 90}>
                <div className="mv-chat-head">
                  <span className={`mv-chat-av ${c.tone}`}>{c.av}</span>
                  <div><b>{c.who}</b><span>{c.role}</span></div>
                </div>
                {c.msgs.map(([kind, text], j) => (
                  <p className={`mv-bubble ${kind}`} key={j}>{text}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 02·b · PERSONAS ══ */}
      <section className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="02 · b" eyebrow="Who we designed for" title="Two travelers, one shared need"
            lead="The interviews produced two people. Every later choice was weighed against both." />
          <div className="mv-personas">
            {personas.map((p, i) => (
              <Reveal className="mv-persona" key={p.name} delay={i * 90}>
                <div className="mv-persona-top">
                  <span className="mv-persona-av">{p.ini}</span>
                  <div><b>{p.name}</b><span>{p.type}</span></div>
                </div>
                <p className="mv-persona-quote">{p.quote}</p>
                <div className="mv-persona-grid">
                  {p.facts.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mv-needs" delay={120}>
            <h4>What both travelers needed</h4>
            <ul>{bothNeeds.map((n) => <li key={n}>{n}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      {/* ══ 03 · PROBLEM ══ */}
      <section id="problem" className="mv-sec">
        <div className="container">
          <Head n="03" eyebrow="The problem" title="The trip was booked. The information wasn’t." wide
            lead="Booking was solved; the hours after it weren’t. Details landed across a dozen apps and inboxes, so travellers hunted for them under stress — friction that quietly erodes retention and drives avoidable support contacts. Every detail already existed. What was missing was one reliable place to find it." />
          <div className="mv-pchars">
            {problems.map(([Illus, n, t, d, who, ans], i) => (
              <Reveal className="mv-pchar" key={n} delay={i * 90}>
                <Illus />
                <span className="mv-pchar-n">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="mv-pchar-who">{who}</span>
                <div className="mv-pchar-ans"><b>Answered by →</b> {ans}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 03·b · SYNTHESIS ══ */}
      <section className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="03 · b" eyebrow="Synthesis" title="Hundreds of notes, four patterns"
            lead="Grouping the raw observations surfaced the patterns that mattered most — and mapped exactly where the trip breaks." />

          <Reveal className="mv-board">
            {affinity.map(([idx, label, tone, notes]) => (
              <div className="mv-board-col" key={idx}>
                <div className="mv-board-label"><span>{idx}</span>{label}</div>
                <div className="mv-board-stack">
                  {notes.map(([text, who, r]) => (
                    <div className={`mv-sticky ${tone}`} key={text} style={{ '--r': `${r}deg` }}>
                      <p>{text}</p><span>{who}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>

          <div className="mv-journey">
            <Head n="—" eyebrow="Journey" title="Where confidence dips across the trip" sub />
            <Reveal className="mv-jtrack">
              {journey.map(([stage, t, goal, say, pain]) => (
                <div className="mv-jstep" key={stage}>
                  <span className="mv-jstage">{stage}</span>
                  <h4>{t}</h4>
                  <p className="mv-jgoal">{goal}</p>
                  <p className="mv-jsay">{say}</p>
                  <p className="mv-jpain">{pain}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 04 · OPPORTUNITY + IDEATION ══ */}
      <section id="explore" className="mv-sec">
        <div className="container">
          <Reveal className="mv-head mv-head--wide">
            <span className="mv-eyebrow"><i>04</i>The opportunity</span>
            <p className="mv-hmw">How might we help a traveller see the <b>whole trip</b> — and what’s next — at a glance?</p>
          </Reveal>

          <Head n="04 · b" eyebrow="Ideation workshop" title="Turning frustration into moves"
            lead="A working session translated each research pattern into a concrete product move." />

          <div className="mv-ideas">
            {ideas.map(([text, r], i) => (
              <Reveal className="mv-idea" key={text} delay={i * 70} style={{ '--r': `${r}deg` }}>
                <span className="mv-pin" aria-hidden="true" />
                {text}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 05 · DECISION ══ */}
      <section id="decide" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="05" eyebrow="Architectural exploration" title="How should a whole trip be shown?"
            lead="Research pointed toward time — but I sketched three structures before committing, judging each against one question: what’s happening next?" />

          <div className="mv-evo">
            {[
              [SkAccordion, 'Explored', 'Accordion list', 'Every booking as a row you tap open to reveal its details.', 'Dropped — answering one question meant tapping through many. “Next” stayed hidden until you dug for it.', false],
              [SkCards, 'Considered', 'Swipeable cards', 'One full-screen card per booking, swiped one to the next.', 'Dropped — strong focus, weak overview. You lose the shape of the day and how moments connect.', false],
              [SkTimeline, 'Selected', 'Time-based timeline', 'Moments threaded in order — only the essentials on each card, the rest a tap away.', 'Chosen — it reads like a feed, the scroll people already do all day.', true],
            ].map(([Sk, tag, t, d, v, win], i) => (
              <Reveal className={`mv-evo-card${win ? ' is-win' : ''}`} key={t} delay={i * 90}>
                <div className="mv-evo-sk"><Sk /></div>
                <span className="mv-evo-tag">{tag}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <div className={`mv-verdict${win ? ' yes' : ''}`}>{v}</div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mv-why">
            <span aria-hidden="true">“</span>
            <p>People spend hours a day scrolling feeds and reels — vertical, top-to-bottom, one thing after the next. The timeline borrows that muscle memory: the day unfolds as you scroll, and the next thing is always just below.</p>
          </Reveal>

        </div>
      </section>

      {/* ══ 05·d · STRATEGIC SUBTRACTION ══ */}
      <section className="mv-sec">
        <div className="container">
          <Head n="05 · d" eyebrow="Strategic subtraction" title="The “everything is important” trap"
            lead="My first flight card carried every fact the airline sent. Accurate — and unusable. Cutting each card to its travel-day essentials wasn’t tidying: it protected glanceability, and it shrank the surface engineering had to build and maintain across four card types." />

          {panels.map((p) => (
            <Reveal className="mv-panel" key={p.note}>
              <div className="mv-panel-l">
                <div className="mv-sk-note">{p.note}</div>
                <ul className="mv-hand-list is-all">{p.all.map((f) => <li key={f}>{f}</li>)}</ul>
                <div className="mv-sk-foot is-bad">{p.bad}</div>
              </div>
              <div className="mv-panel-r">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="mv-sk-flow">
                  <div className="mv-card-sketch"><p.Card /></div>
                  <ul className="mv-hand-list is-kept">{p.kept.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
                <div className="mv-sk-foot is-good">{p.good}</div>
                {p.cut && (
                  <div className="mv-cut">
                    <span className="mv-cut-k">Cut after dev review</span>
                    <p>{p.cut}</p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 05·e · ARCHITECTURE & FLOW ══ */}
      <section className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="05 · e" eyebrow="Architecture & flow" title="The structure behind the screen" sub
            lead="The information architecture and the primary user flow the timeline is built on — the map that keeps every screen one clear step from the next." />
          {[
            ['Information architecture', '/projects/project1/diagram/information-architecture/project1_ia.svg', 'MLMT information architecture'],
            ['Primary user flow', '/projects/project1/diagram/userflow/project1_userflow1.svg', 'MLMT primary user flow'],
          ].map(([k, src, alt]) => (
            <Reveal as="figure" className="mv-diagram" key={k}>
              <figcaption>{k}</figcaption>
              <div className="mv-diagram-scroll"><img src={src} alt={alt} /></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ 06 · SOLUTION ══ */}
      <section id="solution" className="mv-sec">
        <div className="container">
          <Reveal className="mv-head mv-head--wide">
            <span className="mv-eyebrow"><i>06</i>The solution</span>
            <p className="mv-statement">From booking categories to one continuous journey.</p>
            <p>The whole trip was re-architected around how a day is lived — trip → day → activity → detail → action — so the structure itself answers “what’s next” before any feature does.</p>
          </Reveal>

          <div className="mv-lofi-hifi">
            <div className="mv-lofi-stack" ref={lofiRef} aria-hidden="true">
              <div className="mv-layer mv-layer--lofi"><LoFi /></div>
              <div className="mv-layer mv-layer--hifi"><PhoneDashboard className="mv-hifi-phone" /></div>
            </div>
            <div>
              <Head n="—" eyebrow="Wireframe → interface" title="From structure to final interface" sub />
              <div className="mv-steps">
                {[
                  ['1', 'Idea', 'One home that pulls every booking, document and activity into a single scroll.'],
                  ['2', 'Structure', 'A time-based itinerary — trip → day → activity → detail → action — mid-fidelity first.'],
                  ['3', 'Final product', 'The wireframe resolves into the shipped interface as you scroll. Same skeleton, real skin.'],
                ].map(([n, t, d], i) => (
                  <Reveal className="mv-step" key={n} delay={i * 80}>
                    <span>{n}</span>
                    <div><h4>{t}</h4><p>{d}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 06·b · DESIGN SYSTEM ══ */}
      <section className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="06 · b" eyebrow="Design system" title="One small system, applied everywhere"
            lead="A tight set of tokens and components kept the build consistent and the handoff clean." />

          <div className="mv-ds">
            <Reveal className="mv-ds-block">
              <span className="mv-ds-k">Colour</span>
              <div className="mv-sw-row">
                {[['#0E0E10', 'Ink'], ['#1A1A18', 'Ink 900'], ['#6B6B66', 'Muted'],
                  ['#E7E7E3', 'Line'], ['#F8F8F6', 'Paper 2'], ['#D63A2C', 'Accent']].map(([hex, n]) => (
                  <div className="mv-sw" key={hex}>
                    <span className="mv-chip" style={{ background: hex }} />
                    <b>{n}</b><i>{hex}</i>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mv-ds-block" delay={80}>
              <span className="mv-ds-k">Type</span>
              <div className="mv-ds-type">
                <div><span>Display · 34/1.05</span><b className="mv-tsamp-lg">Where do I need to be next?</b></div>
                <div><span>Body · 17/1.55</span><b className="mv-tsamp">The itinerary reads like a real day — each moment in order.</b></div>
                <div><span>Label · 11.5 · caps</span><b className="mv-tsamp-sm">Flight · Gate A22</b></div>
              </div>
            </Reveal>

            <Reveal className="mv-ds-block" delay={120}>
              <span className="mv-ds-k">Components</span>
              <div className="mv-ds-comp">
                <span className="mv-ds-btn is-dark">Boarding pass</span>
                <span className="mv-ds-btn">Flight details</span>
                <span className="mv-ds-pill"><i />On time</span>
                <span className="mv-ds-chip">Deluxe King</span>
                <span className="mv-ds-chip">iOS &amp; Android</span>
              </div>
            </Reveal>

            <Reveal className="mv-ds-block" delay={160}>
              <span className="mv-ds-k">Foundations</span>
              <div className="mv-ds-found">
                {[['Radius', '10 · 14 · 22 px'], ['Grid', '4-pt spacing scale'],
                  ['Container', '1240px · fluid gutter'], ['Elevation', 'Soft, low-contrast shadows']].map(([k, v]) => (
                  <div key={k}><span>{k}</span><b>{v}</b></div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mv-ds-block mv-ds-block--wide" delay={200}>
              <span className="mv-ds-k">Accessibility &amp; cross-platform</span>
              <div className="mv-ds-found">
                {[['Contrast', 'WCAG 2.1 AA — text ≥ 4.5:1, checked for glare'],
                  ['Type', '16px floor, scales with OS text size'],
                  ['Targets', '44px minimum, one-thumb reach'],
                  ['Tokens', 'Native iOS & Android — lean handoff for 3 engineers']].map(([k, v]) => (
                  <div key={k}><span>{k}</span><b>{v}</b></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 07 · FINAL EXPERIENCE ══ */}
      <section id="final" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="07" eyebrow="The final experience" title="One timeline, every detail a tap away"
            lead="The itinerary reads like a real day — each moment surfaced in order, each carrying only what it needs." />

        </div>

        <ItineraryShowcase
          pinned
          eyebrow=""
          title=""
          image={IMG.itinerary}
          notes={finalNotes}
        />
      </section>

      {/* ══ 07·b · THE PRODUCT ══ */}
      <section className="mv-sec">
        <div className="container">
          <div className="mv-showcase">
            <Reveal className="mv-showcase-phone"><WmPhone image={IMG.home} autoScroll /></Reveal>
            <Reveal className="mv-showcase-copy" delay={90}>
              <span className="mv-eyebrow"><i>07 · b</i>The product</span>
              <h3>The whole trip, in one scroll</h3>
              <p>The home screen answers “where do I need to be next?” the moment it opens — trip status up top, quick controls for itinerary and flight, then the services a traveller reaches for on the move.</p>
              <div className="mv-feats">
                {[['Trip status', 'Live “in progress · Day 2” with a glanceable progress bar.'],
                  ['Quick controls', 'Itinerary and live flight, one tap from home.'],
                  ['Services', 'Hotel, documents, weather and support in one place.']].map(([k, v]) => (
                  <div key={k}><b>{k}</b>{v}</div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mv-gallery">
            {gallery.map(([img, k, c, still], i) => (
              <Reveal className="mv-shot" key={k} delay={i * 70}>
                <WmPhone image={img} autoScroll={!still} />
                <span className="mv-shot-k">{k}</span>
                <p className="mv-shot-c">{c}</p>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="mv-sample">Review counts and ratings shown in the hotel screen are in-app sample content.</Reveal>
        </div>
      </section>

      {/* ══ 08 · OUTCOME ══ */}
      <section id="outcome" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="08" eyebrow="The outcome" title="What changed for the traveller"
            lead="For MLMT the point was never the seconds saved. Every hunt through an inbox was a moment the traveller left the app — and a share of those became a support contact the team had to answer. Holding the whole trip inside one screen keeps the traveller in MLMT’s product for the part of the journey it had been losing them." />

          <Reveal className="mv-ba">
            <div>
              <span className="mv-ba-k">Before</span>
              <ul>{before.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
            <div className="is-after">
              <span className="mv-ba-k">After</span>
              <ul>{after.map((a) => <li key={a}>{a}</li>)}</ul>
            </div>
          </Reveal>

          <Reveal className="mv-bench" delay={80}>
            <div className="mv-bench-fig"><b>~40s</b><span>→</span><b className="hi">&lt;10s</b></div>
            <div>
              <span className="mv-bench-k">Design-phase benchmark</span>
              <p>Walking the same task — find a live travel detail — through the old scattered flow versus the single itinerary put the time to locate it at roughly 40 seconds before and under 10 after. An internal estimate from the design phase, not a moderated usability metric.</p>
            </div>
          </Reveal>

          <Reveal className="mv-val" delay={120}>
            <span className="mv-badge">De-risking the build</span>
            <p className="mv-val-lead">The product shipped to handoff but hadn’t gone through moderated testing inside the ten-week window — so rather than claim results I didn’t measure, I handed engineering an evaluative framework to run against builds: four task-based scenarios on the primary flow, each with an explicit pass condition and a target to hold the design to.</p>

            <div className="mv-tasks">
              {tasks.map(([n, t, s]) => <div key={n}><span>{n}</span><b>{t}</b><i>{s}</i></div>)}
            </div>

            <p className="mv-val-sub">Success defined before the test, not after — three targets the build is measured against.</p>

            <div className="mv-metrics">
              {metrics.map(([t, badge, d]) => (
                <div key={t}>
                  <div className="mv-metric-h"><b>{t}</b><span>{badge}</span></div>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ TAKEAWAYS ══ */}
      <section className="mv-sec">
        <div className="container">
          <Head n="—" eyebrow="What I learned" />
          <div className="mv-takes">
            {takeaways.map(([n, t, d], i) => (
              <Reveal className="mv-take" key={n} delay={i * 70}>
                <span>{n}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLOSING · availability + contact ══ */}
      <section className="mv-sec mv-sec--tint">
        <div className="container">
          <Reveal className="mv-close">
            <div>
              <span className="mv-eyebrow"><i>—</i>Working with me</span>
              <h2>Designing post-booking products in Vancouver, BC</h2>
              <p>
                I’m a UI/UX designer with 6+ years across healthcare, education, e-commerce,
                food retail and automotive — research through to a build engineers can ship.
                Available now for full-time and contract work, on Pacific time.
              </p>
            </div>
            <div className="mv-close-side">
              <div className="mv-close-facts">
                <div><span>Based in</span><b>Vancouver, BC</b></div>
                <div><span>Availability</span><b>Open to new roles</b></div>
                <div><span>Focus</span><b>Product UX · Design systems</b></div>
              </div>
              <Link to="/#contact" className="mv-btn mv-btn--dark">
                Get in touch <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

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
