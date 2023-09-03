import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAurvDQEjp0OV3RC3XUZ-ktk61OxUiO4lE",
  authDomain: "fir-chat-app-v1-9d4ef.firebaseapp.com",
  projectId: "fir-chat-app-v1-9d4ef",
  storageBucket: "fir-chat-app-v1-9d4ef.appspot.com",
  messagingSenderId: "675400414821",
  appId: "1:675400414821:web:b80d9efc2c66587b37b88c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();