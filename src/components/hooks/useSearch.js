import { useState, useCallback } from "react"
import { db } from "../../lib/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const performSearch = useCallback(async (searchTerm) => {
    setIsSearching(true)
    const lowercasedQuery = searchTerm.toLowerCase()

    try {
      const songsQuery = query(collection(db, "songs"), where("searchTerms", "array-contains", lowercasedQuery))

      const querySnapshot = await getDocs(songsQuery)
      const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      setSearchResults(results)
    } catch (error) {
      console.error("Error searching songs:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  return { searchResults, isSearching, performSearch }
}

