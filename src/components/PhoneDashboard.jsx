// Reusable mlmt phone + dashboard (final-screen mockup frame + glass UI).
// Sections carry data-k so a parent timeline can reveal them in any order.
const BG = 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80'

const ico = {
  menu: 'M4 7h16M4 12h16M4 17h10',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  list: 'M9 6h11M9 12h11M9 18h11',
  chev: 'M9 18l6-6-6-6',
  arrow: 'M7 17 17 7M9 7h8v8',
}

function Svg({ d, w = 20, cls = '' }) {
  return (
    <svg className={cls} width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export default function PhoneDashboard({ className = '' }) {
  return (
    <div className={`wm-phone ${className}`}>
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
  )
}
