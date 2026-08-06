import { motion } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
      >
        Let's talk
      </motion.h2>
      <motion.p
        className="contact-sub"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Open to opportunities &mdash; reach out directly or find me elsewhere.
      </motion.p>
      <motion.div
        className="contact-links"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href="mailto:rcalimente@gmail.com" className="button button-primary">
          rcalimente@gmail.com
        </a>
        <a href="/resume.pdf" className="button button-ghost">
          Download resume
        </a>
      </motion.div>
      <motion.div
        className="social-links"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </motion.div>
    </section>
  )
}
