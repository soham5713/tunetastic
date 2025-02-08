import { useAuth } from "../hooks/useAuth"
import { usePlaylists } from "../hooks/usePlaylists"
import FeaturedPlaylists from "../music/FeaturedPlaylists"
import RecentlyPlayed from "../music/RecentlyPlayed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

const Home = () => {
  const { user } = useAuth()
  const playlists = usePlaylists()

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

      {user && (
        <>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Featured Playlists</h2>
            <FeaturedPlaylists playlists={playlists.slice(0, 4)} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Recently Played</h2>
            <RecentlyPlayed />
          </section>
        </>
      )}
    </div>
  )
}

export default Home
