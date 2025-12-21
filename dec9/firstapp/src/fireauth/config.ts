import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7glWtJgFJlVKO_u0QoFRbuVBg825Pv7E",
  authDomain: "siri-a9109.firebaseapp.com",
  projectId: "siri-a9109",
  storageBucket: "siri-a9109.firebasestorage.app",
  messagingSenderId: "58449193890",
  appId: "1:58449193890:web:7bfcc20c4572a4e4d7e0fb",
  measurementId: "G-CR4GD2BQPS"
};
   

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
const analytics = getAnalytics(app);

export default app;