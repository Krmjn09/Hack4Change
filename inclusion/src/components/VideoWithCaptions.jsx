import React, { useState } from "react"

const VideoWithCaptions = () => {
  const [captions, setCaptions] = useState([
    "Welcome to the video.",
    "Here we discuss accessibility features.",
    "Thank you for watching!",
  ])
  const [currentCaption, setCurrentCaption] = useState("")

  // Simulate real-time captioning
  const simulateCaptioning = () => {
    let index = 0
    const interval = setInterval(() => {
      if (index < captions.length) {
        setCurrentCaption(captions[index])
        index++
      } else {
        clearInterval(interval)
      }
    }, 3000) // Change caption every 3 seconds
  }

  React.useEffect(() => {
    simulateCaptioning()
  }, [])

  return (
    <div style={{ position: "relative" }}>
      <video width="600" controls>
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {currentCaption}
      </div>
    </div>
  )
}

export default VideoWithCaptions
