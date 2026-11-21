// List of computed insights coming from the ProfileAnalyzer class
function Insights({ items }) {
  return (
    <section className="panel mb-4">
      <h2 className="h5 fw-bold mb-1">Developer Insights</h2>
      <p className="text-muted-custom small">Calculated from the public repositories</p>
      <div className="row g-3">
        {items.map((item) => (
          <div className="col-sm-6 col-lg-3" key={item.label}>
            <div className="insight">
              <p className="insight-label mb-1">{item.label}</p>
              <p className="insight-value mb-0">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Insights
