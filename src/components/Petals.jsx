import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function Petals() {
  const items = useMemo(() => Array.from({ length: 16 }, () => ({
    x: Math.random() * 100, size: 10 + Math.random() * 14, d: 9 + Math.random() * 9,
    delay: Math.random() * 10, sway: 30 + Math.random() * 60, hue: Math.random() > 0.5 ? '#f4a622' : '#e8742a',
  })), [])
  return (
    <div className="petals" aria-hidden="true">
      {items.map((p, i) => (
        <motion.span key={i} className="petal" style={{ left: `${p.x}%`, width: p.size, height: p.size * 1.3, background: p.hue }}
          initial={{ y: '-8vh', opacity: 0 }}
          animate={{ y: '108vh', x: [0, p.sway, -p.sway, 0], rotate: [0, 160, 320, 540], opacity: [0, 0.85, 0.85, 0] }}
          transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: 'linear' }} />
      ))}
    </div>
  )
}
