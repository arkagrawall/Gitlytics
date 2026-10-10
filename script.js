async function loadProfile() {
    const response = await fetch("profile.json");
    const p = await response.json();

    document.getElementById("profile").innerHTML = `
        <div class="profile card">
            <img src="${p.avatar_url}" alt="Avatar">
            <div>
                <h2>${p.name}</h2>
                <p>@${p.login}</p>
                <p>${p.location || ""}</p>
                <a href="${p.html_url}" target="_blank">View GitHub Profile</a>
            </div>
        </div>`;

    document.getElementById("stats").innerHTML = [
        ["Repositories", p.public_repos],
        ["Followers", p.followers],
        ["Following", p.following],
        ["Public Gists", p.public_gists]
    ].map(([name, value]) => `
        <div class="col-6 col-lg-3">
            <div class="card p-3">
                <p>${name}</p>
                <h2>${Number(value || 0).toLocaleString()}</h2>
            </div>
        </div>
    `).join("");

    const languages = {};

    p.repositories.forEach(repo => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });

    document.getElementById("languages").innerHTML =
        Object.entries(languages).map(([name, count]) => `
            <p>${name} — ${count} repositories</p>
            <div class="bar">
                <span style="width:${count / Math.max(...Object.values(languages)) * 100}%"></span>
            </div>
        `).join("");
        
    document.getElementById("repos").innerHTML =
        p.repositories
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 8)
            .map(repo => `
                <div class="repo">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>${repo.description || "No description"}</p>
                    <small>
                        ${repo.language || "Unknown"} ·
                        ★ ${Number(repo.stargazers_count).toLocaleString()} ·
                        Forks ${Number(repo.forks_count).toLocaleString()}
                    </small>
                </div>
            `).join("");

    document.getElementById("message").textContent = "Profile loaded successfully.";
}

loadProfile().catch(() => {
    document.getElementById("message").textContent =
        "Unable to load profile.json. Run using VS Code Live Server.";
});