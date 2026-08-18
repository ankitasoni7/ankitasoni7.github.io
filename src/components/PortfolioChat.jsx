import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal.jsx'

// Lightweight intent engine — each entry matches on keywords, returns an
// answer and a few contextual follow-up chips. Easy to extend (or swap for a
// real LLM endpoint later — see handleAsk).
const KB = [
  {
    id: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'yo', 'sup', 'good morning', 'good evening'],
    answer:
      "Hey! 👋 I'm Creative Brain's assistant. Ask me about projects, process, tools, pricing or availability — or tap a suggestion below.",
    chips: ['What projects?', 'How do you work?', 'Are you available?'],
  },
  {
    id: 'projects',
    keywords: ['project', 'work', 'portfolio', 'case study', 'case studies', 'built', 'made'],
    answer:
      "I've shipped UI/UX work across SaaS dashboards, mobile apps, brand sites and ecommerce. Recent highlights: Kora (consulting), KYMA (AI agency), Mugen (brand identity) and Axiom (ecommerce) — each a full case study covering the problem, the process and the metric it moved.",
    chips: ['Best case study?', 'What was the impact?', 'Which tools?'],
  },
  {
    id: 'best',
    keywords: ['best', 'strongest', 'favorite', 'favourite', 'proud', 'impact', 'result', 'results'],
    answer:
      "Kora is the one I'm proudest of — a full UX overhaul that lifted conversion by 38% in two months by simplifying navigation and adding purposeful micro-interactions. Design that moved a real business number, not just a prettier screen.",
    chips: ['How do you measure success?', 'Show me the process', 'Start a project'],
  },
  {
    id: 'process',
    keywords: ['process', 'flow', 'how do you', 'how does', 'approach', 'method', 'steps', 'workflow'],
    answer:
      "Four steps: 1) a discovery call to lock goals & constraints, 2) strategy + wireframes, 3) high-fidelity design systems, 4) a developer-ready handoff with specs, tokens and assets. I map user goals first, strip out friction, then validate with prototypes.",
    chips: ['How long does it take?', 'What tools?', "What's your pricing?"],
  },
  {
    id: 'tools',
    keywords: ['tool', 'tools', 'software', 'figma', 'framer', 'stack', 'use'],
    answer:
      "Figma for design systems, Framer for interactive prototypes & sites, plus GSAP and motion tools for scroll-driven and micro-interactions. Whatever ships the idea cleanly.",
    chips: ['Do you do animations?', 'How do you work?', 'See projects'],
  },
  {
    id: 'animation',
    keywords: ['animation', 'animations', 'motion', 'interaction', 'micro', 'gsap', 'scroll'],
    answer:
      "Always — motion is part of the design, not decoration. I use micro-interactions and scroll-driven animation to give feedback, guide attention and make a product feel alive (this very site is a demo of that).",
    chips: ['Best case study?', 'Which tools?', 'Start a project'],
  },
  {
    id: 'services',
    keywords: ['service', 'services', 'offer', 'do you do', 'help with', 'can you'],
    answer:
      "Core services: UI/UX design, motion design, and art direction — from product interfaces to brand identity and the systems that hold them together.",
    chips: ['Whats your process?', 'Pricing?', 'Are you available?'],
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'budget', 'rate', 'rates', 'how much', 'expensive'],
    answer:
      "Projects are scoped per engagement rather than hourly, so you get a fixed, predictable number up front. Share a bit about your project on a quick call and I'll send a tailored proposal.",
    chips: ['Book a call', 'How long does it take?', 'Are you available?'],
  },
  {
    id: 'timeline',
    keywords: ['long', 'time', 'timeline', 'duration', 'weeks', 'fast', 'quick', 'when'],
    answer:
      "Most engagements run 3–6 weeks depending on scope. You get a clear timeline with milestones before we start — no surprises.",
    chips: ['Pricing?', 'Are you available?', 'Whats your process?'],
  },
  {
    id: 'availability',
    keywords: ['available', 'availability', 'hire', 'hiring', 'free', 'booking', 'slot', 'start'],
    answer:
      "Yes — currently taking on new projects for the next cycle. Spots are limited, so the earlier we talk the better.",
    chips: ['Book a call', 'Pricing?', 'What projects?'],
  },
  {
    id: 'contact',
    keywords: ['contact', 'email', 'reach', 'book', 'call', 'talk', 'connect', 'get in touch'],
    answer:
      "Easiest is to book a call or email hello@creativebrain.design — tell me about your project and goals, and I'll come prepared with ideas.",
    chips: ['Are you available?', 'Pricing?', 'What projects?'],
  },
  {
    id: 'about',
    keywords: ['who', 'about', 'background', 'experience', 'you', 'yourself', 'story', 'years'],
    answer:
      "Originally from CDMX, I've spent 10+ years designing identities and products for startups, restaurants, hoteliers and creative founders — blending strategy with craft so every screen earns its place.",
    chips: ['What projects?', 'Best case study?', 'Start a project'],
  },
]

