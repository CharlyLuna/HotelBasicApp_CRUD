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
import { app, auth } from '../firebase'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [rol, setRol] = useState(null)
  const fireStore = getFirestore(app)

  const signUp = async (email, password) => {
    const userInfo = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = userInfo.user
    const userRef = doc(fireStore, 'usuarios', uid)
    return setDoc(userRef, { correo: email, rol: 'employee' })
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
      if (currentUser) {
        const userRef = doc(fireStore, 'usuarios', currentUser.uid)
        getDoc(userRef).then((doc) => {
          if (doc.exists()) {
            setRol(doc.data().rol)
          }
        }
        )
      }
    })

    return () => {
      status()
    }
  }, [])

  return (
    <UserAuthContext.Provider value={{ signUp, logIn, logOut, googleSignIn, user, rol }}>
      {children}
    </UserAuthContext.Provider>
  )
}
