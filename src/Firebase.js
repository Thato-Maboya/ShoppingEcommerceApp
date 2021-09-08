import Firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7JszVNClq-ZeyWm_rzvkwcSsusRJlAbM",
    authDomain: "online-shopping-3a09b.firebaseapp.com",
    projectId: "online-shopping-3a09b",
    storageBucket: "online-shopping-3a09b.appspot.com",
    messagingSenderId: "348738159345",
    appId: "1:348738159345:web:1e2e310a02f24af858df50"
};
// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {firebase, db, auth}
