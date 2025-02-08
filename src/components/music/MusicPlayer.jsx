"use client"
import { usePlayer } from "../hooks/usePlayer"
import { usePlaylists } from "../hooks/usePlaylists"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  const { playlists, addSongToPlaylist } = usePlaylists()

  const handleAddToPlaylist = (playlistId) => {
    if (currentSong) {
      addSongToPlaylist(playlistId, currentSong)
    }
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
          <div className="overflow-hidden">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="font-semibold truncate">{currentSong.title}</h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{currentSong.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{currentSong.artist}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <PlusCircle className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist.id}
                    onSelect={() => handleAddToPlaylist(playlist.id)}
                    className={cn(
                      playlist.songs.some((song) => song.id === currentSong.id) && "bg-accent text-accent-foreground",
                    )}
                  >
                    {playlist.name}
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No playlists available</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer

