import { usePlayer } from "../hooks/usePlayer"

const Controls = () => {
  const { isPlaying, togglePlay, nextSong, previousSong } = usePlayer()

  return (
    <div>
      <button onClick={previousSong}>Previous</button>
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={nextSong}>Next</button>
    </div>
  )
}

export default Controls

