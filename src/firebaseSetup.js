import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyC9gGc4kLgVzQmdC1HsovwKiojlcCqb3TU",
  authDomain: "colarator.firebaseapp.com",
  databaseURL: "https://colarator.firebaseio.com",
  projectId: "colarator",
  storageBucket: "colarator.appspot.com",
  messagingSenderId: "730062133810",
  appId: "1:730062133810:web:3db12af64ee81f8a3cba2b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp
