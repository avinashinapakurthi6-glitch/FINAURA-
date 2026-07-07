import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCoxUUtvnOMXVS0w_eh2RgAs9x22mAT24I",
  authDomain: "finaura-47ec9.firebaseapp.com",
  projectId: "finaura-47ec9",
  storageBucket: "finaura-47ec9.firebasestorage.app",
  messagingSenderId: "823238072480",
  appId: "1:823238072480:web:0a4049620863f42ca651c5",
  measurementId: "G-27MN718YWS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
