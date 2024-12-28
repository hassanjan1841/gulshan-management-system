// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";
import Cookies from "js-cookie";

import { getUserById } from "../services/api/user.js";
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
    if (!currentUser) {
      const token = Cookies.get("token");
      console.log("token", token);
      if (token) {
        getUser();
      }
    }
  }, [currentUser]);
  const getUser = async () => {
    const userFromAPI = await getUserById(Cookies.get("token"));
    setCurrentUser(userFromAPI);
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
