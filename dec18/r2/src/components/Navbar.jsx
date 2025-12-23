import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">Dynamic + Protected Routing</div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Home
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Login
        </NavLink>

        <NavLink
          to="/todos"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Todos
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
