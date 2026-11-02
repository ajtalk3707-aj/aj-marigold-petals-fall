import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import { D } from '../data.js'

const STEP = 3200, START = 1400, HOLD_MS = 1700

export default function Gate({ language, onOpening, onDone }) {
  const copy = D.content[language]
  const [line, setLine] = useState(-1)
  const [ready, setReady] = useState(false)
  const [phase, setPhase] = useState('wait') // wait | open
  const ring = useAnimationControls()
  const holdTimer = useRef(null)
  const skipped = useRef(false)

  useEffect(() => {
    const ts = copy.gate.suspense.map((_, k) => setTimeout(() => !skipped.current && setLine(k), START + k * STEP))
    ts.push(setTimeout(() => { if (!skipped.current) { setLine(-1); setReady(true) } }, START + copy.gate.suspense.length * STEP))
    return () => ts.forEach(clearTimeout)
  }, [copy.gate.suspense])

  const sparks = useMemo(() => Array.from({ length: 26 }, () => ({
    x: Math.random() * 100, d: 6 + Math.random() * 8, delay: Math.random() * 6, s: 2 + Math.random() * 3,
  })), [])

  const open = () => {
    if (phase !== 'wait') return
    clearTimeout(holdTimer.current)
    setPhase('open'); onOpening()
    setTimeout(onDone, 3600)
  }
  const down = () => {
    ring.start({ pathLength: 1, transition: { duration: HOLD_MS / 1000, ease: 'linear' } })
    holdTimer.current = setTimeout(open, HOLD_MS)
  }
  const up = () => {
    if (phase !== 'wait') return
    clearTimeout(holdTimer.current)
    ring.start({ pathLength: 0, transition: { duration: 0.5 } })
  }
  const skip = () => { skipped.current = true; setLine(-1); setReady(true) }

  const opening = phase === 'open'
  const door = (side) => ({
    animate: { rotateY: opening ? (side === 'l' ? -118 : 118) : 0 },
    transition: { duration: 2.6, delay: 0.7, ease: [0.65, 0, 0.2, 1] },
  })

  return (
    <div className="gate">
      <motion.div className="door l" style={{ originX: 0 }} {...door('l')} />
      <motion.div className="door r" style={{ originX: 1 }} {...door('r')} />

      {sparks.map((p, i) => (
        <motion.i key={i} className="spark" style={{ left: `${p.x}%`, width: p.s, height: p.s }}
          initial={{ y: 0, opacity: 0 }} animate={{ y: '-75vh', opacity: [0, 0.9, 0] }}
          transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: 'easeOut' }} />
      ))}

      <motion.div className="stage" animate={{ opacity: opening ? 0 : 1 }} transition={{ duration: 0.8 }}>
        {/* the diya */}
        <AnimatePresence>
          {!ready && (
            <motion.div className="diya" initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }} transition={{ delay: 0.6, duration: 1.4 }}>
              <motion.div className="aura" animate={{ scale: [1, 1.25, 0.95, 1.15, 1], opacity: [0.5, 0.9, 0.55, 0.85, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity }} />
              <motion.div className="flame"
                animate={{ scaleY: [1, 1.18, 0.92, 1.12, 1], scaleX: [1, 0.9, 1.05, 0.95, 1], rotate: [-3, 3, -2, 2, -3] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} />
              <div className="bowl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* suspense lines */}
        {/* <div className="lines">
          <AnimatePresence mode="sync">
            {line >= 0 && (
              <motion.p key={line} className="sline"
                initial={{ opacity: 0, filter: 'blur(14px)', letterSpacing: '0.3em', y: 12 }}
                animate={{ opacity: 1, filter: 'blur(0px)', letterSpacing: '0.04em', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(10px)', y: -12 }}
                transition={{ duration: 1.3, ease: 'easeOut' }}>
                {copy.gate.suspense[line]}
              </motion.p>
            )}
          </AnimatePresence>
        </div> */}
        {/* Cinematic Suspense Lines */}
{/* <div className="lines">
  <AnimatePresence initial={false} mode="sync">
    {line >= 0 && (
      <motion.p
        key={line}
        className="sline"
        initial={{
          opacity: 0,
          filter: "blur(6px)",
          y: 10,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        exit={{
          opacity: 0,
          filter: "blur(5px)",
          y: -8,
        }}
        transition={{
          opacity: { duration: 0.7, ease: "easeInOut" },
          filter: { duration: 0.7 },
          y: { duration: 0.8, ease: "easeOut" },
        }}
      >
        {copy.gate.suspense[line]}
      </motion.p>
    )}
  </AnimatePresence>
</div> */}
{/* Royal Cinematic Suspense */}
<div className="lines">
  <AnimatePresence initial={false} mode="sync">
    {line >= 0 && (
      <motion.div
        key={line}
        className="suspense-wrap"
        initial={{
          opacity: 0,
          y: 25,
          filter: "blur(8px)",
          clipPath: "inset(100% 0 0 0)",
        }}
        animate={{
          opacity: [0, 0.45, 0.2, 0.8, 1],
          y: [25, 8, 12, 0],
          filter: [
            "blur(8px)",
            "blur(3px)",
            "blur(5px)",
            "blur(0px)",
          ],
          clipPath: "inset(0% 0 0 0)",
        }}
        exit={{
          opacity: 0,
          y: -20,
          filter: "blur(8px)",
          clipPath: "inset(0 0 100% 0)",
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          opacity: {
            duration: 1.3,
            times: [0, 0.2, 0.4, 0.7, 1],
          },
          y: { duration: 1.1 },
          filter: { duration: 1.3 },
          clipPath: { duration: 0.9 },
        }}
      >
        <p className="sline">
          {copy.gate.suspense[line]}
        </p>

        <motion.div
          className="sline-ornament"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "75px", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span>✦</span>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

        {/* the royal seal — press & hold to break it */}
        <AnimatePresence>
          {ready && !opening && (
            <motion.div className="sealwrap" initial={{ opacity: 0, scale: 0.5, rotate: -40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.8 }}
              transition={{ duration: 1.4, type: 'spring', damping: 14 }}>
              <svg className="ring" viewBox="0 0 180 180" aria-hidden="true">
                <motion.circle cx="90" cy="90" r="84" className="ring-bg" />
                <motion.circle cx="90" cy="90" r="84" className="ring-fg" initial={{ pathLength: 0 }} animate={ring} />
              </svg>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="mandala" />
              <motion.button className="seal" aria-label={copy.gate.openLabel}
                animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
                whileTap={{ scale: 0.9 }}
                onPointerDown={down} onPointerUp={up} onPointerLeave={up} onPointerCancel={up}
                onContextMenu={(e) => e.preventDefault()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}>
                ॐ
              </motion.button>
              <motion.p className="holdhint" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6, 1] }} transition={{ delay: 1.4, duration: 2.5 }}>
                {copy.gate.holdHint}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {!ready && <button className="skip" onClick={skip}>{copy.gate.skip}</button>}
      </motion.div>

      {/* flash of light when the doors part */}
      <AnimatePresence>
        {opening && (
          <motion.div className="flash" initial={{ scale: 0, opacity: 1 }} animate={{ scale: 70, opacity: 0 }}
            transition={{ duration: 2.8, delay: 0.5, ease: 'easeOut' }} />
        )}
      </AnimatePresence>
    </div>
  )
}
