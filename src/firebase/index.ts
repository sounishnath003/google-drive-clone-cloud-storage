import firebase from "firebase";
import "firebase/auth";

interface DataBaseInterface {
  folders: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  files: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  getCurrentTimestamp: () => firebase.firestore.FieldValue;
  formatDoc: (
    doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => any;
}

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

export const auth: firebase.auth.Auth = app.auth();

// export const database = app.database();
const firestore: firebase.firestore.Firestore = app.firestore();

export const database: DataBaseInterface = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc: function (
    doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) {
    return { id: doc.id, ...doc.data() };
  },
};

export default app;
