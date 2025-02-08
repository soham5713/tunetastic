"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import SideNav from "./SideNav"
import TopBar from "./TopBar"
import MusicPlayer from "../music/MusicPlayer"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <SideNav />
      </div>
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0">
          <SideNav />
        </SheetContent>
      </Sheet>
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
        </TopBar>
        <ScrollArea className="flex-1">
          <main className="p-4 pb-20">{children}</main>
        </ScrollArea>
        <MusicPlayer />
      </div>
    </div>
  )
}

export default Layout

