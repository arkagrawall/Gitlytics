function Footer() {
  return (
    <footer className="app-footer d-flex justify-content-between flex-wrap gap-2 mt-5 pt-4">
      <span>Gitlytics © {new Date().getFullYear()} · Ark Agrawal</span>
      <span>Built with React, Vite and Bootstrap 5 · Data from the GitHub REST API</span>
    </footer>
  )
}

export default Footer
