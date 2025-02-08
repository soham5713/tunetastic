import { useAuth } from "../hooks/useAuth"
import { usePlayer } from "../hooks/usePlayer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Play, Pause } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Home = () => {
  const { user } = useAuth()
  const { queue, playSong, currentSong, isPlaying, togglePlay } = usePlayer()

  return (
    <div className="space-y-8 p-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Welcome to Tunetastic</CardTitle>
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
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Available Songs</h2>
        {queue.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {queue.map((song) => (
              <Card key={song.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <img
                      src={song.coverUrl || "/placeholder.svg"}
                      alt={song.title}
                      className="w-12 h-12 rounded-md mr-3"
                    />
                    <div className="flex-grow">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <h3 className="font-semibold text-foreground truncate">{song.title}</h3>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{song.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{song.artist}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
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
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            What do you want to play? Don't have any songs? Add some to your library!
          </p>
        )}
      </section>
    </div>
  )
}

export default Home

