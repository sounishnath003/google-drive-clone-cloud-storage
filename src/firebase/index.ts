import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAqg9__l_hcJQKCOqA5Wy4lilhSeRyXD08",
  authDomain: "drive-clone-f7f7c.firebaseapp.com",
  projectId: "drive-clone-f7f7c",
  storageBucket: "drive-clone-f7f7c.appspot.com",
  messagingSenderId: "552806962962",
  appId: "1:552806962962:web:1c66cd3d7fc2f04832c5cb",
  measurementId: "G-11G6C97EXK",

  // apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
});

export const auth = app.auth();

export default app;
