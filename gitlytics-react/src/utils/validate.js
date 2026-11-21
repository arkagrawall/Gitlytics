// GitHub usernames: 1-39 characters, letters, numbers and single hyphens,
// and they cannot start or end with a hyphen.
const USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export function validateUsername(value) {
  const name = value.trim();
  if (name === '') return 'Please enter a GitHub username.';
  if (name.length > 39) return 'Username cannot be longer than 39 characters.';
  if (name.includes(' ')) return 'Username cannot contain spaces.';
  if (!USERNAME_REGEX.test(name)) {
    return 'Only letters, numbers and single hyphens are allowed (no hyphen at the start or end).';
  }
  return '';
}
