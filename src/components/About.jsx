import { motion } from 'framer-motion'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        About
      </motion.h2>
      <motion.p
        className="about-body"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        I build the whole thing: the pipeline, the model, the interface someone
        actually taps. Mobile, web, AI, doesn't matter, I'll figure it out. This
        is just what happens when I get curious about something and don't stop.
      </motion.p>
    </section>
  )
}
