import { useAuth } from "../hooks/useAuth"
import { usePlayer } from "../hooks/usePlayer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { PlayIcon } from "lucide-react"

const Home = () => {
  const { user } = useAuth()
  const { queue, playSong } = usePlayer()

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
      </section>
    </div>
  )
}

export default Home

