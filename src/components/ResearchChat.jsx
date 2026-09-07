import { useEffect, useRef, useState } from 'react'

// Black & white line-drawing character avatars.
const svgProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: '#111',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const avatars = {
  // interviewer — glasses
  me: (
    <svg {...svgProps}>
      <path d="M24 7c5 0 9 4 9 9v3a9 9 0 0 1-18 0v-3c0-5 4-9 9-9z" />
      <path d="M15 16c1-5 17-5 18 0" />
      <circle cx="20" cy="19" r="2.3" />
      <circle cx="28" cy="19" r="2.3" />
      <path d="M22.3 19h3.4" />
      <path d="M21.5 25c1.5 1.2 3.5 1.2 5 0" />
      <path d="M12 41c1.5-6 6-9 12-9s10.5 3 12 9" />
    </svg>
  ),
  // MLMT owner — beard
  owner: (
    <svg {...svgProps}>
      <path d="M24 7c5 0 9 4 9 9v3a9 9 0 0 1-18 0v-3c0-5 4-9 9-9z" />
      <path d="M15 15c2-4 16-4 18 0" />
      <path d="M16 22c1.2 4.5 4.2 7 8 7s6.8-2.5 8-7" />
      <circle cx="20.5" cy="19" r="1.2" fill="#111" stroke="none" />
      <circle cx="27.5" cy="19" r="1.2" fill="#111" stroke="none" />
      <path d="M12 41c1.5-6 6-9 12-9s10.5 3 12 9" />
    </svg>
  ),
  // traveler — cap
  traveler: (
    <svg {...svgProps}>
      <path d="M24 9c5 0 9 4 9 9v3a9 9 0 0 1-18 0v-3c0-5 4-9 9-9z" />
      <path d="M16 16c0-5 16-5 16 0" />
      <path d="M14 16h18" />
      <path d="M32 16h5" />
      <circle cx="20.5" cy="20" r="1.2" fill="#111" stroke="none" />
      <circle cx="27.5" cy="20" r="1.2" fill="#111" stroke="none" />
      <path d="M21.5 25c1.5 1.2 3.5 1.2 5 0" />
      <path d="M12 42c1.5-6 6-9 12-9s10.5 3 12 9" />
    </svg>
  ),
}

const ownerChat = {
  title: 'Interview · MLMT Owner',
  who: 'owner',
  messages: [
    { from: 'me', text: 'How are travel details currently delivered to users after booking?' },
    { from: 'them', text: 'Users receive booking confirmations through email, and in some cases via SMS or third-party travel providers.' },
    { from: 'me', text: 'What challenges are most commonly reported after booking?' },
    { from: 'them', text: 'Users often report difficulty finding their travel details quickly, especially when info is spread across multiple platforms.' },
    { from: 'me', text: 'Is there any existing centralized system for managing trips?' },
    { from: 'them', text: 'No — currently users must manually manage their travel details using separate tools and platforms.' },
  ],
}

const userChat = {
  title: 'Interview · Travelers',
  who: 'traveler',
  messages: [
    { from: 'me', text: 'What difficulties do you face during travel?' },
    { from: 'them', text: 'It takes time to find the right information, especially when I am in a hurry or offline.' },
    { from: 'me', text: 'What kind of information do you check most often during a trip?' },
    { from: 'them', text: 'Flight status, hotel booking details, directions, and weather updates.' },
    { from: 'me', text: 'What do you wish was easier during your travel experience?' },
    { from: 'them', text: 'Having all my travel information in one place so I don’t need to search across different apps.' },
  ],
}

function Thread({ chat, start }) {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)

  // Once the section is in view, play the conversation: show a typing
  // indicator, then reveal each message one after another.
  useEffect(() => {
    if (!start) return
    let cancelled = false
    const timers = []
    const reveal = (i) => {
      if (cancelled || i >= chat.messages.length) {
        setTyping(false)
        return
      }
      setTyping(true)
      timers.push(
        setTimeout(() => {
          if (cancelled) return
          setTyping(false)
          setShown(i + 1)
          timers.push(setTimeout(() => reveal(i + 1), 450))
        }, 850)
      )
    }
    reveal(0)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [start, chat])

  const avatarFor = (from) => (from === 'me' ? avatars.me : avatars[chat.who])
  const nextFrom = chat.messages[shown]?.from

  return (
    <div className="rchat">
      <div className="rchat-head">
        <span className="rchat-head-avatar">{avatars[chat.who]}</span>
        {chat.title}
      </div>
      <div className="rchat-body">
        {/* Hidden copy of the full conversation — reserves the final height up
            front so the page below never shifts as messages arrive. */}
        <div className="rchat-ghost" aria-hidden="true">
          {chat.messages.map((m, i) => (
            <div key={i} className={`rchat-msg rchat-msg--${m.from}`}>
              <span className="rchat-avatar">{avatarFor(m.from)}</span>
              <span className="rchat-bubble">{m.text}</span>
            </div>
          ))}
        </div>

        <div className="rchat-live">
          {chat.messages.slice(0, shown).map((m, i) => (
            <div key={i} className={`rchat-msg rchat-msg--${m.from}`}>
              <span className="rchat-avatar">{avatarFor(m.from)}</span>
              <span className="rchat-bubble">{m.text}</span>
            </div>
          ))}

          {typing && nextFrom && (
            <div className={`rchat-msg rchat-msg--${nextFrom}`}>
              <span className="rchat-avatar">{avatarFor(nextFrom)}</span>
              <span className="rchat-bubble rchat-typing">
                <span className="rchat-dot" />
                <span className="rchat-dot" />
                <span className="rchat-dot" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResearchChat({ chats = [ownerChat, userChat] }) {
  const ref = useRef(null)
  const [start, setStart] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true)
          obs.disconnect()
        }
      },
      // only fire once the chats are well inside the viewport — i.e. the user
      // has actually scrolled to the research section
      { threshold: 0, rootMargin: '-25% 0px -30% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="research-chats" ref={ref}>
      {chats.map((c, i) => (
        <Thread chat={c} start={start} key={i} />
      ))}
    </div>
  )
}
