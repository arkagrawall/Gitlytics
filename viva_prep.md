# 🎓 Gitlytics — Viva Cheat Sheet & Code Guide

This guide aligns directly with your 3-file Bootstrap 5 project structure (`index.html`, `styles.css`, `app.js`).

---

## 💡 3-Sentence Summary for Examiner
> "Gitlytics is a GitHub profile analyzer built using **HTML5, CSS3, JavaScript, and Bootstrap 5 CDN**, modularized into separate `index.html`, `styles.css`, and `app.js` files. It analyzes repository metrics, main language breakdowns, monthly contribution activity trends, and developer insights for **gautam100** and **torvalds**. The code uses custom JavaScript functions (`analyze`, `showProfile`, `showStats`, `showLanguages`, `showInsights`, `showChart`, `showRepos`) to dynamically update the DOM."

---

## 📌 Project File Structure

1. **[index.html](file:///c:/Users/Arkag/Downloads/Frontend/frontend-project/index.html)**: Clean HTML5 layout structuring the navbar, profile panel, stat cards, language container, insights section, activity bar chart, and repository table.
2. **[styles.css](file:///c:/Users/Arkag/Downloads/Frontend/frontend-project/styles.css)**: External CSS stylesheet containing element selectors, class selectors, ID selector (`#msg`), attribute selector (`input[type="search"]`), pseudo-classes (`:hover`, `:focus`), and a mobile `@media` query.
3. **[app.js](file:///c:/Users/Arkag/Downloads/Frontend/frontend-project/app.js)**: Standalone JavaScript controller managing profile arrays, switch-case color helpers, dynamic DOM rendering, bubble sort for median calculation, and table filtering.
4. **[viva_prep.md](file:///c:/Users/Arkag/Downloads/Frontend/frontend-project/viva_prep.md)**: Viva preparation cheat sheet.

---

## 📌 Viva Q&A Based Directly on Your Code

### 1. HTML & CSS Selectors (`styles.css`)
- **Bootstrap CDN:** Embedded in `<head>` via `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">`.
- **CSS Link Tag:** `<link rel="stylesheet" href="styles.css">`.
- **CSS Selector Types Implemented:**
  - **Element Selectors:** `body`, `h2`, `table`, `th`, `td`, `a`, `footer`.
  - **Class Selectors:** `.topnav`, `.panel`, `.muted`, `.avatar-img`, `.stat`, `.lang-row`, `.chart`, `.bar`.
  - **ID Selectors:** `#msg`.
  - **Attribute Selectors:** `input[type="search"]`.
  - **Pseudo-classes:** `tr:hover`, `input[type="search"]:focus`.
  - **Media Query:** `@media only screen and (max-width: 480px)` for mobile responsiveness (`.hide-sm`).

### 2. JavaScript Logic (`app.js`)
- **Data Structure (`users` array):**
  Nested array holding profile info (`username`, `name`, `followers`, `following`, `location`, `repos`, `monthly contributions`, `avatar url`).
- **Initialization:**
  Uses `document.addEventListener("DOMContentLoaded", ...)` to automatically build the dropdown menu and render the default profile on page load.
- **Profile Image Loading (`showProfile`):**
  Checks `if (u[9] && u[9] !== "")` to render the avatar `<img>` tag with `class="avatar-img"`.
- **Switch-Case Statements:**
  Used in `message()` for alert styling (`alert-success`, `alert-danger`, `alert-warning`) and `langColor()` for programming language hex colors.
- **Loops & Bubble Sort (`showInsights`):**
  Calculates average monthly contributions, highest contribution month, median (via bubble sort), and most starred repository.
- **Dynamic Table Filtering (`showRepos`):**
  Filters table rows based on the selected language dropdown (`#sortBy`).

---

## 📋 Quick Function Reference (`app.js`)

| Function | Purpose |
| :--- | :--- |
| `buildMenu()` | Generates dropdown links in the top navbar for demo profiles |
| `analyze(name)` | Finds the user in `users` array and invokes all display functions |
| `showProfile()` | Renders avatar, name, location, followers/following, and snapshot source |
| `showStats()` | Calculates total repositories, total stars, total forks, and 12-month contributions |
| `showLanguages()` | Calculates percentage distribution for programming languages |
| `showInsights()` | Finds busiest month, average/median contributions, and top starred repo |
| `showChart()` | Renders vertical bar chart for monthly contribution activity |
| `showRepos()` | Populates repository table with language tags and star counts |
