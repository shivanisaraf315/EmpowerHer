// todos.js
import navbar from "./navbar.js";
import footer from "./footer.js";
import { displayTodos } from "./displayTodos.js";

document.getElementById("navbar-root").innerHTML = navbar();
document.getElementById("footer-root").innerHTML = footer();

const msg = document.getElementById("todos-msg");
const logoutBtn = document.getElementById("logout-btn");

// protect route
const isLoggedIn = localStorage.getItem("isLoggedIn");
if (isLoggedIn !== "true") {
  msg.textContent = "You are not logged in. Redirecting to login page...";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1000);
} else {
  fetchTodos();
}

// fetch todos from API
async function fetchTodos() {
  try {
    msg.textContent = "Loading todos...";
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
    const data = await res.json();
    displayTodos(data);
    msg.textContent = "Showing first 20 todos from API.";
  } catch (error) {
    console.error(error);
    msg.textContent = "Failed to fetch todos.";
  }
}

// logout
logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLoggedIn", "false");
  msg.textContent = "Logged out. Redirecting to login page...";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 800);
});
