"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Home, Search, Library, PlusCircle, Heart, Disc3, ChevronLeft, ChevronRight } from "lucide-react"
import { usePlaylists } from "../hooks/usePlaylists"

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { playlists, createPlaylist } = usePlaylists()

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Library, label: "Your Library", path: "/library" },
  ]

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleCreatePlaylist = () => {
    const playlistName = prompt("Enter playlist name:")
    if (playlistName) {
      createPlaylist(playlistName)
    }
  }

  return (
    <div
      style={{ transition: "width 0.3s ease" }}
      className={cn("flex flex-col h-screen bg-background border-r border-border", collapsed ? "w-16" : "w-64")}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h2 className="text-lg font-semibold">Tunetastic</h2>}
        <Button variant="ghost" size="icon" onClick={toggleCollapse}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="space-y-2 p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <Separator className="my-4" />
        <div className="space-y-4 p-2">
          <Button variant="ghost" className="w-full justify-start" onClick={handleCreatePlaylist} disabled={collapsed}>
            <PlusCircle size={20} className="mr-2" />
            {!collapsed && "Create Playlist"}
          </Button>
          <Button variant="ghost" className="w-full justify-start" disabled={collapsed}>
            <Heart size={20} className="mr-2" />
            {!collapsed && "Liked Songs"}
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2 p-2">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/${playlist.id}`}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                location.pathname === `/playlist/${playlist.id}`
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              <Disc3 size={20} />
              {!collapsed && <span className="truncate">{playlist.name}</span>}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default SideNav

