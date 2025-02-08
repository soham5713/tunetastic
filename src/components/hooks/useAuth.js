"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { auth, googleProvider, db } from "../../lib/firebase"
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  const initializeUserCollection = async (user) => {
    const userRef = doc(db, `users/${user.uid}`)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        createdAt: new Date(),
      })

      // Create an initial empty playlist
      const playlistsRef = doc(db, `users/${user.uid}/playlists/initial`)
      await setDoc(playlistsRef, {
        name: "My First Playlist",
        songs: [],
        songCount: 0,
        createdAt: new Date(),
      })
    }
  }

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    await initializeUserCollection(userCredential.user)
    return userCredential
  }

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider)
    await initializeUserCollection(userCredential.user)
    return userCredential
  }

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await initializeUserCollection(userCredential.user)
    return userCredential
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

