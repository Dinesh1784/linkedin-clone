import firebase from "firebase/compat";

const firebaseConfig = {
  
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export { db, auth };
