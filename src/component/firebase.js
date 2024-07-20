// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Firebase configuration object from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18",
  authDomain: "expensetracker-1a25f.firebaseapp.com",
  databaseURL: "https://expensetracker-1a25f-default-rtdb.firebaseio.com",
  projectId: "expensetracker-1a25f",
  storageBucket: "expensetracker-1a25f.appspot.com",
  messagingSenderId: "689424295937",
  appId: "1:689424295937:web:dbb0bc38667c96b5e17800"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and Authentication
const database = getDatabase(app);
const auth = getAuth(app);

// Export Firebase services for use in other parts of the app
export { database, auth };
