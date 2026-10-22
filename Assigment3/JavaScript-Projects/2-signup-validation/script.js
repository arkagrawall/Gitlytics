const form = document.getElementById("signup-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const successBanner = document.getElementById("form-success");

function setError(input, errorElementId, message) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  document.getElementById(errorElementId).textContent = message;
}

function setValid(input, errorElementId) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  document.getElementById(errorElementId).textContent = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Validate username
  const usernameVal = usernameInput.value.trim();
  if (usernameVal.length < 3) {
    setError(usernameInput, "username-error", "Username must be at least 3 characters.");
    isValid = false;
  } else {
    setValid(usernameInput, "username-error");
  }

  // Validate email
  const emailVal = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailVal)) {
    setError(emailInput, "email-error", "Please enter a valid email address.");
    isValid = false;
  } else {
    setValid(emailInput, "email-error");
  }

  // Validate password
  const passwordVal = passwordInput.value;
  if (passwordVal.length < 6) {
    setError(passwordInput, "password-error", "Password must be at least 6 characters.");
    isValid = false;
  } else {
    setValid(passwordInput, "password-error");
  }

  // Validate confirm password
  const confirmVal = confirmInput.value;
  if (confirmVal === "" || confirmVal !== passwordVal) {
    setError(confirmInput, "confirm-error", "Passwords do not match.");
    isValid = false;
  } else {
    setValid(confirmInput, "confirm-error");
  }

  if (isValid) {
    successBanner.style.display = "block";
    successBanner.textContent = `Welcome aboard, ${usernameVal}! Registration successful.`;
    form.reset();
    setTimeout(() => {
      usernameInput.classList.remove("valid");
      emailInput.classList.remove("valid");
      passwordInput.classList.remove("valid");
      confirmInput.classList.remove("valid");
    }, 2000);
  } else {
    successBanner.style.display = "none";
  }
});
