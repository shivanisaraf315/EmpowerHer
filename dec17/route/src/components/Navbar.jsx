import { NavLink } from "react-router-dom";
const Navbar =()=>{
    return(
        <nav className="navbar">
<div className="nav-brand">
Basic Routing
</div>
<div className="nav-links">
 <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
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