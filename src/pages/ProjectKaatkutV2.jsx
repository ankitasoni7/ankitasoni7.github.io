import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ChapterScreens from '../components/ChapterScreens.jsx'
import NextProject from '../components/NextProject.jsx'

const BASE = '/projects/project3/final-screens/'

/* ── overview ───────────────────────────────────────────────────────── */

const meta = [
  ['Role', 'Lead Product Designer', 'Research → IA → UI → handoff'],
  ['Timeline', '12 weeks', 'Discovery to handoff'],
  ['Team', '1 designer · 4 engineers', 'Product owner + ops'],
  ['Platforms', 'Web & mobile app', 'Responsive design system'],
  ['Market', 'India · ₹', 'Localized, 4 languages'],
]

const tags = ['Survey Research', 'Affinity Mapping', 'Personas', 'IA', 'User Flows',
  'Interaction Design', 'Accessibility', 'Design System', 'Developer Handoff']

const tldr = [
  ['The problem', 'People buy meat by sight, smell and touch. Online, every one of those checks disappears — and the doubt lands as an abandoned cart.'],
  ['My approach', 'A survey of 32 shoppers, an affinity map that produced four themes, then two structural decisions argued out in sketches before any UI was drawn.'],
  ['The outcome', 'One storefront carrying household orders, a membership, catering and wholesale credit — with a product page and checkout designed to answer doubt rather than decorate it.'],
]

const objectives = [
  ['Understand', 'What makes someone abandon a raw-meat order they’d happily place at a counter.'],
  ['Reduce', 'The uncertainty between choosing a cut and receiving it.'],
  ['Reach', 'Household cooks who manage the shopping but avoid text-heavy apps.'],
  ['Extend', 'One system into catering and wholesale without forking the product.'],
]

/* ── research ───────────────────────────────────────────────────────── */

const method = [
  ['Method', 'A 14-question Google Forms survey, distributed through local cooking and neighbourhood groups. Chosen over interviews to reach a wider spread of ages in the same two weeks.'],
  ['Who answered', '32 responses. Working adults living away from home for work or study, and the household cooks — often 45+ — who actually place the family’s order.'],
  ['What I looked for', 'Not feature requests. The moment in an existing app where each person stopped trusting it, and what they did next.'],
]

/* survey quotes grouped into the four themes they clustered into */
const board = [
  ['01', 'Can’t verify the product', 'y', [
    ['“The photo is always a stock photo. I don’t know what I’m getting.”', 'R04 · 34'],
    ['“One pack could be two pieces or six. Nobody says.”', 'R11 · 52'],
  ]],
  ['02', 'Weight and price don’t line up', 'b', [
    ['“500g of what? With bone, without? The price hides it.”', 'R07 · 41'],
    ['“I paid for a kilo and half of it was packaging.”', 'R19 · 29'],
  ]],
  ['03', 'Delivery is the risk', 'g', [
    ['“Nobody was home. The chicken sat outside for three hours.”', 'R02 · 38'],
    ['“I need to know the hour, not ‘today’.”', 'R25 · 31'],
  ]],
  ['04', 'The app itself is the barrier', 'c', [
    ['“My daughter orders for me. The typing is too much.”', 'R14 · 58'],
    ['“I would use it in Gujarati. In English I make mistakes.”', 'R29 · 47'],
  ]],
]

const bothNeeded = [
  'To see exactly which cut arrives',
  'Weight stated the same way everywhere',
  'A delivery hour, not a delivery day',
  'To order without fighting the interface',
  'A reason to trust a shop they’ve never used',
]

/* ── personas ───────────────────────────────────────────────────────── */

