import Reveal from './Reveal.jsx'
import femaleAvatar from '../assets/persona-female.svg'

// Black & white line-drawing portrait avatars.
const avatars = {
  male: (
    <svg viewBox="0 0 72 72" fill="none">
      <path d="M24 56c0-6 5-10 12-10s12 4 12 10" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="23" cy="36" r="3.2" fill="#fff" stroke="#111" strokeWidth="2.2" />
      <circle cx="49" cy="36" r="3.2" fill="#fff" stroke="#111" strokeWidth="2.2" />
      <rect x="24" y="24" width="24" height="26" rx="12" fill="#fff" stroke="#111" strokeWidth="2.2" />
      <path d="M23 32c-1-12 7-19 13-19s14 7 13 19c-2-5-5-8-8-9 .5 2 0 4 0 4-2-4-6-6-11-5-3 .7-6 4-7 10z" fill="#111" />
      <circle cx="31" cy="35" r="4.2" stroke="#111" strokeWidth="1.8" />
      <circle cx="41" cy="35" r="4.2" stroke="#111" strokeWidth="1.8" />
      <path d="M35.2 35h1.6" stroke="#111" strokeWidth="1.8" />
      <path d="M32 44c2.5 2 5.5 2 8 0" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  female: <img src={femaleAvatar} alt="" className="persona-avatar-img" />,
}

// ── Icon library (referenced by name from each need / frustration) ──────────
const svg = (children) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
)

const icons = {
  smile: svg(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5c1 1.3 2.2 2 3.5 2s2.5-.7 3.5-2" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
  calendar: svg(
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9.5h16M9 3v4M15 3v4" />
    </>
  ),
  pin: svg(
    <>
      <path d="M12 21c5-5.5 7-8.5 7-11a7 7 0 1 0-14 0c0 2.5 2 5.5 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  search: svg(
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  mail: svg(
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7.5l8 5.5 8-5.5" />
    </>
  ),
  refresh: svg(
    <>
      <path d="M20 11a8 8 0 0 0-14-4.7L4 8" />
      <path d="M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14 4.7L20 16" />
      <path d="M20 20v-4h-4" />
    </>
  ),
  users: svg(
    <>
      <circle cx="9" cy="9" r="3.2" />
      <path d="M3.5 19c0-3 2.5-4.8 5.5-4.8s5.5 1.8 5.5 4.8" />
      <path d="M16 6.2a3.2 3.2 0 0 1 0 5.6M17.5 14.6c2.1.6 3.5 2 3.5 4.4" />
    </>
  ),
  home: svg(
    <>
      <path d="M4 11l8-7 8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  offline: svg(
    <>
      <path d="M3 3l18 18" />
      <path d="M5 12.4a10 10 0 0 1 4-2.3" />
      <path d="M13 10.3a10 10 0 0 1 6 2.1" />
      <path d="M8.4 15.8a5 5 0 0 1 4.3-1.5" />
      <circle cx="12" cy="19" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  star: svg(
    <path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.6l5.9-.8z" />
  ),
  scatter: svg(
    <>
      {[
        [6, 6], [12, 6], [18, 6],
        [6, 12], [18, 12],
        [6, 18], [12, 18], [18, 18],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill="currentColor" stroke="none" />
      ))}
    </>
  ),
  target: svg(
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  alert: svg(
    <>
      <path d="M12 4.5 21 19.5H3z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.6" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
}

const DEFAULT_PERSONAS = [
  {
    avatar: 'male',
    name: 'Rahul Verma',
    age: '25 Years',
    location: 'Ahmedabad',
    quote: 'I just wanted to enjoy my trip, but I spent too much time figuring out where to find information.',
    bio: 'Rahul booked a family vacation to Kashmir through My Last Minute Trip. As the primary planner, he coordinated every arrangement for the family. During the trip he constantly fielded questions about schedules, transport and activities — leaving little time to actually relax and enjoy it himself.',
    needs: [
      { icon: 'smile', text: 'Enjoy the trip without worrying about logistics' },
      { icon: 'calendar', text: 'Stay informed about daily plans' },
      { icon: 'pin', text: 'Explore local attractions confidently' },
    ],
    frustrations: [
      { icon: 'search', text: 'Difficulty finding booking details quickly' },
      { icon: 'calendar', text: 'Uncertainty about daily schedules' },
      { icon: 'mail', text: 'Too many emails and confirmations' },
      { icon: 'refresh', text: 'Last-minute changes causing confusion' },
      { icon: 'users', text: 'Limited ways to discover fellow travelers' },
    ],
  },
  {
    avatar: 'female',
    name: 'Ananya Sharma',
    age: '29 Years',
    location: 'Mumbai',
    quote: 'I don’t want to dig through five different apps mid-trip — I just want everything in one place.',
    bio: 'Ananya books spontaneous weekend getaways on My Last Minute Trip. She travels light and plans on the go, relying entirely on her phone. Switching between email, chat and maps to track her trip leaves her feeling scattered and unprepared on arrival.',
    needs: [
      { icon: 'home', text: 'One home for every trip detail' },
      { icon: 'offline', text: 'Quick access even when offline' },
      { icon: 'star', text: 'Recommendations she can actually trust' },
    ],
    frustrations: [
      { icon: 'scatter', text: 'Information scattered across apps' },
      { icon: 'offline', text: 'No offline access to bookings' },
      { icon: 'refresh', text: 'Hard to keep up with changes' },
      { icon: 'target', text: 'Generic, irrelevant suggestions' },
      { icon: 'alert', text: 'Feeling unprepared on arrival' },
    ],
  },
]

export default function UserPersona({ personas = DEFAULT_PERSONAS }) {
  return (
    <div className="personas">
      {personas.map((p, i) => (
        <Reveal as="article" className="persona" key={p.name} delay={i * 120}>
          {/* Left — identity + quote */}
          <div className="persona-left">
            <div className="persona-id">
              <div className="persona-avatar">{avatars[p.avatar]}</div>
              <dl className="persona-facts">
                <div className="persona-fact">
                  <dt>Name</dt>
                  <dd>{p.name}</dd>
                </div>
                <div className="persona-fact">
                  <dt>Age</dt>
                  <dd>{p.age}</dd>
                </div>
                <div className="persona-fact">
                  <dt>Location</dt>
                  <dd>{p.location}</dd>
                </div>
              </dl>
            </div>
            <blockquote className="persona-quote">{p.quote}</blockquote>
          </div>

          {/* Right — bio / needs / frustrations */}
          <div className="persona-right">
            <div className="persona-block">
              <span className="persona-label">Bio</span>
              <p>{p.bio}</p>
            </div>
            <div className="persona-block">
              <span className="persona-label">Core needs</span>
              <ul className="persona-list persona-list--icon">
                {p.needs.map((n) => (
                  <li key={n.text}>
                    <span className="persona-li-ico persona-li-ico--need">{icons[n.icon]}</span>
                    <span>{n.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="persona-block">
              <span className="persona-label">Frustrations</span>
              <ul className="persona-list persona-list--icon">
                {p.frustrations.map((f) => (
                  <li key={f.text}>
                    <span className="persona-li-ico persona-li-ico--frust">{icons[f.icon]}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
