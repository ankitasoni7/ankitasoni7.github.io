import { WmPhone } from './ItineraryShowcase.jsx'
import Reveal from './Reveal.jsx'

// Stage 2 of the final-screens story: the two supporting phones, each with its
// caption. Same `itsc-side` markup/animation as the trio layout.
export default function SideScreens({ eyebrow = 'Supporting screens', title, items = [] }) {
  return (
    <section className="ssc">
      <div className="container">
        {eyebrow && <Reveal as="span" className="itsc-eyebrow">{eyebrow}</Reveal>}
        {title && <Reveal as="h2" className="itsc-title" delay={60}>{title}</Reveal>}

        <div className="ssc-row">
          {items.map((s, i) => (
            <Reveal
              className={`itsc-side ssc-side ssc-side--${i % 2 === 0 ? 'capleft' : 'capright'}`}
              key={s.title}
              delay={120 + i * 120}
            >
              <WmPhone image={s.image} autoScroll />
              <div className="itsc-side-cap ssc-cap">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                {s.features && (
                  <ul className="ssc-features">
                    {s.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
