import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyDp-kLlAfy50t1aK_RPBLhE6Ar6RgTpkEg",
  authDomain: "linkedinclone-78cb0.firebaseapp.com",
  projectId: "linkedinclone-78cb0",
  storageBucket: "linkedinclone-78cb0.appspot.com",
  messagingSenderId: "123614121648",
  appId: "1:123614121648:web:fe43f05cdc50fbe890f575",
  measurementId: "G-THY1676X71",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { db, auth };
