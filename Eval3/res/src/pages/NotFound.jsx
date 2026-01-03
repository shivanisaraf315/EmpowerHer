import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="card">
        <div className="cardBody">
          <h2 className="h1">404 - Page not found</h2>
          <p className="sub">Go back to login.</p>
          <Link className="btn btnPrimary" to="/" style={{ display: "inline-block", marginTop: 12 }}>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
