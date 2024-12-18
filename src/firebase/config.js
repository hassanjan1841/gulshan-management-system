// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXJanK7YWaSyDGAuoYNV1gHGSBfSdOHBU",
  authDomain: "saylani-management-system.firebaseapp.com",
  projectId: "saylani-management-system",
  storageBucket: "saylani-management-system.firebasestorage.app",
  messagingSenderId: "1063690629127",
  appId: "1:1063690629127:web:dfaef9694181fe8c973aa2",
  measurementId: "G-YTCXXFQNSY",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
