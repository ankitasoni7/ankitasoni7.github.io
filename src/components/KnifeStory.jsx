import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BASE = '/projects/project3/final-screens/'

// 8 chronological screens. Missing images fall back to a labelled placeholder.
// `clip` = { from, to } drives each reveal (no fades — only clip-path + transform).
const SCREENS = [
  { key: 'home', label: 'Home', img: BASE + 'homepage.png', clip: { from: 'polygon(0% -25%, 20% -25%, -20% 125%, -42% 125%)', to: 'polygon(0% -25%, 170% -25%, 128% 125%, -42% 125%)' } },
  { key: 'list', label: 'Product List', img: null, clip: { from: 'circle(0% at 50% 46%)', to: 'circle(82% at 50% 46%)' } },
  { key: 'detail', label: 'Product Detail', img: BASE + 'productdetail.png', scaleFrom: 0.62, clip: { from: 'inset(22% 22% 22% 22% round 20px)', to: 'inset(0% 0% 0% 0% round 20px)' } },
  { key: 'cart', label: 'View Cart', img: BASE + 'cartstep1.png', clip: { from: 'inset(0 100% 0 0 round 20px)', to: 'inset(0 0% 0 0 round 20px)' } },
  { key: 'address', label: 'Address', img: BASE + 'cartstep2.png', clip: { from: 'inset(0 0 0 100% round 20px)', to: 'inset(0 0 0 0% round 20px)' } },
  { key: 'slot', label: 'Delivery Time Slot', img: null, clip: { from: 'inset(100% 0 0 0 round 20px)', to: 'inset(0% 0 0 0 round 20px)' } },
  { key: 'payment', label: 'Payment', img: null, clip: { from: 'inset(0 0 100% 0 round 20px)', to: 'inset(0 0 0% 0 round 20px)' } },
  { key: 'success', label: 'Order Success', img: null, scaleFrom: 0.72, clip: { from: 'inset(20% 20% 20% 20% round 20px)', to: 'inset(0% 0% 0% 0% round 20px)' } },
]

const hideOnErr = (e) => { e.currentTarget.style.opacity = 0 }

export default function KnifeStory() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector
      const knife = q('.knf-knife')[0]
      const screenEls = q('.knf-screen')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // initial states — screens hidden by their clip, knife upright, intro shown
      screenEls.forEach((el, i) => {
        gsap.set(el, { clipPath: SCREENS[i].clip.from, scale: SCREENS[i].scaleFrom || 1, zIndex: i + 1 })
      })

      if (reduce) {
        gsap.set(screenEls[screenEls.length - 1], { clipPath: 'inset(0 round 20px)', scale: 1, zIndex: 99 })
        gsap.set(knife, { autoAlpha: 0 })
        gsap.set(q('.knf-intro'), { autoAlpha: 0 })
        return
      }

      gsap.set(knife, { rotate: 0, x: 0, y: 0, transformOrigin: '50% 94%' })

      // `.knf` is tall; `.knf-pin` is CSS-sticky, so we scrub the timeline across
      // the section scroll (no ScrollTrigger pin → works inside transformed ancestors).
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1 — hold the intro (knife upright, editorial type)
      tl.to({}, { duration: 0.5 })

      // 2 — the type lifts away while the knife tips over with weight
      tl.to('.knf-intro', { yPercent: -135, duration: 1 }, '>')
      tl.to(knife, { rotate: -96, x: '-24vw', y: '10vh', duration: 1.15, ease: 'power2.in' }, '<')

      // 3 — the blade slices diagonally → Home is physically revealed by the clip
      tl.to(screenEls[0], { clipPath: SCREENS[0].clip.to, duration: 1, ease: 'power3.inOut' }, '>-0.15')
      // knife carries through and leaves the frame naturally
      tl.to(knife, { x: '-98vw', y: '30vh', rotate: -142, duration: 0.9, ease: 'power2.in' }, '<0.25')

      // 4 — every screen morphs into the next (clip + scale, never a fade)
      for (let i = 1; i < screenEls.length; i++) {
        tl.to(screenEls[i], { clipPath: SCREENS[i].clip.to, scale: 1, duration: 1 }, '>0.1')
      }

      // 5 — settle
      tl.to({}, { duration: 0.6 })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="knf" ref={root}>
      <div className="knf-pin">
        {/* editorial intro */}
        <div className="knf-intro">
          <h2 className="knf-headline">Fresh.<br />Premium.<br />Delivered.</h2>
          <p className="knf-sub">The Kaatkut buying experience — sliced open, screen by screen.</p>
        </div>

        {/* the knife */}
        <div className="knf-knife" aria-hidden="true">
          <svg viewBox="0 0 80 430" className="knf-knife-svg">
            <defs>
              <linearGradient id="knfSteel" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#c2c7cd" />
                <stop offset="0.34" stopColor="#f2f4f7" />
                <stop offset="0.5" stopColor="#ffffff" />
                <stop offset="0.66" stopColor="#dfe3e8" />
                <stop offset="1" stopColor="#a7adb5" />
              </linearGradient>
            </defs>
            {/* blade (tip up) */}
            <path d="M31 14 C46 20 52 62 52 120 L52 250 L28 250 L28 60 C28 38 30 20 31 14 Z" fill="url(#knfSteel)" stroke="#9aa0a8" strokeWidth="1" strokeLinejoin="round" />
            <path d="M52 118 L52 250" stroke="#ffffff" strokeWidth="1.6" opacity="0.85" />
            {/* bolster + handle */}
            <rect x="23" y="250" width="34" height="18" rx="3" fill="#8b9098" />
            <rect x="25" y="266" width="30" height="150" rx="12" fill="#2b2b2e" />
            <circle cx="40" cy="300" r="3.2" fill="#6b6b70" />
            <circle cx="40" cy="344" r="3.2" fill="#6b6b70" />
          </svg>
        </div>

        {/* stacked screens revealed by clip-path */}
        <div className="knf-stack">
          {SCREENS.map((s) => (
            <div className={`knf-screen knf-screen--${s.key}`} key={s.key}>
              <div className="knf-card">
                <span className="knf-ph">{s.label}</span>
                {s.img && <img src={s.img} alt="" loading="lazy" onError={hideOnErr} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
