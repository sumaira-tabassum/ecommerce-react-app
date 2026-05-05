import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const { login, logout, user } = useAuth();
  // const {login, logout} = useAuth;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const loggedInUser = await login(form.email, form.password);

    if (loggedInUser.role !== "admin") {
      logout();
      setError("You are not authorized to access the admin panel");
      return;
    }

    navigate("/admin");
 } catch (err) {
  console.error("Admin login failed:", err);
  console.error("Admin login response:", err?.response?.data);
  setError(err?.response?.data?.message || err?.message || "Invalid admin credentials");
}

};


  return (
    <div className="admin-auth-container">
      <div className="admin-auth-card">
        <h2 className="admin-auth-title">Admin Login</h2>
        <p className="admin-auth-subtitle">Sign in to access the admin panel</p>

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            className="admin-auth-input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="admin-auth-input"
          />

          {error && <p className="admin-auth-error">{error}</p>}

          <button type="submit" className="admin-auth-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
