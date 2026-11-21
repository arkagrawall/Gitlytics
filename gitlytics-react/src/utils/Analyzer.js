/*
 * OOP layer (Classes + Inheritance)
 * Analyzer        -> generic statistics that work on any list of numbers
 * ProfileAnalyzer -> extends Analyzer and adds GitHub specific insights
 */

export class Analyzer {
  constructor(values = []) {
    this.values = values;
  }

  sum(list = this.values) {
    return list.reduce((total, n) => total + n, 0);
  }

  average(list = this.values) {
    return list.length ? this.sum(list) / list.length : 0;
  }

  median(list = this.values) {
    if (!list.length) return 0;
    const sorted = [...list].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  }

  max(list = this.values) {
    return list.length ? Math.max(...list) : 0;
  }
}

export class ProfileAnalyzer extends Analyzer {
  constructor(profile) {
    // the parent class works on the star count of every repository
    super(profile.repos.map((repo) => repo.stargazers_count));
    this.profile = profile;
    this.repos = profile.repos;
  }

  totalStars() {
    return this.sum();
  }

  totalForks() {
    return this.sum(this.repos.map((repo) => repo.forks_count));
  }

  // Object used as a counter: { JavaScript: 5, HTML: 3, ... }
  languageCount() {
    const counts = {};
    for (const repo of this.repos) {
      const lang = repo.language || 'Other';
      counts[lang] = (counts[lang] || 0) + 1;
    }
    return counts;
  }

  // Array of { name, count, percent } sorted by count
  languageShare() {
    const counts = this.languageCount();
    const total = this.repos.length || 1;
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, percent: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  }

  // Repositories grouped by the year they were last pushed to
  activityByYear() {
    const years = {};
    for (const repo of this.repos) {
      const year = new Date(repo.pushed_at || repo.updated_at || repo.created_at).getFullYear();
      if (!Number.isNaN(year)) years[year] = (years[year] || 0) + 1;
    }
    return Object.entries(years)
      .map(([year, count]) => ({ year: Number(year), count }))
      .sort((a, b) => a.year - b.year);
  }

  topRepo() {
    return [...this.repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
  }

  mostRecentRepo() {
    return [...this.repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0];
  }

  accountAgeYears() {
    const created = new Date(this.profile.created_at);
    return Math.floor((Date.now() - created) / (365.25 * 24 * 60 * 60 * 1000));
  }

  originalRepoCount() {
    return this.repos.filter((repo) => !repo.fork).length;
  }

  // Classifies the developer using a switch statement on a computed level
  developerLevel() {
    const score = this.totalStars() + this.profile.followers * 2 + this.repos.length * 5;
    let level = 0;
    if (score > 10000) level = 3;
    else if (score > 500) level = 2;
    else if (score > 50) level = 1;

    switch (level) {
      case 3:
        return 'Open-source Legend';
      case 2:
        return 'Established Contributor';
      case 1:
        return 'Active Developer';
      default:
        return 'Getting Started';
    }
  }

  insights() {
    const activity = this.activityByYear();
    const busiest = activity.reduce((best, item) => (item.count > best.count ? item : best), { year: '-', count: 0 });
    const top = this.topRepo();
    const recent = this.mostRecentRepo();

    return [
      { label: 'Developer level', value: this.developerLevel() },
      { label: 'Most starred repository', value: top ? `${top.name} (${top.stargazers_count.toLocaleString()} ★)` : '-' },
      { label: 'Most recently updated', value: recent ? recent.name : '-' },
      { label: 'Busiest year', value: busiest.count ? `${busiest.year} (${busiest.count} repos)` : '-' },
      { label: 'Average stars per repo', value: this.average().toFixed(1) },
      { label: 'Median stars per repo', value: this.median().toLocaleString() },
      { label: 'Original (non-fork) repos', value: `${this.originalRepoCount()} of ${this.repos.length}` },
      { label: 'Account age', value: `${this.accountAgeYears()} years` },
    ];
  }
}
