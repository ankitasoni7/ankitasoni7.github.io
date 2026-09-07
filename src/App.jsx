import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './styles.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomeV2 from './pages/HomeV2.jsx'
import ProjectDetailMLMT from './pages/ProjectDetailMLMT.jsx'
import ProjectMLMTv2 from './pages/ProjectMLMTv2.jsx'
import ProjectKaatkutV2 from './pages/ProjectKaatkutV2.jsx'
import ProjectDetail2 from './pages/ProjectDetail2.jsx'
import Projects from './pages/Projects.jsx'
import LogoFolio from './pages/LogoFolio.jsx'

// Jump to top on route change — or to the #hash target when there is one,
// so header links like /#about work from any page.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/logofolio" element={<LogoFolio />} />
        <Route path="/project2" element={<ProjectDetail2 />} />
        <Route path="/mlmt" element={<ProjectDetailMLMT />} />
        <Route path="/mlmt-v2" element={<ProjectMLMTv2 />} />
        <Route path="/kaatkut-v2" element={<ProjectKaatkutV2 />} />
        {/* retired routes and stale bookmarks land on the homepage */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}
