// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC53yMcJaCHypwgS3bHc4DpGy914z_cZv0",
  authDomain: "buy-ticket-41745.firebaseapp.com",
  databaseURL: "https://buy-ticket-41745-default-rtdb.firebaseio.com",
  projectId: "buy-ticket-41745",
  storageBucket: "buy-ticket-41745.appspot.com",
  messagingSenderId: "209434355064",
  appId: "1:209434355064:web:3b02dccff5ae73aabc148d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;