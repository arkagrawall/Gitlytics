const themeSelect = document.getElementById("theme-select");
const toggleBtn = document.getElementById("toggle-btn");
const body = document.body;

themeSelect.addEventListener("change", () => {
  body.dataset.theme = themeSelect.value;
});

toggleBtn.addEventListener("click", () => {
  const current = body.dataset.theme;
  const targetTheme = current === "light" ? "dark" : "light";
  body.dataset.theme = targetTheme;
  themeSelect.value = targetTheme;
});
