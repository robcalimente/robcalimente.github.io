import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import './LapLine.css'

export default function LapLine() {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const root = document.getElementById('root')
    if (root) setContainer({ current: root })
  }, [])

  const { scrollYProgress } = useScroll(
    container ? { container } : undefined
  )
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <div className="lap-line-track" aria-hidden="true">
      <motion.div className="lap-line-fill" style={{ scaleX }} />
    </div>
  )
}
