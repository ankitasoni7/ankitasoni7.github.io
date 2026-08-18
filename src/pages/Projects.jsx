import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const projectList = [
  {
    index: '01',
    name: 'My Last Minute Trip',
    industry: 'Travel App',
    services: ['UX Research', 'UI/UX Design', 'Design System'],
    image: 'https://picsum.photos/seed/mlmt-list/800/600',
    to: '/project/kora',
  },
  {
    index: '02',
    name: 'Shifa Mental Health App',
    industry: 'Mental Health App',
    services: ['UX Research', 'UI/UX Design', 'Design System'],
    image: 'https://picsum.photos/seed/lumen-list/800/600',
    to: '/project2',
  },
  {
    index: '03',
    name: 'Nova Studio',
    industry: 'Logo & Brand Identity',
    services: ['Logo Design', 'Brand System', 'Guidelines'],
    image: 'https://picsum.photos/seed/nova-list/800/600',
    to: '/logofolio',
  },
  {
    index: '04',
    name: 'My Last Minute Trip — V2',
    industry: 'Travel App · Redesigned layout',
    services: ['Editorial', 'Motion', 'Bento'],
    image: 'https://picsum.photos/seed/mlmt-v2-list/800/600',
    to: '/project-v2',
  },
  {
    index: '05',
    name: 'Kaatkut',
    industry: 'Meat & Seafood Delivery',
    services: ['UX Research', 'UI/UX Design', 'Design System'],
    image: 'https://picsum.photos/seed/kaatkut-list/800/600',
    to: '/project3',
  },
]

export default function Projects() {
  return (
    <main className="plist-page">
      <section className="container">
        <Reveal as="span" className="pd-eyebrow">Selected work</Reveal>
        <Reveal as="h1" className="plist-title" delay={60}>
          Latest Projects
        </Reveal>

        <div className="plist">
          {projectList.map((p, i) => (
            <Reveal key={p.name} delay={120 + i * 90}>
              <Link to={p.to} className="plist-row">
                <span className="plist-index">{p.index}</span>

                <div className="plist-thumb">
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>

                <div className="plist-id">
                  <h3 className="plist-name">{p.name}</h3>
                  <span className="plist-industry">{p.industry}</span>
                </div>

                <div className="plist-right">
                  {/* services (default) */}
                  <ul className="plist-services">
                    {p.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  {/* animated "View More" (on hover) */}
                  <span className="plist-more">
                    <span className="plist-more-marquee">
                      <span className="plist-more-track">
                        {Array.from({ length: 6 }).map((_, k) => (
                          <span key={k}>View More •</span>
                        ))}
                      </span>
                    </span>
                    <span className="plist-more-arrow">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
