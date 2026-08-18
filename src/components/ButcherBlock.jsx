import { useState, useRef, useEffect, useCallback } from 'react'

/* ── 9 chronological steps → exact asset paths ──────────────────────────────
 * Drop the images into  public/finalscreen/  so these resolve as /finalscreen/*
 * ────────────────────────────────────────────────────────────────────────── */
const STEPS = [
  { title: 'Home Experience', desc: 'The landing — cut of the day, categories and quick reorder.', img: 'finalscreen/home-screen.png' },
  { title: 'Product Catalog', desc: 'Browse the whole counter, filtered by cut, weight and price.', img: 'finalscreen/product-list.png' },
  { title: 'Detail: Standard Cuts', desc: 'A single cut with gross / net weight and add-to-cart.', img: 'finalscreen/detail-normal.png' },
  { title: 'Detail: Meal Boxes', desc: 'Curated boxes, portioned and priced for the week.', img: 'finalscreen/detail-mealbox.png' },
  { title: 'Detail: BBQ Party Sets', desc: 'Marinated party sets, ready for the fire.', img: 'finalscreen/detail-bbq.png' },
  { title: 'Checkout: View Cart', desc: 'Review items, weights and the running total.', img: 'finalscreen/checkout-cart.png' },
  { title: 'Checkout: Logistics', desc: 'Delivery address, slot and cold-chain note.', img: 'finalscreen/checkout-address.png' },
  { title: 'Checkout: Secure Pay', desc: 'Confirm and pay with a single, clear CTA.', img: 'finalscreen/checkout-payment.png' },
  { title: 'Order Confirmed', desc: 'Thank you — live tracking all the way to the door.', img: 'finalscreen/thankyou.png' },
]

const TOTAL = STEPS.length
const clamp = (i) => Math.max(0, Math.min(TOTAL - 1, i))
const src = (p) => `/${p}`
const hideOnErr = (e) => { e.currentTarget.style.opacity = 0 }

export default function ButcherBlock() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [cutting, setCutting] = useState(false)
  const lock = useRef(false)
  const stageRef = useRef(null)

  const go = useCallback((d) => {
    if (lock.current) return
    const t = index + d
    if (t < 0 || t >= TOTAL) return
    lock.current = true
    setDir(d)
    setCutting(true)
    window.setTimeout(() => {
      setIndex(t)
      setCutting(false)
      window.setTimeout(() => { lock.current = false }, 140)
    }, 820) // matches the CSS cut duration
  }, [index])

  // scroll (wheel) + swipe drive the cut; only hijack while a move is possible
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e) => {
      if (lock.current) { e.preventDefault(); return }
      const d = e.deltaY > 0 ? 1 : -1
      const t = index + d
      if (t >= 0 && t < TOTAL) { e.preventDefault(); go(d) }
    }
    let sy = 0
    const onStart = (e) => { sy = e.touches[0].clientY }
    const onEnd = (e) => {
      const dy = sy - e.changedTouches[0].clientY
      if (Math.abs(dy) > 44) go(dy > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [go, index])

  const cur = STEPS[index]
  const under = STEPS[clamp(index + dir)] // layer revealed beneath the cut

  return (
    <div className="chop">
      {/* 3D isometric chopping block */}
      <div className="chop-stage" ref={stageRef}>
        <div className="chop-block">
          {/* the layer waiting directly below */}
          <div className="chop-card chop-card--under" key={`u-${cur.title}-${under.title}`}>
            <span className="chop-fallback">{under.title}</span>
            <img src={src(under.img)} alt="" onError={hideOnErr} />
          </div>

          {/* active layer, split into two halves by the cleaver */}
          <div className={`chop-card chop-card--top${cutting ? ' is-cut' : ''}`} key={`t-${index}`}>
            <span className="chop-fallback">{cur.title}</span>
            <div className="chop-half chop-half--l"><img src={src(cur.img)} alt="" onError={hideOnErr} /></div>
            <div className="chop-half chop-half--r"><img src={src(cur.img)} alt="" onError={hideOnErr} /></div>
            <span className="chop-cleaver" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* crisp 2D copy panel */}
      <aside className="chop-panel">
        <span className="chop-eyebrow">Final Screens · The Chopping Block</span>
        <span className="chop-step">{String(index + 1).padStart(2, '0')}<i>/ 0{TOTAL}</i></span>
        <h3 className="chop-title">{cur.title}</h3>
        <p className="chop-desc">{cur.desc}</p>

        <div className="chop-nav">
          <button type="button" className="chop-btn" onClick={() => go(-1)} disabled={index === 0}>← Previous</button>
          <button type="button" className="chop-btn" onClick={() => go(1)} disabled={index === TOTAL - 1}>Next →</button>
        </div>
        <span className="chop-hint">Scroll or swipe over the block to slice through</span>
        <div className="chop-progress"><span style={{ width: `${(index / (TOTAL - 1)) * 100}%` }} /></div>
      </aside>
    </div>
  )
}