const personas = [
  {
    ini: 'K', name: 'Kannan · 28', sub: 'Developer · Mumbai',
    type: 'The convenience buyer',
    quote: '“If fresh fish sits on my porch for two hours while I’m at work, it spoils.”',
    facts: [
      ['Needs', 'Delivery he can plan a work week around.'],
      ['Blocked by', 'Vague windows, vaguer cuts.'],
      ['Answered by', 'A two-hour slot, chosen at checkout.'],
    ],
  },
  {
    ini: 'T', name: 'Thresiamma · 53', sub: 'Retired nurse · Ahmedabad',
    type: 'The traditional cook',
    quote: '“Online stores just say ‘1 Pack.’ At the butcher, I choose the exact cut.”',
    facts: [
      ['Needs', 'Her butcher’s standards, on a screen.'],
      ['Blocked by', 'Dense search, detail below the fold.'],
      ['Answered by', 'Voice search, her language, a visual cut selector.'],
    ],
  },
]

/* ── problem ────────────────────────────────────────────────────────── */

const frictions = [
  ['01', 'You can’t inspect it', 'No way to check the cut, the thickness or the smell before paying.'],
  ['02', 'Weights don’t match', 'Net vs. gross hidden or mixed up, so the price looks like it’s concealing something.'],
  ['03', 'A missed slot ruins it', 'Perishable food on a doorstep spoils, which makes checkout the tensest step.'],
  ['04', 'Nobody knows the brand', 'A new marketplace has no habit and no reputation to lean on.'],
]

/* ── ideation ───────────────────────────────────────────────────────── */

const ideas = [
  ['Show net and gross weight on every single surface.', -2.4],
  ['Let people pick the cut the way they would at the counter.', 1.8],
  ['Voice search, so nobody has to spell “pomfret”.', -1.6],
  ['Four languages, switchable in one tap.', 2.2],
  ['Give a first-time buyer a coupon they win, not a banner.', -2],
  ['One clear delivery hour, promised at checkout.', 1.5],
]

/* ── structure options ──────────────────────────────────────────────── */

const SkCategory = () => (
  <svg viewBox="0 0 150 112" className="kk-sk" aria-hidden="true">
    {[0, 1].map((r) => [0, 1, 2].map((c) => (
      <rect key={`${r}${c}`} x={16 + c * 40} y={18 + r * 44} width="32" height="34" rx="5" />
    )))}
    <path d="M20 96h48" className="faint" />
  </svg>
)
const SkRecipe = () => (
  <svg viewBox="0 0 150 112" className="kk-sk" aria-hidden="true">
    <rect x="18" y="14" width="114" height="44" rx="8" />
    <path d="M30 32h44M30 44h30" />
    <rect className="faint" x="18" y="66" width="52" height="30" rx="6" />
    <rect className="faint" x="80" y="66" width="52" height="30" rx="6" />
  </svg>
)
const SkHybrid = () => (
  <svg viewBox="0 0 150 112" className="kk-sk" aria-hidden="true">
    {[0, 1, 2].map((c) => <rect key={c} x={16 + c * 40} y="14" width="32" height="30" rx="5" />)}
    <rect x="16" y="56" width="118" height="24" rx="6" className="soft" />
    <path d="M28 68h40" /><path d="M84 68h20" className="faint" />
    <path d="M112 62l8 6-8 6" />
    {[0, 1, 2].map((c) => <rect key={`b${c}`} className="faint" x={16 + c * 40} y="90" width="32" height="12" rx="4" />)}
  </svg>
)

const options = [
  [SkCategory, 'Explored', 'Category only', 'Chicken, mutton, seafood — the way the warehouse is organised.',
    'Dropped — leaves the shopper doing the recipe maths in their head.', false],
  [SkRecipe, 'Considered', 'Recipe first', 'Lead with dishes, treat individual cuts as the secondary path.',
    'Dropped — punishes the repeat buyer who came for one cut.', false],
  [SkHybrid, 'Selected', 'Categories, recipes threaded', 'Browse by cut; meet recipes where they’re useful — the product page and the cart.',
    'Chosen — one tap adds a full ingredient list, without slowing anyone down.', true],
]

/* ── the three bets · hand-drawn concepts ───────────────────────────── */

