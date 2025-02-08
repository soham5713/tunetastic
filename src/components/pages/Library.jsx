"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()

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
    const newPlaylist = createPlaylist(name)
    setIsCreatePlaylistOpen(false)
    navigate(`/playlist/${newPlaylist.id}`)
  }

  const handleTabChange = (value) => {
    if (value === "liked") {
      navigate("/liked-songs")
    } else if (value === "songs") {
      navigate("/all-songs")
    }
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

      <Tabs defaultValue="playlists" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="justify-center">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="liked">Liked Songs</TabsTrigger>
          <TabsTrigger value="songs">All Songs</TabsTrigger>
        </TabsList>
        <TabsContent value="playlists">
          <ScrollArea className="h-[calc(100vh-300px)]">
            {filteredPlaylists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} onEdit={editPlaylist} onDelete={deletePlaylist} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No playlists found. Create a new playlist to get started!
              </p>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="liked">
          <ScrollArea className="h-[calc(100vh-300px)]">
            {likedSongsData.length > 0 ? (
              <SongList songs={likedSongsData} />
            ) : (
              <p className="text-center text-muted-foreground">
                No liked songs yet. Start liking songs to see them here!
              </p>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="songs">
          <ScrollArea className="h-[calc(100vh-300px)]">
            {filteredSongs.length > 0 ? (
              <SongList songs={filteredSongs} />
            ) : (
              <p className="text-center text-muted-foreground">No songs found. Add some songs to your library!</p>
            )}
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

