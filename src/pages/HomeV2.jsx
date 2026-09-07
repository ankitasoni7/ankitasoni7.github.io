import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import FeaturedProjects from '../components/FeaturedProjects.jsx'
// Sections carried over from homepage v1, untouched
import About from '../components/About.jsx'
import AboutV2 from '../components/AboutV2.jsx'
import Process from '../components/Process.jsx'
import Services from '../components/Services.jsx'
import FAQ from '../components/FAQ.jsx'
import PortfolioChat from '../components/PortfolioChat.jsx'

// Row 1 — Core Skills Matrix
const coreSkills = [
  'Flows & Wireframes',
  'High-Fidelity UI',
  'Prototyping',
  'Design Systems',
  'Frontend Architecture',
]

// Row 2 — Industry Verticals
const verticals = ['Healthcare', 'Education', 'E-Commerce', 'Automotive', 'Food & Retail']

const heroStats = [
  { v: '6+', l: 'Years' },
  { v: '5', l: 'Industries' },
  { v: '25+', l: 'Products shipped' },
]

export default function HomeV2() {
  return (
    <main className="hv">
      {/* ── Hero — short intro (left) + profile card (right) ───── */}
      <section id="home" className="hv-hero">
        <div className="container hv-hero-inner">
          <div className="hv-about">
            <Reveal as="span" className="hv-kicker">
              <span className="availability-dot" />
              Available for projects · Vancouver, BC
            </Reveal>

            <Reveal as="h1" className="hv-h1" delay={60}>UI/UX Designer</Reveal>

            <Reveal as="p" className="hv-lead" delay={110}>
              I’m a UI/UX Designer with <strong>6+ years of experience</strong> designing{' '}
              <strong>digital products and experiences across diverse industries</strong>, from
              healthcare and education to e-commerce, food retail, and automotive.
            </Reveal>

            <Reveal as="p" className="hv-body" delay={150}>
              I turn complex requirements into{' '}
              <strong>simple, intuitive, and polished experiences</strong> through UX strategy,
              wireframing, prototyping, and visual design. With a strong foundation in{' '}
              <strong>graphic design and HTML/CSS</strong>, I bring a creative yet practical
              perspective to every project.
            </Reveal>

            <Reveal className="hv-tags" delay={200}>
              <span className="hv-tags-label">Core skills</span>
              <span className="hv-tags-row">
                {coreSkills.map((t) => <span key={t} className="hv-tag">{t}</span>)}
              </span>
            </Reveal>

            <Reveal className="hv-tags" delay={240}>
              <span className="hv-tags-label">Industries</span>
              <span className="hv-tags-row">
                {verticals.map((t) => (
                  <span key={t} className="hv-tag hv-tag--alt">{t}</span>
                ))}
              </span>
            </Reveal>

            <Reveal className="hv-actions" delay={280}>
              <a href="#contact" className="btn btn-primary">Book a call with me →</a>
              <Link to="/projects" className="hv-ghost">See all work</Link>
            </Reveal>
          </div>

          <Reveal className="hv-portrait" delay={140}>
            <figure className="hv-portrait-frame">
              <img
                src="/avatars/portrait.jpg"
                alt="Portrait"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <figcaption className="hv-portrait-cap">
                <span className="hv-portrait-role">UI/UX Designer</span>
                <span className="hv-portrait-years">Vancouver, BC</span>
              </figcaption>
            </figure>

            <div className="hv-stats">
              {heroStats.map((s2) => (
                <div key={s2.l} className="hv-statcard">
                  <span className="hv-statcard-v">{s2.v}</span>
                  <span className="hv-statcard-l">{s2.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Projects (v1 scroll-expansion, centered title) ── */}
      <FeaturedProjects />

      {/* ── Sections carried over from homepage v1 ─────────────── */}
      <About />
      <AboutV2 />
      <Process />
      <Services />
      <FAQ />
      <PortfolioChat />
    </main>
  )
}
