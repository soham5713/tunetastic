import SideNav from "./SideNav"
import TopBar from "./TopBar"
import MusicPlayer from "../music/MusicPlayer"

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <SideNav />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
        <MusicPlayer />
      </div>
    </div>
  )
}

export default Layout

