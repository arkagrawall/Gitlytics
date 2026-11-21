# 🚀 Gitlytics — GitHub Profile Analyzer & Developer Analytics

## 📊 Project Overview

**Gitlytics** is a modern frontend GitHub profile and repository analyzer built to provide actionable developer insights, language breakdowns, repository metrics, and contribution activity trends. The platform delivers a centralized, intuitive dashboard where recruiters, developers, and educators can evaluate developer output, code velocity, and technology preferences at a glance.

This project was developed as a **Frontend Development Subject Project** at **GLA University** with an emphasis on clean architecture, semantic markup, responsive design, and dynamic client-side rendering.

---

## 🎯 Objectives

* **Profile Aggregation:** Present core GitHub developer profile stats (avatar, bio, followers, following, location) in a cohesive card layout.
* **Language Distribution:** Calculate and visualize the share of programming languages across all public repositories.
* **Contribution Activity Analysis:** Display monthly contribution trends, peak productivity periods, and developer velocity.
* **Repository Showcase:** Provide an interactive, filterable repository table detailing stars, forks, and primary languages.
* **Reliable Demonstration:** Feature built-in verified snapshots for real GitHub accounts (`gautam100` and `torvalds`) for stable presentation and evaluation.

---

## ✨ Features

### 🔍 Profile & Summary Card
* Developer identity, handle, organization, and geographic location.
* Direct link to GitHub profile.
* Fast metric counters: Public Repositories, Total Stars, Total Forks, and 12-Month Contribution counts.

### 📊 Language Breakdown
* Dynamic calculation of repository shares categorized by language.
* Color-coded progress indicators corresponding to official language pigments.

### 📈 Activity Velocity Chart
* Monthly contribution trends across the past 12 months.
* Visual bar height scaling relative to peak monthly contribution volume.

### 💡 Developer Insights Engine
* Busiest contribution month identification.
* Monthly mean and median contribution rates (calculated via sorting algorithms).
* Highlight of the most starred public repository.
* Year-over-year productivity trend evaluation.

### 📁 Interactive Repository Table
* Sortable and filterable by specific programming language.
* Direct visibility into star ratings, fork status, and open-source contributions.

---

## 🛠️ Technologies Used

### Frontend
* **HTML5:** Semantic document outline (`<header>`, `<main>`, `<section>`, `<table>`).
* **CSS3:** Custom Modern Dark / Emerald stylesheet with CSS variables, Flexbox, Grid, and Media Queries.
* **Bootstrap 5 (CDN):** Responsive grid system, navbar dropdowns, and layout utility classes.
* **JavaScript (ES6+):** Pure vanilla JavaScript for DOM manipulation, sorting algorithms, switch-case handlers, and array filtering.

### Version Control & Workflow
* **Git & GitHub:** Branching, staged commits, and historical milestone tracking.

---

## 📂 Project Structure

```text
Gitlytics/
├── index.html                      # Core Analytics Dashboard
├── styles.css                      # Custom Theme & Component Styling
├── script.js                       # Controller Logic & Snapshot Data
├── profile.json                    # Profile Snapshot JSON Dataset
├── README.md                       # Project Documentation & Usage Guide
├── Synopsis                        # Official Project Submission Synopsis
│
├── assignments/
│   └── portfolio/                  # Assignment 1: Developer Portfolio
│       ├── index.html              # Responsive Portfolio Page
│       ├── profile.jpg             # Profile Avatar Asset
│       └── resume.pdf              # Academic CV
│
├── Assignment2/                    # Assignment 2: Core HTML/CSS Lab
│   ├── resume.html & resume.css    # Web Resume
│   ├── login.html & login.css      # Login Form
│   ├── menu.html & menu.css        # Restaurant Menu
│   ├── marksheet.html & marksheet.css # Student Marksheet
│   ├── registration.html & registration.css # Registration Form
│   └── JavaScript_Ques_set01.pdf   # Lab Question Set
│
└── Assigment3/                     # Assignment 3: JavaScript Core Concepts & Lab
    ├── Theory_Assignment           # 10 Detailed Theory Q&A Answers
    └── JavaScript-Projects/
        ├── README.md               # Lab Mini-Projects Directory
        ├── 1-bmi-calculator/       # BMI Health Index Calculator
        ├── 2-signup-validation/    # Interactive Form Validation
        ├── 3-theme-changer/        # Multi-Theme Switcher
        ├── 4-digital-clock/        # Real-Time Digital Clock
        └── 5-todo-list/            # Task Management Application
```

---

## ⚛️ End-Semester Version — React (`gitlytics-react/`)

The final version of Gitlytics is rebuilt in **React 18 + Vite** (course timeline step 6: *Implementation of React*).

* Live data from the **GitHub REST API** for any username (`async/await`, `Promise.all`), with saved snapshots for `torvalds` and `gautam100` and automatic fallback when the API is unavailable or rate-limited.
* Username validation (regex), recent-search history, dark/light theme (CSS variables + `data-theme`), live clock, shareable URLs (`?user=gautam100&mode=snapshot`).
* `ProfileAnalyzer extends Analyzer` (OOP) computes total/median stars, language share, activity by year and a developer level.
* Searchable, filterable, sortable repository table (switch-case + curried comparators) with a details modal.

```bash
cd gitlytics-react
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

The final project report (filled GLA template, with screenshots and diagrams) is in [`report/`](report/).

---

## 🚀 Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/arkagrawall/Gitlytics.git
   ```

2. **Navigate into the project root directory:**
   ```bash
   cd Gitlytics
   ```

3. **Launch the web application:**
   Open `index.html` directly in any modern web browser (Google Chrome, Firefox, Safari, Microsoft Edge). No backend server or build step required!

---

## 🎨 Design Philosophy

Gitlytics embraces a **Modern Dark & Emerald** aesthetic:
* **Background:** Deep Slate (`#0d1117` / `#0f172a`) to minimize eye strain and elevate code readability.
* **Accents:** Emerald Green (`#10b981` / `#34d399`) and Vibrant Teal (`#2fc5cc`) denoting vitality and developer activity.
* **Typography:** Clean, legible sans-serif hierarchy for swift data scanning.

---

## 👨‍💻 Author

**Ark Agrawal**  
University Roll Number: **22515000030**  
B.Tech — Computer Science & Engineering  
**GLA University**  
Email: [arkagrawal.work@gmail.com](mailto:arkagrawal.work@gmail.com)  
Location: **Delhi, India**  
GitHub: [@arkagrawall](https://github.com/arkagrawall)

---

## 📜 Academic License

This repository is submitted as academic coursework for the Frontend Web Development curriculum at GLA University.  
© 2026 Ark Agrawal. All Rights Reserved.
