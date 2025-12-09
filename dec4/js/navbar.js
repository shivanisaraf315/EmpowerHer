// navbar.js
export default function navbar() {
  return `
    <nav style="
      padding: 12px 24px;
      background: #111827;
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: system-ui, sans-serif;
    ">
      <div style="font-weight: 600; font-size: 18px;">Modular Todos App</div>
      <div style="display:flex; gap:12px; font-size:14px;">
        <a href="index.html" style="color:white; text-decoration:none;">Home</a>
        <a href="signup.html" style="color:white; text-decoration:none;">Signup</a>
        <a href="login.html" style="color:white; text-decoration:none;">Login</a>
        <a href="todos.html" style="color:white; text-decoration:none;">Todos</a>
      </div>
    </nav>
  `;
}
