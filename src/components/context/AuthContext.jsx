import { createContext, useState, useEffect } from "react"
import { auth } from "../../lib/firebase"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser)
    return () => unsubscribe()
  }, [])

  const value = { user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

