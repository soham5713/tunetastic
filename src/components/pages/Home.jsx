"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { usePlayer } from "../hooks/usePlayer"
import { usePlaylists } from "../hooks/usePlaylists"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom"
import { Play, Pause } from "lucide-react"

const Home = () => {
  const { user } = useAuth()
  const { recentlyPlayed, currentSong, isPlaying, playSong, togglePlay } = usePlayer()
  const { playlists } = usePlaylists()
  const [topPlaylists, setTopPlaylists] = useState([])
  const [suggestedSongs, setSuggestedSongs] = useState([])

  useEffect(() => {
    // Simulating fetching top playlists
    setTopPlaylists(playlists.slice(0, 3))

    // Simulating fetching suggested songs
    setSuggestedSongs(recentlyPlayed.slice(0, 5))
  }, [playlists, recentlyPlayed])

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
    <div className="space-y-8 p-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Welcome to Tunetastic</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {user ? (
            <p className="text-xl text-muted-foreground">Hello, {user.email}! Ready to groove?</p>
          ) : (
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground">Discover and enjoy your favorite music</p>
              <div className="space-x-4">
                <Button asChild variant="default">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyPlayed.map(renderSongCard)}
          </div>
        </ScrollArea>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Top Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topPlaylists.map((playlist) => (
            <Card key={playlist.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <Link to={`/playlist/${playlist.id}`} className="flex items-center space-x-4">
                  <img
                    src={playlist.songs[0]?.coverUrl || "/placeholder.svg"}
                    alt={playlist.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground">{playlist.songs.length} songs</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Suggested for You</h2>
        <ScrollArea className="h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestedSongs.map(renderSongCard)}
          </div>
        </ScrollArea>
      </section>
    </div>
  )
}

export default Home

