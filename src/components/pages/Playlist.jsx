"use client"

import { useParams } from "react-router-dom"
import { usePlaylists } from "../hooks/usePlaylists"
import { usePlayer } from "../hooks/usePlayer"
import SongList from "../music/SongList"
import { Button } from "@/components/ui/button"
import { Play, Shuffle } from "lucide-react"

const Playlist = () => {
  const { id } = useParams()
  const { playlists } = usePlaylists()
  const { playSong, toggleShuffle } = usePlayer()

  const playlist = playlists.find((p) => p.id === id)

  if (!playlist) {
    return <div className="p-6">Playlist not found</div>
  }

  const handlePlayAll = () => {
    if (playlist.songs.length > 0) {
      playSong(playlist.songs[0])
    }
  }

  const handleShufflePlay = () => {
    if (playlist.songs.length > 0) {
      toggleShuffle()
      playSong(playlist.songs[Math.floor(Math.random() * playlist.songs.length)])
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{playlist.name}</h1>
          <p className="text-muted-foreground">{playlist.songs.length} songs</p>
        </div>
        <div className="space-x-2">
          <Button onClick={handlePlayAll} disabled={playlist.songs.length === 0}>
            <Play className="mr-2 h-4 w-4" /> Play All
          </Button>
          <Button variant="outline" onClick={handleShufflePlay} disabled={playlist.songs.length === 0}>
            <Shuffle className="mr-2 h-4 w-4" /> Shuffle Play
          </Button>
        </div>
      </div>
      <SongList songs={playlist.songs} />
    </div>
  )
}

export default Playlist

