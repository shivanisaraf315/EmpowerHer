// signup.js
import navbar from "./navbar.js";
import footer from "./footer.js";

document.getElementById("navbar-root").innerHTML = navbar();
document.getElementById("footer-root").innerHTML = footer();

const form = document.getElementById("signup-form");
const msg = document.getElementById("signup-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    msg.textContent = "Please fill all fields.";
    return;
  }

  const user = { name, email, password };

  // Store user in localStorage
  localStorage.setItem("user", JSON.stringify(user));
  // reset login status
  localStorage.setItem("isLoggedIn", "false");

  msg.textContent = "Signup successful. Redirecting to login page...";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
});
