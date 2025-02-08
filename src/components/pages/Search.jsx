"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSearch } from "../hooks/useSearch"
import { usePlayer } from "../hooks/usePlayer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"

const Search = () => {
  const location = useLocation()
  const { searchResults, isSearching, performSearch } = useSearch()
  const { playSong } = usePlayer()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get("q")
    if (query) {
      performSearch(query)
    }
  }, [location.search, performSearch])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Search Results</h1>
      {isSearching ? (
        <p>Searching...</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((song) => (
            <Card key={song.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <img
                    src={song.coverUrl || "/placeholder.svg"}
                    alt={song.title}
                    className="w-12 h-12 rounded-md mr-3"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground">{song.title}</h3>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => playSong(song)}
                    className="text-primary hover:text-primary-foreground hover:bg-primary"
                  >
                    <PlayIcon size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default Search

