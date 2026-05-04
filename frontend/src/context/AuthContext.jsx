import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

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
      const res = await API.get("/auth/me", {
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
  const res = await API.post("/auth/login", {
    email,
    password
  });

  localStorage.setItem("token", res.data.token);

  const userRes = await API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${res.data.token}`
    }
  });

  setUser(userRes.data);
  setLoading(false);

  return userRes.data;
};

  const signup = async (name, email, password) => {
    await API.post("/auth/signup", {
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