import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  databaseURL: 'https://bugtracker-ad036.firebaseio.com',
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bugtracker-ad036.firebaseapp.com",
  projectId: "bugtracker-ad036",
  storageBucket: "bugtracker-ad036.appspot.com",
  messagingSenderId: "384077056290",
  appId: "1:384077056290:web:4bd701320b815c7787bd7b"
}

setLogLevel('silent');
const app = initializeApp(firebaseConfig, setLogLevel("silent"));
export const db = getFirestore(app, setLogLevel("silent"))
export const auth = getAuth()
export const storage = getStorage(app);
