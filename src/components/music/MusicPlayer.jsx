import { usePlayer } from "../hooks/usePlayer"
import Controls from "./Controls"

const MusicPlayer = () => {
  const { currentSong, isPlaying } = usePlayer()

  if (!currentSong) return null

  return (
    <div className="bg-card text-card-foreground p-4">
      <div>
        {currentSong.title} - {currentSong.artist}
      </div>
      <Controls />
    </div>
  )
}

export default MusicPlayer

