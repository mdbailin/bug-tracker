import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  databaseURL: 'https://bugtracker-ad036.firebaseio.com',
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bugtracker-ad036.firebaseapp.com",
  projectId: "bugtracker-ad036",
  storageBucket: "bugtracker-ad036.appspot.com",
  messagingSenderId: "384077056290",
  appId: "1:384077056290:web:4bd701320b815c7787bd7b", 
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true})
export const auth = getAuth()
export const storage = getStorage(app);