const SkHealth = () => (
  <svg viewBox="0 0 264 200" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#kkRough2)">
      <rect className="hd" x="8" y="8" width="248" height="184" />
      <rect className="hd" x="18" y="22" width="62" height="22" rx="11" />
      <rect className="hd faint" x="86" y="22" width="72" height="22" rx="11" />
      <rect className="hd faint" x="164" y="22" width="82" height="22" rx="11" />
      <path className="hd faint dash" d="M14 58 H250" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect className="hd faint" x="18" y={70 + r * 40} width="44" height="30" rx="5" />
          <path className="hd faint" d={`M70 ${80 + r * 40} h120`} />
          <path className="hd faint" d={`M70 ${92 + r * 40} h70`} />
          <rect className="hd" x="200" y={76 + r * 40} width="44" height="18" rx="9" />
        </g>
      ))}
    </g>
    <text className="hxs" x="26" y="37">Protein</text>
    <text className="hxs faintx" x="94" y="37">Skin &amp; hair</text>
    <text className="hxs faintx" x="172" y="37">Iron rich</text>
    <text className="hxs" x="70" y="79">Chicken breast · lean</text>
    <text className="hxs faintx" x="70" y="91">31g protein / 100g</text>
    <text className="hxs" x="210" y="89">Add</text>
    <text className="hxs" x="70" y="119">Salmon fillet</text>
    <text className="hxs faintx" x="70" y="131">Omega-3, collagen</text>
    <text className="hxs" x="210" y="129">Add</text>
    <text className="hxs" x="70" y="159">Mutton liver</text>
    <text className="hxs faintx" x="70" y="171">Iron, B12</text>
    <text className="hxs" x="210" y="169">Add</text>
  </svg>
)

const SkVoice = () => (
  <svg viewBox="0 0 264 200" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#kkRough2)">
      <rect className="hd" x="8" y="8" width="248" height="184" />
      <rect className="hd" x="18" y="22" width="228" height="30" rx="15" />
      <circle className="hd soft" cx="226" cy="37" r="11" />
      <path className="hd" d="M226 32 v8" />
      <path className="hd faint" d="M40 74 q8 -14 16 0 M64 68 q8 -22 16 0 M88 76 q8 -10 16 0 M112 66 q8 -26 16 0 M136 74 q8 -14 16 0" />
      <path className="hd faint dash" d="M14 92 H250" />
      {[0, 1].map((r) => (
        <g key={r}>
          <rect className="hd faint" x="18" y={104 + r * 44} width="40" height="32" rx="5" />
          <path className="hd faint" d={`M66 ${116 + r * 44} h96`} />
          <rect className="hd" x="196" y={110 + r * 44} width="48" height="20" rx="10" />
        </g>
      ))}
    </g>
    <text className="hxs faintx" x="30" y="42">“half kilo pomfret”</text>
    <text className="hxs" x="66" y="115">Silver pomfret · 500g</text>
    <text className="hxs" x="206" y="124">Add</text>
    <text className="hxs" x="66" y="159">Black pomfret · 500g</text>
    <text className="hxs" x="206" y="168">Add</text>
  </svg>
)

const SkLang = () => (
  <svg viewBox="0 0 264 200" className="mv-hand mv-hand--sk" aria-hidden="true">
    <g filter="url(#kkRough2)">
      <rect className="hd" x="8" y="8" width="248" height="184" />
      <rect className="hd" x="18" y="20" width="228" height="28" rx="6" />
      <circle className="hd" cx="36" cy="34" r="8" />
      <rect className="hd soft" x="18" y="60" width="110" height="26" rx="6" />
      <rect className="hd faint" x="18" y="92" width="110" height="26" rx="6" />
      <rect className="hd faint" x="18" y="124" width="110" height="26" rx="6" />
      <rect className="hd faint" x="18" y="156" width="110" height="26" rx="6" />
      <path className="hd faint" d="M150 70 h90 M150 86 h60 M150 110 h90 M150 126 h44" />
      <rect className="hd faint" x="150" y="146" width="96" height="30" rx="6" />
    </g>
    <text className="hxs" x="52" y="38">Language</text>
    <text className="hxs" x="28" y="78">English</text>
    <text className="hxs faintx" x="28" y="110">हिंदी</text>
    <text className="hxs faintx" x="28" y="142">ગુજરાતી</text>
    <text className="hxs faintx" x="28" y="174">मराठी</text>
    <text className="hxs faintx" x="160" y="165">₹ · weights · dates</text>
  </svg>
)

