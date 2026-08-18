import HeroProjects from '../components/HeroProjects.jsx'
import Testimonials from '../components/Testimonials.jsx'
import About from '../components/About.jsx'
import AboutV2 from '../components/AboutV2.jsx'
import Process from '../components/Process.jsx'
import Services from '../components/Services.jsx'
import FAQ from '../components/FAQ.jsx'
import PortfolioChat from '../components/PortfolioChat.jsx'

export default function Home() {
  return (
    <main>
      <HeroProjects />
      <Testimonials />
      <About />
      <AboutV2 />
      <Process />
      <Services />
      <FAQ />
      <PortfolioChat />
    </main>
  )
}
