"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"
import { useSearch } from "../hooks/useSearch"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, User, LogOut, Sun, Moon } from "lucide-react"

const TopBar = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { performSearch } = useSearch()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    performSearch(searchQuery)
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border flex justify-between items-center p-4 h-16">
      <Link to="/" className="text-2xl font-bold text-primary">
        Tunetastic
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for songs, artists, or albums"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-accent/50 focus:bg-accent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
      </form>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL} alt={user.email} />
                  <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

export default TopBar

