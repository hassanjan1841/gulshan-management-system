import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

export default function AuthLayout({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    currentUser.role == "student" && navigate("/student");
    currentUser.role == "student" && navigate("/student");
    currentUser.role == "student" && navigate("/student");
  }, [currentUser]);
  return currentUser && children;
}
