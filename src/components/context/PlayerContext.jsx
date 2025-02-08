"use client"

import { createContext, useState, useRef, useEffect, useCallback } from "react"
import { songs } from "../../data/songs"
import { useAuth } from "../hooks/useAuth"
import { db } from "../../lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

export const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [queue, setQueue] = useState(songs)
  const [shuffledQueue, setShuffledQueue] = useState([])
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [error, setError] = useState(null)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState("off") // 'off', 'all', 'one'

  const audioRef = useRef(new Audio())
  const { user } = useAuth()

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
    const handleEnded = () => {
      if (repeat === "one") {
        audio.currentTime = 0
        audio.play()
      } else {
        nextSong()
      }
    }
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
  }, [repeat])

  const shuffleArray = useCallback((array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  useEffect(() => {
    if (shuffle) {
      setShuffledQueue(shuffleArray(queue))
    } else {
      setShuffledQueue([])
    }
  }, [shuffle, queue, shuffleArray])

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, `users/${user.uid}`))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setVolume(userData.volume || 1)
          setShuffle(userData.shuffle || false)
          setRepeat(userData.repeat || "off")
        }
      } else {
        const localVolume = Number.parseFloat(localStorage.getItem("volume") || "1")
        const localShuffle = localStorage.getItem("shuffle") === "true"
        const localRepeat = localStorage.getItem("repeat") || "off"
        setVolume(localVolume)
        setShuffle(localShuffle)
        setRepeat(localRepeat)
      }
    }

    loadUserData()
  }, [user])

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

  const getNextSong = useCallback(() => {
    if (!queue.length) return null
    const currentQueue = shuffle ? shuffledQueue : queue
    const currentIndex = currentQueue.findIndex((song) => song.id === currentSong?.id)
    if (currentIndex === -1) return currentQueue[0]
    return currentQueue[(currentIndex + 1) % currentQueue.length]
  }, [queue, shuffledQueue, currentSong, shuffle])

  const nextSong = useCallback(() => {
    const nextSong = getNextSong()
    if (nextSong) playSong(nextSong)
  }, [getNextSong, playSong])

  const previousSong = useCallback(() => {
    if (!queue.length) return
    const currentQueue = shuffle ? shuffledQueue : queue
    const currentIndex = currentQueue.findIndex((song) => song.id === currentSong?.id)
    if (currentIndex === -1) return playSong(currentQueue[0])
    const previousIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length
    playSong(currentQueue[previousIndex])
  }, [queue, shuffledQueue, currentSong, shuffle, playSong])

  const setProgressManually = useCallback((value) => {
    if (!audioRef.current.duration) return
    audioRef.current.currentTime = value
    setProgress(value)
  }, [])

  const setVolumeAndSave = (newVolume) => {
    setVolume(newVolume)
    if (user) {
      setDoc(doc(db, `users/${user.uid}`), { volume: newVolume }, { merge: true })
    } else {
      localStorage.setItem("volume", newVolume.toString())
    }
  }

  const toggleShuffleAndSave = () => {
    const newShuffle = !shuffle
    setShuffle(newShuffle)
    if (user) {
      setDoc(doc(db, `users/${user.uid}`), { shuffle: newShuffle }, { merge: true })
    } else {
      localStorage.setItem("shuffle", newShuffle.toString())
    }
  }

  const toggleRepeatAndSave = () => {
    const newRepeat = repeat === "off" ? "all" : repeat === "all" ? "one" : "off"
    setRepeat(newRepeat)
    if (user) {
      setDoc(doc(db, `users/${user.uid}`), { repeat: newRepeat }, { merge: true })
    } else {
      localStorage.setItem("repeat", newRepeat)
    }
  }

  const value = {
    currentSong,
    isPlaying,
    queue,
    progress,
    duration,
    volume,
    error,
    shuffle,
    repeat,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    setVolume: setVolumeAndSave,
    setProgressManually,
    toggleShuffle: toggleShuffleAndSave,
    toggleRepeat: toggleRepeatAndSave,
  }

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

