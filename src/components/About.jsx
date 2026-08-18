import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: '10+', top: 'Years', bottom: 'of experience', dark: true },
  { num: '24+', top: 'Projects', bottom: 'completed', dark: false },
]

const cards = [
  {
    label: 'What I do',
    text: 'I help brands find clarity and express it through strong, thoughtful design.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=560&h=720&q=80',
  },
  {
    label: 'My Journey',
    text: "My journey into UI/UX design began with a natural passion for creativity and visual expression. From an early age, I was drawn to drawing, crafts, and the process of turning ideas into something tangible. As I realized the importance of adapting to a rapidly evolving digital world, I discovered UI/UX design — a field where creativity meets innovation. It felt like the perfect path, allowing me to combine design thinking, problem-solving, and technology to create experiences that people don't just see, but interact with every day.",
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=560&h=720&q=80',
  },
  {
    label: 'Career',
    text: 'From in-house design teams to leading studio projects, I’ve shipped work across branding, product and motion for clients worldwide.',
    img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=560&h=720&q=80',
  },
  {
    label: 'Experience',
    text: 'A decade of turning strategy into craft — every screen, mark and interaction built to move a real business metric.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=560&h=720&q=80',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const cardEls = cardsRef.current?.querySelectorAll('.about2-card')
    if (!section || !image || !cardEls) return

    const cards = Array.from(cardEls)
    const imgs = Array.from(image.querySelectorAll('.about2-media-img'))
    const STEP = 18 // how far each card peeks behind the one in front

    // Only pin + scrub on desktop; on small screens everything just stacks.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px)', () => {
      // later cards sit in front of earlier ones
      gsap.set(cards, { zIndex: (i) => i })
      // only the first image visible to start; the rest crossfade in
      gsap.set(imgs, { autoAlpha: (i) => (i === 0 ? 1 : 0) })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Image — 3D Y-axis flip scrubbed to scroll, so it plays out as you move
      // through the pinned section (full opacity, no fade).
      tl.fromTo(
        image,
        {
          rotationY: -65,
          y: 48,
          scale: 0.7,
          transformPerspective: 500,
          transformOrigin: 'center center',
        },
        {
          rotationY: 0,
          y: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        },
        0
      )

      // Cards stack one by one. The newest slides up to the front; every older
      // card recedes one level behind it — smaller, lower opacity, no blur — so
      // it's clearly tucked behind the active card.
      const back = (depth) => ({
        y: depth * STEP,
        scale: 1 - depth * 0.05,
        autoAlpha: Math.max(0.2, 0.6 - (depth - 1) * 0.16),
        duration: 1.2,
        ease: 'power3.out',
      })

      cards.forEach((card, i) => {
        // wider spacing + a hold so each card change is slow and clearly visible
        const at = 1.6 + i * 1.6
        // new card rises from below into the front position
        tl.fromTo(
          card,
          { y: 130, autoAlpha: 0, scale: 1 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
          at
        )
        // push each already-visible card one level further back
        for (let j = 0; j < i; j++) {
          tl.to(cards[j], back(i - j), at)
        }
        // swap the left image to match the card now coming to the front
        if (i > 0 && imgs[i]) {
          tl.to(imgs[i], { autoAlpha: 1, duration: 1, ease: 'power2.out' }, at)
          tl.to(imgs[i - 1], { autoAlpha: 0, duration: 1, ease: 'power2.out' }, at)
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="about" className="about2" ref={sectionRef}>
      <div className="about2-stage">
        <span className="about2-eyebrow">Numeric</span>
        <h2 className="about2-bigtext">About me</h2>

        <div className="about2-row">
          {/* Left — image swaps to match the active card on the right */}
          <div className="about2-media" ref={imageRef}>
            {cards.map((c, i) => (
              <img
                key={c.label}
                className="about2-media-img"
                src={c.img}
                alt=""
                loading="lazy"
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            ))}
          </div>

          {/* Right — info cards that reveal one by one */}
          <div className="about2-cards" ref={cardsRef}>
            {cards.map((c) => (
              <div key={c.label} className="about2-card">
                <span className="about2-card-label">
                  <span className="about2-card-dot" />
                  {c.label}
                </span>
                <p className="about2-card-text">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stat cards overlapping the giant text, bottom-left */}
        <div className="about2-stats">
          {stats.map((s) => (
            <div
              key={s.num}
              className={`about2-stat${s.dark ? ' about2-stat--dark' : ''}`}
            >
              <div className="about2-stat-num">{s.num}</div>
              <div className="about2-stat-label">
                <span>{s.top}</span>
                <span>{s.bottom}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
