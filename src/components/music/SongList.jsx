"use client"

import { usePlayer } from "../hooks/usePlayer"
import { usePlaylists } from "../hooks/usePlaylists"
import { Button } from "@/components/ui/button"
import { PlayIcon, Heart, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AddToPlaylistDialog from "../dialogs/AddToPlaylistDialog"
import { motion, AnimatePresence } from "framer-motion"

const SongList = ({ songs }) => {
  const { playSong, toggleLike, isLiked } = usePlayer()
  const { addSongToPlaylist } = usePlaylists()

  const handleAddToPlaylist = (playlistId, song) => {
    addSongToPlaylist(playlistId, song)
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {songs.map((song) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between p-2 hover:bg-accent rounded-md"
          >
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
                  <DropdownMenuItem>
                    <AddToPlaylistDialog song={song} onAddToPlaylist={handleAddToPlaylist} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default SongList
