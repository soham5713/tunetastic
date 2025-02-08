export const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = Math.floor(durationInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
  
  // Add more formatting functions as needed
  
  