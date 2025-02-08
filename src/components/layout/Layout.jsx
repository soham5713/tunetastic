import { ScrollArea } from "@/components/ui/scroll-area"
import SideNav from "./SideNav"
import TopBar from "./TopBar"
import MusicPlayer from "../music/MusicPlayer"

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <SideNav />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <ScrollArea className="flex-1">
          <main className="p-4 pb-20">{children}</main>
        </ScrollArea>
        <MusicPlayer />
      </div>
    </div>
  )
}

export default Layout

