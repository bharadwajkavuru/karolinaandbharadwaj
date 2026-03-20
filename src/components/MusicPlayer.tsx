"use client"

import { useEffect, useRef, useState } from "react"

export default function MusicPlayer() {

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {

    const audio = audioRef.current
    if (!audio) return

    // try autoplay (will fail on iPhone)
    audio.play().then(() => {
      audio.volume = 0.3
      setIsPlaying(true)
    }).catch(() => {
      setIsPlaying(false)
    })

  }, [])

  const toggleAudio = async () => {

    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      await audio.play()
      audio.volume = 0.3
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/ambient-flute.mp3" type="audio/mpeg" />
      </audio>

      {/* expose control globally */}
      <button
        id="music-toggle"
        onClick={toggleAudio}
        className="hidden"
      />

    </>
  )
}
