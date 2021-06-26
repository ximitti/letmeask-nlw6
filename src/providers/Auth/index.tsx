import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { firebase, auth } from '../../services/firebase'

// -------------------------------------------
interface AuthProviderProps {
  children?: ReactNode
}

interface User {
  id: string
  name: string
  avatar: string
}

interface AuthContextType {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

// -------------------------------------------

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((isUserLogged) => {
      if (isUserLogged) {
        const { displayName, photoURL, uid } = isUserLogged

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
