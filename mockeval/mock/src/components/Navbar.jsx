export default function Navbar({ onLogout }) {
  return (
    <div className="navbar">
      <div className="nav-title">Admin Dashboard</div>
      <button className="btn secondary" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
