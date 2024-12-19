// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      currentUser?.role == "student" && navigate("/student");
      currentUser?.role == "teacher" && navigate("/teacher");
      currentUser?.role == "admin" && navigate("/admin");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
