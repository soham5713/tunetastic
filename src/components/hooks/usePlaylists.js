import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import { db } from "../../lib/firebase"
import { collection, doc, setDoc, deleteDoc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const playlistsCollection = collection(db, `users/${user.uid}/playlists`)
    const unsubscribe = onSnapshot(playlistsCollection, (snapshot) => {
      const playlistsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setPlaylists(playlistsData)
    })

    return () => unsubscribe()
  }, [user])

  const createPlaylist = async (name, songs = []) => {
    if (!user) return null

    const newPlaylist = {
      name,
      songs,
      songCount: songs.length,
      createdAt: new Date(),
      coverUrl: songs.length > 0 ? songs[0].coverUrl : "/placeholder.svg",
    }

    const playlistRef = doc(collection(db, `users/${user.uid}/playlists`))
    await setDoc(playlistRef, newPlaylist)

    return { id: playlistRef.id, ...newPlaylist }
  }

  const editPlaylist = async (id, newName) => {
    if (!user) return

    const playlistRef = doc(db, `users/${user.uid}/playlists/${id}`)
    await updateDoc(playlistRef, { name: newName })
  }

  const deletePlaylist = async (id) => {
    if (!user) return

    await deleteDoc(doc(db, `users/${user.uid}/playlists/${id}`))
  }

  const addSongToPlaylist = async (playlistId, song) => {
    if (!user) return

    const playlistRef = doc(db, `users/${user.uid}/playlists/${playlistId}`)
    await updateDoc(playlistRef, {
      songs: arrayUnion(song),
      songCount: playlists.find((p) => p.id === playlistId).songCount + 1,
    })
  }

  const removeSongFromPlaylist = async (playlistId, song) => {
    if (!user) return

    const playlistRef = doc(db, `users/${user.uid}/playlists/${playlistId}`)
    await updateDoc(playlistRef, {
      songs: arrayRemove(song),
      songCount: playlists.find((p) => p.id === playlistId).songCount - 1,
    })
  }

  return { playlists, createPlaylist, editPlaylist, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist }
}

