// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDUzgwFw18L0sFjl6SJPuRvL5FM7p-YmJc',
  authDomain: 'notes-app-b4aa7.firebaseapp.com',
  projectId: 'notes-app-b4aa7',
  storageBucket: 'notes-app-b4aa7.appspot.com',
  messagingSenderId: '796807027200',
  appId: '1:796807027200:web:aa729b5da4cece6624d6e5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore DB
export const db = getFirestore(app)

// Initialize Firestore auth
export const auth = getAuth(app)
