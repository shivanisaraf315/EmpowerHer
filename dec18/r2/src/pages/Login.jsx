import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const okEmail = email.trim() === "admin@gmail.com";
    const okPass = password === "admin@123";

    if (okEmail && okPass) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/todos", { replace: true });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <form onSubmit={onSubmit} className="form">
        <label className="label">
          Email
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@gmail.com"
            required
          />
        </label>

        <label className="label">
          Password
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin@123"
            required
          />
        </label>

        <button className="btn" type="submit">
          Login
        </button>

        {error && <p className="error">{error}</p>}
      </form>

      <div className="hint">
        <div className="codebox">
          Email: admin@gmail.com <br />
          Password: admin@123
        </div>
      </div>
    </div>
  );
}
