import AutoScrollImg from './AutoScrollImg.jsx'

// Shown until a screen image is dropped in (same idea as the phone placeholder).
function ScreenPlaceholder() {
  return (
    <div className="mbk-ph">
      <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="9.5" r="1.8" fill="currentColor" />
        <path d="M4 18l5-5 3.5 3.5L16 12l4 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span>Add screen</span>
    </div>
  )
}

// Realistic MacBook mockup — aluminium lid + notch, black bezel screen, and a
// tapered base with hinge groove. The screen holds a tall desktop screenshot
// that slowly auto-scrolls (pauses + user-scrollable on hover). Falls back to an
// image placeholder until a screen is added.
export default function MacbookFrame({ image, label }) {
  return (
    <div className="mbk">
      <div className="mbk-lid">
        <div className="mbk-screen">
          <span className="mbk-notch" />
          <div className="mbk-viewport">
            <ScreenPlaceholder />
            {image && <AutoScrollImg image={image} speed={0.5} />}
          </div>
        </div>
      </div>
      <div className="mbk-base">
        <span className="mbk-groove" />
      </div>
      {label && <span className="mbk-label">{label}</span>}
    </div>
  )
}
