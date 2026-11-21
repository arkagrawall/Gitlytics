// Props example: receives the profile object from App and only displays it
function ProfileCard({ profile, level }) {
  const joined = new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  return (
    <section className="panel profile-card mb-4">
      <img src={profile.avatar_url} alt={`${profile.login} avatar`} className="avatar" />
      <div className="flex-grow-1">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <h2 className="h4 fw-bold mb-0">{profile.name || profile.login}</h2>
          <span className="badge level-badge">{level}</span>
        </div>
        <p className="text-muted-custom mb-1">@{profile.login}</p>
        {profile.bio && <p className="mb-1">{profile.bio}</p>}
        <p className="meta mb-0">
          {profile.company && <span>🏢 {profile.company}</span>}
          {profile.location && <span>📍 {profile.location}</span>}
          <span>📅 Joined {joined}</span>
          <span>Following {profile.following}</span>
        </p>
      </div>
      <a href={profile.html_url} target="_blank" rel="noreferrer" className="btn btn-outline-accent">
        View on GitHub ↗
      </a>
    </section>
  )
}

export default ProfileCard
