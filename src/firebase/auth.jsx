// firebase/auth.js
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import firebaseApp from "./config";

let auth;


  try {
    auth = getAuth(firebaseApp); 
  } catch (err) {
    console.log(err.message);
    showToast(err.message, 'destructive'); 
  }

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user; // Return user details
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign-Out Error:", error);
    throw error;
  }
};

export { auth }; 
