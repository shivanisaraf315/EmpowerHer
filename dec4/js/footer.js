// footer.js
export default function footer() {
  const year = new Date().getFullYear();
  return `
    <footer style="
      padding: 12px 24px;
      background: #e5e7eb;
      font-size: 13px;
      font-family: system-ui, sans-serif;
      text-align: center;
      margin-top: 24px;
    ">
      © ${year} Modular Todos App
    </footer>
  `;
}
