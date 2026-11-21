// Recent searches list: add / remove / clear (same idea as the To-Do list project)
function SearchHistory({ items, onSelect, onRemove, onClear }) {
  if (items.length === 0) return null

  return (
    <div className="history mt-3" aria-label="Recent searches">
      <span className="text-muted-custom small me-2">Recent:</span>
      {items.map((name) => (
        <span className="history-item" key={name}>
          <button type="button" className="history-name" onClick={() => onSelect(name)}>
            {name}
          </button>
          <button type="button" className="history-remove" onClick={() => onRemove(name)} aria-label={`Remove ${name}`}>
            ×
          </button>
        </span>
      ))}
      <button type="button" className="btn btn-link btn-sm clear-link" onClick={onClear}>
        Clear
      </button>
    </div>
  )
}

export default SearchHistory
