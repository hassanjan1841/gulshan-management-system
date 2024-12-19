// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth.js";
import Cookies from "js-cookie";
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
    if (!currentUser) {
      const token = Cookies.get("token");
      if (token) {
        getUser();
      }
    }
  }, [currentUser]);

  const getUser = () => {
    axios
      .get(AppRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("response from get my info API=>", res.data);
        setUser(res.data.data);
      })
      .catch((err) => console.log(err));
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
