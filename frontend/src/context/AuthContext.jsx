import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(res.data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
  console.log("login called with:", { email, password });

  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
      name,
      email,
      password
    });

    console.log("login response:", res.data);

    localStorage.setItem("token", res.data.token);

    const userRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${res.data.token}`
      }
    });

    console.log("me response:", userRes.data);

    setUser(userRes.data);
    setLoading(false);

    return userRes.data;
  } catch (error) {
    console.error("login error:", error);
    console.error("login error response:", error?.response?.data);
    throw error;
  }
};


  const signup = async (name, email, password) => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, {
      name,
      email,
      password
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);