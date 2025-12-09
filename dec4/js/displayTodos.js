// displayTodos.js
export function displayTodos(data) {
  const container = document.getElementById("todosContainer");
  container.innerHTML = "";

  data.forEach((todo) => {
    const card = document.createElement("div");
    card.className = "todo-card";

    const title = document.createElement("div");
    title.className = "todo-title";
    title.textContent = todo.title;

    const status = document.createElement("span");
    status.className = "todo-status " + (todo.completed ? "completed" : "pending");
    status.textContent = todo.completed ? "Completed" : "Pending";

    card.appendChild(title);
    card.appendChild(status);

    container.appendChild(card);
  });
}
