import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tools = ['Figma', 'Framer', 'Webflow', 'ProtoPie', 'After Effects', 'Illustrator', 'Notion', 'Spline']

const skills = [
  { n: '01', t: 'Product & UI Design', d: 'End-to-end interfaces for web & mobile.' },
  { n: '02', t: 'Design Systems', d: 'Scalable tokens, components & docs.' },
  { n: '03', t: 'Prototyping & Motion', d: 'Interaction and micro-motion that guides.' },
  { n: '04', t: 'User Research', d: 'Flows, testing & insight-led decisions.' },
]

export default function AboutV2() {
  const root = useRef(null)

  useEffect(() => {
    // reduced motion: CSS fallback reveals everything, just fill the counter
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const n = root.current?.querySelector('.abt-stat-count')
      if (n) n.textContent = '24'
      return
    }

    const ctx = gsap.context((self) => {
      const q = self.selector

      // 1 — headline reveals line by line from behind a mask
      gsap.from(q('.abt-line span'), {
        yPercent: 115,
        duration: 0.95,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: q('.abt-head'), start: 'top 82%' },
      })
      gsap.from(q('.abt-eyebrow'), {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: q('.abt-head'), start: 'top 82%' },
      })

      // 2 — each bento card wipes in (clip-path) as it enters
      q('.abt-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 46, clipPath: 'inset(0 0 100% 0)' },
          {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1,
            ease: 'power3.out',
            delay: (i % 3) * 0.06,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        )
      })

      // 3 — portrait image drifts up behind its frame (parallax)
      gsap.fromTo(
        q('.abt-photo img'),
        { scale: 1.18, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: q('.abt-photo'), start: 'top bottom', end: 'bottom top', scrub: true },
        }
      )

      // 4 — stat counts up on arrival
      const counter = { v: 0 }
      const numEl = q('.abt-stat-count')[0]
      if (numEl) {
        gsap.to(counter, {
          v: 24,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: numEl, start: 'top 88%' },
          onUpdate: () => { numEl.textContent = Math.round(counter.v) },
        })
      }

      // 5 — signature underline draws itself
      gsap.fromTo(
        q('.abt-sign-path'),
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: q('.abt-intro'), start: 'top 78%' },
        }
      )

      // 6 — tools ribbon scrolls forever
      gsap.to(q('.abt-marquee-track'), {
        xPercent: -50,
        duration: 20,
        ease: 'none',
        repeat: -1,
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about-v2" className="abt" ref={root}>
      <div className="container">
        <div className="abt-head">
          <span className="abt-eyebrow"><i className="abt-eyebrow-dot" /> About me · v2</span>
          <h2 className="abt-title">
            <span className="abt-line"><span>Designing clear, human</span></span>
            <span className="abt-line"><span>and <em>useful</em> products.</span></span>
          </h2>
        </div>

        <div className="abt-bento">
          {/* Intro — dark statement */}
          <article className="abt-card abt-intro">
            <span className="abt-quote">“</span>
            <p className="abt-lead">
              Hi, I’m <b>Ankita</b> — a product &amp; UI/UX designer turning complex problems
              into simple, confident interfaces.
            </p>
            <p className="abt-sub">
              I care about the details most people skip: motion that guides, copy that
              clarifies, and systems that scale without losing their soul.
            </p>
            <span className="abt-sign">
              Ankita Soni
              <svg className="abt-sign-svg" viewBox="0 0 220 26" fill="none" aria-hidden="true">
                <path
                  className="abt-sign-path"
                  pathLength="1"
                  d="M3 17c22-14 44-14 63-6s26 16 44 9 30-20 48-15 40 12 56 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </article>

          {/* Portrait */}
          <article className="abt-card abt-photo">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=560&h=820&q=80"
              alt="Portrait"
              loading="lazy"
            />
            <span className="abt-photo-tag">
              <b>Ankita Soni</b>
              <i>Product / UI·UX Designer</i>
            </span>
          </article>

          {/* Availability */}
          <article className="abt-card abt-avail">
            <span className="abt-pulse" aria-hidden="true" />
            <span className="abt-avail-t">Available for work</span>
            <span className="abt-avail-s">Remote · Worldwide</span>
          </article>

          {/* Stat */}
          <article className="abt-card abt-stat">
            <span className="abt-stat-num"><span className="abt-stat-count">0</span><em>+</em></span>
            <span className="abt-stat-lbl">Products shipped end-to-end</span>
          </article>

          {/* Toolbox — infinite marquee */}
          <article className="abt-card abt-tools">
            <span className="abt-label">Toolbox</span>
            <div className="abt-marquee">
              <div className="abt-marquee-track">
                {[...tools, ...tools].map((t, i) => (
                  <span key={i} className="abt-chip">{t}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Expertise */}
          <article className="abt-card abt-skills">
            <span className="abt-label">What I do best</span>
            <ul className="abt-skill-list">
              {skills.map((s) => (
                <li key={s.n} className="abt-skill">
                  <span className="abt-skill-n">{s.n}</span>
                  <span className="abt-skill-t">{s.t}</span>
                  <span className="abt-skill-d">{s.d}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
