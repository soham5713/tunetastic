"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePlaylists } from "../hooks/usePlaylists"

const AddToPlaylistDialog = ({ isOpen, onClose, song, onAddToPlaylist }) => {
  const { playlists } = usePlaylists()
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null)

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
          <ScrollArea className="h-[300px] pr-4">
            <RadioGroup value={selectedPlaylistId} onValueChange={setSelectedPlaylistId}>
              {playlists.map((playlist) => (
                <div key={playlist.id} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={playlist.id} id={`playlist-${playlist.id}`} />
                  <Label htmlFor={`playlist-${playlist.id}`}>{playlist.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </ScrollArea>
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

