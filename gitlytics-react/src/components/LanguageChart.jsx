import { languageColor } from '../utils/languageColors.js'

// Horizontal bars showing what share of repositories use each language
function LanguageChart({ languages }) {
  const shown = languages.slice(0, 7)

  return (
    <div className="panel h-100">
      <h2 className="h5 fw-bold mb-1">Languages</h2>
      <p className="text-muted-custom small">Share of repositories by primary language</p>

      {/* stacked overview bar */}
      <div className="stack-bar mb-3" role="img" aria-label="Language share overview">
        {shown.map((lang) => (
          <span key={lang.name} style={{ width: `${lang.percent}%`, background: languageColor(lang.name) }}></span>
        ))}
      </div>

      {shown.map((lang) => (
        <div className="lang-row" key={lang.name}>
          <div className="d-flex justify-content-between small mb-1">
            <span>
              <span className="lang-dot" style={{ background: languageColor(lang.name) }}></span>
              {lang.name}
            </span>
            <span className="text-muted-custom">
              {lang.count} {lang.count === 1 ? 'repo' : 'repos'} · {lang.percent}%
            </span>
          </div>
          <div className="bar">
            <span style={{ width: `${lang.percent}%`, background: languageColor(lang.name) }}></span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LanguageChart
