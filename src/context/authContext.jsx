// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getUserById } from "../pages/services/api/user.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    getUser();
  }, [currentUser]);
  const getUser = async () => {
    if (!currentUser) {
      const token = Cookies.get("token");
      console.log("token in auth context", token);
      if (token) {
        const decoded = jwtDecode(Cookies.get("token"));
        console.log("decoded", decoded);
        const userFromAPI = await getUserById(
          decoded._id,
          Cookies.get("token")
        );
        console.log("user from api", userFromAPI);
        setCurrentUser(userFromAPI);
      }
    }
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
