"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlaylists } from "../hooks/usePlaylists"
import { usePlayer } from "../hooks/usePlayer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("")
  const [selectedSongs, setSelectedSongs] = useState([])
  const { createPlaylist } = usePlaylists()
  const { queue } = usePlayer()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleCreatePlaylist = async (e) => {
    e.preventDefault()
    if (playlistName.trim() && selectedSongs.length > 0) {
      const newPlaylist = await createPlaylist(playlistName, selectedSongs)
      toast({
        title: "Playlist created",
        description: `${playlistName} has been created with ${selectedSongs.length} songs.`,
      })
      navigate(`/playlist/${newPlaylist.id}`)
    } else {
      toast({
        title: "Error",
        description: "Please enter a playlist name and select at least one song.",
        variant: "destructive",
      })
    }
  }

  const toggleSongSelection = (song) => {
    setSelectedSongs((prev) =>
      prev.some((s) => s.id === song.id) ? prev.filter((s) => s.id !== song.id) : [...prev, song],
    )
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Playlist</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreatePlaylist} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playlist-name">Playlist Name</Label>
              <Input
                id="playlist-name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Select Songs</Label>
              <ScrollArea className="h-[400px] border rounded-md p-4">
                {queue.map((song) => (
                  <div key={song.id} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={song.id}
                      checked={selectedSongs.some((s) => s.id === song.id)}
                      onCheckedChange={() => toggleSongSelection(song)}
                    />
                    <Label htmlFor={song.id} className="flex items-center space-x-2 cursor-pointer">
                      <img
                        src={song.coverUrl || "/placeholder.svg"}
                        alt={song.title}
                        className="w-10 h-10 rounded-md"
                      />
                      <div>
                        <p className="font-medium">{song.title}</p>
                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </ScrollArea>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={!playlistName || selectedSongs.length === 0}>
                Create Playlist
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreatePlaylist

