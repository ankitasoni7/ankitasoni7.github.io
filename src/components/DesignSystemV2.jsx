import { motion } from 'framer-motion'

/* ────────────────────────────────────────────────────────────────────────
 * SWAPPABLE GLYPH CONFIG
 * Change `AA` per project to showcase a different typeface's "Aa".
 * - viewBox     : SVG coordinate space
 * - metrics[]   : typographic guideline rules { label, y }
 * - glyphs[]    : stroke path `d` strings (no fill) drawn in order
 * - nodes[]     : [x, y] anchor points laid on the paths
 * - handles[]   : [x1, y1, x2, y2] bézier direction handles
 * ──────────────────────────────────────────────────────────────────────── */
const AA = {
  viewBox: '0 0 420 300',
  metrics: [
    { label: 'Cap Height', y: 55 },
    { label: 'X-Height', y: 150 },
    { label: 'Baseline', y: 245 },
  ],
  glyphs: [
    'M55 245 L110 55 L165 245 M71 190 L149 190', // A
    'M310 150 C333 150 352 171 352 197 C352 224 333 245 310 245 C287 245 268 224 268 197 C268 171 287 150 310 150 Z', // a — bowl
    'M352 150 L352 245', // a — stem
  ],
  nodes: [
    [55, 245], [110, 55], [165, 245], [71, 190], [149, 190],
    [310, 150], [352, 197], [310, 245], [268, 197], [352, 150], [352, 245],
  ],
  handles: [
    [280, 150, 340, 150],
    [352, 167, 352, 227],
    [280, 245, 340, 245],
    [268, 167, 268, 227],
  ],
}

const swatches = [
  { name: 'brand-primary', hex: '#EF2E31' },
  { name: 'ink-900', hex: '#1C1C1C' },
  { name: 'accent-sky', hex: '#BFD7F5' },
  { name: 'surface-800', hex: '#262626' },
  { name: 'base-white', hex: '#FFFFFF' },
  { name: 'true-black', hex: '#000000' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 130, damping: 18 } } }

// LEFT — vector "Aa" drawing itself on a blueprint canvas
function AaCanvas() {
  return (
    <div className="dsv2-canvas">
      <div className="dsv2-grid" aria-hidden="true" />
      <svg className="dsv2-svg" viewBox={AA.viewBox} aria-hidden="true">
        {/* construction rules */}
        {AA.metrics.map((m) => (
          <g key={m.label}>
            <line x1="0" y1={m.y} x2="420" y2={m.y} className="dsv2-rule" />
            <text x="8" y={m.y - 6} className="dsv2-mlabel">{m.label}</text>
          </g>
        ))}

        {/* bézier direction handles */}
        {AA.handles.map((h, i) => (
          <g className="dsv2-vhandle" key={`h${i}`} style={{ animationDelay: `${i * 0.4}s` }}>
            <line x1={h[0]} y1={h[1]} x2={h[2]} y2={h[3]} className="dsv2-hline" />
            <circle cx={h[0]} cy={h[1]} r="3" className="dsv2-hdot" />
            <circle cx={h[2]} cy={h[3]} r="3" className="dsv2-hdot" />
          </g>
        ))}

        {/* black stroke glyphs (self-drawing) */}
        {AA.glyphs.map((d, i) => (
          <path key={`g${i}`} d={d} pathLength="1" className="dsv2-glyph" style={{ animationDelay: `${i * 0.7}s` }} />
        ))}

        {/* anchor nodes */}
        {AA.nodes.map((n, i) => (
          <rect key={`n${i}`} x={n[0] - 3.5} y={n[1] - 3.5} width="7" height="7" className="dsv2-node" style={{ animationDelay: `${(i % 5) * 0.2}s` }} />
        ))}
      </svg>
    </div>
  )
}

export default function DesignSystemV2() {
  return (
    <section className="dsv2">
      <div className="dsv2-head">
        <span className="dsv2-kicker">03 — DESIGN SYSTEM · V2</span>
        <h3 className="dsv2-title">Type &amp; Color</h3>
      </div>

      <div className="dsv2-shell">
        {/* LEFT — typography */}
        <div className="dsv2-left">
          <span className="dsv2-lbl">Typography — Construction</span>
          <AaCanvas />
        </div>

        {/* RIGHT — color tokens */}
        <motion.div
          className="dsv2-right"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="dsv2-lbl">Color Tokens</span>
          <div className="dsv2-swatches">
            {swatches.map((s) => (
              <motion.div className="dsv2-pill" variants={item} key={s.name} whileHover={{ y: -3 }}>
                <span
                  className="dsv2-pill-swatch"
                  style={{ background: s.hex, boxShadow: s.hex === '#FFFFFF' ? 'inset 0 0 0 1px #e4e4e7' : undefined }}
                />
                <span className="dsv2-pill-body">
                  <b>{s.name}</b>
                  <code>{s.hex}</code>
                </span>
                <span className="dsv2-pill-flag">token.unwrap()</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
