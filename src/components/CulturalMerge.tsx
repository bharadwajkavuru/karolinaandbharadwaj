"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function CulturalMerge() {

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Desktop only animation
  const leftX = useTransform(scrollYProgress, [0.05, 0.65], ["0%", "-55%"])
  const rightX = useTransform(scrollYProgress, [0.05, 0.65], ["0%", "55%"])

  const textOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const textScale = useTransform(scrollYProgress, [0.25, 0.5], [0.95, 1])

  const [soundOn, setSoundOn] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const startAudio = () => {
      if (hasStarted.current) return
      if (!audioRef.current) return

      audioRef.current.volume = 0.25
      audioRef.current.play().catch(() => {})
      hasStarted.current = true
    }

    window.addEventListener("click", startAudio)
    window.addEventListener("touchstart", startAudio)

    return () => {
      window.removeEventListener("click", startAudio)
      window.removeEventListener("touchstart", startAudio)
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return
    soundOn ? audioRef.current.play().catch(() => {}) : audioRef.current.pause()
  }, [soundOn])

  return (

<section
  ref={ref}
  className="w-full relative bg-[#0f0d0b] overflow-hidden"
>

<audio ref={audioRef} loop src="/audio/ambient-flute.mp3" />

<button
  onClick={() => setSoundOn(!soundOn)}
  className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white text-sm flex items-center justify-center"
>
  {soundOn ? "🔊" : "🔈"}
</button>

{/* ✨ DESKTOP VERSION */}
{!isMobile && (
<>
  {/* Slovakia */}
  <motion.div
    style={{ x: leftX }}
    className="absolute left-0 top-0 w-1/2 h-screen flex items-center justify-center overflow-hidden"
  >
    <div
      className="absolute inset-0 bg-cover bg-center opacity-85"
      style={{ backgroundImage: "url('/culturalMerge/slovakia.jpg')" }}
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="text-center text-white relative z-10">
      <h2 className="text-4xl mb-4">Slovakia</h2>
      <p className="opacity-70">Mountains • Tradition • Heritage</p>
    </div>
  </motion.div>

  {/* India */}
  <motion.div
    style={{ x: rightX }}
    className="absolute right-0 top-0 w-1/2 h-screen flex items-center justify-center overflow-hidden"
  >
    <div
      className="absolute inset-0 bg-cover bg-center opacity-90"
      style={{ backgroundImage: "url('/culturalMerge/india.jpg')" }}
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="text-center text-white relative z-10">
      <h2 className="text-4xl mb-4">India</h2>
      <p className="opacity-80">Colors • Celebration • Culture</p>
    </div>
  </motion.div>

  {/* Center Text */}
  <motion.div
    style={{ opacity: textOpacity, scale: textScale }}
    className="absolute inset-0 flex items-center justify-center text-center"
  >
    <div>
      <p className="text-2xl text-[#e6d3a3]">We warmly invite you</p>
      <p className="text-2xl mt-3 text-[#e6c77c]">
        to join us and bless this new beginning
      </p>
    </div>
  </motion.div>
</>
)}

{/* 📱 MOBILE VERSION (CLEAN + SMOOTH) */}
{isMobile && (
<div className="flex flex-col">

  {/* Slovakia */}
  <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/culturalMerge/slovakia.jpg')" }}
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative text-center text-white px-4">
      <h2 className="text-3xl mb-2">Slovakia</h2>
      <p className="opacity-80 text-sm">
        Mountains • Tradition • Heritage
      </p>
    </div>
  </div>

  {/* TEXT */}
  <div className="py-16 text-center px-6">
    <p className="text-lg text-[#e6d3a3]">
      We warmly invite you
    </p>
    <p className="text-lg mt-3 text-[#e6c77c]">
      to join us and bless this new beginning
    </p>
  </div>

  {/* India */}
  <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/culturalMerge/india.jpg')" }}
    />
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative text-center text-white px-4">
      <h2 className="text-3xl mb-2">India</h2>
      <p className="opacity-80 text-sm">
        Colors • Celebration • Culture
      </p>
    </div>
  </div>

</div>
)}

</section>

  )
}
