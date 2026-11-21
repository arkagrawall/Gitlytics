import { useEffect, useState } from 'react'

// Navbar with a live digital clock (setInterval) and a theme toggle button
function Navbar({ theme, onToggleTheme }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer) // cleanup when the component unmounts
  }, [])

  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <nav className="navbar app-navbar sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold brand" href="#">
          <span className="brand-dot" aria-hidden="true"></span> Gitlytics
        </a>
        <div className="d-flex align-items-center gap-3">
          <span className="clock d-none d-sm-inline" aria-label="Current time">{time}</span>
          <button
            type="button"
            className="btn btn-sm btn-theme"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀ Light' : '☾ Dark'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
