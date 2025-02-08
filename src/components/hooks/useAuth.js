import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth, googleProvider } from "../../lib/firebase"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const loginWithGoogle = () => {
    return auth.signInWithPopup(googleProvider)
  }

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const logout = () => {
    return auth.signOut()
  }

  return {
    user: context.user,
    login,
    loginWithGoogle,
    signUp,
    logout,
  }
}