const bets = [
  {
    Sk: SkHealth,
    n: 'Bet 01',
    title: 'Shop by what the food does, not only what it is',
    why: 'Survey answers kept arriving in nutrition language — protein after the gym, iron for a parent, something lighter for skin. Nobody was asking for “chicken”; they were asking what to cook for a reason.',
    what: 'A health lens over the same catalogue. Pick a goal — high protein, skin & hair, iron rich, low fat — and the storefront filters to the cuts and fish that serve it, each card stating why it qualifies.',
    decision: 'A lens, not a separate shop. Goals sit beside the categories rather than replacing them, so one inventory serves both paths and nothing has to be stocked or photographed twice.',
    guard: 'Written as guidance, never as a health claim — “31g protein per 100g”, not “cures” anything. Legal reviewed the wording before it shipped.',
  },
  {
    Sk: SkVoice,
    n: 'Bet 02',
    title: 'Let people say it instead of spelling it',
    why: 'The 45+ cooks in the survey were the ones placing the family order, and the ones most likely to give up. Fish names are the trap — pomfret, seer, rohu are easy to say and hard to type.',
    what: 'A mic on every list. Speak the order in any supported language and matching cuts appear, ready to add to the cart at the right weight.',
    decision: 'Voice returns a list to confirm; it never adds blind. In a perishable category a wrong item is a refund and a spoiled delivery, so the extra tap buys back far more than it costs.',
    guard: 'Cut before build: “say it and it’s in the basket.” It demoed well and failed the first hallway test — two of five people ordered the wrong fish.',
  },
  {
    Sk: SkLang,
    n: 'Bet 03',
    title: 'Four languages, one tap from anywhere',
    why: '“I would use it in Gujarati. In English I make mistakes.” English-only wasn’t a polish problem, it was the reason a whole household segment handed the phone to someone younger.',
    what: 'English, Hindi, Gujarati and Marathi, switched from the header rather than buried in settings — and the choice persists, so it’s a one-time decision.',
    decision: 'Weights, currency and dates localize with the language. A half-translated screen reads as less trustworthy than an English one, which is the opposite of the point.',
    guard: 'Strings live outside the build so operations can add a language without waiting for a release.',
  },
]

/* ── design system ──────────────────────────────────────────────────── */

const systemNotes = [
  ['Weight token', 'Net and gross ship as one component. Never one without the other.'],
  ['Out-of-stock catch', 'Suggests the nearest cut by culinary category instead of a dead end.'],
  ['One product card', 'Survives the grid, the recipe rail and the cart unchanged.'],
  ['Checkout rail', 'Four steps, summary pinned right on all of them.'],
]

const a11y = [
  ['Contrast', 'WCAG 2.1 AA — the red is used for actions and price, never for body text.'],
  ['Targets', '44px minimum, reachable one-handed on a 6.1" screen.'],
  ['Input', 'Voice search on every list, so nothing depends on spelling.'],
  ['Language', 'English, Hindi, Gujarati and Marathi, switchable in one tap.'],
]

/* ── final screens ──────────────────────────────────────────────────── */

