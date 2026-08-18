// Shared project data — used by the projects grid and the detail page.
export const projects = [
  {
    id: 1,
    slug: 'kora',
    title: 'My last minute Trip',
    category: 'Consulting Site',
    tag: 'UI/UX',
    chip: 'chip-blue',
    image: 'https://picsum.photos/seed/kora-ui/960/600',
    year: '2025',
    role: 'Lead Product Designer',
    services: ['UI/UX Design', 'Webflow', 'Brand'],
    cover: `/projects/project1/cover/hero_mlmt.png`,
    intro:
      'A complete redesign of Kora’s consulting platform — turning a dense, hard-to-navigate site into a clear, conversion-focused experience.',
    overview:
      'My Last Minute Trip is a travel companion app that helps travelers plan, organize, and manage their journeys from a single platform. Users can access itineraries, bookings, transportation details, travel documents, weather updates, and destination recommendations while collaborating with fellow travelers through shared activities and schedules. By centralizing travel information in one place, the platform reduces planning complexity, minimizes information overload, and creates a more organized and stress-free travel experience.',
    challenge:
      'The previous experience had a 68% bounce rate on the homepage. Visitors couldn’t tell what Kora actually did within the first few seconds, and the booking flow took six steps.',
    solution:
      'We led with a single, sharp value proposition, cut the booking flow to two steps, and introduced a modular content system so the team could ship new case studies without a designer. The result is a site that feels effortless and converts.',
    gallery: [
      'https://picsum.photos/seed/kora-1/1200/800',
      'https://picsum.photos/seed/kora-2/800/1000',
      'https://picsum.photos/seed/kora-3/800/1000',
    ],
    results: [
      { value: '+38%', label: 'Conversion rate' },
      { value: '−42%', label: 'Bounce rate' },
      { value: '2 wks', label: 'To full launch' },
    ],
  },
  {
    id: 2,
    slug: 'kyma',
    title: 'KYMA AI Agency',
    category: 'AI Agency',
    tag: 'UI/UX',
    chip: 'chip-sage',
    image: 'https://picsum.photos/seed/kyma-ai/960/600',
    year: '2025',
    role: 'Product & Brand Designer',
    services: ['Brand', 'UI/UX Design', 'Motion'],
    cover: 'https://picsum.photos/seed/kyma-cover/1600/900',
    intro:
      'Branding and a marketing site for an AI agency that needed to feel cutting-edge without the usual sci-fi clichés.',
    overview:
      'KYMA builds AI products for enterprise teams. We created a confident, human brand and a site that explains complex capability in plain language — backed by motion that demonstrates the product rather than decorating the page.',
    challenge:
      'AI branding is a sea of gradients and glow. KYMA risked blending in with every other agency and scaring off the enterprise buyers they actually needed.',
    solution:
      'We grounded the brand in restraint — sharp typography, a tight palette, and motion used only to clarify. The result reads as trustworthy and senior, which is exactly who their buyers are.',
    gallery: [
      'https://picsum.photos/seed/kyma-1/1200/800',
      'https://picsum.photos/seed/kyma-2/800/1000',
      'https://picsum.photos/seed/kyma-3/800/1000',
    ],
    results: [
      { value: '3.1x', label: 'Demo requests' },
      { value: '+54%', label: 'Time on site' },
      { value: '4 wks', label: 'Brand to launch' },
    ],
  },
  {
    id: 3,
    slug: 'mugen',
    title: 'Mugen Studio',
    category: 'Brand Identity',
    tag: 'Logo design',
    chip: 'chip-lavender',
    image: 'https://picsum.photos/seed/mugen-studio/960/600',
    year: '2024',
    role: 'Brand Designer',
    services: ['Brand Identity', 'Logo', 'Art Direction'],
    cover: 'https://picsum.photos/seed/mugen-cover/1600/900',
    intro:
      'A bold identity for a motion studio that wanted a mark as expressive as the work they make.',
    overview:
      'Mugen needed a brand that could flex across reels, decks and merch while staying instantly recognizable. We built a kinetic identity system around a single adaptable mark.',
    challenge:
      'A static logo would never represent a studio whose whole craft is movement. But a mark that changes constantly risks losing recognition.',
    solution:
      'We designed one core mark with a defined set of motion behaviours — it animates, but always resolves to the same shape, so it’s alive and unmistakable at once.',
    gallery: [
      'https://picsum.photos/seed/mugen-1/1200/800',
      'https://picsum.photos/seed/mugen-2/800/1000',
      'https://picsum.photos/seed/mugen-3/800/1000',
    ],
    results: [
      { value: '2x', label: 'Inbound leads' },
      { value: '100%', label: 'Rebrand adoption' },
      { value: '3 wks', label: 'Delivery' },
    ],
  },
  {
    id: 4,
    slug: 'axiom',
    title: 'Axiom Ecommerce',
    category: 'Ecommerce Site',
    tag: 'Packaging',
    chip: 'chip-peach',
    image: 'https://picsum.photos/seed/axiom-store/960/600',
    year: '2024',
    role: 'Design Lead',
    services: ['UI/UX Design', 'Packaging', 'Shopify'],
    cover: 'https://picsum.photos/seed/axiom-cover/1600/900',
    intro:
      'A premium storefront and packaging system for a DTC brand scaling from one product to a full line.',
    overview:
      'Axiom was outgrowing its starter theme. We designed a flexible storefront and a packaging system that scales with the catalog while keeping the unboxing moment special.',
    challenge:
      'The existing store couldn’t handle more than a handful of products, and the checkout leaked customers at the shipping step.',
    solution:
      'We rebuilt the storefront on a modular component system, streamlined checkout, and created packaging templates the team can reuse for every new SKU.',
    gallery: [
      'https://picsum.photos/seed/axiom-1/1200/800',
      'https://picsum.photos/seed/axiom-2/800/1000',
      'https://picsum.photos/seed/axiom-3/800/1000',
    ],
    results: [
      { value: '+29%', label: 'Checkout completion' },
      { value: '+47%', label: 'AOV' },
      { value: '5 wks', label: 'To launch' },
    ],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
