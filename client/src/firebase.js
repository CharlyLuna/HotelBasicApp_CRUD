import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCK-9CXnDtmL_brFCoPGzvqWvvC6M1nvW4',
  authDomain: 'react-login-auth-fdd78.firebaseapp.com',
  projectId: 'react-login-auth-fdd78',
  storageBucket: 'react-login-auth-fdd78.appspot.com',
  messagingSenderId: '976999469947',
  appId: '1:976999469947:web:c53e8e5d4d012a905ee3de',
  measurementId: 'G-7GTPBE1WZR'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
