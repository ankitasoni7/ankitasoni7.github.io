import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BG = 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80'

// how long each notification stays active before it falls (≈ interval)
const HOLD = 1.3

// realistic travel notifications from many different platforms
const notifs = [
  { app: 'Gmail', time: 'now', msg: 'Flight AI 173 updated — new gate & timing', emoji: '✉️', bg: '#EA4335' },
  { app: 'WhatsApp', time: 'now', msg: 'Hotel check-in confirmed at The Dolder Grand', emoji: '💬', bg: '#25D366' },
  { app: 'Messages', time: '9:41 AM', msg: 'Taxi arriving — your cab reaches the lobby in 4 min', emoji: '🗨️', bg: '#34C759' },
  { app: 'Calendar', time: '9:40 AM', msg: 'Museum booking · Zürich, 22 Jan, 10:00 AM', emoji: '📅', bg: '#FF3B30' },
  { app: 'Weather', time: '8:00 AM', msg: 'Weather alert · Zürich 5°C, light snow expected', emoji: '⛅', bg: '#3A93E4' },
  { app: 'SafeTrip', time: 'Yesterday', msg: 'Travel insurance — policy & documents attached', emoji: '🛡️', bg: '#0A84FF' },
  { app: 'Family', time: '8:15 AM', msg: '“Text us the moment you land 💛”', emoji: '👨‍👩‍👧', bg: '#FF9500' },
  { app: 'Air India', time: 'now', msg: 'Gate change — boarding moved to gate A12', emoji: '✈️', bg: '#C8102E' },
]

const ico = {
  menu: 'M4 7h16M4 12h16M4 17h10',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  list: 'M9 6h11M9 12h11M9 18h11',
  chev: 'M9 18l6-6-6-6',
  arrow: 'M7 17 17 7M9 7h8v8',
}

