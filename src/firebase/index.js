// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUWRA3P33riV1B3KQhTYADKEi205ERMs8",
  authDomain: "chat-54960.firebaseapp.com",
  projectId: "chat-54960",
  storageBucket: "chat-54960.firebasestorage.app",
  messagingSenderId: "901230476986",
  appId: "1:901230476986:web:18a9f36b5c3d3e1e81cc83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase auth işlemlerine erişebilmek için kurlum
export const auth = getAuth(app);

// google auth hizmetini kullanabilmek için kurulum
export const provider = new GoogleAuthProvider();

// firestore veritabanının  kurulumunu yap
export const db = getFirestore(app);
