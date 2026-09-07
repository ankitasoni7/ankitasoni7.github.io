import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'

// Shorter labels for the compact icon rail (the section heading keeps the full name)
const shortLabels = {
  overview: 'Overview',
  'client-requirement': 'Requirement',
  research: 'Research',
  'user-persona': 'Persona',
  'affinity-map': 'Affinity',
  'user-journey': 'Journey',
  problem: 'Problem',
  solution: 'Solution',
  diagram: 'Diagram',
  'design-system': 'Design',
  'design-thinking': 'Iteration',
  'information-hierarchy': 'Hierarchy',
  'high-fidelity-wireframes': 'Wireframes',
  'final-screens': 'Final',
}

// One line-icon per section. Common SVG attrs are applied via the wrapper below.
const svg = (children) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const icons = {
  overview: svg(
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M3 9h18M9 9v12" />
    </>
  ),
  'client-requirement': svg(
    <>
      <rect x="5" y="4" width="14" height="17" rx="2.5" />
      <path d="M9 3.5h6v3H9z" />
      <path d="M8.5 12.5l2 2 4-4.5" />
    </>
  ),
  research: svg(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  'user-persona': svg(
    <>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M5 20c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" />
    </>
  ),
  'affinity-map': svg(
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </>
  ),
  'user-journey': svg(
    <>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  problem: svg(
    <>
      <path d="M12 4.5 21 19.5H3z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.6" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  solution: svg(
    <>
      <path d="M9.5 18h5" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5.5 1.4.5 2.1h6c0-.7-.1-1.6.5-2.1A6 6 0 0 0 12 3z" />
    </>
  ),
  diagram: svg(
    <>
      <rect x="8.5" y="3" width="7" height="5" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
      <rect x="14" y="16" width="7" height="5" rx="1" />
      <path d="M12 8v3M6.5 16v-5h11v5M12 11v5" />
    </>
  ),
  'design-system': svg(
    <>
      <path d="M12 3a9 9 0 1 0 1 18c1 0 1.5-.8 1.5-1.7 0-.9.7-1.5 1.6-1.5H17a4 4 0 0 0 4-4c0-5-4-8.8-9-8.8z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="11" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  'design-thinking': svg(
    <>
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .9 1.7l.1.5h5.2l.1-.5c.1-.7.4-1.3.9-1.7A6 6 0 0 0 12 3Z" />
      <path d="M9.5 19h5M10 21.5h4" />
    </>
  ),
  'information-hierarchy': svg(
    <>
      <path d="M4 5h16M4 10h11M4 15h7M4 20h4" />
    </>
  ),
  'high-fidelity-wireframes': svg(
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  'final-screens': svg(
    <path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.6l5.9-.8z" />
  ),
}

/**
 * Compact icon rail that tracks the section in view; clicking smooth-scrolls to
 * it. Collapses to a horizontal sticky top-nav on mobile.
 */
export default function Scrollspy({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  const handleClick = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="spy container">
      <aside className="spy-nav">
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`spy-link${active === s.id ? ' is-active' : ''}`}
                onClick={(e) => handleClick(e, s.id)}
              >
                <span className="spy-ico">{icons[s.id]}</span>
                <span className="spy-label">{shortLabels[s.id] ?? s.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="spy-content">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="spy-section">
            <Reveal>
              <h2 className="spy-section-title">{s.label}</h2>
              {s.body}
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  )
}
