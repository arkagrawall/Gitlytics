const clockDisplay = document.getElementById("clock-display");
const dateDisplay = document.getElementById("date-display");

function updateDigitalClock() {
  const now = new Date();

  clockDisplay.textContent = now.toLocaleTimeString();

  const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
  dateDisplay.textContent = now.toLocaleDateString("en-US", options);
}

updateDigitalClock();
setInterval(updateDigitalClock, 1000);
