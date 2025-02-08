"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePlaylists } from "../hooks/usePlaylists"

const AddToPlaylistDialog = ({ isOpen, onClose, song, onAddToPlaylist }) => {
  const { playlists } = usePlaylists()
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedPlaylistId) {
      onAddToPlaylist(selectedPlaylistId, song)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Playlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Select value={selectedPlaylistId} onValueChange={setSelectedPlaylistId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a playlist" />
            </SelectTrigger>
            <SelectContent>
              {playlists.map((playlist) => (
                <SelectItem key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={!selectedPlaylistId}>
              Add to Playlist
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddToPlaylistDialog

