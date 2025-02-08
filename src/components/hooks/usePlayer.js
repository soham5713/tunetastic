"use client"

import { useContext, useState, useEffect } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { useAuth } from "./useAuth"
import { db } from "../../lib/firebase"
import { doc, setDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore"

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  const [likedSongs, setLikedSongs] = useState(new Set())
  const { user } = useAuth()

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (user) {
        const likedSongsDoc = await getDoc(doc(db, `users/${user.uid}/likedSongs/songs`))
        if (likedSongsDoc.exists()) {
          setLikedSongs(new Set(likedSongsDoc.data().songs))
        } else {
          setLikedSongs(new Set())
        }
      } else {
        const localLikedSongs = JSON.parse(localStorage.getItem("likedSongs") || "[]")
        setLikedSongs(new Set(localLikedSongs))
      }
    }

    fetchLikedSongs()
  }, [user])

  const saveLikedSongs = async (updatedLikedSongs) => {
    const likedSongsArray = Array.from(updatedLikedSongs)
    if (user) {
      await setDoc(doc(db, `users/${user.uid}/likedSongs/songs`), { songs: likedSongsArray })
    } else {
      localStorage.setItem("likedSongs", JSON.stringify(likedSongsArray))
    }
    setLikedSongs(updatedLikedSongs)
  }

  const toggleLike = async (songId) => {
    const updatedLikedSongs = new Set(likedSongs)
    if (updatedLikedSongs.has(songId)) {
      updatedLikedSongs.delete(songId)
    } else {
      updatedLikedSongs.add(songId)
    }

    if (user) {
      const likedSongsRef = doc(db, `users/${user.uid}/likedSongs/songs`)
      if (updatedLikedSongs.has(songId)) {
        await setDoc(likedSongsRef, { songs: arrayUnion(songId) }, { merge: true })
      } else {
        await setDoc(likedSongsRef, { songs: arrayRemove(songId) }, { merge: true })
      }
    } else {
      localStorage.setItem("likedSongs", JSON.stringify(Array.from(updatedLikedSongs)))
    }
    setLikedSongs(updatedLikedSongs)
  }

  const isLiked = (songId) => likedSongs.has(songId)

  return {
    ...context,
    toggleLike,
    isLiked,
    likedSongs: Array.from(likedSongs),
  }
}

