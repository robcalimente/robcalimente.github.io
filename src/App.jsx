import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  return (
    <>
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
