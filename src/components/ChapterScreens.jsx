import { useEffect, useRef } from 'react'

const BASE = '/projects/project3/final-screens/'

// Each chapter: a pinned stage where the paper cuts away, then the screenshot
// scrolls through the viewport 1:1 with the page before the next chapter takes over.
const CHAPTERS = [
  {
    key: 'home',
    kicker: '01 / Home Experience',
    title: 'The Kaatkut Home Screen',
    desc: 'A warm, appetite-led storefront that leads with fresh cuts, seasonal recipes and same-day delivery — built to make ordering meat and seafood feel as good as cooking it.',
    img: BASE + 'homepage.png',
  },
  {
    key: 'detail',
    kicker: '02 / Product Detail',
    title: 'The Product Detail Page',
    desc: 'Every cut, every gram, every price point made clear — from fillet options to related recipes — so shoppers decide with confidence before checkout.',
    img: BASE + 'productdetail.png',
  },
  {
    key: 'cart',
    kicker: '03 / Cart',
    title: 'Review & Delivery Slot',
    desc: 'A calm review step: items, weights and totals in one column, with the delivery slot chosen right where the decision happens.',
    img: BASE + 'cartstep1.png',
  },
  {
    key: 'address',
    kicker: '04 / Checkout',
    title: 'Address & Confirmation',
    desc: 'Address, payment and confirmation stacked in a single flow — no surprises, no extra screens between intent and order placed.',
    img: BASE + 'cartstep2.png',
  },
]

const HOLD_VH = 0.55   // scroll before the cut fires (reading time)
const HERO_HOLD = 550  // px the hero stays pinned after the cut

const Knife = () => (
  <svg className="chs-knife-svg" viewBox="0 0 555 718" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M458.66 652.684C456.778 635.761 459.345 593.378 456.421 544.779C452.894 486.111 444.596 425.669 444.596 425.669L388.274 425.081C384.383 461.017 383.509 497.216 385.662 533.298C386.841 562.305 391.469 591.068 399.448 618.981C400.475 628.173 379.358 644.82 375.42 652.82C371.482 660.82 376.144 684.848 411.016 694.96C445.889 705.072 462.772 690.073 458.611 652.738M412.809 476.217C411.541 475.069 410.643 473.571 410.226 471.913C409.81 470.254 409.895 468.51 410.47 466.899C411.045 465.289 412.085 463.885 413.458 462.866C414.831 461.846 416.475 461.257 418.183 461.173C419.891 461.088 421.586 461.511 423.053 462.39C424.52 463.268 425.693 464.561 426.425 466.107C427.157 467.652 427.415 469.38 427.165 471.072C426.915 472.763 426.169 474.343 425.021 475.61C423.482 477.31 421.331 478.329 419.041 478.443C416.751 478.556 414.509 477.756 412.809 476.217ZM418.701 564.414C417.433 563.267 416.534 561.769 416.118 560.11C415.702 558.452 415.786 556.707 416.362 555.097C416.937 553.487 417.977 552.083 419.349 551.063C420.722 550.044 422.367 549.455 424.075 549.37C425.782 549.285 427.477 549.708 428.944 550.587C430.411 551.465 431.585 552.759 432.317 554.304C433.049 555.85 433.306 557.577 433.056 559.269C432.806 560.96 432.061 562.54 430.913 563.808C429.374 565.508 427.223 566.526 424.933 566.64C422.642 566.754 420.401 565.953 418.701 564.414ZM415.861 664.339C414.593 663.191 413.694 661.693 413.278 660.035C412.862 658.376 412.946 656.632 413.522 655.021C414.097 653.411 415.136 652.007 416.509 650.988C417.882 649.969 419.527 649.379 421.235 649.294C422.943 649.209 424.637 649.633 426.104 650.511C427.571 651.389 428.745 652.683 429.477 654.228C430.209 655.774 430.466 657.502 430.216 659.193C429.966 660.885 429.221 662.464 428.073 663.732C427.311 664.574 426.391 665.257 425.364 665.743C424.338 666.229 423.226 666.508 422.092 666.565C420.958 666.621 419.825 666.454 418.755 666.072C417.686 665.69 416.703 665.101 415.861 664.339Z" fill="black" />
    <path d="M484.255 76.0424C484.929 73.5172 485.012 70.8709 484.499 68.3084C483.985 65.7458 482.889 63.3355 481.295 61.2645C479.701 59.1935 477.651 57.5174 475.305 56.3655C472.959 55.2136 470.38 54.6171 467.766 54.622C400.215 53.8698 332.792 48.5242 265.966 38.6227C261.56 161.95 264.554 285.43 274.931 408.399C307.011 393.727 357.761 393.236 372.408 392.773C387.055 392.311 388.697 411.409 388.697 411.409C388.697 411.409 416.757 409.851 445.116 409.809C443.78 297.31 456.955 185.108 484.314 75.9782M456.794 77.9271C458.896 79.8303 460.387 82.3142 461.077 85.0646C461.768 87.8149 461.627 90.7081 460.674 93.3786C459.72 96.0491 457.995 98.3768 455.719 100.067C453.442 101.758 450.715 102.735 447.883 102.876C445.051 103.017 442.24 102.314 439.807 100.858C437.374 99.4013 435.428 97.2559 434.214 94.6931C433 92.1303 432.573 89.2652 432.988 86.46C433.402 83.6547 434.639 81.0353 436.543 78.9331C439.095 76.1142 442.662 74.4245 446.46 74.2358C450.258 74.0471 453.975 75.375 456.794 77.9271ZM282.666 396.12C273.186 280.492 270.372 164.415 274.239 48.4646C283.424 49.7629 298.777 51.8056 318.197 53.9728C312.884 123.027 316.522 321.302 329.825 386.605C313.819 388.113 298.006 391.309 282.666 396.12ZM456.303 138.479C439.474 218.312 431.573 299.769 432.745 381.349L420.751 381.414C419.806 368.352 411.281 248.303 456.292 138.469" fill="#EB1700" />
  </svg>
)