const chapters = [
  {
    key: 'home',
    kicker: '01 / Home',
    title: 'The Kaatkut Home Screen',
    desc: 'Language toggle, voice search and the Lucky Chicken game in the first screen — trust and the reason to come back, side by side.',
    img: BASE + 'homepage.png',
  },
  {
    key: 'detail',
    kicker: '02 / Product Detail',
    title: 'Choose the cut, see the weight',
    desc: 'Skin-on, skinless or centre-cut, each with its own net and gross weight — plus the recipes that turn one cut into dinner.',
    img: BASE + 'productdetail.png',
  },
  {
    key: 'cart',
    kicker: '03 / Cart',
    title: 'Offers, tip and the total',
    desc: 'Items and weights on the left, coupon and payment summary on the right, cancellation policy before the order rather than after.',
    img: BASE + 'cartstep1.png',
  },
  {
    key: 'checkout',
    kicker: '04 / Checkout',
    title: 'Four steps, one summary',
    desc: 'Address, a two-hour slot, and every payment method the market actually uses — the summary never leaves the screen.',
    img: BASE + 'cartstep2.png',
  },
  {
    key: 'desktop',
    kicker: '05 / Membership & B2B',
    title: 'Households and kitchens',
    desc: 'The Meat Club, event catering and wholesale credit, each with its own way in.',
    img: BASE + 'desktop.png',
  },
]

/* ── impact ─────────────────────────────────────────────────────────── */

const impact = [
  ['Product verification', 'Fixed descriptions, hidden weights', 'Cut selector + paired weights', 'Fewer drop-offs at selection'],
  ['Accessibility', 'English, typed', 'Four languages + voice', 'Reaches the 50+ cook'],
  ['Cold-start trust', 'Banner discounts', 'Lucky Chicken coupon', 'Cheaper first order to try'],
  ['Logistics', 'Vague delivery blocks', 'Two-hour slots, pinned summary', 'Fewer cancellations'],
]

const takeaways = [
  ['01', 'Consistency is trust.', 'Show a weight two different ways and people assume you’re hiding something. One component fixed that everywhere at once.'],
  ['02', 'Accessibility opened a market.', 'Voice and four languages weren’t a compliance box — they were how the 50-something cook who actually buys the meat gets in.'],
  ['03', 'A game only works if it pays.', 'The homepage game earned its place because it hands a first-time buyer a real coupon, not because it’s fun.'],
]

/* ── sticky chapter nav ─────────────────────────────────────────────── */
const STEPS = [
  ['01', 'Brief', 'brief'], ['02', 'Research', 'research'], ['03', 'Problem', 'problem'],
  ['04', 'Explore', 'explore'], ['05', 'Decide', 'decide'], ['06', 'System', 'system'],
  ['07', 'Screens', 'screens'], ['08', 'Impact', 'impact'],
]

