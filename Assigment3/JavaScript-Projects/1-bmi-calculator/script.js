const form = document.getElementById("bmi-form");
const result = document.getElementById("result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const heightVal = parseFloat(document.getElementById("height").value);
  const weightVal = parseFloat(document.getElementById("weight").value);

  if (!heightVal || !weightVal || heightVal <= 0 || weightVal <= 0) {
    result.className = "result-box";
    result.textContent = "Please enter valid positive numbers for height and weight.";
    return;
  }

  const heightInMeters = heightVal / 100;
  const bmiScore = weightVal / (heightInMeters * heightInMeters);

  let classification = "";
  if (bmiScore < 18.5) {
    classification = "Underweight";
  } else if (bmiScore < 24.9) {
    classification = "Normal weight";
  } else if (bmiScore < 29.9) {
    classification = "Overweight";
  } else {
    classification = "Obesity";
  }

  result.className = "result-box highlight";
  result.textContent = `Your BMI is ${bmiScore.toFixed(1)} (${classification})`;
});
