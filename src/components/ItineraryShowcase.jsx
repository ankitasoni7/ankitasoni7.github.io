import { useEffect, useRef, useState } from 'react'
import AutoScrollImg from './AutoScrollImg.jsx'

// High-fi status-bar icons (same as WireframeMorph) — network + battery.
function StatusIcons() {
  return (
    <span className="wm-sb-icons">
      <svg viewBox="0 0 18 12" width="18" height="12" aria-hidden="true">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5" width="3" height="7" rx="1" />
        <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      <svg viewBox="0 0 26 12" width="26" height="12" aria-hidden="true">
        <rect x="0.6" y="1" width="21" height="10" rx="2.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="2.2" y="2.6" width="16" height="6.8" rx="1.4" />
        <rect x="23" y="4" width="2" height="4" rx="1" />
      </svg>
    </span>
  )
}

const hideOnMissing = (e) => { e.currentTarget.style.display = 'none' }

// Realistic WireframeMorph high-fi phone frame (wm-high-phone), reused here.
// `scroll` = page-linked scrolling image (centre); `autoScroll` = self-scrolling
// image with hover control (sides); otherwise a static cover image.
function WmPhone({ image, trackRef, large = false, scroll = false, autoScroll = false, onError }) {
  return (
    <div className={`wm-phone itsc-wmphone${large ? ' itsc-wmphone--lg' : ''}`}>
      <div className="wm-high-phone">
        <span className="wm-btn-l a" />
        <span className="wm-btn-l b" />
        <span className="wm-btn-l c" />
        <span className="wm-btn-r" />
        <div className="wm-screen wm-screen--dark">
          <span className="wm-island" />
          <div className="wm-statusbar wm-statusbar--dark">
            <span className="wm-sb-time">9:41</span>
            <StatusIcons />
          </div>
          <div className="wm-img-area">
            {scroll ? (
              <img className="itsc-screen-img" ref={trackRef} src={image} alt="" onError={onError} />
            ) : autoScroll ? (
              <AutoScrollImg image={image} />
            ) : (
              <img src={image} alt="" onError={hideOnMissing} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Side callouts — title + description, pointed at the phone with a dashed line.
const DEFAULT_NOTES = [
  { side: 'right', top: '4%', title: 'Flight Details', text: 'Inbound and outbound flights with airline, code, duration and times.' },
  { side: 'left', top: '20%', title: 'Transport Details', text: 'Door-to-door transfers — tram, taxi and walking legs on a live map.' },
  { side: 'right', top: '37%', title: 'Hotel Details', text: 'Stay, room type, check-in / check-out and amenities at a glance.' },
  { side: 'left', top: '54%', title: 'Sightseeing', text: 'Curated attractions, shopping and night life for free time.' },
  { side: 'right', top: '70%', title: 'Dinner Details', text: 'Reservations with cuisine, timing and one-tap directions.' },
  { side: 'left', top: '86%', title: 'Add Activity', text: 'Drop in your own place or activity and slot it into the day.' },
]

const photo = (seed) => `https://picsum.photos/seed/${seed}/400/240`

// The scrolling itinerary screen (rendered twice for a seamless loop).
function Itinerary() {
  return (
    <div className="iti" aria-hidden="true">
      <div className="iti-hero">
        <img src={photo('swiss-hero')} alt="" />
        <div className="iti-hero-cap">
          <strong>SURREAL SWITZERLAND</strong>
          <span>17th January 2021 – 22nd January 2021</span>
        </div>
      </div>

      <div className="iti-days">
        {[['THU', 7], ['FRI', 8], ['SAT', 9], ['SUN', 10], ['MON', 11], ['TUE', 12], ['WED', 13]].map(
          ([d, n], i) => (
            <div className={`iti-day${i === 0 ? ' is-on' : ''}`} key={d}>
              <span>{d}</span>
              <i>{n}</i>
            </div>
          )
        )}
      </div>

      <div className="iti-date">📅 &nbsp;7 January 2020 Thursday</div>

      {/* Flight */}
      <div className="iti-card">
        <div className="iti-time">05:00 pm – 06:00 am</div>
        <div className="iti-cat">Flight</div>
        <div className="iti-flight">
          <div className="iti-leg">
            <b>EK539</b>
            <span>AHMEDABAD</span>
            <span className="iti-dim">05:00 pm</span>
          </div>
          <div className="iti-dur">✈ 12h 45m</div>
          <div className="iti-leg iti-leg--end">
            <b>EK087</b>
            <span>ZURICH</span>
            <span className="iti-dim">6:00 am</span>
          </div>
        </div>
      </div>

      {/* Transport */}
      <div className="iti-card">
        <div className="iti-time">06:00 am – 06:24 am</div>
        <div className="iti-cat">Zurich → Dolder Grand Hotel</div>
        <div className="iti-transport">
          <ul className="iti-route">
            <li>🚆 Train, line 3 tram</li>
            <li className="iti-dim">Zürich Flughafen · 3.4km</li>
            <li>🚕 Taxi</li>
            <li className="iti-dim">Römerhof · 1.5km · DolderGrand</li>
          </ul>
          <img className="iti-map" src={photo('zurich-map')} alt="" />
        </div>
      </div>

      {/* Hotel check-in */}
      <div className="iti-card">
        <div className="iti-time">6:30 am – 8:00 am</div>
        <div className="iti-cat">Hotel Check-in</div>
        <div className="iti-hotel">
          <img src={photo('dolder-hotel')} alt="" />
          <div>
            <strong>The Dolder Grand</strong>
            <span className="iti-dim">Hotel in Zürichberg, Zürich</span>
            <span className="iti-row">Standard room · 2 Twin beds</span>
          </div>
        </div>
      </div>

      {/* Sightseeing */}
      <div className="iti-card">
        <div className="iti-time">08:00 am – 8:15 pm</div>
        <div className="iti-cat">Sightseeing</div>
        <div className="iti-tabs">
          <span className="is-on">Attractions</span>
          <span>Shopping</span>
          <span>Night Life</span>
        </div>
        <div className="iti-hotel">
          <img src={photo('uetliberg')} alt="" />
          <div>
            <strong>Uetliberg</strong>
            <span className="iti-dim">Mountain in Switzerland</span>
            <span className="iti-row">Transfer · Weather</span>
          </div>
        </div>
      </div>

      {/* Dinner */}
      <div className="iti-card">
        <div className="iti-time">08:15 pm – 9:30 pm</div>
        <div className="iti-cat">Dinner</div>
        <div className="iti-hotel">
          <img src={photo('tamarind')} alt="" />
          <div>
            <strong>Tamarind Hill Indian Restaurant</strong>
            <span className="iti-dim">Zürichberg, Zürich · 8:30 pm</span>
            <span className="iti-row">Transfer · Weather</span>
          </div>
        </div>
      </div>

      {/* Add activity */}
      <div className="iti-card iti-card--add">
        <div className="iti-cat">Add Activity</div>
        <div className="iti-search">🔍 Search for Activity</div>
        <button className="iti-add">＋ Add Activity</button>
      </div>
    </div>
  )
}

export default function ItineraryShowcase({
  eyebrow = 'The Itinerary',
  title = 'Every detail of the trip, in one screen',
  topbar = 'Itinerary Details',
  notes = DEFAULT_NOTES,
  screen,
  image,
  pinned = false,
  sides,
}) {
  const content = screen ?? <Itinerary />
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [active, setActive] = useState(0)
  const [imgFailed, setImgFailed] = useState(false)
  const activeRef = useRef(0)
  const useImage = image && !imgFailed

  // reveal the callouts when the phone scrolls into view
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // pinned mode: the phone sticks and its screen scrolls with the page (porty-style)
  useEffect(() => {
    if (!pinned) return
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = track?.parentElement
    if (!section || !track || !viewport) return
    let raf = 0
    let max = 0

    const isMobile = () => window.matchMedia('(max-width: 1024px)').matches
    const measure = () => {
      if (isMobile()) {
        section.style.height = ''
        track.style.transform = ''
        max = 0
        return
      }
      max = Math.max(0, track.scrollHeight - viewport.clientHeight)
      // size the runway so screen-scroll ≈ page-scroll (1:1)
      section.style.height = `${max + window.innerHeight}px`
    }
    const render = () => {
      if (max <= 0) return
      const total = section.offsetHeight - window.innerHeight
      const p = total > 0
        ? Math.min(Math.max(-section.getBoundingClientRect().top / total, 0), 1)
        : 0
      track.style.transform = `translateY(${-(p * max)}px)`
      // sync the active callout to scroll position
      if (notes.length) {
        const idx = Math.min(notes.length - 1, Math.max(0, Math.floor(p * notes.length)))
        if (idx !== activeRef.current) {
          activeRef.current = idx
          setActive(idx)
        }
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }
    const onResize = () => {
      measure()
      render()
    }

    measure()
    render()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    // re-measure once images have loaded (their height is unknown until then)
    const imgs = track.tagName === 'IMG' ? [track] : track.querySelectorAll('img')
    imgs.forEach((im) => {
      if (!im.complete) im.addEventListener('load', onResize)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [pinned, image])

  return (
    <section className={`itsc${pinned ? ' itsc--pinned' : ''}`} ref={sectionRef}>
      <div className="itsc-sticky">
        <div className="container">
          {eyebrow && <span className="itsc-eyebrow">{eyebrow}</span>}
          {title && <h2 className="itsc-title">{title}</h2>}

          <div className={`itsc-stage${inView ? ' in' : ''}`} ref={stageRef}>
            {notes.map((n, i) => (
              <div
                key={n.title}
                className={`itsc-note itsc-note--${n.side}${
                  pinned ? ` itsc-note--sync${active === i ? ' is-on' : ''}` : ''
                }`}
                style={pinned ? undefined : { top: n.top, transitionDelay: `${0.15 + i * 0.12}s` }}
              >
                <span className="itsc-note-line" />
                <span className="itsc-note-dot" />
                <h3>{n.title}</h3>
                <p>{n.text}</p>
              </div>
            ))}

            {useImage ? (
              sides && sides.length ? (
                // Large scrolling phone in the centre, a captioned phone on each side
                <div className="itsc-trio">
                  {sides[0] && (
                    <div className="itsc-side">
                      <WmPhone image={sides[0].image} autoScroll />
                      <div className="itsc-side-cap">
                        <h4>{sides[0].title}</h4>
                        <p>{sides[0].desc}</p>
                      </div>
                    </div>
                  )}
                  <WmPhone
                    image={image}
                    trackRef={trackRef}
                    large
                    scroll
                    onError={() => setImgFailed(true)}
                  />
                  {sides[1] && (
                    <div className="itsc-side">
                      <WmPhone image={sides[1].image} autoScroll />
                      <div className="itsc-side-cap">
                        <h4>{sides[1].title}</h4>
                        <p>{sides[1].desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <WmPhone
                  image={image}
                  trackRef={trackRef}
                  large
                  scroll
                  onError={() => setImgFailed(true)}
                />
              )
            ) : (
              <div className="itsc-phone">
                <span className="itsc-island" />
                <div className="itsc-screen">
                  <div className="itsc-topbar">
                    <span>‹</span>
                    <span>{topbar}</span>
                    <span>⟳</span>
                  </div>
                  <div className="itsc-viewport">
                    <div className="itsc-scroll" ref={trackRef}>
                      {content}
                      {!pinned && content}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
