import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#home" className="logo logo-anim" aria-label="Creative Brain">
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <path d="M50 2C56 38 62 44 98 50C62 56 56 62 50 98C44 62 38 56 2 50C38 44 44 38 50 2Z" />
            </svg>
          </span>
          <span className="logo-word">
            {'Creative Brain'.split('').map((ch, i) => (
              <span key={i} className="logo-char">
                <span
                  className="logo-char-inner"
                  style={{ animationDelay: `${150 + i * 40}ms` }}
                >
                  {ch === ' ' ? ' ' : ch}
                </span>
              </span>
            ))}
          </span>
          <span className="logo-shine" aria-hidden="true" />
        </a>

        <nav>
          <ul className="header-nav">
            <li><a href="#home">Home</a></li>
            <li><Link to="/projects">Work</Link></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="header-right">
          <span className="availability-badge">
            <span className="availability-dot" />
            Available for projects
          </span>
          <a href="#contact" className="btn btn-primary">Contact me</a>
        </div>
      </div>
    </header>
  )
}
