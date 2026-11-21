// GitHub language colours (object used as a lookup table)
const COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Vue: '#41b883',
  'Jupyter Notebook': '#DA5B0B',
};

export function languageColor(name) {
  return COLORS[name] || '#8b949e';
}
