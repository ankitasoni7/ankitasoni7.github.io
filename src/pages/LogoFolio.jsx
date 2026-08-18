import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

// ── The brand mark (8-spoke "bloom") — reused everywhere, animates in ──────
function Mark({ className = '', animated = false }) {
  return (
    <svg className={`lf-mark ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      {[0, 45, 90, 135].map((deg, i) => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <rect
            className={animated ? 'lf-spoke lf-spoke--anim' : 'lf-spoke'}
            x="43"
            y="7"
            width="14"
            height="86"
            rx="7"
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
          />
        </g>
      ))}
    </svg>
  )
}

const palette = [
  { name: 'Nova Violet', hex: '#6C4CF1', fg: '#fff' },
  { name: 'Ink', hex: '#0E0E12', fg: '#fff' },
  { name: 'Signal', hex: '#FF5C38', fg: '#fff' },
  { name: 'Mist', hex: '#EDEBF7', fg: '#0E0E12' },
  { name: 'Paper', hex: '#FFFFFF', fg: '#0E0E12' },
]

const variations = [
  { label: 'Primary lockup', cls: 'lf-var--light', lockup: true },
  { label: 'Monogram', cls: 'lf-var--dark', lockup: false },
  { label: 'Wordmark', cls: 'lf-var--light', word: true },
  { label: 'Reversed', cls: 'lf-var--brand', lockup: true },
]

const mockups = [
  { label: 'App icon', kind: 'icon' },
  { label: 'Business card', kind: 'card' },
  { label: 'Signage', kind: 'sign' },
  { label: 'Tote', kind: 'tote' },
]

const donts = [
  { ok: true, text: 'Use the mark with clear space on solid backgrounds.' },
  { ok: false, text: 'Don’t rotate, stretch or recolour the spokes.' },
  { ok: true, text: 'Keep the violet for primary, ink for everything else.' },
  { ok: false, text: 'Don’t add shadows, gradients or outlines to the mark.' },
]

export default function LogoFolio() {
  return (
    <main className="lf">
      {/* ── Hero ── */}
      <section className="lf-hero">
        <div className="container">
          <Reveal as="span" className="lf-eyebrow">Logo Design · Brand Identity</Reveal>

          <div className="lf-hero-grid">
            <div>
              <Reveal as="h1" className="lf-hero-title" delay={60}>NOVA</Reveal>
              <Reveal as="p" className="lf-hero-tag" delay={140}>
                A bold identity system for a studio that bends light into ideas.
              </Reveal>
              <Reveal className="lf-hero-meta" delay={220}>
                <div><span>Client</span><b>Nova Studio</b></div>
                <div><span>Year</span><b>2025</b></div>
                <div><span>Deliverables</span><b>Logotype · Monogram · Guidelines</b></div>
              </Reveal>
            </div>

            <div className="lf-hero-markwrap">
              <Mark className="lf-hero-mark" animated />
            </div>
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section className="lf-section container">
        <Reveal as="span" className="lf-tag">01 — Concept</Reveal>
        <Reveal as="p" className="lf-bigtext" delay={80}>
          One mark, infinite directions. The Nova bloom radiates from a single point —
          a system built to flex across every surface while always resolving to the
          same shape.
        </Reveal>
      </section>

      {/* ── Construction grid ── */}
      <section className="lf-section container">
        <Reveal as="span" className="lf-tag">02 — Construction</Reveal>
        <div className="lf-construct">
          <Reveal className="lf-construct-stage">
            <svg className="lf-grid" viewBox="0 0 100 100" aria-hidden="true">
              {[20, 35, 50].map((r) => (
                <circle key={r} cx="50" cy="50" r={r} className="lf-grid-circle" />
              ))}
              {[10, 30, 50, 70, 90].map((p) => (
                <g key={p}>
                  <line x1={p} y1="4" x2={p} y2="96" className="lf-grid-line" />
                  <line x1="4" y1={p} x2="96" y2={p} className="lf-grid-line" />
                </g>
              ))}
            </svg>
            <Mark className="lf-construct-mark" />
          </Reveal>
          <Reveal className="lf-construct-copy" delay={120}>
            <p>
              Built on a strict radial grid. Each spoke shares one width and one corner
              radius, set on a golden-ratio circle so the mark feels balanced at any size.
            </p>
            <ul className="lf-spec">
              <li><span>Spokes</span><b>8</b></li>
              <li><span>Angle step</span><b>45°</b></li>
              <li><span>Corner radius</span><b>50%</b></li>
              <li><span>Optical center</span><b>50 / 50</b></li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Variations ── */}
      <section className="lf-section container">
        <Reveal as="span" className="lf-tag">03 — Variations</Reveal>
        <div className="lf-vars">
          {variations.map((v, i) => (
            <Reveal key={v.label} className={`lf-var ${v.cls}`} delay={i * 80}>
              <div className="lf-var-stage">
                {v.word ? (
                  <span className="lf-wordmark">NOVA</span>
                ) : v.lockup ? (
                  <span className="lf-lockup">
                    <Mark className="lf-lockup-mark" />
                    <span className="lf-wordmark">NOVA</span>
                  </span>
                ) : (
                  <Mark className="lf-var-mark" />
                )}
              </div>
              <span className="lf-var-label">{v.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Marquee ── */}
      <section className="lf-marquee" aria-hidden="true">
        <div className="lf-marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>
              NOVA <Mark className="lf-marquee-mark" /> STUDIO <Mark className="lf-marquee-mark" />
            </span>
          ))}
        </div>
      </section>

      {/* ── Color ── */}
      <section className="lf-section container">
        <Reveal as="span" className="lf-tag">04 — Color</Reveal>
        <div className="lf-colors">
          {palette.map((c, i) => (
            <Reveal
              key={c.name}
              className="lf-swatch"
              delay={i * 70}
              style={{ background: c.hex, color: c.fg }}
            >
              <span className="lf-swatch-name">{c.name}</span>
              <span className="lf-swatch-hex">{c.hex}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Typography ── */}
      <section className="lf-section container">
        <Reveal as="span" className="lf-tag">05 — Typography</Reveal>
        <div className="lf-type">
          <Reveal className="lf-type-aa">Aa</Reveal>
          <Reveal className="lf-type-info" delay={100}>
            <h3>Geometric Grotesk</h3>
            <p>
              A clean geometric sans carries the wordmark and headlines — wide tracking,
              tall caps, set in tight all-caps for the logotype.
            </p>
            <div className="lf-type-set">ABCDEFGHIJKLM<br />NOPQRSTUVWXYZ<br />0123456789</div>
          </Reveal>
        </div>
      </section>

      {/* ── In use / mockups ── */}
      <section className="lf-section container">
        <Reveal as="span" className="lf-tag">06 — In use</Reveal>
        <div className="lf-mockups">
          {mockups.map((m, i) => (
            <Reveal key={m.label} className={`lf-mock lf-mock--${m.kind}`} delay={i * 80}>
              <div className="lf-mock-stage">
                <Mark className="lf-mock-mark" />
              </div>
              <span className="lf-mock-label">{m.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Guidelines ── */}
      <section className="lf-section container">
        <Reveal as="span" className="lf-tag">07 — Guidelines</Reveal>
        <div className="lf-dos">
          {donts.map((d, i) => (
            <Reveal key={d.text} className={`lf-do ${d.ok ? 'is-ok' : 'is-no'}`} delay={i * 70}>
              <span className="lf-do-icon">{d.ok ? '✓' : '✕'}</span>
              <p>{d.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Outro ── */}
      <section className="lf-outro container">
        <Reveal>
          <Mark className="lf-outro-mark" />
          <h2 className="lf-outro-title">Identity, end to end.</h2>
          <Link to="/projects" className="lf-outro-link">← Back to all work</Link>
        </Reveal>
      </section>
    </main>
  )
}
