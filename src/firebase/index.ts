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
  apiKey: "AIzaSyDX_vplfkuDUXyqXyw6S05Uj3zg4yt7Sro",
  authDomain: "drive-clone-e2e65.firebaseapp.com",
  projectId: "drive-clone-e2e65",
  storageBucket: "drive-clone-e2e65.appspot.com",
  messagingSenderId: "923946019272",
  appId: "1:923946019272:web:38b1b363088150f152f8fd",
  measurementId: "G-7ENWMN3RRH",

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
