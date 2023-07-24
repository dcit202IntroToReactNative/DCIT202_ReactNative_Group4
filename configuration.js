// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// configurations
const firebaseConfig = {

    apiKey: "AIzaSyCYz10pLi7RJj7RHp7E3Bk_dA7rGkBBjbc",
  
    authDomain: "rapp-f037a.firebaseapp.com",
  
    projectId: "rapp-f037a",
  
    storageBucket: "rapp-f037a.appspot.com",
  
    messagingSenderId: "525194748834",
  
    appId: "1:525194748834:web:e543173ef184e1c49b08fb",
  
    measurementId: "G-ZNY502L1PH"
  
  };
  

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export {firebase};
  