"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePlaylists } from "../hooks/usePlaylists"
import { usePlayer } from "../hooks/usePlayer"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import PlaylistCard from "../music/PlaylistCard"
import SongList from "../music/SongList"
import CreatePlaylistDialog from "../dialogs/CreatePlaylistDialog"

const Library = () => {
  const { playlists, createPlaylist, editPlaylist, deletePlaylist } = usePlaylists()
  const { queue, likedSongs } = usePlayer()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
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
    navigate(`/playlist/${newPlaylist.id}`)
  }

  const filterSongs = (songs) => {
    switch (filter) {
      case "recent":
        return [...songs].sort((a, b) => b.lastPlayed - a.lastPlayed)
      case "alphabetical":
        return [...songs].sort((a, b) => a.title.localeCompare(b.title))
      default:
        return songs
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <CreatePlaylistDialog onCreatePlaylist={handleCreatePlaylist} />
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search your library"
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="justify-start">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="liked">Liked Songs</TabsTrigger>
          <TabsTrigger value="songs">All Songs</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <select
            className="bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="recent">Recently Played</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
        <TabsContent value="playlists">
          <ScrollArea className="h-[calc(100vh-300px)]">
            {filteredPlaylists.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredPlaylists.map((playlist) => (
                  <PlaylistCard key={playlist.id} playlist={playlist} onEdit={editPlaylist} onDelete={deletePlaylist} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-muted-foreground mb-4">
                    No playlists found. Create a new playlist to get started!
                  </p>
                  <CreatePlaylistDialog onCreatePlaylist={handleCreatePlaylist} />
                </CardContent>
              </Card>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="liked">
          <ScrollArea className="h-[calc(100vh-300px)]">
            {likedSongsData.length > 0 ? (
              <SongList songs={filterSongs(likedSongsData)} />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-40 text-center">
                  <p className="text-muted-foreground">No liked songs yet. Start liking songs to see them here!</p>
                </CardContent>
              </Card>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="songs">
          <ScrollArea className="h-[calc(100vh-300px)]">
            {filteredSongs.length > 0 ? (
              <SongList songs={filterSongs(filteredSongs)} />
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-40 text-center">
                  <p className="text-muted-foreground">No songs found. Add some songs to your library!</p>
                </CardContent>
              </Card>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Library

