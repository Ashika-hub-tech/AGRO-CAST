
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3R7sHY-onTuIcwxROQqb6Ak2HVqJGkvY",
  authDomain: "agrocastai.firebaseapp.com",
  projectId: "agrocastai",
  storageBucket: "agrocastai.firebasestorage.app",
  messagingSenderId: "825981807316",
  appId: "1:825981807316:web:84fd18d8fbef783c462941",
  measurementId: "G-ECR002WN18"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
