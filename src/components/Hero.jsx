import { motion } from 'framer-motion'
import ParticleField from './ParticleField'
import './Hero.css'

const DOMAINS = ['DATA', 'AI', 'MOBILE', 'WEB']

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
        Rob Calimente
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        I turn data into decisions,
        <br />
        then build the AI and apps to act on them.
      </motion.h1>

      <motion.p
        className="hero-sub"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Data science and analytics is my background. AI systems, full-stack
        apps, and mobile-native software are what happens when I get curious
        about something and don't stop.
      </motion.p>

      <motion.div
        className="hero-domains"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {DOMAINS.map((domain, i) => (
          <span key={domain} className="hero-domain-chip">
            <span className="hero-domain-index">0{i + 1}</span>
            {domain}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
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
