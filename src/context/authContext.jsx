// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";
import Cookies from "js-cookie";
import axios from "axios";
import { appRoutes } from "../constant/constant.js";
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
    if (!currentUser) {
      const token = Cookies.get("token");
      if (token) {
        getUser();
      }
    }
  }, [currentUser]);

  const getUser = () => {
    axios
      .get(appRoutes.getUsers, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("response from get my info API=>", res.data);
        setCurrentUser(res.data.data);
      })
      .catch((err) => console.log("err in get my info API=>", err.message));
  };

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
