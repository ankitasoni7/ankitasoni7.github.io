import { useState } from 'react'
import Reveal from './Reveal.jsx'
import ScrollText from './ScrollText.jsx'

const services = [
  {
    n: '01',
    title: 'UI/UX Design',
    tags: ['USER INTERFACE', 'User Interface', 'User Interface'],
    desc: 'Crafting intuitive and visually appealing digital experiences that prioritise user needs and business goals.',
    images: [
      'https://picsum.photos/seed/uiux-a/400/280',
      'https://picsum.photos/seed/uiux-b/400/280',
    ],
  },
  {
    n: '02',
    title: 'Motion Design',
    tags: ['ANIMATION', 'Visual Storytelling', 'Interaction Design'],
    desc: 'Crafting dynamic and engaging visual content that captures attention through smooth, purposeful animations.',
    images: [
      'https://picsum.photos/seed/motion-a/400/280',
      'https://picsum.photos/seed/motion-b/400/280',
    ],
  },
  {
    n: '03',
    title: 'Art Direction',
    tags: ['BRAND IDENTITY', 'Visual Strategy', 'Creative Direction'],
    desc: 'Guiding the visual language of projects to align with brand values and deliver compelling storytelling across all touchpoints.',
    images: [
      'https://picsum.photos/seed/art-a/400/280',
      'https://picsum.photos/seed/art-b/400/280',
    ],
  },
]

export default function Services() {
  const [open, setOpen] = useState(0)

  const toggle = (i) => setOpen((cur) => (cur === i ? null : i))

  return (
    <section id="services" className="svc-section">
      <div className="container">

        <Reveal className="svc-section-head">
          <span className="section-eyebrow">Services</span>
          <h2 className="section-title">What I can do for you</h2>
        </Reveal>

        <div className="svc-list">
          {services.map((s, i) => {
            const isOpen = open === i
            return (
              <div
                key={s.n}
                className={`svc-item${isOpen ? ' svc-item--open' : ''}`}
              >
                {/* Giant title row — always visible, toggles the panel.
                    The title fills in word-by-word as it scrolls into view. */}
                <button
                  type="button"
                  className="svc-item-title-row"
                  aria-expanded={isOpen}
                  onClick={() => toggle(i)}
                >
                  <ScrollText
                    as="h3"
                    className="svc-display-title"
                    text={s.title}
                    split="char"
                  />
                  <span className="svc-item-toggle" aria-hidden="true">
                    <span className="svc-toggle-bar svc-toggle-bar--h" />
                    <span className="svc-toggle-bar svc-toggle-bar--v" />
                  </span>
                </button>

                {/* Expandable content row — single child required for grid collapse */}
                <div className="svc-item-body">
                  <div className="svc-item-inner">
                    <div className="svc-item-left">
                      <div className="svc-item-tags">
                        {s.tags.map((t) => (
                          <span key={t} className="svc-item-tag">{t}</span>
                        ))}
                      </div>
                      <p className="svc-item-desc">{s.desc}</p>
                    </div>
                    <div className="svc-item-images">
                      {s.images.map((src, idx) => (
                        <div key={idx} className="svc-item-img">
                          <img src={src} alt="" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider + number */}
                <div className="svc-item-footer">
                  <span className="svc-item-num">{s.n}.</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
