import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import researchIcon from '../assets/research.svg'
import userflowIcon from '../assets/userflow.svg'
import wireframeIcon from '../assets/wireframe.svg'
import prototypeIcon from '../assets/prototype.svg'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    n: '1', icon: researchIcon, title: "Let's Get in Touch",
    desc: "Start with a discovery call to understand your goals, audience and constraints. Define the direction clearly before execution.",
  },
  {
    n: '2', icon: userflowIcon, title: 'Grab Your Designs',
    desc: "I translate strategy into high-fidelity, on-brand design systems. Adjust layout, interactions and visual style aligned to your brand.",
  },
  {
    n: '3', icon: wireframeIcon, title: 'Kickstart Development',
    desc: "Pixel-perfect handoff with specs, tokens and assets. Test transitions and real-time interactions, improve animation flow and timing.",
  },
  {
    n: '4', icon: prototypeIcon, title: 'And Hand Over',
    desc: "Final polish, documentation and support so you launch with confidence. Publish and share with your audience globally.",
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const cardsRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    const text = textRef.current
    if (!section || !cards || !text) return

    // amount cards need to travel: total card row width minus viewport
    const getMove = () => cards.scrollWidth - window.innerWidth + 120

    // Horizontal scroll only on desktop; on mobile the cards stack vertically
    // (handled by CSS) with no pin/scroll effect.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(cards, { x: () => -getMove(), ease: 'none' }, 0)
      tl.to(text, { x: () => -getMove() * 0.42, ease: 'none' }, 0)
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="process" className="process-horizontal" ref={sectionRef}>
      <div className="process-sticky" ref={stickyRef}>
        <div className="process-track">

          {/* Background marquee text */}
          <div className="process-big-text" ref={textRef}>
            HOW IT WORKS &nbsp;&nbsp; HOW IT WORKS &nbsp;&nbsp; HOW IT WORKS
          </div>

          {/* Scrolling card row */}
          <div className="process-cards" ref={cardsRef}>
            <div className="process-label-col">
              <span className="section-eyebrow">Process</span>
              <h2 className="section-title">Simple, streamlined process that gets results.</h2>
            </div>

            {steps.map((s) => (
              <article key={s.n} className="process-card">
                <span className="process-card-num">{s.n}</span>
                <div className="process-card-top">
                  <div className="process-card-icon">
                  <img src={s.icon} alt="" />
                </div>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
