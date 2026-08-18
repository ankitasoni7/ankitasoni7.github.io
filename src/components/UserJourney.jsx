// MLMT user journey — 4 phases. Thoughts and the feeling emoji share one row.
const tone = {
  good: '#12923a',
  low: '#e08415',
  bad: '#d6452f',
}

const DEFAULT_PHASES = [
  {
    phase: 'Booking Confirmation',
    actions: ['Books a travel package through MLMT'],
    goal: 'Successfully book a trip package.',
    feeling: { emoji: '😎', mood: 'Excited', tone: 'good' },
    thoughts: ['“Everything looks great. I can’t wait for my trip.”'],
    pains: [
      'Booking details arrive through multiple channels',
      'No single place to store information',
      'Hard to know which information matters most',
    ],
  },
  {
    phase: 'Trip Preparation',
    actions: [
      'Searches for hotel details',
      'Checks transfer information',
      'Reviews activity schedules',
      'Looks for travel documents',
    ],
    goal: 'Prepare for the journey with confidence.',
    feeling: { emoji: '😟', mood: 'Anxious', tone: 'low' },
    thoughts: [
      '“Do I have everything I need?”',
      '“Where can I find my pickup info?”',
    ],
    pains: [
      'Information scattered across email, PDFs & SMS',
      'Time spent searching for details',
      'Uncertainty before departure',
    ],
  },
  {
    phase: 'During the Journey',
    actions: [
      'Checks daily itinerary',
      'Looks for transportation details',
      'Accesses booking confirmations',
      'Shares plans with family',
    ],
    goal: 'Stay informed and navigate the trip smoothly.',
    feeling: { emoji: '😣', mood: 'Stressed', tone: 'bad' },
    thoughts: [
      '“What’s happening next?”',
      '“Where do I need to be now?”',
    ],
    pains: [
      'Constant switching between apps & messages',
      'Difficulty finding information quickly',
      'Confusion when plans change',
    ],
  },
  {
    phase: 'Trip Reflection',
    actions: [
      'Reviews full trip itinerary',
      'Downloads invoices / receipts',
      'Shares photos and experiences',
    ],
    goal: 'Access trip summary, receipts and memories in one place.',
    feeling: { emoji: '😊', mood: 'Relieved', tone: 'good' },
    thoughts: [
      '“I want all my trip details in one place.”',
      '“It would be nice to relive the trip easily.”',
    ],
    pains: [
      'No consolidated trip summary after travel',
      'Receipts scattered across emails / apps',
      'Hard to revisit past trips',
    ],
  },
]

function Bullets({ items }) {
  return (
    <ul className="jmap-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

export default function UserJourney({ phases = DEFAULT_PHASES }) {
  return (
    <div className="jmap-wrap">
    <div className="jmap">
      {/* Phase header */}
      <div className="jmap-rowlabel jmap-rowlabel--head">Phase</div>
      {phases.map((p) => (
        <div key={p.phase} className="jmap-phase">{p.phase}</div>
      ))}

      {/* User actions */}
      <div className="jmap-rowlabel">User Actions</div>
      {phases.map((p) => (
        <div key={p.phase} className="jmap-cell">
          <Bullets items={p.actions} />
        </div>
      ))}

      {/* Goals */}
      <div className="jmap-rowlabel">Goals</div>
      {phases.map((p) => (
        <div key={p.phase} className="jmap-cell jmap-cell--center">{p.goal}</div>
      ))}

      {/* Thoughts & Feelings */}
      <div className="jmap-rowlabel">Thoughts &amp; Feelings</div>
      {phases.map((p) => (
        <div key={p.phase} className="jmap-cell jmap-feel">
          <div className="jmap-feel-top">
            <span className="jmap-feel-emoji">{p.feeling.emoji}</span>
            <span className="jmap-feel-mood" style={{ color: tone[p.feeling.tone] }}>
              {p.feeling.mood}
            </span>
          </div>
          {p.thoughts.map((t) => (
            <p key={t} className="jmap-quote">{t}</p>
          ))}
        </div>
      ))}

      {/* Pain points */}
      <div className="jmap-rowlabel">Pain Points</div>
      {phases.map((p) => (
        <div key={p.phase} className="jmap-cell">
          <Bullets items={p.pains} />
        </div>
      ))}
    </div>
    </div>
  )
}
