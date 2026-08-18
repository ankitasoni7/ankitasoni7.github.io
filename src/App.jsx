import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './styles.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import ProjectDetail2 from './pages/ProjectDetail2.jsx'
import ProjectDetail3 from './pages/ProjectDetail3.jsx'
import Projects from './pages/Projects.jsx'
import LogoFolio from './pages/LogoFolio.jsx'
import ProjectDetailV2 from './pages/ProjectDetailV2.jsx'

// Jump to top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/logofolio" element={<LogoFolio />} />
        <Route path="/project-v2" element={<ProjectDetailV2 />} />
        <Route path="/project2" element={<ProjectDetail2 />} />
        <Route path="/project3" element={<ProjectDetail3 />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </>
  )
}
