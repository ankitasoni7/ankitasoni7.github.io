import Reveal from './Reveal.jsx'

const testimonials = [
  {
    id: 1, quote: 'The redesign lifted our conversion rate by 38% in two months. Easily the best design partner we have worked with.',
    name: 'Sofia Marin', role: 'Head of Product', company: 'Kora',
  },
  {
    id: 2, quote: 'Fast, thoughtful, and obsessed with the details. Our brand finally feels like us.',
    name: 'Daniel Okafor', role: 'Founder', company: 'KYMA',
  },
  {
    id: 3, quote: 'Every handoff was pixel-perfect. Engineering shipped in half the usual time.',
    name: 'Priya Nair', role: 'CTO', company: 'Axiom',
  },
  {
    id: 4, quote: 'Strategic thinking backed by beautiful execution. Worth every penny.',
    name: 'Marcus Reed', role: 'CEO', company: 'Mugen',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">Trusted by Professionals</h2>
          <p className="section-sub">
            A few words from founders and teams I have partnered with. Some reviews are
            kept anonymous under NDA.
          </p>
        </Reveal>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} as="article" className="testi-card" delay={i * 80}>
              <p className="testi-quote">“{t.quote}”</p>
              <div className="testi-person">
                <div className="testi-avatar">{t.name.charAt(0)}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}, {t.company}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