export default function TravelHero() {
  const root = useRef(null)

  useEffect(() => {
    let master
    const ctx = gsap.context((self) => {
      const q = self.selector
      const phone = q('.sto-phone')[0]
      const bg = q('.dhz-bg')[0]
      const cards = q('.nfy')
      const chrome = q('.dh-top, .dh-title, .dh-status, .dh-sec')
      const order = ['flight', 'hotel', 'itin', 'docs', 'weather', 'support']
      const items = order.map((k) => q(`[data-k="${k}"]`)[0]).filter(Boolean)
      const n = cards.length
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduce) {
        gsap.set(cards, { autoAlpha: 0 })
        gsap.set([phone, ...chrome, ...items, ...q('.sto-l1, .sto-l2')], { autoAlpha: 1, y: 0, scale: 1 })
        return
      }

      // slow, video-like Ken Burns zoom on the phone wallpaper (visible in scene 2)
      if (bg) gsap.to(bg, { scale: 1.14, duration: 16, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '50% 42%' })

      // behind-card resting state
      const BY = 15, BS = 0.96, BO = 0.7

      // SCENE 1 initial states — NO phone, two big cards centered on the stage
      gsap.set(phone, { autoAlpha: 0, scale: 0.92, transformOrigin: '50% 50%' })
      gsap.set([...chrome, ...items], { autoAlpha: 0, y: 16 })
      gsap.set(q('.sto-l1, .sto-l2'), { autoAlpha: 0, y: 14 })
      gsap.set(cards, { xPercent: -50, yPercent: -50, left: '50%', top: '46%', y: BY, scale: BS, autoAlpha: 0, zIndex: 1, transformOrigin: '50% 50%' })
      gsap.set(cards[0], { y: 0, scale: 1, autoAlpha: 1, zIndex: 3 })
      gsap.set(cards[1], { y: BY, scale: BS, autoAlpha: BO, zIndex: 2 })

      master = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 78%', once: true } })

      // ── SCENE 1 — large notification cards, two-card falling stack ──
      const notif = gsap.timeline()
      for (let k = 0; k < n; k++) {
        const front = cards[k]
        const behind = cards[(k + 1) % n]
        const nb = cards[(k + 2) % n]
        const seg = gsap.timeline()
        // active card falls straight down off-screen — calm gravity, subtle ±2°, fade, scale 1→0.96
        seg.to(front, { y: 340, rotation: gsap.utils.random(-2, 2), scale: 0.96, autoAlpha: 0, duration: 0.95, ease: 'power2.in' }, 0)
        // second card glides up into center — soft, no overshoot (0.96→1, 70%→100%)
        seg.to(behind, { y: 0, scale: 1, autoAlpha: 1, zIndex: 3, duration: 0.9, ease: 'power2.out' }, 0.18)
        // a fresh notification appears behind, keeping exactly two visible
        seg.set(nb, { y: BY, scale: BS, rotation: 0, zIndex: 2, autoAlpha: 0 }, 0)
        seg.to(nb, { autoAlpha: BO, duration: 0.55, ease: 'power1.out' }, 0.5)
        // park the fallen card at the back of the queue
        seg.set(front, { y: BY, scale: BS, rotation: 0, zIndex: 1, autoAlpha: 0 })
        seg.to({}, { duration: HOLD }) // hold on the active card
        notif.add(seg)
      }
      master.add(notif, 0.3)

      // ── SCENE 2 — cards clear, the phone + dashboard are revealed ──
      master.addLabel('clear')
      master.to(cards, { autoAlpha: 0, y: '-=48', scale: 0.95, duration: 0.6, ease: 'power2.in', stagger: 0.04 }, 'clear')
      master.to(phone, { autoAlpha: 1, scale: 1, duration: 0.95, ease: 'power3.out' }, 'clear+=0.2')
      master.addLabel('reveal', 'clear+=0.7')
      master.to(chrome, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07 }, 'reveal')
      // Flight → Hotel → Itinerary → Documents → Weather → Support
      master.to(items, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.18 }, 'reveal+=0.35')
      // headline + subtitle
      master.to(q('.sto-l1'), { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 'reveal+=1.7')
      master.to(q('.sto-l2'), { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 'reveal+=1.95')
    }, root)

    // pause on hover
    const stage = root.current?.querySelector('.sto-stage')
    const enter = () => master && master.pause()
    const leave = () => master && master.play()
    stage?.addEventListener('mouseenter', enter)
    stage?.addEventListener('mouseleave', leave)

    return () => {
      stage?.removeEventListener('mouseenter', enter)
      stage?.removeEventListener('mouseleave', leave)
      ctx.revert()
    }
  }, [])

  return (
    <div className="sto" ref={root}>
      <div className="sto-stage">
        {/* SCENE 2 — the phone (hidden until the notifications clear) */}
        <div className="wm-phone sto-phone">
          <div className="wm-high-phone">
            <span className="wm-btn-l a" />
            <span className="wm-btn-l b" />
            <span className="wm-btn-l c" />
            <span className="wm-btn-r" />
            <div className="wm-screen wm-screen--dark dhz-screen">
              <span className="wm-island" />
              <div className="dhz-bg" style={{ backgroundImage: `url(${BG})` }} />
              <div className="dhz-veil" />

              <div className="dhz-ui no-scrollbar">
                <div className="dh-top">
                  <button className="dh-pill dh-icon"><Svg d={ico.menu} /></button>
                  <span className="dh-brand">mlmt</span>
                  <button className="dh-pill dh-icon dh-bell"><Svg d={ico.bell} /><i>1</i></button>
                </div>
                <div className="dh-title">
                  <h3>SURREAL SWITZERLAND</h3>
                  <p>17th – 22nd January 2021</p>
                </div>
                <div className="dh-status">
                  <span className="dh-chip"><i className="dh-dot" />Trip in progress · Day 2</span>
                  <span className="dh-bar"><i style={{ width: '34%' }} /></span>
                </div>
                <div className="dh-sec">
                  <span className="dh-sec-t">Trip Controls</span>
                  <span className="dh-more">view more <Svg d={ico.chev} w="12" /></span>
                </div>
                <div className="dh-controls">
                  <div className="dh-card" data-k="flight">
                    <div className="dh-card-h"><span className="dh-gi">✈️</span><Svg d={ico.arrow} w="15" cls="dh-out" /></div>
                    <b>Flight<br />Details</b>
                    <div className="dh-flight"><span className="dh-fno">AI 173</span><span className="dh-eta"><em>On Time</em>ETA 3:45 PM</span></div>
                  </div>
                  <div className="dh-card" data-k="itin">
                    <div className="dh-card-h"><span className="dh-gi"><Svg d={ico.list} /></span><Svg d={ico.arrow} w="15" cls="dh-out" /></div>
                    <b>Itinerary<br />Details</b>
                    <span className="dh-sub">View 22 Jan · Day 2<br />(Zürich Museum)</span>
                  </div>
                </div>
                <div className="dh-sec">
                  <span className="dh-sec-t">Services</span>
                  <span className="dh-more">view more <Svg d={ico.chev} w="12" /></span>
                </div>
                <div className="dh-services">
                  <div className="dh-svc" data-k="hotel"><span className="dh-gi">🏨</span><span className="dh-svc-tx"><b>Hotel Details</b><i>The Dolder Grand · Check-in 11:30 AM</i></span><Svg d={ico.chev} w="17" cls="dh-out" /></div>
                  <div className="dh-svc" data-k="docs"><span className="dh-gi">🛂</span><span className="dh-svc-tx"><b>Travel Documents</b><i>Passport · Visa · Insurance (3 files)</i></span><Svg d={ico.chev} w="17" cls="dh-out" /></div>
                  <div className="dh-svc" data-k="weather"><span className="dh-gi">⛅</span><span className="dh-svc-tx"><b>Weather</b><i>5°C · Zürich</i></span><Svg d={ico.chev} w="17" cls="dh-out" /></div>
                  <div className="dh-svc" data-k="support"><span className="dh-gi">🎧</span><span className="dh-svc-tx"><b>Support</b><i>24/7 Concierge</i></span><span className="dh-chat">Live Chat</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCENE 1 — large notification cards, centered on the stage */}
        <div className="nstack">
          {notifs.map((nf, i) => (
            <div className="nfy" key={i}>
              <span className="nfy-ic" style={{ background: nf.bg }}>{nf.emoji}</span>
              <div className="nfy-b">
                <div className="nfy-h"><b>{nf.app}</b><span>{nf.time}</span></div>
                <p>{nf.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sto-cap">
        <span className="sto-l1">Everything in One Place</span>
        <span className="sto-l2">From scattered travel updates to one beautifully organized journey.</span>
      </div>
    </div>
  )
}

function Svg({ d, w = 20, cls = '' }) {
  return (
    <svg className={cls} width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}
