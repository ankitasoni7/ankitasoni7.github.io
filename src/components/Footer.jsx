import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Capsules that drop from above and settle onto the wordmark. x/y are resting
// positions over the big "Creative Brains" text; rot is the resting tilt.
const pills = [
  { label: 'UI/UX Design', x: '8%', y: '-6%', rot: -13, variant: 'fill' },
  { label: 'Motion', x: '25%', y: '14%', rot: -8, variant: 'fill' },
  { label: 'Graphic Design', x: '46%', y: '-2%', rot: 8, variant: 'outline' },
  { label: 'web Development', x: '78%', y: '6%', rot: -8, variant: 'outline' },
]

// the action word cycles: create → Build → Design
const cycleWords = ['create', 'Build', 'Design']

export default function Footer() {
  const sectionRef = useRef(null)
  const bigmarkRef = useRef(null)
  const [ci, setCi] = useState(0)

  // swap the headline action word on a loop
  useEffect(() => {
    const id = setInterval(
      () => setCi((c) => (c + 1) % cycleWords.length),
      2000
    )
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const bigmark = bigmarkRef.current
    if (!section || !bigmark) return

    const words = section.querySelectorAll('.footer2-word')
    const pillEls = bigmark.querySelectorAll('.footer-pill')

    const ctx = gsap.context(() => {
      // Replays every time the footer scrolls into view (toggleActions: restart).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'restart none none reverse',
        },
      })

      // Headline fills word by word
      tl.fromTo(
        words,
        { opacity: 0.15 },
        { opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power1.out' },
        0
      )

      // Capsules fall slowly from above and bounce to rest on the wordmark —
      // visible the whole way down, staggered so they land one after another.
      tl.fromTo(
        pillEls,
        { yPercent: -900, rotation: 0, autoAlpha: 1 },
        {
          yPercent: 0,
          rotation: (i) => pills[i].rot,
          autoAlpha: 1,
          duration: 2,
          ease: 'bounce.out',
          stagger: 0.22,
        },
        0.3
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <footer id="contact" className="footer2" ref={sectionRef}>
      <div className="container">
        <h2 className="footer2-headline">
          <span className="footer2-line">
            <span className="footer2-word">Let's&nbsp;</span>
            <span className="footer2-cycle">
              <span key={ci} className="footer2-cycle-word">
                {cycleWords[ci]}
              </span>
            </span>
          </span>
          <span className="footer2-line">
            {['incredible', 'work', 'together.'].map((w, i) => (
              <span key={i} className="footer2-word">
                {w}&nbsp;
              </span>
            ))}
          </span>
        </h2>

        {/* Contact row */}
        <div className="footer2-row">
          <div className="footer2-col">
            <span className="footer2-label">Email</span>
            <a href="mailto:ankitasoni7uiux@gmail.com" className="footer2-link-lg">
              ankitasoni7uiux@gmail.com
            </a>
          </div>
          <div className="footer2-col">
            <span className="footer2-label">Call Me</span>
            <Link to="/#contact" className="footer2-link-lg">Book a call</Link>
          </div>
          <div className="footer2-col">
            <span className="footer2-label">Based in</span>
            <span className="footer2-link-lg">Vancouver, BC</span>
          </div>
        </div>

        <div className="footer2-divider" />

        {/* Menu / Legal / copyright */}
        <div className="footer2-row footer2-row--links">
          <div className="footer2-col">
            <span className="footer2-label">Menu</span>
            <div className="footer2-links-grid">
              <Link to="/#work">Work</Link>
              <Link to="/#services">Services</Link>
              <Link to="/#about">About</Link>
              <Link to="/#contact">Contact</Link>
            </div>
          </div>
          <div className="footer2-col">
            <span className="footer2-label">Case studies</span>
            <div className="footer2-links-grid footer2-links-grid--one">
              <Link to="/mlmt-v2">My Last Minute Trip</Link>
              <Link to="/kaatkut-v2">Kaatkut</Link>
            </div>
          </div>
          <div className="footer2-col footer2-col--copy">
            <span className="footer2-copy">© 2026 Ankita Soni · All rights reserved</span>
          </div>
        </div>
      </div>

      {/* Giant wordmark with capsules falling onto it */}
      <div className="footer2-bigmark" ref={bigmarkRef}>
        {pills.map((p) => (
          <span
            key={p.label}
            className={`footer-pill footer-pill--${p.variant}`}
            style={{ left: p.x, top: p.y }}
          >
            {p.label}
          </span>
        ))}
        <span className="footer2-wordmark">Creative Brains</span>
      </div>
    </footer>
  )
}
