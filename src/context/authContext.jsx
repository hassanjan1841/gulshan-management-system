// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../services/api/user.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    user: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentUser.user && !currentUser.isAuthenticated) {
      const token = Cookies.get("token");
      if (token) {
        getUser();
      }
    }
  }, [currentUser]);

  const getUser = async () => {
    const decoded = jwtDecode(Cookies.get("token"));
    const { user } = await getUserById(decoded._id, Cookies.get("token"));
    // console.log("user in auth context", user);
    setCurrentUser({ user, isAuthenticated: true });
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
