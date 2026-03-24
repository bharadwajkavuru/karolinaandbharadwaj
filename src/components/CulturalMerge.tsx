"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function CulturalMerge() {

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const leftX = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "-55%"])
  const rightX = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "55%"])

  const textureY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  const textOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1])
  const textScale = useTransform(scrollYProgress, [0.35, 0.65], [0.92, 1])

  const dividerOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 0.7])
  const dividerHeight = useTransform(scrollYProgress, [0.25, 0.75], ["0%", "75%"])

  const [petals, setPetals] = useState<
    { left: number; top: number; duration: number }[]
  >([])

  const [soundOn, setSoundOn] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const generated = Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 12 + Math.random() * 6
    }))
    setPetals(generated)
  }, [])

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

<section ref={ref} className="relative h-[200vh] bg-[#0f0d0b] overflow-hidden">

<audio ref={audioRef} loop src="/audio/ambient-flute.mp3" />

<button
  onClick={() => setSoundOn(!soundOn)}
  className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white text-sm flex items-center justify-center"
>
  {soundOn ? "🔊" : "🔈"}
</button>

{/* Slovakia */}
<motion.div
  style={{ x: leftX }}
  className="absolute left-0 top-0 w-1/2 h-screen flex items-center justify-center bg-gradient-to-br from-[#2a3442] to-[#1c2530]"
>
  <motion.div style={{ y: textureY }} className="absolute inset-0 opacity-[0.08]">
    <div className="w-full h-full" style={{
      backgroundImage: "url('/textures/slovak-pattern.svg')",
      backgroundSize: "380px"
    }} />
  </motion.div>

  <div className="text-center text-[#f5f5f5] relative z-10">
    <h2 className="text-4xl mb-4">Slovakia</h2>
    <p className="opacity-70">Mountains • Tradition • Heritage</p>
  </div>
</motion.div>

{/* India */}
<motion.div
  style={{ x: rightX }}
  className="absolute right-0 top-0 w-1/2 h-screen flex items-center justify-center bg-gradient-to-br from-[#c15522] to-[#7f2a1d]"
>
  <motion.div style={{ y: textureY }} className="absolute inset-0 opacity-[0.09]">
    <div className="w-full h-full" style={{
      backgroundImage: "url('/textures/rangoli.svg')",
      backgroundSize: "350px"
    }} />
  </motion.div>

  <div className="text-center text-[#fff3e0] relative z-10">
    <h2 className="text-4xl mb-4">India</h2>
    <p className="opacity-80">Colors • Celebration • Culture</p>
  </div>
</motion.div>

{/* ✨ Softer Divider */}
<motion.div
  style={{ opacity: dividerOpacity, height: dividerHeight }}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/60 to-transparent"
/>

{/* ✨ Text (moved slightly down) */}
<motion.div
  style={{ opacity: textOpacity, scale: textScale }}
  className="absolute inset-0 flex items-center justify-center text-center translate-y-10"
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
