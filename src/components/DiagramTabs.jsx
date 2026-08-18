import { useState } from 'react'
import FlowDiagram from './FlowDiagram.jsx'

// Tabbed diagram viewer. Pass either a `tabs` array of { label, svg }, or the
// legacy `ia` / `userflow` props. Switching tabs remounts FlowDiagram (via key)
// so its build-up animation re-runs for the newly shown diagram.
export default function DiagramTabs({ tabs, ia, userflow }) {
  const items =
    tabs ?? [
      { label: 'Information Architecture', svg: ia },
      { label: 'User Flow', svg: userflow },
    ]
  const [active, setActive] = useState(0)

  return (
    <div className="dgt">
      <div className="dgt-tabs" role="tablist">
        {items.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`dgt-tab${active === i ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <FlowDiagram key={active} svg={items[active].svg} src={items[active].src} />
    </div>
  )
}
