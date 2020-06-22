// import firebase from 'firebase';

var firebase = require('firebase/app');
require('firebase/firestore')
// require('firebase/auth')
// require('firebase/database')
// require('firebase/storage')
// import 'firebase/auth';
// import 'firebase/database';
// import 'firebase/firestore';

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

// Firestore
var config = (process.env.NODE_ENV === 'development') ? {
  apiKey: "AIzaSyD3nuoNJHlZHVdYDhM607iPDGgv24Y7wxw",
  authDomain: "fstore1-dev.firebaseapp.com",
  databaseURL: "https://fstore1-dev.firebaseio.com",
  projectId: "fstore1-dev",
  storageBucket: "fstore1-dev.appspot.com",
  messagingSenderId: "1031943081436"
} : {
  apiKey: "AIzaSyD3nuoNJHlZHVdYDhM607iPDGgv24Y7wxw",
  authDomain: "fstore1-dev.firebaseapp.com",
  databaseURL: "https://fstore1-dev.firebaseio.com",
  projectId: "fstore1-dev",
  storageBucket: "fstore1-dev.appspot.com",
  messagingSenderId: "1031943081436"
}

try {

  console.log("Firestore config:", config);
  firebase.initializeApp(config);

} catch (e) {

}

// const settings = {/* your settings... */ timestampsInSnapshots: true}
let firestoreDB = firebase.firestore()
// firestoreDB.settings(settings)
export { firestoreDB }

// export var githubProvider = new firebase.auth.GithubAuthProvider();
// export var facebookProvider = new firebase.auth.FacebookAuthProvider();
// export var firebaseRef = firebase.database().ref();
// export var firebaseStorageRef = firebase.storage().ref();
// export var firebaseStorage = firebase.storage();
export var fbfs = firebase.firestore;
export default firebase;
