import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) return alert("Enter email & password");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard"; // redirect after login
    } catch (err) {
      console.error(err);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.loginBtn}>
          Login
        </button>
        <p style={styles.signupText}>
          Don’t have an account?{" "}
          <span
            style={styles.signupLink}
            onClick={() => (window.location.href = "/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  box: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
    color: "#333",
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1rem",
  },
  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "0.2s",
  },
  signupText: {
    marginTop: "15px",
    fontSize: "0.9rem",
    color: "#555",
  },
  signupLink: {
    color: "#4f46e5",
    cursor: "pointer",
    fontWeight: "500",
  },
};
