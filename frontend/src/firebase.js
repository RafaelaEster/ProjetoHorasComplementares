import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMTBWdn8f9XKGvUKe0HydYl_Q97RmnFfs",
  authDomain: "horascomplementares-6e16e.firebaseapp.com",
  projectId: "horascomplementares-6e16e",
  storageBucket: "horascomplementares-6e16e.appspot.com",
  messagingSenderId: "666474479752",
  appId: "1:666474479752:web:97f63a4cb12c28e52c9f3d",
  measurementId: "G-LBJNFRKPR3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);