// login.js
import navbar from "./navbar.js";
import footer from "./footer.js";

document.getElementById("navbar-root").innerHTML = navbar();
document.getElementById("footer-root").innerHTML = footer();

const form = document.getElementById("login-form");
const msg = document.getElementById("login-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    msg.textContent = "No user found. Please sign up first.";
    return;
  }

  const user = JSON.parse(storedUser);

  if (user.email === email && user.password === password) {
    localStorage.setItem("isLoggedIn", "true");
    msg.textContent = "Login successful. Redirecting to todos...";
    setTimeout(() => {
      window.location.href = "todos.html";
    }, 1000);
  } else {
    msg.textContent = "Invalid email or password.";
  }
});
