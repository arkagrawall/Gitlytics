// Vertical bar chart built only with CSS: bar height = count / highest count
function ActivityChart({ activity }) {
  const highest = Math.max(1, ...activity.map((item) => item.count))
  const recent = activity.slice(-10) // last 10 years at most

  return (
    <div className="panel h-100">
      <h2 className="h5 fw-bold mb-1">Repository Activity</h2>
      <p className="text-muted-custom small">Repositories by year of their latest push</p>

      {recent.length === 0 ? (
        <p className="text-muted-custom">No activity data.</p>
      ) : (
        <div className="activity-chart" role="img" aria-label="Repositories per year bar chart">
          {recent.map((item) => (
            <div className="activity-col" key={item.year}>
              <span className="activity-count">{item.count}</span>
              <div className="activity-bar" style={{ height: `${(item.count / highest) * 100}%` }}></div>
              <span className="activity-year">{item.year}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActivityChart
