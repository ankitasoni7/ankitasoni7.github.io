// Reusable mlmt phone + dashboard (final-screen mockup frame + glass UI).
// Sections carry data-k so a parent timeline can reveal them in any order.
// Dark night-mountain wallpaper so the dashboard reads as a dark theme.
const BG = 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=80'

const ico = {
  menu: 'M4 7h16M4 12h16M4 17h10',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  list: 'M9 6h11M9 12h11M9 18h11',
  chev: 'M9 18l6-6-6-6',
  arrow: 'M7 17 17 7M9 7h8v8',
  // simple line icons — no colour, no emoji
  plane: 'M10.2 13.8 3 12l1.2-1.6 5 .6 3.3-3.9L3.9 3.6 5.4 2l11 3.6 2.6-3a1.8 1.8 0 0 1 2.5 2.5l-3 2.6L22 18.6 20.4 20l-3.5-8.6-3.9 3.3.6 5L12 21z',
  hotel: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 10h.01M12 10h.01M15 10h.01M9 13h.01M12 13h.01M15 13h.01',
  doc: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4',
  cloud: 'M17.5 19a4.5 4.5 0 0 0 .3-9A6 6 0 0 0 6.3 11 3.5 3.5 0 0 0 7 19z',
  headset: 'M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2zM20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2zM17 18v1a3 3 0 0 1-3 3h-2',
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
                <div className="dh-card-h"><span className="dh-gi"><Svg d={ico.plane} w="19" /></span><Svg d={ico.arrow} w="15" cls="dh-out" /></div>
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
              <div className="dh-svc" data-k="hotel"><span className="dh-gi"><Svg d={ico.hotel} w="19" /></span><span className="dh-svc-tx"><b>Hotel Details</b><i>The Dolder Grand · Check-in 11:30 AM</i></span><Svg d={ico.chev} w="17" cls="dh-out" /></div>
              <div className="dh-svc" data-k="docs"><span className="dh-gi"><Svg d={ico.doc} w="19" /></span><span className="dh-svc-tx"><b>Travel Documents</b><i>Passport · Visa · Insurance (3 files)</i></span><Svg d={ico.chev} w="17" cls="dh-out" /></div>
              <div className="dh-svc" data-k="weather"><span className="dh-gi"><Svg d={ico.cloud} w="19" /></span><span className="dh-svc-tx"><b>Weather</b><i>5°C · Zürich</i></span><Svg d={ico.chev} w="17" cls="dh-out" /></div>
              <div className="dh-svc" data-k="support"><span className="dh-gi"><Svg d={ico.headset} w="19" /></span><span className="dh-svc-tx"><b>Support</b><i>24/7 Concierge</i></span><span className="dh-chat">Live Chat</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
