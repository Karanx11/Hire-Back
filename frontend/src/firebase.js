import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDYwui3AnjI59PZDuP_YHfHeTWwGqxyh_4",
  authDomain: "hire-back.firebaseapp.com",
  projectId: "hire-back",
  storageBucket: "hire-back.firebasestorage.app",
  messagingSenderId: "791136650533",
  appId: "1:791136650533:web:5cea1df1d35b1ddb5ac6cc"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)