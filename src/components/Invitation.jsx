import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { D } from '../data.js'
import { getPages, stagger } from './Pages.jsx'
import Petals from './Petals.jsx'

const slide = {
  enter: (d) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: (d) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.96, transition: { duration: 0.35 } }),
}

export default function Invitation({ language }) {
  const t = D.content[language]
  const PAGES = getPages(t)
  const [[idx, dir], setPage] = useState([0, 0])
  const go = useCallback((n) => setPage(([i]) => (n < 0 || n >= PAGES.length || n === i ? [i, 0] : [n, n > i ? 1 : -1])), [])
  useEffect(() => {
    const k = (e) => { if (e.key === 'ArrowRight') go(idx + 1); if (e.key === 'ArrowLeft') go(idx - 1) }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [idx, go])

  const Page = PAGES[idx]
  const arch = idx === 0

  return (
    <motion.div className="invite" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="bgglow" />
      <Petals />
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={idx} className="pg" custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
          drag="x" dragDirectionLock dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
          onDragEnd={(_, { offset, velocity }) => {
            if (offset.x < -70 || velocity.x < -500) go(idx + 1)
            else if (offset.x > 70 || velocity.x > 500) go(idx - 1)
          }}>
          <div className={`frame ${arch ? 'arch' : ''}`}>
            <svg className="ln" aria-hidden="true">
              <motion.rect x="0" y="0" width="100%" height="100%" rx={arch ? 140 : 28} fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, ease: 'easeInOut' }} />
            </svg>
            <motion.div className="content" variants={stagger} initial="hidden" animate="show">
              <Page />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <nav className="dots" aria-label={t.navLabel}>
        {t.nav.map(([label, e], i) => (
          <motion.button key={label} className={i === idx ? 'on' : ''} title={label} aria-label={label} onClick={() => go(i)}
            whileTap={{ scale: 0.85 }} animate={{ scale: i === idx ? 1.18 : 1 }}>{e}</motion.button>
        ))}
      </nav>
    </motion.div>
  )
}
