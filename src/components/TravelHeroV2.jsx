import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from './Reveal.jsx'
import Character from './Character.jsx'
import PhoneDashboard from './PhoneDashboard.jsx'

gsap.registerPlugin(ScrollTrigger)

// Four square notifications above the character. pos = card position (kept);
// eye = where the pupils look (character sits bottom-centre, so it looks up).
const NOTES = [
  { app: 'Gmail', title: 'Flight Updated', prev: 'AI 173 · new gate', time: 'now', emoji: '✉️', bg: '#EA4335', pos: { left: '3%', top: '12%' }, eye: { x: -6, y: -6 } },
  { app: 'WhatsApp', title: 'Hotel Ready', prev: 'Check-in confirmed', time: 'now', emoji: '💬', bg: '#25D366', pos: { left: '25%', top: '3%' }, eye: { x: -3, y: -7 } },
  { app: 'Messages', title: 'Taxi Arriving', prev: '4 min to the lobby', time: '9:41', emoji: '🚕', bg: '#34C759', pos: { left: '55%', top: '3%' }, eye: { x: 3, y: -7 } },
  { app: 'Calendar', title: 'Museum Today', prev: 'Zürich · 10:00 AM', time: '9:40', emoji: '📅', bg: '#FF3B30', pos: { left: '77%', top: '13%' }, eye: { x: 6, y: -5 } },
]

