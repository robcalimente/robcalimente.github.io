import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './StartLights.css'

const LIGHTS = [0, 1, 2, 3, 4]
const STEP_MS = 200

export default function StartLights({ onDone }) {
  const [litCount, setLitCount] = useState(0)

  useEffect(() => {
    const timers = LIGHTS.map((i) =>
      setTimeout(() => setLitCount(i + 1), STEP_MS * (i + 1))
    )
    const allLitAt = STEP_MS * LIGHTS.length
    const lightsOutTimer = setTimeout(() => setLitCount(0), allLitAt + 400)
    const goTimer = setTimeout(() => onDone?.(), allLitAt + 650)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(lightsOutTimer)
      clearTimeout(goTimer)
    }
  }, [onDone])

  return (
    <motion.div
      className="start-lights"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="start-lights-row">
        {LIGHTS.map((i) => (
          <span
            key={i}
            className={`start-light ${i < litCount ? 'lit' : ''}`}
          />
        ))}
      </div>
    </motion.div>
  )
}
