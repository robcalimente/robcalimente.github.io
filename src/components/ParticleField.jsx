import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 70
const LINK_DISTANCE = 130
const MOUSE_RADIUS = 160
const RACER_LINK_DISTANCE = 170
const CAR_COLORS = ['#ef4444', '#3b82f6', '#a855f7', '#22c55e']

const KIND_CONFIG = {
  car: {
    minSpeed: 2,
    maxSpeed: 6,
    minScale: 0.8,
    maxScale: 1.4,
    minGapMs: 1800,
    maxGapMs: 4200,
    laneMin: 0.5,
    laneRange: 0.42,
  },
  bike: {
    minSpeed: 1.3,
    maxSpeed: 2.2,
    minScale: 0.7,
    maxScale: 1,
    minGapMs: 9000,
    maxGapMs: 16000,
    laneMin: 0.45,
    laneRange: 0.4,
  },
  run: {
    minSpeed: 0.6,
    maxSpeed: 1,
    minScale: 0.6,
    maxScale: 0.9,
    minGapMs: 18000,
    maxGapMs: 30000,
    laneMin: 0.4,
    laneRange: 0.45,
  },
  swim: {
    minSpeed: 0.35,
    maxSpeed: 0.55,
    minScale: 0.6,
    maxScale: 0.85,
    minGapMs: 20000,
    maxGapMs: 32000,
    laneMin: 0.86,
    laneRange: 0.1,
  },
}

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    let width, height, dpr
    let particles = []
    let racers = []
    let mouse = { x: -9999, y: -9999 }
    let animationId
    const racerTimeoutIds = {}

    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim() || '#c084fc'

    function hexToRgb(hex) {
      const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
      return m
        ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`
        : '192, 132, 252'
    }
    const accentRgb = hexToRgb(accent)

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }))
    }

    function spawnRacer(kind) {
      const cfg = KIND_CONFIG[kind]
      const fromLeft = Math.random() < 0.5
      const laneY = height * (cfg.laneMin + Math.random() * cfg.laneRange)
      const speed = cfg.minSpeed + Math.random() * (cfg.maxSpeed - cfg.minSpeed)
      const scale = cfg.minScale + Math.random() * (cfg.maxScale - cfg.minScale)
      const colorRgb =
        kind === 'car'
          ? hexToRgb(CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)])
          : accentRgb
      racers.push({
        kind,
        x: fromLeft ? -50 * scale : width + 50 * scale,
        y: laneY,
        vx: fromLeft ? speed : -speed,
        scale,
        colorRgb,
        phase: Math.random() * Math.PI * 2,
        trail: [],
      })
      racerTimeoutIds[kind] = setTimeout(
        () => spawnRacer(kind),
        cfg.minGapMs + Math.random() * (cfg.maxGapMs - cfg.minGapMs)
      )
    }

    function updateRacers() {
      for (const r of racers) {
        if (r.kind === 'car' || r.kind === 'swim') {
          r.trail.push({ x: r.x, y: r.y })
          if (r.trail.length > 14) r.trail.shift()
        }
        r.x += r.vx
        r.phase += Math.abs(r.vx) * 0.15
      }
      racers = racers.filter(
        (r) => r.x > -70 * r.scale && r.x < width + 70 * r.scale
      )
    }

    function drawRacers() {
      for (const r of racers) {
        for (let i = 0; i < r.trail.length; i++) {
          const t = r.trail[i]
          const alpha = (i / r.trail.length) * 0.35
          ctx.beginPath()
          ctx.arc(t.x, t.y, 1.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.fill()
        }

        const dir = r.vx > 0 ? 1 : -1
        if (r.kind === 'car') {
          drawCarSilhouette(r.x, r.y, dir, r.scale, r.colorRgb)
        } else if (r.kind === 'bike') {
          drawCyclist(r.x, r.y, dir, r.scale, r.phase, r.colorRgb)
        } else if (r.kind === 'swim') {
          drawSwimmer(r.x, r.y, dir, r.scale, r.phase, r.colorRgb)
        } else {
          drawRunner(r.x, r.y, dir, r.scale, r.phase, r.colorRgb)
        }

        for (const p of particles) {
          const dx = r.x - p.x
          const dy = r.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < RACER_LINK_DISTANCE) {
            const opacity = (1 - dist / RACER_LINK_DISTANCE) * 0.5
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(r.x, r.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }

      }
    }

    function drawCarSilhouette(cx, cy, dir, scale = 1, colorRgb = accentRgb) {
      const s = scale
      const at = (px, py) => [cx + px * dir * s, cy + py * s]

      // Long hood, raked windshield, short cabin pushed toward the rear
      // (coupe proportions), low rear haunch, small lip spoiler.
      const body = [
        [-22, 5],
        [-21, 1.5],
        [-17.5, -1],
        [-13, -2],
        [-10.5, -6.5],
        [-3, -7.5],
        [3, -6],
        [7, -3],
        [22, -0.5],
        [23, 3],
        [23, 5.5],
        [-22, 5.5],
      ].map(([px, py]) => at(px, py))

      ctx.beginPath()
      ctx.moveTo(body[0][0], body[0][1])
      for (let i = 1; i < body.length; i++) ctx.lineTo(body[i][0], body[i][1])
      ctx.closePath()
      ctx.fillStyle = `rgba(${colorRgb}, 0.7)`
      ctx.fill()
      ctx.strokeStyle = `rgba(${colorRgb}, 0.95)`
      ctx.lineWidth = 1
      ctx.stroke()

      // canopy / greenhouse
      const canopy = [[-10.5, -6.5], [-6.5, -9.5], [1.5, -9.5], [3, -6]].map(
        ([px, py]) => at(px, py)
      )
      ctx.beginPath()
      ctx.moveTo(canopy[0][0], canopy[0][1])
      for (let i = 1; i < canopy.length; i++)
        ctx.lineTo(canopy[i][0], canopy[i][1])
      ctx.closePath()
      ctx.fillStyle = `rgba(10, 10, 14, 0.55)`
      ctx.fill()

      // lip spoiler
      const [sx1, sy1] = at(-21, 1.5)
      const [sx2, sy2] = at(-24, -1.5)
      ctx.strokeStyle = `rgba(${colorRgb}, 0.95)`
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(sx1, sy1)
      ctx.lineTo(sx2, sy2)
      ctx.stroke()

      // wheels
      for (const wx of [-14, 13]) {
        const [ax, ay] = at(wx, 5.5)
        ctx.beginPath()
        ctx.arc(ax, ay, 3.2 * s, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(10, 10, 14, 0.92)'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(ax, ay, 1.3 * s, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(180, 185, 195, 0.9)'
        ctx.fill()
      }

      const [headX, lightY] = at(23, 2.5)
      const [tailX] = at(-22, 2.5)

      ctx.beginPath()
      ctx.arc(headX, lightY, 1.7 * s, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = '#ffffff'
      ctx.shadowBlur = 9
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.beginPath()
      ctx.arc(tailX, lightY, 1.4 * s, 0, Math.PI * 2)
      ctx.fillStyle = '#ff5c5c'
      ctx.shadowColor = '#ff5c5c'
      ctx.shadowBlur = 7
      ctx.fill()
      ctx.shadowBlur = 0
    }

    function drawRunner(cx, cy, dir, scale, phase, colorRgb) {
      const s = scale
      const at = (px, py) => [cx + px * dir * s, cy + py * s]
      const swing = Math.sin(phase)
      const bob = -Math.abs(Math.cos(phase)) * 3

      const [headX, headY] = at(4, -15 + bob)
      ctx.beginPath()
      ctx.arc(headX, headY, 2.3 * s, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${colorRgb}, 0.95)`
      ctx.fill()

      ctx.strokeStyle = `rgba(${colorRgb}, 0.95)`
      ctx.lineWidth = 2 * s
      ctx.lineCap = 'round'

      // forward-leaning torso, sprint posture
      const [shX, shY] = at(2, -12 + bob)
      const [hipX, hipY] = at(-1, -3)
      ctx.beginPath()
      ctx.moveTo(shX, shY)
      ctx.lineTo(hipX, hipY)
      ctx.stroke()

      // bent-elbow pumping arms
      const [elbowAX, elbowAY] = at(4 + 5 * swing, -8 + bob)
      const [handAX, handAY] = at(2 + 9 * swing, -3 + bob)
      const [elbowBX, elbowBY] = at(-1 - 5 * swing, -9 + bob)
      const [handBX, handBY] = at(1 - 9 * swing, -5 + bob)
      ctx.beginPath()
      ctx.moveTo(shX, shY)
      ctx.lineTo(elbowAX, elbowAY)
      ctx.lineTo(handAX, handAY)
      ctx.moveTo(shX, shY)
      ctx.lineTo(elbowBX, elbowBY)
      ctx.lineTo(handBX, handBY)
      ctx.stroke()

      // driving leg (pushing off, forward and down) vs. high-tucked
      // recovery leg (folded up behind) — alternates each half-cycle,
      // reads as a sprint stride instead of a walk
      const legPose = (w) =>
        w >= 0
          ? { knee: [3 + 7 * w, -1], foot: [1 + 12 * w, 5] }
          : { knee: [-3 + 5 * w, -1 + 3 * w], foot: [-1 + 4 * w, 2 + 2 * w] }

      const legA = legPose(swing)
      const legB = legPose(-swing)
      const [kneeAX, kneeAY] = at(...legA.knee)
      const [footAX, footAY] = at(...legA.foot)
      const [kneeBX, kneeBY] = at(...legB.knee)
      const [footBX, footBY] = at(...legB.foot)
      ctx.beginPath()
      ctx.moveTo(hipX, hipY)
      ctx.lineTo(kneeAX, kneeAY)
      ctx.lineTo(footAX, footAY)
      ctx.moveTo(hipX, hipY)
      ctx.lineTo(kneeBX, kneeBY)
      ctx.lineTo(footBX, footBY)
      ctx.stroke()
    }

    function drawCyclist(cx, cy, dir, scale, phase, colorRgb) {
      const s = scale
      const at = (px, py) => [cx + px * dir * s, cy + py * s]

      const [rearX, rearY] = at(-8, 4)
      const [frontX, frontY] = at(8, 4)
      const [bbX, bbY] = at(1, 2)
      const [seatX, seatY] = at(-4, -5)
      const [barX, barY] = at(7, -6)

      ctx.strokeStyle = `rgba(${colorRgb}, 0.4)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(rearX, rearY, 4 * s, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(frontX, frontY, 4 * s, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = `rgba(${colorRgb}, 0.9)`
      ctx.lineWidth = 1.4 * s
      ctx.lineCap = 'round'
      ctx.beginPath()
      // seat stay + seat tube
      ctx.moveTo(rearX, rearY)
      ctx.lineTo(seatX, seatY)
      // top tube
      ctx.lineTo(barX, barY)
      // fork, handlebar down to the front axle (not through the pedals)
      ctx.lineTo(frontX, frontY)
      ctx.moveTo(barX, barY)
      // down tube
      ctx.lineTo(bbX, bbY)
      // chain stay, pedals to the rear axle only
      ctx.lineTo(rearX, rearY)
      ctx.stroke()

      const pedalSwing = Math.sin(phase) * 2
      const [pedalX, pedalY] = at(1 + pedalSwing * 0.4, 2 + Math.abs(pedalSwing))
      ctx.beginPath()
      ctx.moveTo(seatX, seatY)
      ctx.lineTo(pedalX, pedalY)
      ctx.stroke()

      const [hipX, hipY] = at(-3, -6)
      const [headX, headY] = at(6, -12)
      ctx.beginPath()
      ctx.moveTo(hipX, hipY)
      ctx.lineTo(barX, barY - 1)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(headX, headY, 2 * s, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${colorRgb}, 0.95)`
      ctx.fill()
    }

    function drawSwimmer(cx, cy, dir, scale, phase, colorRgb) {
      const s = scale
      const at = (px, py) => [cx + px * dir * s, cy + py * s]
      const kick = Math.sin(phase * 2.4) * 4
      const roll = Math.sin(phase) * 1.5

      ctx.strokeStyle = `rgba(${colorRgb}, 0.9)`
      ctx.lineWidth = 2 * s
      ctx.lineCap = 'round'

      const [headX, headY] = at(9, -1 - roll * 0.3)
      const [hipX, hipY] = at(-7, roll * 0.3)
      ctx.beginPath()
      ctx.moveTo(headX, headY)
      ctx.lineTo(hipX, hipY)
      ctx.stroke()

      // big flutter kick
      const [footAX, footAY] = at(-13, kick)
      const [footBX, footBY] = at(-13, -kick)
      ctx.lineWidth = 1.4 * s
      ctx.beginPath()
      ctx.moveTo(hipX, hipY)
      ctx.lineTo(footAX, footAY)
      ctx.moveTo(hipX, hipY)
      ctx.lineTo(footBX, footBY)
      ctx.stroke()

      // two arms, opposite phase: one recovers overhead (bent elbow, out
      // of the water), the other pulls back underwater close to the body
      const armPose = (w) => {
        const lift = Math.max(0, Math.sin(w))
        if (lift > 0) {
          return {
            elbow: [4 + Math.cos(w) * 5, -1 - lift * 6],
            hand: [4 + Math.cos(w) * 11, -1 - lift * 9],
          }
        }
        const pull = -Math.sin(w)
        return {
          elbow: [4 - pull * 4, 0.5],
          hand: [1 - pull * 8, 1.5],
        }
      }

      const [shX, shY] = at(4, -1)
      const armA = armPose(phase)
      const armB = armPose(phase + Math.PI)
      ctx.lineWidth = 1.6 * s
      ctx.beginPath()
      ctx.moveTo(shX, shY)
      ctx.lineTo(...at(...armA.elbow))
      ctx.lineTo(...at(...armA.hand))
      ctx.moveTo(shX, shY)
      ctx.lineTo(...at(...armB.elbow))
      ctx.lineTo(...at(...armB.hand))
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(headX, headY, 2.2 * s, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${colorRgb}, 0.95)`
      ctx.fill()
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.04
          p.vx += (dx / (dist || 1)) * force
          p.vy += (dy / (dist || 1)) * force
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const maxSpeed = 0.6
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed
          p.vy = (p.vy / speed) * maxSpeed
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.4
            ctx.strokeStyle = `rgba(${accentRgb}, ${opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentRgb}, 0.8)`
        ctx.fill()
      }

      updateRacers()
      drawRacers()

      animationId = requestAnimationFrame(step)
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    initParticles()

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(step)
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
      racerTimeoutIds.car = setTimeout(() => spawnRacer('car'), 1500)
      racerTimeoutIds.bike = setTimeout(() => spawnRacer('bike'), 3000)
      racerTimeoutIds.run = setTimeout(() => spawnRacer('run'), 5000)
      racerTimeoutIds.swim = setTimeout(() => spawnRacer('swim'), 4000)
    } else {
      step()
    }

    const onResize = () => {
      resize()
      initParticles()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      Object.values(racerTimeoutIds).forEach(clearTimeout)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}
