import { motion } from 'framer-motion'
import { D } from '../data.js'

export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.17, delayChildren: 0.9 } } }
const rise = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
}
const R = ({ children, className, tag = 'div', ...p }) => {
  const C = motion[tag]
  return <C variants={rise} className={className} {...p}>{children}</C>
}
const Rule = () => (
  <motion.div className="rule" variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1, transition: { duration: 1.2 } } }} />
)
const Ev = ({ t, d, tm }) => (
  <R className="ev"><h3>{t}</h3>{d && <p>{d}</p>}{tm && <p className="tm">{tm}</p>}</R>
)
const Names = ({ t }) => (
  <R className="names">
    <motion.span initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1.2 }}>{t.couple.g}</motion.span>
    <motion.i animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2.6, repeat: Infinity }}>{t.couple.together}</motion.i>
    <motion.span initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1.2 }}>{t.couple.b}</motion.span>
  </R>
)
const Venue = ({ t }) => (
  <R><h3>{t.venueHeading}</h3><p><b>{t.venue.name}</b><br />{t.venue.lines.map((l, i) => <span key={i}>{l}<br /></span>)}</p></R>
)

export const getPages = (t) => [
  () => (<>
    <R className="om">ॐ</R>
    <R className="sh">{D.shlokas.ganesha}</R>
    <Rule />
    <R className="big shimmer">{t.cover.title}</R>
    <Names t={t} />
    <R className="tm">{t.couple.date}</R>
    <Rule />
    <R><h3>{t.cover.inviterHeading}</h3><p>{t.cover.inviter}</p><p className="small">{t.cover.address}</p></R>
    <R className="hint">{t.cover.hint}</R>
  </>),
  () => (<>
    <R className="sh">{t.wedding.ganesha}</R>
    <R tag="h2" className="shimmer">{t.wedding.heading}</R>
    <R className="sh">{D.shlokas.vishnu}</R>
    <Rule />
    <R tag="p">{t.wedding.intro}</R>
    <Names t={t} />
    <R tag="p">{t.wedding.closing}</R>
  </>),
  () => (<>
    <R tag="h2" className="shimmer">{t.events.haldi.heading}</R><Rule />
    <Ev t={t.events.haldi.meal} d={t.events.haldi.invite} tm={t.events.haldi.noon} />
    <Rule /><Venue t={t} />
  </>),
  () => (<>
    <R tag="h2" className="shimmer">{t.events.wedding.heading}</R>
    <R className="sh" style={{ whiteSpace: 'normal' }}>{t.events.wedding.message}</R>
    <Rule />
    <Ev t={t.events.wedding.mandap.title} d={t.events.wedding.mandap.description} tm={t.events.wedding.mandap.time} />
    <Ev t={t.events.wedding.reception.title} d={t.events.wedding.reception.description} tm={t.events.wedding.reception.time} />
  </>),
  () => (<>
    <R tag="h2" className="shimmer">{t.events.raas.heading}</R><Rule />
    <Ev t={t.events.raas.meal} d={t.events.raas.invite} tm={t.events.raas.time} />
    <Ev t={t.events.raas.dance} tm={t.events.raas.danceTime} />
  </>),
  () => (<>
    <Ev t={t.events.departure.departure.title} d={t.events.departure.departure.description} tm={t.events.departure.departure.time} />
    <Ev t={t.events.departure.hastMelaap.title} d={t.events.departure.hastMelaap.description} tm={t.events.departure.hastMelaap.time} />
    <Rule />
    <R><h3>{t.events.departure.kalrav}</h3></R>
    <R tag="p">{t.events.departure.message}</R>
    <R className="small">{t.events.departure.regards}</R>
  </>),
  () => (<>
    <R><h3>{t.family.snehadhinHeading}</h3></R>
    {t.family.snehadhin.map(n => <R tag="p" key={n}>{n}</R>)}
    <Rule />
    <R><h3>{t.family.darshanabhilashiHeading}</h3></R>
    {t.family.darshanabhilashi.map(n => <R tag="p" key={n}>{n}</R>)}
  </>),
  () => (<>
    <R><h3>{t.family.maternalHeading}</h3><p>{t.family.maternal}</p></R>
    <R><h3>{t.family.inLawHeading}</h3><p>{t.family.inLaw}</p></R>
    <R><h3>{t.family.firmHeading}</h3><p>{t.family.firm}</p></R>
    <Rule /><Venue t={t} />
    <R>
      <motion.a whileTap={{ scale: 0.96 }} className="btn f" target="_blank" rel="noopener noreferrer"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.venue.name + ' ' + t.venue.city)}`}>{t.buttons.map}</motion.a>
      <motion.a whileTap={{ scale: 0.96 }} className="btn o" target="_blank" rel="noopener noreferrer"
        href={`https://wa.me/91${D.phone}?text=${encodeURIComponent(t.buttons.wa)}`}>{t.buttons.whatsapp}</motion.a>
      <motion.a whileTap={{ scale: 0.96 }} className="btn o" href={`tel:+91${D.phone}`}>{t.buttons.contact}: +91 {D.phone}</motion.a>
    </R>
  </>),
]
