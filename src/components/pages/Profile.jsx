"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateProfile } from "firebase/auth"

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(user, { displayName })
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile", error)
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoURL} alt={user.displayName} />
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="max-w-xs"
                  />
                  <div>
                    <Button type="submit" className="mr-2">
                      Save
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{user.displayName || "No display name set"}</h2>
                  <Button onClick={() => setIsEditing(true)} variant="link" className="p-0">
                    Edit
                  </Button>
                </>
              )}
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <p>
              <strong>Member since:</strong> {user.metadata.creationTime}
            </p>
            <p>
              <strong>Last sign in:</strong> {user.metadata.lastSignInTime}
            </p>
          </div>
          <Button onClick={handleLogout} variant="destructive">
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile