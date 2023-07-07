import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDHiymTV-avTvGv5Oxj3Bghiqw327h8Ac8",
  authDomain: "sweetkingdom-703fb.firebaseapp.com",
  projectId: "sweetkingdom-703fb",
  storageBucket: "sweetkingdom-703fb.appspot.com",
  messagingSenderId: "40592815779",
  appId: "1:40592815779:web:24a07fee4b751465687116"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);