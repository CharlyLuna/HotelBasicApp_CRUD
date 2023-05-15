import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { UserAuthContext } from './UserAuthContext'
import { auth } from '../firebase'

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setUser(null)
    return signOut(auth)
  }

  const googleSignIn = () => {
    const googleAuth = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuth)
  }

  useEffect(() => {
    const status = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => {
      status()
    }
  }, [])

  return (
    <UserAuthContext.Provider value={{ signUp, logIn, logOut, googleSignIn, user }}>
      {children}
    </UserAuthContext.Provider>
  )
}
