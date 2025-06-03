// firebase-config.js

// Your config (already correct)
const firebaseConfig = {
  apiKey: "AIzaSyDueQXkBczLEFuC2y3JV59lczs6sW3U",
  authDomain: "first-cc1d9.firebaseapp.com",
  projectId: "first-cc1d9",
  storageBucket: "first-cc1d9.appspot.com",  // corrected URL
  messagingSenderId: "102103364238",
  appId: "1:102103364238:web:d9b4df68f1711e502fcfdf",
  measurementId: "G-WTXD2DQRD3"
};

// ✅ Initialize Firebase App
firebase.initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = firebase.firestore();
