import { useAuth } from "../hooks/useAuth"

const Profile = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          {/* Add more user details here */}
        </div>
      )}
    </div>
  )
}

export default Profile

