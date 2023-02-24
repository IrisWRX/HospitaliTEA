//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCKu8wGfRAVe0GxdzJ4so-QPpQWnvU-ew4",
    authDomain: "bby15-21428.firebaseapp.com",
    projectId: "bby15-21428",
    storageBucket: "bby15-21428.appspot.com",
    messagingSenderId: "716315366036",
    appId: "1:716315366036:web:d1b92edf7ee92971f6da81"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();