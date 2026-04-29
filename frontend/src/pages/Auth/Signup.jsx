import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form.name, form.email, form.password);
    navigate("/login");
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="auth-form">

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="auth-input"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="auth-input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="auth-input"
          />

          <button className="auth-button">Sign Up</button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
};

export default Signup;