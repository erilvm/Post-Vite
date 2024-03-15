// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging"; //Notoficaciones push, debe estar autenticado y obtener token

const firebaseConfig = {
  apiKey: "AIzaSyCyrO5kPgtWuMToM4d259K1rucOAqikGpc",
  authDomain: "qroadvisor-6db9f.firebaseapp.com",
  projectId: "qroadvisor-6db9f",
  storageBucket: "qroadvisor-6db9f.appspot.com",
  messagingSenderId: "927752481048",
  appId: "1:927752481048:web:9788a5fa8b72cfbd76166d",
  measurementId: "G-N97FKDWLYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);