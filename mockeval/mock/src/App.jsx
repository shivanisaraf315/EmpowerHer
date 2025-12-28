import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isAuthed, setIsAuthed] = useState(localStorage.getItem("isAuthed") === "true");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login isAuthed={isAuthed} onLoginSuccess={() => setIsAuthed(true)} />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAuthed={isAuthed}>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
