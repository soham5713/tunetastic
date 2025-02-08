import { Link } from "react-router-dom"

const SideNav = () => {
  return (
    <nav className="w-64 bg-card text-card-foreground p-4">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/library">Your Library</Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideNav

