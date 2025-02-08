"use client"

import { useContext, useState, useEffect } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { useAuth } from "./useAuth"
import { db } from "../../lib/firebase"
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"

export const usePlayer = () => {
  const context = useContext(PlayerContext)
  const [likedSongs, setLikedSongs] = useState(new Set())
  const { user } = useAuth()

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (user) {
        const likedSongsRef = doc(db, `users/${user.uid}/likedSongs/songs`)
        const likedSongsDoc = await getDoc(likedSongsRef)
        if (likedSongsDoc.exists()) {
          setLikedSongs(new Set(likedSongsDoc.data().songs))
        } else {
          await setDoc(likedSongsRef, { songs: [] })
          setLikedSongs(new Set())
        }
      } else {
        setLikedSongs(new Set())
      }
    }

    fetchLikedSongs()
  }, [user])

  const toggleLike = async (song) => {
    if (!user) return

    const updatedLikedSongs = new Set(likedSongs)
    const likedSongsRef = doc(db, `users/${user.uid}/likedSongs/songs`)

    if (updatedLikedSongs.has(song.id)) {
      updatedLikedSongs.delete(song.id)
      await updateDoc(likedSongsRef, { songs: arrayRemove(song.id) })
    } else {
      updatedLikedSongs.add(song.id)
      await updateDoc(likedSongsRef, { songs: arrayUnion(song.id) })
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

