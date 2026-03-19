import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token"); // check if user is logged in

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Signup route */}
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/dashboard" />}
        />

        {/* Dashboard route (protected) */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* Catch-all: redirect any unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