const FALLBACK = {
  answer:
    "Good question — I usually explain that best through my work. Want a project breakdown, or should I point you to a quick call?",
  chips: ['What projects?', 'How do you work?', 'Book a call'],
}

const INITIAL_CHIPS = ['What projects?', 'Best work?', 'Your process', 'Tools', 'Pricing']

function getResponse(text) {
  const q = text.toLowerCase()
  let best = null
  let bestScore = 0
  for (const item of KB) {
    const score = item.keywords.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0)
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  return best && bestScore > 0 ? best : FALLBACK
}

let msgId = 0

export default function PortfolioChat() {
  const [messages, setMessages] = useState([
    {
      id: msgId++,
      type: 'bot',
      text: "Hey 👋 ask me anything about my design work, process or availability.",
    },
  ])
  const [chips, setChips] = useState(INITIAL_CHIPS)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  // keep the conversation scrolled to the latest message
  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  const handleAsk = (text) => {
    const clean = text.trim()
    if (!clean || typing) return

    setMessages((m) => [...m, { id: msgId++, type: 'user', text: clean }])
    setInput('')
    setTyping(true)

    // simulated "thinking" delay. To use a real LLM instead, replace this
    // block with a fetch to your endpoint and setMessages with the reply.
    setTimeout(() => {
      const res = getResponse(clean)
      setTyping(false)
      setMessages((m) => [...m, { id: msgId++, type: 'bot', text: res.answer }])
      setChips(res.chips || INITIAL_CHIPS)
    }, 700)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleAsk(input)
  }

  return (
    <section id="assistant" className="pchat-section">
      <div className="container">
        <Reveal className="section-head pchat-head-text">
          <span className="section-eyebrow">AI Assistant</span>
          <h2 className="section-title">Ask my portfolio anything</h2>
          <p className="section-sub">
            Curious about my projects, process or availability? Ask away — answers in seconds.
          </p>
        </Reveal>

        <Reveal className="pchat" delay={100}>
          {/* Header */}
          <div className="pchat-head">
            <span className="pchat-avatar">CB</span>
            <div className="pchat-head-meta">
              <span className="pchat-head-name">Creative Brain Assistant</span>
              <span className="pchat-head-status">
                <span className="availability-dot" /> Online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="pchat-body" ref={bodyRef}>
            {messages.map((m) => (
              <div key={m.id} className={`pchat-msg pchat-msg--${m.type}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="pchat-msg pchat-msg--bot">
                <span className="pchat-typing">
                  <span className="pchat-dot" />
                  <span className="pchat-dot" />
                  <span className="pchat-dot" />
                </span>
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          <div className="pchat-chips">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                className="pchat-chip"
                onClick={() => handleAsk(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Input */}
          <form className="pchat-input" onSubmit={onSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something about my work…"
              aria-label="Ask the portfolio assistant"
            />
            <button type="submit" className="btn btn-primary" disabled={!input.trim()}>
              Send
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
