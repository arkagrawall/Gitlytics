// Conditional rendering: one component shows loading, error or success info
function StatusMessage({ status, error, source, profile }) {
  if (status === 'loading') {
    return (
      <div className="status-box d-flex align-items-center gap-2" role="status">
        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
        Loading profile…
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  const labels = {
    live: 'Live data from the GitHub REST API',
    snapshot: `Saved snapshot from ${profile?.snapshot_date}`,
    fallback: `GitHub API unavailable, showing saved snapshot from ${profile?.snapshot_date}`,
  }

  return (
    <div className={`status-box ${source === 'fallback' ? 'status-warn' : ''}`} role="status">
      <span className={`source-dot ${source}`} aria-hidden="true"></span>
      {labels[source]}
    </div>
  )
}

export default StatusMessage
