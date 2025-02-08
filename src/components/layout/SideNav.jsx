"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Home, Search, Library, Heart, Disc3, ChevronLeft, ChevronRight, Music, PlusCircle } from "lucide-react"
import { usePlaylists } from "../hooks/usePlaylists"

const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { playlists, createPlaylist } = usePlaylists()
  const navigate = useNavigate()

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: Library, label: "Your Library", path: "/library" },
  ]

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  const handleCreatePlaylist = () => {
    navigate("/create-playlist")
  }

  const NavItem = ({ icon: Icon, label, path }) => (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            to={path}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
              location.pathname === path
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-accent hover:text-accent-foreground",
              collapsed ? "justify-center" : "justify-start",
            )}
          >
            <Icon size={22} />
            {!collapsed && <span className="font-medium">{label}</span>}
          </Link>
        </TooltipTrigger>
        {collapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card text-card-foreground border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Music size={24} className="text-primary" />
            <h2 className="text-xl font-bold">Tunetastic</h2>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleCollapse} className="ml-auto">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      <ScrollArea className="flex-grow px-2">
        <nav className="space-y-1 py-2">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>
        <Separator className="my-4" />
        <div className="space-y-4 py-2">
          <NavItem icon={PlusCircle} label="Create Playlist" path="/create-playlist" />
          <NavItem icon={Heart} label="Liked Songs" path="/liked-songs" />
        </div>
        <Separator className="my-4" />
        <div className="space-y-1 py-2">
          {playlists.map((playlist) => (
            <TooltipProvider key={playlist.id}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={`/playlist/${playlist.id}`}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      location.pathname === `/playlist/${playlist.id}`
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50 hover:text-accent-foreground",
                      collapsed ? "justify-center" : "justify-start",
                    )}
                  >
                    <Disc3 size={22} />
                    {!collapsed && <span className="font-medium truncate">{playlist.name}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{playlist.name}</TooltipContent>}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default SideNav

