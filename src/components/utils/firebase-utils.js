import { db, storage } from "../../lib/firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export const createUserProfile = async (user, additionalData) => {
  if (!user) return

  const userRef = doc(db, "users", user.uid)
  const snapshot = await getDoc(userRef)

  if (!snapshot.exists()) {
    const { email } = user
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.error("Error creating user", error.message)
    }
  }

  return userRef
}

export const uploadSong = async (file, userId) => {
  const storageRef = ref(storage, `songs/${userId}/${file.name}`)
  await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(storageRef)
  return downloadURL
}

// Add more Firebase utility functions as needed

