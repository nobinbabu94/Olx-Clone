import firebase from "firebase";

import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD1CgzJEDhS30ci7trLS2ltZoPu6m8tLP4",
  authDomain: "olx-2-2e201.firebaseapp.com",
  projectId: "olx-2-2e201",
  storageBucket: "olx-2-2e201.appspot.com",
  messagingSenderId: "897262167075",
  appId: "1:897262167075:web:46227b5deb3f94ee17fd96",
  measurementId: "G-YJ9E59JSPR"
};
  export default firebase.initializeApp(firebaseConfig)