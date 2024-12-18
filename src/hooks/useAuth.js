// hooks/useAuth.js
import { useAuth } from "../context/AuthContext";

const useFirebaseAuth = () => {
  const { currentUser } = useAuth();
  return { currentUser };
};

export default useFirebaseAuth;
