"use client"

import { usePlayer } from "../hooks/usePlayer"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

const MusicPlayer = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    previousSong,
    progress,
    duration,
    volume,
    setVolume,
    setProgress,
  } = usePlayer()

  if (!currentSong) return null

  return (
    <div className="bg-card text-card-foreground p-4 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentSong.coverUrl || "/placeholder.svg"}
            alt={currentSong.title}
            className="w-12 h-12 rounded-md"
          />
          <div>
            <h3 className="font-semibold">{currentSong.title}</h3>
            <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={previousSong}>
            <SkipBack size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextSong}>
            <SkipForward size={20} />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Volume2 size={20} />
          <Slider value={[volume]} max={1} step={0.01} onValueChange={([value]) => setVolume(value)} className="w-24" />
        </div>
      </div>
      <Slider
        value={[progress]}
        max={duration}
        step={1}
        onValueChange={([value]) => setProgress(value)}
        className="mt-4"
      />
    </div>
  )
}

export default MusicPlayer

