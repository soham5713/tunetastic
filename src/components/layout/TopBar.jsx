import { useAuth } from "../hooks/useAuth"
import ThemeToggle from "../shared/ThemeToggle"
import { Link } from "react-router-dom"

const TopBar = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-card text-card-foreground p-4 flex justify-between items-center">
      <div>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button
              onClick={logout}
              className="ml-4 px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
      <ThemeToggle />
    </header>
  )
}

export default TopBar

