// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk2aY2glhJpfsIJGEbHs7CXzOsSVH3H18",
  authDomain: "expensetracker-1a25f.firebaseapp.com",
  databaseURL: "https://expensetracker-1a25f-default-rtdb.firebaseio.com",
  projectId: "expensetracker-1a25f",
  storageBucket: "expensetracker-1a25f.appspot.com",
  messagingSenderId: "689424295937",
  appId: "1:689424295937:web:dbb0bc38667c96b5e17800",
  measurementId: "G-49PTRYT110"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Export Firebase services for use in other parts of the app
export { database, auth };
