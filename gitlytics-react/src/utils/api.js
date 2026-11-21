/*
 * Data layer: Fetch API + Promises + async/await
 * - "live" mode calls the public GitHub REST API
 * - "snapshot" mode (and the fallback) reads saved JSON files from /public/snapshots
 */

const API = 'https://api.github.com';
export const SNAPSHOT_USERS = ['torvalds', 'gautam100'];

async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    // error codes the UI turns into helpful messages
    if (response.status === 404) throw new Error('NOT_FOUND');
    if (response.status === 403 || response.status === 429) throw new Error('RATE_LIMIT');
    throw new Error(`HTTP_${response.status}`);
  }
  return response.json();
}

export async function fetchLiveProfile(username) {
  // Promise.all runs both requests at the same time
  const [user, repos] = await Promise.all([
    getJSON(`${API}/users/${username}`),
    getJSON(`${API}/users/${username}/repos?per_page=100&sort=updated`),
  ]);
  return { ...user, repos };
}

export function fetchSnapshot(username) {
  return getJSON(`${import.meta.env.BASE_URL}snapshots/${username.toLowerCase()}.json`);
}

export function errorMessage(code, username) {
  switch (code) {
    case 'NOT_FOUND':
      return `No GitHub user named "${username}" was found.`;
    case 'RATE_LIMIT':
      return 'GitHub API rate limit reached (60 requests per hour). Try a saved snapshot or wait a while.';
    case 'NO_SNAPSHOT':
      return `No saved snapshot for "${username}". Saved snapshots: ${SNAPSHOT_USERS.join(', ')}.`;
    default:
      return 'Could not reach GitHub. Check your internet connection or use a saved snapshot.';
  }
}

// Main entry: resolves to { profile, source } or throws an Error carrying a code
export async function loadProfile(username, mode) {
  const hasSnapshot = SNAPSHOT_USERS.includes(username.toLowerCase());

  if (mode === 'snapshot') {
    if (!hasSnapshot) throw new Error('NO_SNAPSHOT');
    return { profile: await fetchSnapshot(username), source: 'snapshot' };
  }

  try {
    return { profile: await fetchLiveProfile(username), source: 'live' };
  } catch (error) {
    // graceful fallback: the live API failed but a saved snapshot exists
    if (hasSnapshot && error.message !== 'NOT_FOUND') {
      return { profile: await fetchSnapshot(username), source: 'fallback' };
    }
    throw error;
  }
}
