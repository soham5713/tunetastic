import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

const FeaturedPlaylists = ({ playlists }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {playlists.map((playlist) => (
        <Card key={playlist.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="p-0">
            <img
              src={playlist.coverUrl || "/placeholder.svg?height=100&width=100"}
              alt={playlist.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="p-4">
            <Link to={`/playlist/${playlist.id}`} className="block">
              <CardTitle className="text-lg font-semibold text-foreground">{playlist.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{playlist.songCount} songs</p>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default FeaturedPlaylists

