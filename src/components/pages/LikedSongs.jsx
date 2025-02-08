"use client"

import { usePlayer } from "../hooks/usePlayer"
import { useAuth } from "../hooks/useAuth"
import SongList from "../music/SongList"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Shuffle } from "lucide-react"

const LikedSongs = () => {
  const { queue, likedSongs, playSong, toggleShuffle } = usePlayer()
  const { user } = useAuth()

  const likedSongsData = queue.filter((song) => likedSongs.includes(song.id))

  const handlePlayAll = () => {
    if (likedSongsData.length > 0) {
      playSong(likedSongsData[0])
    }
  }

  const handleShufflePlay = () => {
    if (likedSongsData.length > 0) {
      toggleShuffle()
      playSong(likedSongsData[Math.floor(Math.random() * likedSongsData.length)])
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Liked Songs</h1>
        <p>Please log in to view your liked songs.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Liked Songs</h1>
        <div className="space-x-2">
          <Button onClick={handlePlayAll} disabled={likedSongsData.length === 0}>
            <Play className="mr-2 h-4 w-4" /> Play All
          </Button>
          <Button variant="outline" onClick={handleShufflePlay} disabled={likedSongsData.length === 0}>
            <Shuffle className="mr-2 h-4 w-4" /> Shuffle Play
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {likedSongsData.length > 0 ? (
          <SongList songs={likedSongsData} />
        ) : (
          <p className="text-center text-muted-foreground">You haven't liked any songs yet.</p>
        )}
      </ScrollArea>
    </div>
  )
}

export default LikedSongs

