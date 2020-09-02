// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDgMeSXX5qL7IF_0Y-ZtO7wVAjBlDUNj9E",
    authDomain: "exo-reactn-di19.firebaseapp.com",
    databaseURL: "https://exo-reactn-di19.firebaseio.com",
    projectId: "exo-reactn-di19",
    storageBucket: "exo-reactn-di19.appspot.com",
    messagingSenderId: "527406236139",
    appId: "1:527406236139:web:bd4c55b4c133046c9959ae"
};

// In /utils/firebase.js
// We should import firebase from this module instead of the default package.
import * as firebase from 'firebase'  // Should not be used elsewhere in the project
import "firebase/firestore";

firebase.initializeApp(firebaseConfig)
export default firebase;