export default function ChapterScreens() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const chapters = Array.from(el.querySelectorAll('.chs-chapter')).map((section) => ({
      section,
      stage: section.querySelector('.chs-stage'),
      track: section.querySelector('.chs-track'),
      paper: section.querySelector('.chs-paper'),
      knife: section.querySelector('.chs-knife'),
      hint: section.querySelector('.chs-hint'),
      holdPx: 0, revealPx: 0, total: 0, top: 0, open: false,
    }))

    // The site header is sticky at the top, so the stage has to pin below it.
    const header = document.querySelector('.header')

    const measure = () => {
      const offset = header ? Math.round(header.getBoundingClientRect().height) : 0
      el.style.setProperty('--chs-top', offset + 'px')
      const stageH = window.innerHeight - offset

      chapters.forEach((c) => {
        c.holdPx = stageH * HOLD_VH
        c.revealPx = Math.max(c.track.offsetHeight - stageH, 0)
        c.total = c.holdPx + HERO_HOLD + c.revealPx
        c.section.style.height = stageH + c.total + 'px'
      })
      // scroll position at which the stage starts pinning
      chapters.forEach((c) => {
        c.top = c.section.getBoundingClientRect().top + window.scrollY - offset
      })
    }

    const update = () => {
      const y = window.scrollY
      chapters.forEach((c) => {
        const p = Math.min(Math.max(y - c.top, 0), c.total)

        const shouldOpen = p >= c.holdPx
        if (shouldOpen !== c.open) {
          c.open = shouldOpen
          c.stage.classList.toggle('is-open', shouldOpen)
          c.paper.classList.toggle('is-open', shouldOpen)
          c.knife.classList.toggle('is-fallen', shouldOpen)
        }

        const revealed = Math.min(Math.max(p - (c.holdPx + HERO_HOLD), 0), c.revealPx)
        c.track.style.transform = `translate3d(0, ${-revealed}px, 0)`
        c.hint.style.opacity = p > 20 ? '0' : '1'
      })
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { update(); ticking = false })
    }
    const onResize = () => { measure(); update() }

    measure()
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    el.querySelectorAll('.chs-track img').forEach((img) => {
      if (!img.complete) img.addEventListener('load', onResize)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      chapters.forEach((c) => { c.section.style.height = '' })
    }
  }, [])

  const hide = (e) => { e.currentTarget.style.opacity = 0 }

  return (
    <div className="chs" ref={root}>
      {CHAPTERS.map((c) => {
        const text = (
          <div className="chs-text">
            <span className="chs-kicker">{c.kicker}</span>
            <h3 className="chs-title">{c.title}</h3>
            <p className="chs-desc">{c.desc}</p>
          </div>
        )
        return (
          <section className="chs-chapter" key={c.key}>
            <div className="chs-stage">
              <div className="chs-track">
                <div className="chs-frame-wrap">
                  <div className="chs-frame">
                    <img src={c.img} alt={c.title} onError={hide} />
                  </div>
                </div>
              </div>

              <div className="chs-paper">
                <div className="chs-half chs-half--left">{text}</div>
                <div className="chs-half chs-half--right">{text}</div>
              </div>

              <div className="chs-knife"><Knife /></div>
              <div className="chs-hint">Scroll to explore</div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
