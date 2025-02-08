"use client"

import { useState } from "react"
import { usePlaylists } from "../hooks/usePlaylists"
import { usePlayer } from "../hooks/usePlayer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Search } from "lucide-react"
import PlaylistCard from "../music/PlaylistCard"
import SongList from "../music/SongList"
import CreatePlaylistDialog from "../dialogs/CreatePlaylistDialog"

const Library = () => {
  const { playlists, createPlaylist, editPlaylist, deletePlaylist } = usePlaylists()
  const { queue, likedSongs } = usePlayer()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false)

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSongs = queue.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const likedSongsData = queue.filter((song) => likedSongs.includes(song.id))

  const handleCreatePlaylist = (name) => {
    createPlaylist(name)
    setIsCreatePlaylistOpen(false)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <Button onClick={() => setIsCreatePlaylistOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
        </Button>
      </div>

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search your library"
          className="pl-10 pr-4 py-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="justify-center">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="liked">Liked Songs</TabsTrigger>
          <TabsTrigger value="songs">All Songs</TabsTrigger>
        </TabsList>
        <TabsContent value="playlists">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} onEdit={editPlaylist} onDelete={deletePlaylist} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="liked">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <SongList songs={likedSongsData} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="songs">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <SongList songs={filteredSongs} />
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <CreatePlaylistDialog
        isOpen={isCreatePlaylistOpen}
        onClose={() => setIsCreatePlaylistOpen(false)}
        onCreatePlaylist={handleCreatePlaylist}
      />
    </div>
  )
}

export default Library

