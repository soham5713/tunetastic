"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Pencil, Trash2, MoreVertical } from "lucide-react"
import EditPlaylistDialog from "../dialogs/EditPlaylistDialog"
import DeletePlaylistDialog from "../dialogs/DeletePlaylistDialog"

const PlaylistCard = ({ playlist, onEdit, onDelete }) => {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="p-0">
          <img
            src={playlist.coverUrl || "/placeholder.svg?height=100&width=100"}
            alt={playlist.name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold truncate">{playlist.name}</CardTitle>
              <CardDescription>{playlist.songCount} songs</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      <EditPlaylistDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onEdit={(newName) => {
          onEdit(playlist.id, newName)
          setIsEditOpen(false)
        }}
        initialName={playlist.name}
      />

      <DeletePlaylistDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={() => {
          onDelete(playlist.id)
          setIsDeleteOpen(false)
        }}
        playlistName={playlist.name}
      />
    </>
  )
}

export default PlaylistCard

