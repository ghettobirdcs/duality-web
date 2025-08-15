import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "duality-web.firebaseapp.com",
  projectId: "duality-web",
  storageBucket: "duality-web.firebasestorage.app",
  messagingSenderId: "514627574586",
  appId: "1:514627574586:web:8db02432aa82b5d6f98e03",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
