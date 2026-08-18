import { useEffect, useRef } from 'react'

// Screens live in /public/projects/<project>/{mid-fidelity,high-fidelity}/screen-0N.png
const COUNT = 3
const buildScreens = (project) =>
  Array.from({ length: COUNT }, (_, i) => {
    const n = String(i + 1).padStart(2, '0')
    return {
      mid: `/projects/${project}/mid-fidelity/screen-${n}.png`,
      high: `/projects/${project}/high-fidelity/screen-${n}.png`,
    }
  })

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp = (v) => Math.max(0, Math.min(1, v))

// High-fi status-bar icons — network (cellular) + battery only
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

// Mid-fi wireframe status bar — boxes instead of text/icons (no time text)
function StatusBoxes() {
  return (
    <>
      <span className="wm-sb-box wm-sb-box--time" />
      <span className="wm-sb-boxes">
        <span className="wm-sb-box wm-sb-box--net" />
        <span className="wm-sb-box wm-sb-box--bat" />
      </span>
    </>
  )
}

// Shown until a screen image is dropped into the folder.
function ImagePlaceholder() {
  return (
    <div className="wm-img-ph">
      <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="9.5" r="1.8" fill="currentColor" />
        <path d="M4 18l5-5 3.5 3.5L16 12l4 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span>Image</span>
    </div>
  )
}

const hideOnMissing = (e) => {
  e.currentTarget.style.display = 'none'
}

// Pinned section: on arrival each phone is just a line-drawn outline holding the
// mid-fi wireframe. Scrolling reveals the realistic silver phone + high-fi screen
// top→bottom (clip-path). Staggered so the pin holds until all 3 finish; reverse
// scroll restores the line-drawn mid state.
// `theme` controls the status bar + screen surface: 'light' = dark icons on a
// light screen, 'dark' = light icons on a dark screen. Switch it per project.
export default function WireframeMorph({ project = 'project1', theme = 'light', screens }) {
  const sectionRef = useRef(null)
  const phonesRef = useRef([])
  const items = screens ?? buildScreens(project)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let raf = 0
    const desktop = window.matchMedia('(min-width: 901px)')

    const render = () => {
      const vh = window.innerHeight
      // desktop: one pinned timeline, phones reveal in sequence
      const total = section.offsetHeight - vh
      const progress = clamp(-section.getBoundingClientRect().top / total)

      phonesRef.current.forEach((phone, i) => {
        if (!phone) return
        const high = phone.querySelector('.wm-high')

        let p
        if (desktop.matches) {
          const start = i * 0.26
          const end = start + 0.34
          p = easeInOut(clamp((progress - start) / (end - start)))
        } else {
          // mobile: each stacked phone reveals as it scrolls up the viewport
          const top = phone.getBoundingClientRect().top
          p = easeInOut(clamp((vh * 0.85 - top) / (vh * 0.5)))
        }

        // TOP → BOTTOM reveal of the realistic phone + screen + side buttons
        // (drop the clip once fully open so the frame's drop shadow shows)
        high.style.clipPath = p >= 1 ? 'none' : `inset(0 0 ${(1 - p) * 100}% 0)`
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    render()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [items])

  return (
    <div className="wm-scroll" ref={sectionRef}>
      <div className="wm-sticky">
        <div className="wm-row">
          {items.map((s, i) => (
            <div className="wm-phone" key={i} ref={(el) => (phonesRef.current[i] = el)}>
              {/* MID — line-drawn phone outline holding the mid-fi wireframe */}
              <div className="wm-mid-phone">
                <span className="wm-notch-line" />
                <div className="wm-screen wm-screen--mid">
                  {/* status bar — boxes only, no text (low-fi wireframe) */}
                  <div className="wm-statusbar wm-statusbar--lin wm-statusbar-mid-dark">
                    <StatusBoxes />
                  </div>
                  <div className="wm-img-area">
                    <ImagePlaceholder />
                    <img src={s.mid} alt="" onError={hideOnMissing} />
                  </div>
                </div>
              </div>

              {/* HIGH — realistic silver phone + high-fi screen, revealed on scroll */}
              <div className="wm-high-phone wm-high">
                <span className="wm-btn-l a" />
                <span className="wm-btn-l b" />
                <span className="wm-btn-l c" />
                <span className="wm-btn-r" />
                <div className={`wm-screen wm-screen--${theme}`}>
                  <span className="wm-island" />

                  {/* Status bar — swap theme with the wm-statusbar--light / --dark class */}
                  <div className={`wm-statusbar wm-statusbar--${theme}`}>
                    <span className="wm-sb-time">9:41</span>
                    <StatusIcons />
                  </div>

                  {/* Image placeholder (your high-fi screen drops in here) */}
                  <div className="wm-img-area">
                    <ImagePlaceholder />
                    <img src={s.high} alt="" onError={hideOnMissing} />
                  </div>
                </div>
              </div>

              <span className="wm-label">Screen 0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
