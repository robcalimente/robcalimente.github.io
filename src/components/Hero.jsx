import { motion } from 'framer-motion'
import ParticleField from './ParticleField'
import './Hero.css'

export default function Hero() {
  return (
    <section id="hero" className="hero snap-page">
      <ParticleField />
      <div className="hero-glow" />
      <motion.p
        className="hero-eyebrow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Rob <span>Calimente</span>
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        I build full-stack, AI-powered,
        <br />
        and mobile-native software.
      </motion.h1>
      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        I build the whole thing: the pipeline, the model, the interface someone
        actually taps. Mobile, web, AI, doesn't matter, I'll figure it out. This
        is just what happens when I get curious about something and don't stop.
      </motion.p>
      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a href="#projects" className="button button-primary">
          See the work
        </a>
        <a href="#contact" className="button button-ghost">
          Get in touch
        </a>
      </motion.div>
    </section>
  )
}