export default function TravelHeroV2({ project }) {
  const root = useRef(null)

  useEffect(() => {
    let story
    let kenBurns = null
    let replay = null

    const ctx = gsap.context((self) => {
      const q = self.selector
      const notes = q('.hv2-note')
      const phone = q('.hv2-phone')[0]
      const pupils = q('.hv2-pupil')
      const bubble = q('.hv2-bubble')[0]
      const figure = q('.hv2-figure')[0]
      const bg = q('.dhz-bg')[0]
      const chrome = q('.dh-top, .dh-title, .dh-status, .dh-sec')
      const order = ['flight', 'hotel', 'itin', 'docs', 'weather', 'support']
      const items = order.map((k) => q(`[data-k="${k}"]`)[0]).filter(Boolean)
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // ambient life: breathing + tiny head drift (always on)
      if (!reduce) {
        gsap.to('.hv2-breath', { y: -6, scaleY: 1.012, duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true })
        gsap.to('.hv2-head', { y: 2.5, x: 1, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true })
      }

      if (reduce) {
        gsap.set(notes, { autoAlpha: 0 })
        gsap.set([phone, figure, ...chrome, ...items], { autoAlpha: 1, y: 0, scale: 1 })
        return
      }

      // full reset — used before every (re)play
      const setInitial = () => {
        notes.forEach((el, i) => gsap.set(el, {
          left: NOTES[i].pos.left, top: NOTES[i].pos.top,
          xPercent: 0, yPercent: 0, x: 0, y: -10, scale: 0.92, autoAlpha: 0,
        }))
        gsap.set(phone, { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 50%' })
        gsap.set(figure, { autoAlpha: 1, y: 0 })
        gsap.set(bubble, { autoAlpha: 0, y: 8, scale: 0.96, transformOrigin: '50% 100%' })
        gsap.set(pupils, { x: 0, y: 0 })
        gsap.set([...chrome, ...items], { autoAlpha: 0, y: 16 })
        if (bg) gsap.set(bg, { scale: 1, yPercent: 0 })
      }

      // slow Ken Burns on the wallpaper ONLY, started after the dashboard resolves
      const startKenBurns = () => {
        if (bg) kenBurns = gsap.to(bg, { scale: 1.06, yPercent: -3, duration: 15, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 50%' })
      }

      setInitial()

      story = gsap.timeline({ paused: true, onComplete: startKenBurns })

      // ── SCENE 1 — the problem ──
      story.to(bubble, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }, 0.2)
      NOTES.forEach((nt, i) => {
        const at = 0.7 + i * 1.5
        story.to(notes[i], { autoAlpha: 1, y: 2, scale: 1, duration: 0.6, ease: 'power3.out' }, at)
        story.to(pupils, { x: nt.eye.x, y: nt.eye.y, duration: 0.5, ease: 'power2.inOut' }, at) // eyes track & stay
      })
      const pauseAt = 0.7 + NOTES.length * 1.5
      story.to(pupils, { x: -6, y: -6, duration: 0.4, ease: 'power2.inOut' }, pauseAt + 0.3)
      story.to(pupils, { x: 6, y: -5, duration: 0.4, ease: 'power2.inOut' }, pauseAt + 0.85)

      // ── SCENE 2 — Version-1 style phone reveal ──
      const converge = pauseAt + 1.6
      story.addLabel('converge', converge)
      story.to(notes, { left: '50%', top: '50%', xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 0.26, autoAlpha: 0, duration: 0.8, ease: 'power2.inOut', stagger: 0.04 }, 'converge')
      story.to(figure, { autoAlpha: 0, y: 22, duration: 0.7, ease: 'power2.inOut' }, 'converge')
      story.to(phone, { autoAlpha: 1, scale: 1, duration: 0.95, ease: 'power3.out' }, 'converge+=0.45')
      story.addLabel('reveal', 'converge+=1.15')
      story.to(chrome, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 }, 'reveal')
      story.to(items, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.18 }, 'reveal+=0.35')

      // first play when scrolled into view
      ScrollTrigger.create({ trigger: root.current, start: 'top 72%', once: true, onEnter: () => story.play(0) })

      // replay from the very beginning on hover (ignore while it's still playing)
      replay = () => {
        if (story.isActive()) return
        if (kenBurns) { kenBurns.kill(); kenBurns = null }
        setInitial()
        story.invalidate()
        story.play(0)
      }
    }, root)

    const el = root.current
    const onEnter = () => replay && replay()
    el?.addEventListener('mouseenter', onEnter)

    return () => {
      el?.removeEventListener('mouseenter', onEnter)
      ctx.revert()
    }
  }, [])

  return (
    <section className="pd-hero hv2" ref={root}>
      <div className="container hv2-grid">
        {/* LEFT — project info */}
        <div className="hv2-left">
          <Reveal className="pds-logo">
            <span className="pds-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 2l2.6 6.8L21 11l-6.4 2.2L12 22l-2.6-8.8L3 11l6.4-2.2z" fill="currentColor" /></svg>
            </span>
            <b>mlmt</b>
          </Reveal>
          <Reveal as="h2" className="pds-title" delay={60}>{project.title}</Reveal>
          <Reveal as="p" className="pds-desc" delay={120}>{project.intro}</Reveal>
          <Reveal className="pds-facts" delay={180}>
            <div className="pds-fact"><span>Role</span><b>{project.role}</b></div>
            <div className="pds-fact"><span>Duration</span><b>{project.year}</b></div>
          </Reveal>
          <Reveal className="pds-actions" delay={240}>
            <a href="#overview" className="pds-cta">
              Explore the case study
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </Reveal>
        </div>

        {/* RIGHT — the stage: cards → character → phone */}
        <div className="hv2-right">
          <div className="hv2-stage">
            {NOTES.map((nt, i) => (
              <div className="hv2-note" key={i} style={nt.pos}>
                <span className="hv2-note-ic" style={{ background: nt.bg }}>{nt.emoji}</span>
                <span className="hv2-note-app">{nt.app}</span>
                <b className="hv2-note-t">{nt.title}</b>
                <p className="hv2-note-p">{nt.prev}</p>
                <span className="hv2-note-time">{nt.time}</span>
              </div>
            ))}

            {/* the confused traveller, below the cards */}
            <div className="hv2-figure">
              <span className="hv2-bubble">Where did my flight confirmation go?</span>
              <Character className="hv2-char" />
            </div>

            <PhoneDashboard className="hv2-phone" />
          </div>
        </div>
      </div>
    </section>
  )
}
