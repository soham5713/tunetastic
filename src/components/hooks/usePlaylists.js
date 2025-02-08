"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import { db } from "../../lib/firebase"
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore"

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (user) {
        const playlistsCollection = collection(db, `users/${user.uid}/playlists`)
        const playlistsSnapshot = await getDocs(playlistsCollection)
        const playlistsData = playlistsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setPlaylists(playlistsData)
      } else {
        const localPlaylists = JSON.parse(localStorage.getItem("playlists") || "[]")
        setPlaylists(localPlaylists)
      }
    }

    fetchPlaylists()
  }, [user])

  const savePlaylists = async (updatedPlaylists) => {
    if (user) {
      const playlistsCollection = collection(db, `users/${user.uid}/playlists`)
      for (const playlist of updatedPlaylists) {
        await setDoc(doc(playlistsCollection, playlist.id), playlist)
      }
    } else {
      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists))
    }
    setPlaylists(updatedPlaylists)
  }

  const createPlaylist = async (name, songs = []) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songCount: songs.length,
      songs: songs,
      coverUrl: songs.length > 0 ? songs[0].coverUrl : "/placeholder.svg?height=100&width=100",
    }
    const updatedPlaylists = [...playlists, newPlaylist]
    await savePlaylists(updatedPlaylists)
    return newPlaylist
  }

  const editPlaylist = async (id, newName) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === id ? { ...playlist, name: newName } : playlist,
    )
    await savePlaylists(updatedPlaylists)
  }

  const deletePlaylist = async (id) => {
    const updatedPlaylists = playlists.filter((playlist) => playlist.id !== id)
    if (user) {
      await deleteDoc(doc(db, `users/${user.uid}/playlists/${id}`))
    }
    await savePlaylists(updatedPlaylists)
  }

  const addSongToPlaylist = async (playlistId, song) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        const songExists = playlist.songs.some((s) => s.id === song.id)
        if (!songExists) {
          const updatedSongs = [...playlist.songs, song]
          return { ...playlist, songs: updatedSongs, songCount: updatedSongs.length }
        }
      }
      return playlist
    })
    await savePlaylists(updatedPlaylists)
  }

  return { playlists, createPlaylist, editPlaylist, deletePlaylist, addSongToPlaylist }
}

