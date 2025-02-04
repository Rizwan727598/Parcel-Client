// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABJBPsQnaIztl8Vl88ax6PvZouTv4z_wA",
  authDomain: "project-12-e2295.firebaseapp.com",
  projectId: "project-12-e2295",
  storageBucket: "project-12-e2295.appspot.com",
  messagingSenderId: "813860831090",
  appId: "1:813860831090:web:a84775f6127a8b36e8e7eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
