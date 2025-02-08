"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlaylists } from "../hooks/usePlaylists"
import { usePlayer } from "../hooks/usePlayer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus } from "lucide-react"
import SongCard from "../music/SongCard"

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSongs, setSelectedSongs] = useState([])
  const { createPlaylist } = usePlaylists()
  const { queue } = usePlayer()
  const navigate = useNavigate()

  const filteredSongs = queue.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreatePlaylist = () => {
    if (playlistName && selectedSongs.length > 0) {
      const newPlaylist = createPlaylist(playlistName, selectedSongs)
      navigate(`/playlist/${newPlaylist.id}`)
    }
  }

  const toggleSongSelection = (song) => {
    setSelectedSongs((prev) =>
      prev.some((s) => s.id === song.id) ? prev.filter((s) => s.id !== song.id) : [...prev, song],
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create New Playlist</h1>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="max-w-md"
        />
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search songs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              isSelected={selectedSongs.some((s) => s.id === song.id)}
              onToggle={() => toggleSongSelection(song)}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-end">
        <Button onClick={handleCreatePlaylist} disabled={!playlistName || selectedSongs.length === 0}>
          <Plus className="mr-2 h-4 w-4" /> Create Playlist
        </Button>
      </div>
    </div>
  )
}

export default CreatePlaylist

