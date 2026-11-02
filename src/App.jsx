import { useEffect, useState } from 'react'
import Gate from './components/Gate.jsx'
import Invitation from './components/Invitation.jsx'
import { D } from './data.js'

export default function App() {
  const [started, setStarted] = useState(false) // mount invitation behind the doors as they open
  const [gone, setGone] = useState(false)       // remove gate once fully open
  const [language, setLanguage] = useState('en')
  const copy = D.content[language]

  useEffect(() => {
    document.documentElement.lang = copy.locale
  }, [copy.locale])

  return (
    <>
      <div className="language-switcher" role="group" aria-label={copy.languageLabel}>
        {copy.languageOptions.map(({ code, label }) => (
          <button key={code} type="button" className={language === code ? 'selected' : ''} aria-pressed={language === code}
            onClick={() => setLanguage(code)}>{label}</button>
        ))}
      </div>
      {started && <Invitation language={language} />}
      {!gone && <Gate language={language} onOpening={() => setStarted(true)} onDone={() => setGone(true)} />}
    </>
  )
}
