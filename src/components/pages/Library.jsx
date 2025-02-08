import { usePlaylists } from "../hooks/usePlaylists"
import PlaylistCard from "../music/PlaylistCard"

const Library = () => {
  const playlists = usePlaylists()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}

export default Library

