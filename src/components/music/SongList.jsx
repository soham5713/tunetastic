"use client"

import { useState } from "react"
import { usePlayer } from "../hooks/usePlayer"
import { usePlaylists } from "../hooks/usePlaylists"
import { Button } from "@/components/ui/button"
import { PlayIcon, Heart, MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AddToPlaylistDialog from "../dialogs/AddToPlaylistDialog"

const SongList = ({ songs }) => {
  const { playSong, toggleLike, isLiked } = usePlayer()
  const { addSongToPlaylist } = usePlaylists()
  const [isAddToPlaylistOpen, setIsAddToPlaylistOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState(null)

  const handleAddToPlaylist = (song) => {
    setSelectedSong(song)
    setIsAddToPlaylistOpen(true)
  }

  return (
    <div className="space-y-2">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center justify-between p-2 hover:bg-accent rounded-md">
          <div className="flex items-center space-x-3">
            <img
              src={song.coverUrl || "/placeholder.svg?height=40&width=40"}
              alt={song.title}
              className="w-10 h-10 rounded-md"
            />
            <div>
              <p className="font-medium">{song.title}</p>
              <p className="text-sm text-muted-foreground">{song.artist}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => toggleLike(song.id)}>
              <Heart className={isLiked(song.id) ? "fill-primary" : ""} size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => playSong(song)}>
              <PlayIcon size={20} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAddToPlaylist(song)}>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Add to Playlist</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
      <AddToPlaylistDialog
        isOpen={isAddToPlaylistOpen}
        onClose={() => setIsAddToPlaylistOpen(false)}
        song={selectedSong}
        onAddToPlaylist={addSongToPlaylist}
      />
    </div>
  )
}

export default SongList

