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
        I like building things end to end &mdash; from the data pipeline to the
        model to the interface someone actually touches. This site is a running
        log of side projects across mobile, web, and AI, built to learn by
        shipping rather than by reading about it.
      </motion.p>
    </section>
  )
}
