import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState({ name: "", profilePic: "" });

  const token = localStorage.getItem("token");
  const defaultAvatar = "https://i.pravatar.cc/40"; // default profile pic

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: token },
      });
      setTasks(res.data);
    } catch {
      alert("Error loading tasks");
    }
  };

  // Fetch user info
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: token },
      });
      setUser(res.data);
    } catch {
      alert("Error fetching user info");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUser();
  }, []);

  // Add task
  const addTask = async () => {
    if (!text.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title: text.trim(), completed: false }, // add completed field
        { headers: { Authorization: token } }
      );
      setText("");
      fetchTasks();
    } catch {
      alert("Error adding task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch {
      alert("Error deleting task");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Task stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>Task Manager</h2>
        <div style={styles.userBox}>
          <span style={{ marginRight: "10px" }}>Hello, {user.name}</span>
          <img
            src={user.profilePic || defaultAvatar}
            alt="profile"
            style={styles.avatar}
          />
          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Task Stats */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h4>Total</h4>
          <p>{totalTasks}</p>
        </div>
        <div style={styles.statCard}>
          <h4>Completed</h4>
          <p>{completedTasks}</p>
        </div>
        <div style={styles.statCard}>
          <h4>Pending</h4>
          <p>{pendingTasks}</p>
        </div>
        <div style={styles.statCard}>
          <h4>Progress</h4>
          <p>{progress}%</p>
        </div>
      </div>

      {/* Add Task */}
      <div style={styles.addBox}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addBtn}>
          Add
        </button>
      </div>

      {/* Task List */}
      <ul style={styles.list}>
        {tasks.map((t) => (
          <li key={t._id} style={styles.taskCard}>
            <span>{t.title}</span>
            <button onClick={() => deleteTask(t._id)} style={styles.deleteBtn}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "700px",
    margin: "auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f9fafb",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: { margin: 0, fontSize: "1.8rem", fontWeight: "bold", color: "#333" },
  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: { width: "40px", height: "40px", borderRadius: "50%" },
  logout: {
    padding: "6px 10px",
    background: "crimson",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
    gap: "10px",
    flexWrap: "wrap",
  },
  statCard: {
    background: "#fff",
    flex: "1",
    minWidth: "120px",
    textAlign: "center",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  addBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  addBtn: {
    padding: "12px 20px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "10px",
    marginBottom: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  deleteBtn: {
    background: "crimson",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },
};
