"use client"

import { useState } from "react"
import SongList from "../music/SongList"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    // Implement search logic here
    // For now, we'll just set some dummy results
    setSearchResults([
      { id: 1, title: "Song 1", artist: "Artist 1" },
      { id: 2, title: "Song 2", artist: "Artist 2" },
    ])
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for songs, artists, or albums"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 bg-primary text-primary-foreground px-4 py-2 rounded">
          Search
        </button>
      </form>
      <SongList songs={searchResults} />
    </div>
  )
}

export default Search

