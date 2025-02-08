"use client"

import { createContext, useState, useRef, useEffect, useCallback } from "react"
import { songs } from "../../data/songs"

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [queue, setQueue] = useState(songs)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState(null)

  const audioRef = useRef(new Audio())

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error)
        setError("Failed to play the song. Please try again.")
      })
      setIsPlaying(true)
    }
  }, [currentSong])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current

    const updateProgress = () => setProgress(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => nextSong()
    const handleError = (e) => {
      console.error("Audio error:", e)
      setError("An error occurred while playing the song.")
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [])

  const playSong = useCallback((song) => {
    setCurrentSong(song)
    setError(null)
  }, [])

  const togglePlay = useCallback(() => {
    if (!currentSong) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback failed:", error)
        setError("Failed to play the song. Please try again.")
      })
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, currentSong])

  const nextSong = useCallback(() => {
    if (!queue.length) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong?.id)
    if (currentIndex < queue.length - 1) {
      playSong(queue[currentIndex + 1])
    } else {
      playSong(queue[0]) // Loop back to the first song
    }
  }, [queue, currentSong, playSong])

  const previousSong = useCallback(() => {
    if (!queue.length) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong?.id)
    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1])
    } else {
      playSong(queue[queue.length - 1]) // Go to the last song if at the beginning
    }
  }, [queue, currentSong, playSong])

  const setProgressManually = useCallback((value) => {
    if (!audioRef.current.duration) return
    audioRef.current.currentTime = value
    setProgress(value)
  }, [])

  const value = {
    currentSong,
    isPlaying,
    queue,
    progress,
    duration,
    volume,
    error,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    setVolume,
    setProgressManually,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

