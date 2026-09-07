import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import ChapterScreens from '../components/ChapterScreens.jsx'
import NextProject from '../components/NextProject.jsx'

const BASE = '/projects/project3/final-screens/'

/* ── overview ───────────────────────────────────────────────────────── */

const meta = [
  ['Role', 'Lead Product Designer', 'Discovery → handoff'],
  ['Timeline', '12 weeks', 'Web + mobile app'],
  ['Domain', 'D2C fresh food', 'Raw meat & seafood'],
  ['Market', 'India', 'Localized · ₹'],
  ['Tools', 'Figma', 'Design system · handoff'],
]

const tags = ['UX Strategy', 'IA', 'Personas', 'Accessibility', 'Gamification',
  'Design System', 'B2B Funnels', 'Handoff']

const tldr = [
  ['The problem', 'People buy meat by sight, smell and touch. Online, all of that is gone — and the doubt shows up as an abandoned cart.'],
  ['My approach', 'Show the facts a butcher would say out loud, remove the language and typing barriers, and give a brand-new shop a reason to be opened twice.'],
  ['The outcome', 'One storefront carrying consumer orders, a membership, catering and wholesale credit — behind a four-step checkout that never hides the summary.'],
]

/* ── problem ────────────────────────────────────────────────────────── */

const frictions = [
  ['01', 'You can’t inspect it', 'No way to check the cut, the thickness or the smell before paying.'],
  ['02', 'Weights don’t match', 'Net vs. gross hidden or mixed up, so the price looks like it’s concealing something.'],
  ['03', 'A missed slot ruins it', 'Perishable food on a doorstep spoils, which makes checkout the tensest step.'],
  ['04', 'Nobody knows the brand', 'A new marketplace has no habit and no reputation to lean on.'],
]

/* ── ideation ───────────────────────────────────────────────────────── */

const radar = [
  ['Trust', ['Net / gross weight, always paired', 'Cut and prep as a real choice']],
  ['Access', ['Voice search', 'English · हिंदी · ગુજરાતી · मराठी']],
  ['Retention', ['A homepage game', 'Rewards that land in the cart']],
]

/* three structures explored — hand-drawn sketches */
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

/* ── solutions ledger ───────────────────────────────────────────────── */

const ledger = [
  ['You can’t inspect it', 'A visual cut selector — skin-on, skinless, centre-cut — with net and gross weight on every option.'],
  ['Weights don’t match', 'One weight component, reused on the card, the product page, the cart row and the recipe rail.'],
  ['A missed slot ruins it', 'Cart → Address → Time Slot → Payment, with the order summary pinned at every step.'],
  ['Nobody knows the brand', 'A homepage game that drops a real coupon into the cart, so a first order costs less to try.'],
  ['Two audiences, one app', 'Separate entry funnels for households and for kitchens buying by the crate.'],
]

const funnels = [
  ['The Meat Club', 'Annual membership · free delivery, cashback points'],
  ['Event catering', 'Live BBQ setups, on-site chefs, menu builder'],
  ['Wholesale', 'Volume quotes, tiered pricing, monthly invoicing'],
]

/* ── system ─────────────────────────────────────────────────────────── */

const systemNotes = [
  ['Weight token', 'Net and gross ship as one component. Never one without the other.'],
  ['Out-of-stock catch', 'Suggests the nearest cut instead of a dead end.'],
  ['One product card', 'Survives the grid, the recipe rail and the cart unchanged.'],
  ['Checkout rail', 'Four steps, summary pinned right on all of them.'],
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
  ['01', 'Overview', 'overview'], ['02', 'Problem', 'problem'], ['03', 'Decide', 'decide'],
  ['04', 'Who for', 'personas'], ['05', 'Solutions', 'solutions'], ['06', 'System', 'system'],
  ['07', 'Screens', 'screens'], ['08', 'Impact', 'impact'],
]

function ChapterNav() {
  const [active, setActive] = useState('overview')
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
      <section id="overview" className="mv-sec mv-sec--tight">
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

      {/* ══ 02 · PROBLEM ══ */}
      <section id="problem" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="02" eyebrow="The problem" title="Four reasons the cart gets abandoned" wide
            lead="Raw meat is judged at a counter. Take the counter away and every one of those checks turns into a doubt." />
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

      {/* ══ 03 · DECIDE ══ */}
      <section id="decide" className="mv-sec">
        <div className="container">
          <Head n="03" eyebrow="How to structure the shop" title="Three layouts, one question"
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

          <Reveal className="kk-radar">
            <span className="kk-radar-hub">What I designed against</span>
            <div className="kk-radar-cols">
              {radar.map(([t, items]) => (
                <div className="kk-radar-col" key={t}>
                  <b>{t}</b>
                  <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mv-decision">
            <span className="mv-eyebrow"><i>03 · b</i>Key decision</span>
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
              as one that’s being hidden. So the two ship as a single component.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 04 · PERSONAS ══ */}
      <section id="personas" className="mv-sec mv-sec--tint">
        <div className="container">
          <Head n="04" eyebrow="Who it’s for" title="Two shoppers, the same doubt"
            lead="One buys around a packed work week; the other won’t lower the standards she gets from her butcher. Every decision was checked against both." />
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
      </section>

      {/* ══ 05 · SOLUTIONS ══ */}
      <section id="solutions" className="mv-sec">
        <div className="container">
          <Head n="05" eyebrow="Solutions" title="Every doubt, answered on screen"
            lead="The problems from section 02, and the exact part of the product each one turned into." />

          <Reveal className="kk-ledger">
            <div className="kk-ledger-head"><span>The doubt</span><span>What answers it</span></div>
            {ledger.map(([p, s]) => (
              <div className="kk-ledger-row" key={p}>
                <div className="kk-ledger-p">{p}</div>
                <div className="kk-ledger-s">{s}</div>
              </div>
            ))}
          </Reveal>

          <div className="kk-funnels">
            {funnels.map(([k, v], i) => (
              <Reveal key={k} delay={i * 70}><b>{k}</b><span>{v}</span></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 06 · DESIGN SYSTEM ══ */}
      <section id="system" className="mv-sec mv-sec--tint">
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

            <Reveal className="mv-ds-block mv-ds-block--wide" delay={120}>
              <span className="mv-ds-k">Rules the build inherited</span>
              <div className="mv-ds-found">
                {systemNotes.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}
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
