import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    navigate("/");
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue</p>

        <form onSubmit={handleSubmit} className="auth-form">

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

          <button className="auth-button">Login</button>

        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>

      </div>

    </div>
  );
};

export default Login;