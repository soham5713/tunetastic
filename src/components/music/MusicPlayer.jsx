"use client"

import { usePlayer } from "../hooks/usePlayer"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  PlusCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { usePlaylists } from "../hooks/usePlaylists"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    progress,
    duration,
    volume,
    shuffle,
    repeat,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    setProgressManually,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
    isLiked,
  } = usePlayer()
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false)
  const { addSongToPlaylist } = usePlaylists()

  const handleAddToPlaylist = (playlistId) => {
    addSongToPlaylist(playlistId, currentSong)
    setIsAddToPlaylistOpen(false)
  }

  if (!currentSong) return null

  return (
    <div className="bg-card text-card-foreground p-4 border-t fixed bottom-0 left-0 right-0">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 w-full md:w-1/4">
          <img
            src={currentSong.coverUrl || "/placeholder.svg"}
            alt={currentSong.title}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div>
            <h3 className="font-semibold truncate">{currentSong.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => toggleLike(currentSong.id)} className="ml-2">
            <Heart className={cn("h-4 w-4", isLiked(currentSong.id) && "fill-primary")} />
          </Button>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/2">
          <div className="flex items-center space-x-4 mb-2">
            <Toggle
              pressed={shuffle}
              onPressedChange={toggleShuffle}
              aria-label="Toggle shuffle"
              className={cn("text-muted-foreground", shuffle && "text-primary")}
            >
              <Shuffle size={20} />
            </Toggle>
            <Button variant="ghost" size="icon" onClick={previousSong}>
              <SkipBack size={20} />
            </Button>
            <Button variant="default" size="icon" onClick={togglePlay}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={nextSong}>
              <SkipForward size={20} />
            </Button>
            <Toggle
              pressed={repeat !== "off"}
              onPressedChange={toggleRepeat}
              aria-label="Toggle repeat"
              className={cn("text-muted-foreground", repeat !== "off" && "text-primary")}
            >
              {repeat === "one" ? <Repeat1 size={20} /> : <Repeat size={20} />}
            </Toggle>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <span className="text-sm">{formatTime(progress)}</span>
            <Slider
              value={[progress]}
              max={duration}
              step={1}
              onValueChange={([value]) => setProgressManually(value)}
              className="w-full"
            />
            <span className="text-sm">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-1/4 justify-end">
          <div className="flex items-center space-x-2">
            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={([value]) => setVolume(value)}
              className="w-24"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsAddToPlaylistOpen(true)}>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Playlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer

