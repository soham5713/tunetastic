import { useParams } from "react-router-dom"
import SongList from "../music/SongList"

const Playlist = () => {
  const { id } = useParams()
  // Fetch playlist data using the id
  const playlist = { name: "Sample Playlist", songs: [] } // Replace with actual data fetching

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{playlist.name}</h1>
      <SongList songs={playlist.songs} />
    </div>
  )
}

export default Playlist

