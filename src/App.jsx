import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import StartLights from './components/StartLights'
import LapLine from './components/LapLine'

function App() {
  const [showIntro, setShowIntro] = useState(
    () => sessionStorage.getItem('intro-shown') !== 'true'
  )

  const handleIntroDone = () => {
    sessionStorage.setItem('intro-shown', 'true')
    setShowIntro(false)
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && <StartLights onDone={handleIntroDone} />}
      </AnimatePresence>
      <LapLine />
      <Hero />
      <section className="page-two snap-page">
        <div className="snap-page-inner">
          <Projects />
          <Contact />
        </div>
      </section>
    </>
  )
}

export default App
