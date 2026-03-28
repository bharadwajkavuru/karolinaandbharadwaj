"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function CulturalMerge() {

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // 🔥 TIGHTER ANIMATION
  const leftX = useTransform(scrollYProgress, [0.05, 0.65], ["0%", "-55%"])
  const rightX = useTransform(scrollYProgress, [0.05, 0.65], ["0%", "55%"])

  const textOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1])
  const textScale = useTransform(scrollYProgress, [0.25, 0.5], [0.95, 1])

  const dividerOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 0.7])
  const dividerHeight = useTransform(scrollYProgress, [0.15, 0.55], ["0%", "70%"])

  const [soundOn, setSoundOn] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasStarted = useRef(false)

  // 🔊 USER INTERACTION START
  useEffect(() => {
    const startAudio = () => {
      if (hasStarted.current) return
      if (!audioRef.current) return

      audioRef.current.volume = 0.25
      audioRef.current.play().catch(() => {})

      hasStarted.current = true

      window.removeEventListener("click", startAudio)
      window.removeEventListener("touchstart", startAudio)
      window.removeEventListener("keydown", startAudio)
    }

    window.addEventListener("click", startAudio)
    window.addEventListener("touchstart", startAudio)
    window.addEventListener("keydown", startAudio)

    return () => {
      window.removeEventListener("click", startAudio)
      window.removeEventListener("touchstart", startAudio)
      window.removeEventListener("keydown", startAudio)
    }
  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    if (soundOn) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [soundOn])

  return (

<section ref={ref} className="w-full relative h-[120vh] bg-[#0f0d0b] overflow-hidden">

<audio ref={audioRef} loop src="/audio/ambient-flute.mp3" />

<button
  onClick={() => setSoundOn(!soundOn)}
  className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white text-sm flex items-center justify-center"
>
  {soundOn ? "🔊" : "🔈"}
</button>

{/* ✨ CENTER GLOW */}
<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,215,120,0.12),transparent_60%)]" />

{/* 🇸🇰 Slovakia */}
<motion.div
  style={{ x: leftX }}
  className="absolute left-0 top-0 w-1/2 h-screen flex items-center justify-center
  overflow-hidden
  shadow-[inset_-40px_0_80px_rgba(0,0,0,0.7)]"
>
  <div
    className="absolute inset-0 bg-cover bg-center opacity-85"
    style={{ backgroundImage: "url('/culturalMerge/slovakia.jpg')" }}
  />

  <div className="absolute inset-0 bg-gradient-to-br from-[#1c2530]/60 via-[#1c2530]/40 to-[#1c2530]/70" />

  <div className="text-center text-[#f5f5f5] relative z-10">
    <h2 className="text-4xl mb-4">Slovakia</h2>
    <p className="opacity-70">Mountains • Tradition • Heritage</p>
  </div>
</motion.div>

{/* 🇮🇳 India */}
<motion.div
  style={{ x: rightX }}
  className="absolute right-0 top-0 w-1/2 h-screen flex items-center justify-center
  overflow-hidden
  shadow-[inset_40px_0_80px_rgba(0,0,0,0.7)]"
>
  <div
    className="absolute inset-0 bg-cover bg-center opacity-90"
    style={{ backgroundImage: "url('/culturalMerge/india.jpg')" }}
  />

  <div className="absolute inset-0 bg-gradient-to-br from-[#a63e1f]/55 via-[#a63e1f]/35 to-[#7f2a1d]/65" />

  <div className="text-center text-[#fff3e0] relative z-10">
    <h2 className="text-4xl mb-4">India</h2>
    <p className="opacity-80">Colors • Celebration • Culture</p>
  </div>
</motion.div>

{/* ✨ DIVIDER */}
<motion.div
  style={{ opacity: dividerOpacity, height: dividerHeight }}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
  w-[2px]
  bg-gradient-to-b from-transparent via-[#d4af37]/70 to-transparent
  blur-[0.6px]"
/>

{/* ✨ TEXT */}
<motion.div
  style={{ opacity: textOpacity, scale: textScale }}
  className="absolute inset-0 flex items-center justify-center text-center translate-y-16"
>
  <div>
    <p className="text-xl md:text-2xl text-[#e6d3a3]">
      We warmly invite you
    </p>
    <p className="text-xl md:text-2xl mt-3 text-[#e6c77c]">
      to join us and bless this new beginning
    </p>
  </div>
</motion.div>

</section>

  )
}
