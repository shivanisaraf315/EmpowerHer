import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter email and password.");
      return;
    }

    const res = login(email, password);
    if (!res.ok) {
      alert(res.message);
      return;
    }

    if (res.role === "admin") navigate("/admin/dashboard", { replace: true });
    if (res.role === "customer") navigate("/customers/dashboard", { replace: true });
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <div className="cardHeader">
          <h1 className="h1">Mini Restaurant Management</h1>
          <p className="sub">Login to continue (admin or customer).</p>
        </div>

        <div className="cardBody">
          <form onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com or customer@gmail.com"
            />

            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin1234 or customer1234"
            />

            <button className="btn btnPrimary" style={{ width: "100%", marginTop: 14 }}>
              Login
            </button>
          </form>

          <div style={{ marginTop: 14 }} className="small">
            <div>Admin: admin@gmail.com / admin1234</div>
            <div>Customer: customer@gmail.com / customer1234</div>
          </div>
        </div>
      </div>
    </div>
  );
}
