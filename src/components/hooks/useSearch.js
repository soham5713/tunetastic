"use client"

import { useState, useCallback } from "react"
import { songs } from "../../data/songs"

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const performSearch = useCallback((query) => {
    setIsSearching(true)
    const lowercasedQuery = query.toLowerCase()

    const results = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowercasedQuery) || song.artist.toLowerCase().includes(lowercasedQuery),
    )

    setSearchResults(results)
    setIsSearching(false)
  }, [])

  return { searchResults, isSearching, performSearch }
}

