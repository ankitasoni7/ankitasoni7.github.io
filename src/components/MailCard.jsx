// macOS Mail–style card used to present the client brief as an email.
const DEFAULT = {
  barTitle: 'Inbox — Client',
  avatar: 'ML',
  sender: 'My Last Minute Trip',
  date: 'Jun 21, 2026',
  email: 'product@mylastminutetrip.com',
  to: 'To: hello@creativebrains.design',
  subject: 'MLMT App Overview',
  intro:
    'My Last Minute Trip currently helps travelers discover and book trips through our platform. While the booking experience performs well, we believe there is an opportunity to provide additional value to customers after their trip has been booked.',
  subhead: 'What We Aim For — Our Core Objectives',
  intro2:
    'At this stage, we are exploring ways to improve the post-booking experience but are unsure what features or services would be most beneficial to travelers.',
  askLabel: 'We would like to better understand:',
  bullets: [
    'What challenges travelers face after booking a trip',
    'How they currently manage travel information',
    'What support they need before and during their journey',
    'Opportunities to improve customer satisfaction and engagement',
  ],
  body2:
    'Our goal is to create a more complete travel experience that extends beyond booking and helps travelers throughout their journey.',
  body3:
    'We are looking for recommendations based on user research and design exploration.',
  signName: 'Product Manager',
  signOrg: 'My Last Minute Trip',
}

export default function MailCard({ data = DEFAULT }) {
  return (
    <div className="mailcard">
      {/* Window title bar */}
      <div className="mailcard-bar">
        <span className="mailcard-dots">
          <span className="mailcard-dot mailcard-dot--r" />
          <span className="mailcard-dot mailcard-dot--y" />
          <span className="mailcard-dot mailcard-dot--g" />
        </span>
        <span className="mailcard-bar-title">{data.barTitle}</span>
        <span className="mailcard-bar-spacer" />
      </div>

      {/* Sender row */}
      <div className="mailcard-head">
        <span className="mailcard-avatar">{data.avatar}</span>
        <div className="mailcard-head-meta">
          <div className="mailcard-head-row">
            <span className="mailcard-sender">{data.sender}</span>
            <span className="mailcard-date">{data.date}</span>
          </div>
          <span className="mailcard-email">{data.email}</span>
          <span className="mailcard-to">{data.to}</span>
        </div>
      </div>

      <div className="mailcard-subject">{data.subject}</div>

      {/* Body */}
      <div className="mailcard-body">
        <p className="mailcard-line">{data.intro}</p>

        <h4 className="mailcard-line mailcard-subhead">{data.subhead}</h4>

        <p className="mailcard-line">{data.intro2}</p>

        <p className="mailcard-line">{data.askLabel}</p>

        <ul className="mailcard-line mailcard-list">
          {data.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <p className="mailcard-line">{data.body2}</p>

        <p className="mailcard-line">{data.body3}</p>

        <p className="mailcard-line mailcard-sign">
          Thank you,
          <br />
          {data.signName}
          <br />
          {data.signOrg}
        </p>
      </div>
    </div>
  )
}
