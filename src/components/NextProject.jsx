import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

// Richer "next project" block — preview art, meta and an animated arrow.
export default function NextProject({ to, title, category, tag, image, tint }) {
  return (
    <section className="npx">
      <div className="container">
        <Reveal className="npx-card">
          <Link to={to} className="npx-link">
            <span className="npx-media">
              {image
                ? <img src={image} alt="" loading="lazy" />
                : <span className="npx-ph" style={{ background: tint }} aria-hidden="true">
                    {title.slice(0, 2)}
                  </span>}
            </span>

            <span className="npx-body">
              <span className="npx-label">Next case study</span>
              <span className="npx-title">{title}</span>
              {category && <span className="npx-cat">{category}</span>}
              {tag && <span className="npx-tag">{tag}</span>}
            </span>

            <span className="npx-go" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
                   stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
