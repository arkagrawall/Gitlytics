import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import SearchForm from './components/SearchForm.jsx'
import SearchHistory from './components/SearchHistory.jsx'
import StatusMessage from './components/StatusMessage.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import StatCard from './components/StatCard.jsx'
import LanguageChart from './components/LanguageChart.jsx'
import ActivityChart from './components/ActivityChart.jsx'
import Insights from './components/Insights.jsx'
import RepoTable from './components/RepoTable.jsx'
import RepoModal from './components/RepoModal.jsx'
import Footer from './components/Footer.jsx'
import { loadProfile, errorMessage } from './utils/api.js'
import { ProfileAnalyzer } from './utils/Analyzer.js'
import { readStorage, writeStorage } from './utils/storage.js'

const MAX_HISTORY = 6

// Shareable links: ?user=gautam100&mode=snapshot&theme=light
const params = new URLSearchParams(window.location.search)

function App() {
  // ---------- state (useState) ----------
  const [theme, setTheme] = useState(() => params.get('theme') || readStorage('gitlytics-theme', 'dark'))
  const [mode, setMode] = useState(params.get('mode') === 'snapshot' ? 'snapshot' : 'live')
  const [username, setUsername] = useState(params.get('user') || 'torvalds')
  const [profile, setProfile] = useState(null)
  const [source, setSource] = useState('')
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [error, setError] = useState('')
  const [history, setHistory] = useState(() => readStorage('gitlytics-history', []))
  const [selectedRepo, setSelectedRepo] = useState(null)

  // ---------- side effects (useEffect) ----------
  // apply the theme to <html data-theme="..."> and remember it
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.bsTheme = theme === 'light' ? 'light' : 'dark'
    writeStorage('gitlytics-theme', theme)
  }, [theme])

  useEffect(() => {
    writeStorage('gitlytics-history', history)
  }, [history])

  // fetch data every time the username or the data mode changes
  useEffect(() => {
    let cancelled = false // ignore the answer if the user already searched again
    window.history.replaceState(null, '', `?user=${encodeURIComponent(username)}&mode=${mode}`)
    setStatus('loading')
    setError('')

    loadProfile(username, mode)
      .then((result) => {
        if (cancelled) return
        setProfile(result.profile)
        setSource(result.source)
        setStatus('success')
        addToHistory(result.profile.login)
      })
      .catch((err) => {
        if (cancelled) return
        setStatus('error')
        setError(errorMessage(err.message, username))
      })

    return () => {
      cancelled = true
    }
  }, [username, mode])

  // ---------- event handlers ----------
  function addToHistory(login) {
    setHistory((old) => [login, ...old.filter((item) => item.toLowerCase() !== login.toLowerCase())].slice(0, MAX_HISTORY))
  }

  function removeFromHistory(login) {
    setHistory((old) => old.filter((item) => item !== login))
  }

  function toggleTheme() {
    setTheme((old) => (old === 'dark' ? 'light' : 'dark'))
  }

  // ---------- derived data ----------
  const analyzer = profile ? new ProfileAnalyzer(profile) : null

  const stats = analyzer
    ? [
        { label: 'Repositories', value: profile.public_repos, icon: '📁' },
        { label: 'Followers', value: profile.followers, icon: '👥' },
        { label: 'Total Stars', value: analyzer.totalStars(), icon: '★' },
        { label: 'Total Forks', value: analyzer.totalForks(), icon: '⑂' },
      ]
    : []

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main className="container py-4 py-md-5">
        <section className="hero text-center mb-4">
          <p className="eyebrow">GitHub Developer Insights</p>
          <h1 className="display-5 fw-bold">GitHub Profile Analyzer</h1>
          <p className="text-muted-custom intro mx-auto">
            Search any GitHub user to see their profile, languages, activity and top repositories in one dashboard.
          </p>
          <SearchForm key={username} initialValue={username} onSearch={setUsername} mode={mode} onModeChange={setMode} loading={status === 'loading'} />
          <SearchHistory items={history} onSelect={setUsername} onRemove={removeFromHistory} onClear={() => setHistory([])} />
        </section>

        <StatusMessage status={status} error={error} source={source} profile={profile} />

        {status === 'success' && analyzer && (
          <>
            <ProfileCard profile={profile} level={analyzer.developerLevel()} />

            <section className="row g-3 mb-4" aria-label="Profile statistics">
              {stats.map((stat) => (
                <div className="col-6 col-lg-3" key={stat.label}>
                  <StatCard label={stat.label} value={stat.value} icon={stat.icon} />
                </div>
              ))}
            </section>

            <section className="row g-4 mb-4">
              <div className="col-lg-5">
                <LanguageChart languages={analyzer.languageShare()} />
              </div>
              <div className="col-lg-7">
                <ActivityChart activity={analyzer.activityByYear()} />
              </div>
            </section>

            <Insights items={analyzer.insights()} />

            <RepoTable repos={profile.repos} onSelect={setSelectedRepo} />
          </>
        )}

        <Footer />
      </main>

      {selectedRepo && <RepoModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />}
    </>
  )
}

export default App
