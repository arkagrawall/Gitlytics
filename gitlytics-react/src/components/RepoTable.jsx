import { useState } from 'react'
import { languageColor } from '../utils/languageColors.js'

// Currying: byNumberDesc('forks_count') returns a new compare function (a, b) => ...
const byNumberDesc = (key) => (a, b) => b[key] - a[key]
const byDateDesc = (key) => (a, b) => new Date(b[key]) - new Date(a[key])

// sort function chosen with switch-case
function sortRepos(list, sortBy) {
  const copy = [...list] // never mutate props
  switch (sortBy) {
    case 'forks':
      return copy.sort(byNumberDesc('forks_count'))
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'updated':
      return copy.sort(byDateDesc('pushed_at'))
    case 'stars':
    default:
      return copy.sort(byNumberDesc('stargazers_count'))
  }
}

function RepoTable({ repos, onSelect }) {
  const [query, setQuery] = useState('')
  const [language, setLanguage] = useState('All')
  const [sortBy, setSortBy] = useState('stars')
  const [hideForks, setHideForks] = useState(false)

  // unique language list for the dropdown (Set removes duplicates)
  const languages = ['All', ...new Set(repos.map((repo) => repo.language || 'Other'))]

  const filtered = repos
    .filter((repo) => language === 'All' || (repo.language || 'Other') === language)
    .filter((repo) => !hideForks || !repo.fork)
    .filter((repo) => {
      const text = `${repo.name} ${repo.description || ''}`.toLowerCase()
      return text.includes(query.trim().toLowerCase())
    })

  const rows = sortRepos(filtered, sortBy)

  return (
    <section className="panel mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <div>
          <h2 className="h5 fw-bold mb-1">Repositories</h2>
          <p className="text-muted-custom small mb-0">
            Showing {rows.length} of {repos.length} · click a row for details
          </p>
        </div>
        <div className="filters">
          <input
            className="form-control form-control-sm"
            placeholder="Search repos…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search repositories"
          />
          <select className="form-select form-select-sm" value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Filter by language">
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang === 'All' ? 'All languages' : lang}</option>
            ))}
          </select>
          <select className="form-select form-select-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort repositories">
            <option value="stars">Sort: Stars</option>
            <option value="forks">Sort: Forks</option>
            <option value="updated">Sort: Recently updated</option>
            <option value="name">Sort: Name (A–Z)</option>
          </select>
          <div className="form-check form-switch m-0 small">
            <input className="form-check-input" type="checkbox" id="hide-forks" checked={hideForks} onChange={(e) => setHideForks(e.target.checked)} />
            <label className="form-check-label" htmlFor="hide-forks">Hide forks</label>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table repo-table align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Repository</th>
              <th scope="col">Language</th>
              <th scope="col" className="text-end">Stars</th>
              <th scope="col" className="text-end">Forks</th>
              <th scope="col" className="text-end d-none d-md-table-cell">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted-custom py-4">No repositories match your filters.</td>
              </tr>
            )}
            {rows.map((repo) => (
              <tr
                key={repo.name}
                onClick={() => onSelect(repo)}
                onKeyDown={(e) => e.key === 'Enter' && onSelect(repo)}
                tabIndex="0"
                className="repo-row"
              >
                <td>
                  <span className="repo-name">{repo.name}</span>
                  {repo.fork && <span className="badge fork-badge ms-2">fork</span>}
                  <div className="repo-desc">{repo.description || 'No description'}</div>
                </td>
                <td className="text-nowrap">
                  <span className="lang-dot" style={{ background: languageColor(repo.language) }}></span>
                  {repo.language || 'Other'}
                </td>
                <td className="text-end">{repo.stargazers_count.toLocaleString('en-IN')}</td>
                <td className="text-end">{repo.forks_count.toLocaleString('en-IN')}</td>
                <td className="text-end text-nowrap d-none d-md-table-cell">
                  {new Date(repo.pushed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RepoTable
