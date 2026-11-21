import { useState } from 'react'
import { validateUsername } from '../utils/validate.js'
import { SNAPSHOT_USERS } from '../utils/api.js'

// Controlled form: input value lives in React state and is validated before searching
function SearchForm({ initialValue, onSearch, mode, onModeChange, loading }) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const message = validateUsername(value)
    setError(message)
    if (message === '') onSearch(value.trim())
  }

  function handleChange(event) {
    setValue(event.target.value)
    if (error) setError(validateUsername(event.target.value)) // live re-validation
  }

  function quickSearch(name) {
    setValue(name)
    setError('')
    onSearch(name)
  }

  return (
    <div className="search-wrap mx-auto mt-4">
      <form className={`search-form ${error ? 'has-error' : ''}`} onSubmit={handleSubmit} noValidate>
        <input
          className="form-control"
          value={value}
          onChange={handleChange}
          placeholder="Enter GitHub username"
          aria-label="GitHub username"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby="username-error"
          autoComplete="off"
        />
        <button className="btn btn-accent" type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'Analyze →'}
        </button>
      </form>
      <p id="username-error" className="field-error" role="alert">{error}</p>

      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2 small">
        <span className="text-muted-custom">Try:</span>
        {SNAPSHOT_USERS.map((name) => (
          <button key={name} type="button" className="btn btn-sm btn-chip" onClick={() => quickSearch(name)}>
            {name}
          </button>
        ))}
        <span className="divider" aria-hidden="true">|</span>
        <label className="text-muted-custom" htmlFor="mode-select">Data:</label>
        <select
          id="mode-select"
          className="form-select form-select-sm mode-select"
          value={mode}
          onChange={(e) => onModeChange(e.target.value)}
        >
          <option value="live">Live GitHub API</option>
          <option value="snapshot">Saved snapshot</option>
        </select>
      </div>
    </div>
  )
}

export default SearchForm
