// A realistic phone mockup for hero banners — reuses the WireframeMorph
// high-fi frame (wm-high-phone) with a static cover screen + image placeholder.
const hide = (e) => { e.currentTarget.style.display = 'none' }

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

function ImagePlaceholder() {
  return (
    <div className="wm-img-ph">
      <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
        <rect x="2.5" y="4" width="19" height="16" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="9.5" r="1.8" fill="currentColor" />
        <path d="M4 18l5-5 3.5 3.5L16 12l4 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span>Image</span>
    </div>
  )
}

export default function HeroPhone({ image, className = '' }) {
  return (
    <div className={`wm-phone hero-phone ${className}`}>
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
            <ImagePlaceholder />
            {image && <img src={image} alt="" onError={hide} />}
          </div>
        </div>
      </div>
    </div>
  )
}
