"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./useAuth"

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (user) {
        // This is mock data. In a real application, you would fetch this from your Firestore database
        const mockPlaylists = [
          { id: 1, name: "Summer Hits", songCount: 20, coverUrl: "/placeholder.svg?height=100&width=100" },
          { id: 2, name: "Chill Vibes", songCount: 15, coverUrl: "/placeholder.svg?height=100&width=100" },
          { id: 3, name: "Workout Mix", songCount: 25, coverUrl: "/placeholder.svg?height=100&width=100" },
          { id: 4, name: "Road Trip", songCount: 30, coverUrl: "/placeholder.svg?height=100&width=100" },
        ]
        setPlaylists(mockPlaylists)
      }
    }

    fetchPlaylists()
  }, [user])

  return playlists
}

