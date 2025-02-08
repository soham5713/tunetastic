"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth, googleProvider } from "../../lib/firebase"
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const isLoggedIn = () => {
    return !!context.user
  }

  return {
    user: context.user,
    login,
    loginWithGoogle,
    signUp,
    logout,
    isLoggedIn,
  }
}

