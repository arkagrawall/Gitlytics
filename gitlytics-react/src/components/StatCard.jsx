// Reusable component: the same card is rendered four times with different props
function StatCard({ label, value, icon }) {
  return (
    <div className="panel stat-card h-100">
      <div className="d-flex justify-content-between align-items-start">
        <p className="stat-label mb-2">{label}</p>
        <span className="stat-icon" aria-hidden="true">{icon}</span>
      </div>
      <p className="stat-value mb-0">{Number(value || 0).toLocaleString('en-IN')}</p>
    </div>
  )
}

export default StatCard