function ChapterNav() {
  const [active, setActive] = useState('brief')
  const root = useRef(null)

  useEffect(() => {
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
        <span className="mv-nav-brand">Kaatkut · Case study</span>
        <ul>
          {STEPS.map(([n, label, id]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => go(e, id)}
                className={active === id ? 'is-on' : undefined}
                aria-current={active === id ? 'true' : undefined}>
                <i>{n}</i>{label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#screens" onClick={(e) => go(e, 'screens')} className="mv-nav-cta">See the screens</a>
      </div>
    </nav>
  )
}

const Head = ({ n, eyebrow, title, lead, wide }) => (
  <Reveal className={`mv-head${wide ? ' mv-head--wide' : ''}`}>
    <span className="mv-eyebrow"><i>{n}</i>{eyebrow}</span>
    {title && <h2>{title}</h2>}
    {lead && <p>{lead}</p>}
  </Reveal>
)

/* ── page ───────────────────────────────────────────────────────────── */

export default function ProjectKaatkutV2() {
  return (
    <main className="mv kk">
      <svg width="0" height="0" className="mv-defs" aria-hidden="true"><defs>
        <filter id="kkRough2" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="19" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.9" />
        </filter>
      </defs></svg>

      {/* ══ HERO ══ */}
      <section className="mv-sec kk-hero">
        <div className="container kk-hero-grid">
          <div>
            <Reveal as="span" className="mv-kicker">
              <span className="mv-kicker-dot" aria-hidden="true">k</span>
              Kaatkut · Raw meat &amp; seafood, delivered
            </Reveal>
            <Reveal as="h1" className="mv-h1" delay={60}>
              Selling meat you <em>can’t touch.</em>
            </Reveal>
            <Reveal as="p" className="mv-h1-sub" delay={120}>
              A storefront, a checkout and a wholesale pipeline for the one category
              shoppers refuse to buy on trust alone.
            </Reveal>
            <Reveal className="mv-hero-actions" delay={180}>
              <a className="mv-btn mv-btn--dark" href="#screens">See the screens <span aria-hidden="true">→</span></a>
              <a className="mv-btn mv-btn--ghost" href="#problem">Read the story</a>
            </Reveal>
          </div>

          <Reveal className="kk-hero-shot" delay={140}>
            <img src={BASE + 'homepage.png'} alt="Kaatkut home screen"
              onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </Reveal>
        </div>
      </section>

      <ChapterNav />

      {/* ══ META · TAGS · TL;DR ══ */}
      <section className="mv-sec mv-sec--tight">
        <div className="container">
          <Reveal className="mv-meta">
            {meta.map(([k, v, s]) => <div key={k}><span>{k}</span><b>{v}</b><i>{s}</i></div>)}
          </Reveal>
          <Reveal className="mv-tags" delay={80}>{tags.map((t) => <span key={t}>{t}</span>)}</Reveal>
          <Reveal className="mv-tldr" delay={120}>
            {tldr.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
          </Reveal>
          <Reveal as="p" className="kk-note" delay={160}>
            Built for the Indian market — every screen shows localized cities, languages and ₹ pricing.
          </Reveal>
        </div>
      </section>

      {/* ══ 01 · THE BRIEF ══ */}
      <section id="brief" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="01" eyebrow="The brief" title="Sell the one thing people insist on inspecting"
            lead="Kaatkut had the supply chain and the cold storage. What it didn’t have was a reason for someone to buy a fillet from a screen instead of the butcher two streets away — and a second business selling the same stock by the crate." />
          <div className="mv-obj kk-obj kk-obj--4">
            {objectives.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
          </div>
          <Reveal as="p" className="kk-note" delay={120}>
            Constraint I designed against from week one: one codebase had to serve a household
            buying 500g and a restaurant buying 40kg on monthly credit.
          </Reveal>
        </div>
      </section>

      {/* ══ 02 · RESEARCH ══ */}
      <section id="research" className="mv-sec">
        <div className="container">
          <Head n="02" eyebrow="Research" title="32 shoppers, one repeated moment"
            lead="I wasn’t looking for features. I was looking for the point in an existing app where each person stopped trusting it — because that’s the moment the design has to answer." />

          <Reveal className="mv-tasks kk-method">
            {method.map(([k, v]) => <div key={k}><span>{k}</span><i>{v}</i></div>)}
          </Reveal>

          <div className="kk-sub">
            <Head n="02 · b" eyebrow="Synthesis" title="Grouping the answers gave four themes" sub
              lead="Every quote from the survey went on the board. They clustered — and the four clusters became the problems the product had to solve." />
            <Reveal className="mv-board">
              {board.map(([idx, label, tone, notes]) => (
                <div className="mv-board-col" key={idx}>
                  <div className="mv-board-label"><span>{idx}</span>{label}</div>
                  <div className="mv-board-stack">
                    {notes.map(([text, who], i) => (
                      <div className={`mv-sticky ${tone}`} key={text}
                        style={{ '--r': `${i % 2 ? 1.8 : -2}deg` }}>
                        <p>{text}</p><span>{who}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal className="mv-needs" delay={80}>
              <h4>What every respondent needed, in some form</h4>
              <ul>{bothNeeded.map((n) => <li key={n}>{n}</li>)}</ul>
            </Reveal>
          </div>

          <div className="kk-sub">
            <Head n="02 · c" eyebrow="Who it’s for" title="Two shoppers, the same doubt" sub
              lead="The bookends of the survey group. One buys around a packed work week; the other won’t lower the standards she gets from her butcher." />
            <div className="mv-personas">
              {personas.map((p, i) => (
                <Reveal className="mv-persona" key={p.name} delay={i * 90}>
                  <div className="mv-persona-top">
                    <span className="mv-persona-av">{p.ini}</span>
                    <div><b>{p.name}</b><span>{p.sub}</span></div>
                  </div>
                  <span className="kk-persona-type">{p.type}</span>
                  <p className="mv-persona-quote">{p.quote}</p>
                  <div className="mv-persona-grid kk-persona-grid">
                    {p.facts.map(([k, v]) => <div key={k}><span>{k}</span><p>{v}</p></div>)}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 03 · PROBLEM ══ */}
      <section id="problem" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="03" eyebrow="The problem" title="Four reasons the cart gets abandoned" wide
            lead="Raw meat is judged at a counter. Take the counter away and every one of those checks turns into a doubt — and each doubt has a cost the business can name: a cart left behind, a refund, a customer who never returns." />
          <div className="mv-pchars kk-frictions">
            {frictions.map(([n, t, d], i) => (
              <Reveal className="mv-pchar" key={n} delay={i * 80}>
                <span className="mv-pchar-n">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 04 · OPPORTUNITY + IDEATION ══ */}
      <section id="explore" className="mv-sec">
        <div className="container">
          <Reveal className="mv-head mv-head--wide">
            <span className="mv-eyebrow"><i>04</i>The opportunity</span>
            <p className="mv-hmw">
              How might we give a shopper the <b>certainty of the counter</b> — before they pay?
            </p>
          </Reveal>

          <Head n="04 · b" eyebrow="Ideation" title="Turning each doubt into a move" sub
            lead="A working session with the product owner and two engineers, so nothing on the board was already impossible." />

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

      {/* ══ 05 · DECIDE ══ */}
      <section id="decide" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="05" eyebrow="Structural decision" title="Three layouts, one question"
            lead="Does a shopper come here for an ingredient, or for tonight’s dinner? I sketched all three answers before committing to one." />

          <div className="mv-evo">
            {options.map(([Sk, tag, t, d, v, win], i) => (
              <Reveal className={`mv-evo-card${win ? ' is-win' : ''}`} key={t} delay={i * 90}>
                <div className="mv-evo-sk"><Sk /></div>
                <span className="mv-evo-tag">{tag}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                <div className={`mv-verdict${win ? ' yes' : ''}`}>{v}</div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mv-decision">
            <span className="mv-eyebrow"><i>05 · b</i>Key decision</span>
            <h3>Weight sits next to price. Every time.</h3>
            <div className="mv-think">
              <div>
                <span>What the catalogue says</span>
                <p>“Atlantic salmon — ₹500”</p>
              </div>
              <div className="is-real">
                <span>What the cook needs</span>
                <p>“Net 650g · gross 770g — ₹500”</p>
              </div>
            </div>
            <p className="mv-decision-p">
              A price without a weight is unusable here — and a weight you have to hunt for reads
              as one that’s being hidden. So the two ship as a single component, and no screen is
              allowed to show one without the other.
            </p>
          </Reveal>

          <div className="kk-sub">
            <Head n="05 · c" eyebrow="Three bets" title="What makes this one different from the other meat apps" sub
              lead="Weight and slot transparency get Kaatkut to parity. These three are the reasons someone would choose it — each one traced back to something the survey said, and each with the trade-off it cost." />

            {bets.map((b, i) => (
              <Reveal className={`kk-bet${i % 2 ? ' is-flip' : ''}`} key={b.n} delay={60}>
                <div className="kk-bet-sk"><b.Sk /></div>
                <div className="kk-bet-copy">
                  <span className="kk-bet-n">{b.n}</span>
                  <h3>{b.title}</h3>
                  <div className="kk-bet-rows">
                    <div><span>Why</span><p>{b.why}</p></div>
                    <div><span>What it does</span><p>{b.what}</p></div>
                    <div><span>The call I made</span><p>{b.decision}</p></div>
                  </div>
                  <p className="kk-bet-guard">{b.guard}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="kk-sub">
            <Head n="05 · d" eyebrow="Architecture & flow" title="The path from install to placed order" sub
              lead="Onboarding, browsing, cart and checkout argued about as one system before any screen was drawn." />
            <Reveal as="figure" className="mv-diagram">
              <figcaption>Primary user flow</figcaption>
              <div className="mv-diagram-scroll">
                <img src="/projects/project3/diagram/userflow/kaatkut_userflow1.svg"
                  alt="Kaatkut user flow from onboarding through browsing, cart and checkout" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 06 · DESIGN SYSTEM ══ */}
      <section id="system" className="mv-sec">
        <div className="container">
          <Head n="06" eyebrow="Design system" title="A small kit, handed over clean"
            lead="Enough shared parts that web and mobile could be built in twelve weeks without redrawing the same object twice." />

          <div className="mv-ds">
            <Reveal className="mv-ds-block">
              <span className="mv-ds-k">Colour</span>
              <div className="mv-sw-row">
                {[['#E51A00', 'Kaatkut red'], ['#1A1A18', 'Ink'], ['#6B6B66', 'Muted'],
                  ['#FFF8F0', 'Paper'], ['#E7E7E3', 'Line'], ['#2E8B63', 'Success']].map(([hex, n]) => (
                  <div className="mv-sw" key={hex}>
                    <span className="mv-chip" style={{ background: hex }} />
                    <b>{n}</b><i>{hex}</i>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mv-ds-block" delay={80}>
              <span className="mv-ds-k">Components</span>
              <div className="mv-ds-comp">
                <span className="mv-ds-btn is-dark kk-btn">Add to basket</span>
                <span className="mv-ds-btn">Skin-on</span>
                <span className="kk-weight"><b>Net</b> 450g</span>
                <span className="kk-weight kk-weight--gross"><b>Gross</b> 550g</span>
                <span className="mv-ds-chip">ENG · हिंदी · ગુજરાતી · मराठी</span>
              </div>
            </Reveal>

            <Reveal className="mv-ds-block" delay={120}>
              <span className="mv-ds-k">Rules the build inherited</span>
              <div className="mv-ds-found">
                {systemNotes.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}
              </div>
            </Reveal>

            <Reveal className="mv-ds-block" delay={160}>
              <span className="mv-ds-k">Accessibility</span>
              <div className="mv-ds-found">
                {a11y.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 07 · FINAL SCREENS ══ */}
      <section id="screens" className="mv-sec mv-sec--flush">
        <div className="container">
          <Head n="07" eyebrow="Final screens" title="The product, one chapter at a time"
            lead="Each screen is introduced, then cut open and walked through end to end." />
        </div>
      </section>

      <ChapterScreens chapters={chapters} />

      {/* ══ 08 · IMPACT ══ */}
      <section id="impact" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="08" eyebrow="Impact" title="What each change was built to move"
            lead="Targets set during design — the product went to handoff before launch metrics existed, so these are what I’d hold the build to, not results I measured." />

          <Reveal className="kk-table-wrap">
            <table className="kk-table">
              <thead>
                <tr><th>Friction</th><th>Before</th><th>Now</th><th>Target</th></tr>
              </thead>
              <tbody>
                {impact.map(([a, b, c, d]) => (
                  <tr key={a}>
                    <td><b>{a}</b></td>
                    <td className="is-before">{b}</td>
                    <td>{c}</td>
                    <td className="is-metric">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* ══ CLOSING ══ */}
      <section className="mv-sec mv-sec--tint">
        <div className="container">
          <Reveal className="mv-close">
            <div>
              <span className="mv-eyebrow"><i>—</i>Working with me</span>
              <h2>Designing commerce products in Vancouver, BC</h2>
              <p>
                UI/UX designer, 6+ years across healthcare, education, e-commerce, food retail
                and automotive — research through to a build engineers can ship. Available now,
                on Pacific time.
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
        to="/mlmt-v2"
        title="My Last Minute Trip"
        category="Travel · Post-booking"
        tag="UI/UX · 2025"
        image="/projects/home-v2/mlmt.png"
      />
    </main>
  )
}
