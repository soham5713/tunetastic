"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSearch } from "../hooks/useSearch"
import { usePlayer } from "../hooks/usePlayer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause } from "lucide-react"

const Search = () => {
  const location = useLocation()
  const { searchResults, isSearching, performSearch } = useSearch()
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get("q")
    if (query) {
      setSearchTerm(query)
      performSearch(query)
    }
  }, [location.search, performSearch])

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(searchTerm)
  }

  const renderSongCard = (song) => (
    <Card key={song.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <img
            src={song.coverUrl || "/placeholder.svg"}
            alt={song.title}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="flex-grow overflow-hidden">
            <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => (currentSong?.id === song.id ? togglePlay() : playSong(song))}
            className="text-primary hover:text-primary-foreground hover:bg-primary"
          >
            {currentSong?.id === song.id && isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Search for songs, artists, or albums"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>

      {isSearching ? (
        <p>Searching...</p>
      ) : searchResults.length > 0 ? (
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="albums">Albums</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map(renderSongCard)}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="songs">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.filter((result) => result.type === "song").map(renderSongCard)}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="artists">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults
                  .filter((result) => result.type === "artist")
                  .map((artist) => (
                    <Card key={artist.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={artist.imageUrl || "/placeholder.svg"}
                            alt={artist.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{artist.name}</h3>
                            <p className="text-sm text-muted-foreground">{artist.genre}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="albums">
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults
                  .filter((result) => result.type === "album")
                  .map((album) => (
                    <Card key={album.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={album.coverUrl || "/placeholder.svg"}
                            alt={album.title}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{album.title}</h3>
                            <p className="text-sm text-muted-foreground">{album.artist}</p>
                            <p className="text-xs text-muted-foreground">{album.year}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      ) : (
        searchTerm && <p>No results found.</p>
      )}
    </div>
  )
}

export default Search

