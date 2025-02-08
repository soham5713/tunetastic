import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./components/context/AuthContext"
import { ThemeProvider } from "./components/context/ThemeContext"
import { PlayerProvider } from "./components/context/PlayerContext"
import Layout from "./components/layout/Layout"
import Home from "./components/pages/Home"
import Login from "./components/pages/Login"
import SignUp from "./components/pages/SignUp"
import Search from "./components/pages/Search"
import Library from "./components/pages/Library"
import Playlist from "./components/pages/Playlist"
import Profile from "./components/pages/Profile"
import CreatePlaylist from "./components/pages/CreatePlaylist"
import LikedSongs from "./components/pages/LikedSongs"

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <PlayerProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlist/:id" element={<Playlist />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-playlist" element={<CreatePlaylist />} />
                <Route path="/liked-songs" element={<LikedSongs />} />
              </Routes>
            </Layout>
          </PlayerProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

