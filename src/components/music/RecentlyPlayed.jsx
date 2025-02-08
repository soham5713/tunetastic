import { usePlayer } from "../hooks/usePlayer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"

const RecentlyPlayed = () => {
  const { playSong } = usePlayer()

  // This is a mock data. In a real application, you would fetch this from your backend
  const recentSongs = [
    { id: 1, title: "Song 1", artist: "Artist 1", albumCover: "/placeholder.svg?height=50&width=50" },
    { id: 2, title: "Song 2", artist: "Artist 2", albumCover: "/placeholder.svg?height=50&width=50" },
    { id: 3, title: "Song 3", artist: "Artist 3", albumCover: "/placeholder.svg?height=50&width=50" },
    { id: 4, title: "Song 4", artist: "Artist 4", albumCover: "/placeholder.svg?height=50&width=50" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {recentSongs.map((song) => (
        <Card key={song.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center">
              <img src={song.albumCover || "/placeholder.svg"} alt={song.title} className="w-12 h-12 rounded-md mr-3" />
              <div className="flex-grow">
                <h3 className="font-semibold text-foreground">{song.title}</h3>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => playSong(song)}
                className="text-primary hover:text-primary-foreground hover:bg-primary"
              >
                <PlayIcon size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default RecentlyPlayed

