import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyADPFXBfxiuwJK2HPxbZdr5rU3E8MaQndQ",
  authDomain: "freelance-mark.firebaseapp.com",
  databaseURL: "https://freelance-mark-default-rtdb.firebaseio.com",
  projectId: "freelance-mark",
  storageBucket: "freelance-mark.appspot.com",
  messagingSenderId: "295742793065",
  appId: "1:295742793065:web:4e2dac1da23bff1beb09f8",
  measurementId: "G-V8LDD3KK5B"
  };
  
  export const app = initializeApp(firebaseConfig);
  export const messaging = getMessaging(app);
