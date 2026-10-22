const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const clearBtn = document.getElementById("clear-all");

let tasks = [
  { text: "Finish Frontend Assignment 3", completed: true },
  { text: "Review Gitlytics repository statistics", completed: false },
  { text: "Prepare viva conceptual explanations", completed: false }
];

function updateCounter() {
  const remaining = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `${remaining} pending of ${tasks.length} tasks`;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, idx) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.style.accentColor = "#10b981";
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    contentDiv.appendChild(checkbox);
    contentDiv.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.innerHTML = "×";
    deleteBtn.title = "Delete task";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(idx, 1);
      renderTasks();
    });

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    renderTasks();
  }
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  renderTasks();
});

renderTasks();
