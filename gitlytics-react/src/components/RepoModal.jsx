import { useEffect } from 'react'
import { languageColor } from '../utils/languageColors.js'

// Bootstrap 5 modal markup, opened and closed with React state instead of bootstrap.js
function RepoModal({ repo, onClose }) {
  // close with the Escape key
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'

  const details = [
    ['Language', repo.language || 'Other'],
    ['Stars', repo.stargazers_count.toLocaleString('en-IN')],
    ['Forks', repo.forks_count.toLocaleString('en-IN')],
    ['Open issues', (repo.open_issues_count ?? 0).toLocaleString('en-IN')],
    ['Created', formatDate(repo.created_at)],
    ['Last push', formatDate(repo.pushed_at)],
    ['Type', repo.fork ? 'Fork' : 'Original'],
  ]

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="repo-modal-title" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="repo-modal-title">
                <span className="lang-dot" style={{ background: languageColor(repo.language) }}></span>
                {repo.name}
              </h2>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>{repo.description || 'No description provided.'}</p>
              {repo.topics && repo.topics.length > 0 && (
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {repo.topics.map((topic) => (
                    <span className="badge topic-badge" key={topic}>{topic}</span>
                  ))}
                </div>
              )}
              <dl className="row mb-0 small">
                {details.map(([key, value]) => (
                  <div className="col-6 mb-2" key={key}>
                    <dt className="text-muted-custom fw-normal">{key}</dt>
                    <dd className="mb-0 fw-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <a className="btn btn-accent" href={repo.html_url} target="_blank" rel="noreferrer">Open repository ↗</a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}

export default RepoModal
