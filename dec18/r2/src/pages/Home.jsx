import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="card">
      <h2>Welcome to Home Page</h2>
      <p className="muted">This page is accessible to all users.</p>

      <Link className="btn" to="/login">
        Go to Login
      </Link>
    </div>
  );
}
