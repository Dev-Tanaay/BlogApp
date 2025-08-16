
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXTAUTH_APIKEY!,
  authDomain: process.env.NEXTAUTH_AUTHDOMAIN!,
  projectId: process.env.NEXTAUTH_PROJECTID!,
  storageBucket: process.env.NEXTAUTH_STORAGEBUCKET!,
  messagingSenderId: process.env.NEXTAUTH_MESSAGINGSENDERID!,
  appId: process.env.NEXTAUTH_APPID!
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);