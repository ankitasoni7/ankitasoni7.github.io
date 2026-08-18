import { useState } from 'react'
import Reveal from './Reveal.jsx'

const faqs = [
  {
    q: 'What is your design process?',
    a: 'We start with a discovery call, move into strategy and wireframes, then high-fidelity design, and finish with a developer-ready handoff.',
  },
  {
    q: 'What tools and software do you use?',
    a: 'Primarily Figma for design, Framer for interactive prototypes and sites, and a range of motion tools depending on the project.',
  },
  {
    q: 'How do you measure the success of your designs?',
    a: 'Against the business goals we agree on up front — conversion, retention, activation — not just aesthetics.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most engagements run 3–6 weeks depending on scope. I share a clear timeline before we begin.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">Common queries answered</h2>
        </Reveal>

        <Reveal className="faq-list">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
