"use client"

import { createContext, useState, useEffect } from "react"
import { auth, db } from "../../lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await initializeUserCollection(user)
      }
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = { user, loading }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

