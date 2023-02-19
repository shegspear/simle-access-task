// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArsmjom0oCVQMB50Okzwp8ZgjxbXwrdFY",
  authDomain: "simple-access-project.firebaseapp.com",
  projectId: "simple-access-project",
  storageBucket: "simple-access-project.appspot.com",
  messagingSenderId: "384790591133",
  appId: "1:384790591133:web:357bbbe588514ee7b64674",
  measurementId: "G-9Q9L645FEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
// const analytics = getAnalytics(app);
export {auth, db};