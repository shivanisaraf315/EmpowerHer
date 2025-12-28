import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ isAuthed, onLoginSuccess }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    // If already logged in, redirect to /admin
    if (isAuthed) navigate("/admin", { replace: true });
  }, [isAuthed, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const okEmail = email.trim() === "admin@gmail.com";
    const okPass = password === "admin1234";

    if (okEmail && okPass) {
      alert("Login success");
      onLoginSuccess();
      navigate("/admin", { replace: true });
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={onSubmit} className="form">
          <label className="label">
            Email
            <input
              ref={emailRef}
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
              placeholder="admin1234"
              required
            />
          </label>

          <button className="btn" type="submit">
            Login
          </button>
        </form>

        <div className="hint">
          Valid:
          <div className="mono">admin@gmail.com / admin1234</div>
        </div>
      </div>
    </div>
  );
}
