"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export default function CulturalMerge() {

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  /* Panel movement */
  const leftX = useTransform(scrollYProgress, [0, 0.9], ["0%", "-55%"])
  const rightX = useTransform(scrollYProgress, [0, 0.9], ["0%", "55%"])

  /* Texture parallax */
  const textureY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  /* Merge text animation */
const textOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1])
const textScale = useTransform(scrollYProgress, [0.35, 0.65], [0.92, 1])
const dustOpacity = useTransform(scrollYProgress, [0.38, 0.6], [0, 0.8])
const dustScale = useTransform(scrollYProgress, [0.38, 0.6], [0.8, 1.2])
  /* Divider animation */
  const dividerOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1])
  const dividerHeight = useTransform(scrollYProgress, [0.25, 0.75], ["0%", "85%"])
const ornamentOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1])
  /* Flowing seam width */
  const seamWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "30%"])

  /* Marigold petals */
  const [petals, setPetals] = useState<
    { left: number; top: number; duration: number }[]
  >([])

  /* Ambient sound */
  const [soundOn, setSoundOn] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {

    const generated = Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 12 + Math.random() * 6
    }))

    setPetals(generated)

  }, [])

  useEffect(() => {
    if (!audioRef.current) return

    if (soundOn) {
      audioRef.current.volume = 0.25
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [soundOn])

  return (

<section ref={ref} className="relative h-[260vh] bg-[#0f0d0b] overflow-hidden">

{/* Audio */}
<audio ref={audioRef} loop src="/audio/ambient-flute.mp3" />

{/* Sound toggle */}
<button
  onClick={() => setSoundOn(!soundOn)}
  className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white text-sm flex items-center justify-center"
>
  {soundOn ? "🔊" : "🔈"}
</button>

{/* Slovakia panel */}
<motion.div
  style={{ x: leftX }}
  className="absolute left-0 top-0 w-1/2 h-screen flex items-center justify-center bg-gradient-to-br from-[#2a3442] to-[#1c2530] overflow-hidden"
>

  {/* Slovak embroidery texture */}
  <motion.div
    style={{ y: textureY }}
    className="absolute inset-0 opacity-[0.08]"
  >
    <div
      className="w-full h-full"
      style={{
        backgroundImage: "url('/textures/slovak-pattern.svg')",
        backgroundSize: "380px"
      }}
    />
  </motion.div>

  <div className="text-center text-[#f5f5f5] relative z-10">

    <h2 className="text-4xl tracking-wider mb-4">
      Slovakia
    </h2>

    <p className="opacity-70">
      Mountains • Tradition • Heritage
    </p>

  </div>

</motion.div>


{/* India panel */}
<motion.div
  style={{ x: rightX }}
  className="absolute right-0 top-0 w-1/2 h-screen flex items-center justify-center bg-gradient-to-br from-[#c15522] to-[#7f2a1d] overflow-hidden"
>

  {/* Rangoli texture */}
  <motion.div
    style={{ y: textureY }}
    className="absolute inset-0 opacity-[0.09]"
  >
    <div
      className="w-full h-full"
      style={{
        backgroundImage: "url('/textures/rangoli.svg')",
        backgroundSize: "350px"
      }}
    />
  </motion.div>

  {/* Floating marigold petals */}
  <div className="absolute inset-0 pointer-events-none">

    {petals.map((p, i) => (

      <motion.img
        key={i}
        src="/textures/marigold.svg"
        className="absolute w-6 opacity-70"
        style={{
          left: `${p.left}%`,
          top: `${p.top}%`
        }}
        animate={{
          y: ["0%", "120%"],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration: p.duration,
          repeat: Infinity,
          ease: "linear"
        }}
      />

    ))}

  </div>

  <div className="text-center text-[#fff3e0] relative z-10">

    <h2 className="text-4xl tracking-wider mb-4">
      India
    </h2>

    <p className="opacity-80">
      Colors • Celebration • Culture
    </p>

  </div>

</motion.div>


{/* Flowing gold seam */}
<motion.div
  style={{ width: seamWidth }}
  className="absolute left-1/2 top-0 -translate-x-1/2 h-full pointer-events-none"
>

  <div
    className="w-full h-full blur-2xl opacity-70"
    style={{
      background:
        "linear-gradient(90deg, rgba(42,52,66,0.2), rgba(212,175,55,0.6), rgba(193,85,34,0.2))"
    }}
  />

  <motion.div
    animate={{ opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, repeat: Infinity }}
    className="absolute inset-0 blur-xl"
    style={{
      background:
        "radial-gradient(circle at center, rgba(255,220,120,0.6), transparent 70%)"
    }}
  />

</motion.div>


{/* Divider glow aura */}
<motion.div
  style={{ opacity: dividerOpacity }}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full blur-3xl bg-[#d4af37]/30"
/>


{/* Divider line */}
<motion.div
  style={{
    opacity: dividerOpacity,
    height: dividerHeight
  }}
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent z-20"
/>


{/* Merge message */}
{/* Merge message */}
<motion.div
  style={{
    opacity: textOpacity,
    scale: textScale
  }}
  className="absolute inset-0 flex items-center justify-center text-center"
>
  <div className="flex flex-col items-center relative">

    {/* Gold dust burst */}
    <motion.div
      style={{
        opacity: dustOpacity,
        scale: dustScale
      }}
      className="absolute w-[420px] h-[420px] rounded-full blur-3xl"
    />

    {/* ✨ INVITATION ONLY */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center relative z-10"
    >
{/* Line 1 */}
{/* Line 1 */}
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 1 }}
  className="text-xl md:text-2xl text-[#e6d3a3] tracking-wide"
>
  We warmly invite you
</motion.p>

{/* Line 2 */}
<motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 1 }}
  className="text-xl md:text-2xl mt-3 text-[#e6c77c] tracking-wide"
>
  to join us and bless this new beginning
</motion.p>
    </motion.div>

    {/* Ornament */}
    <motion.div
      style={{ opacity: ornamentOpacity }}
      className="flex items-center gap-4 mt-12 relative z-10"
    >
      <div className="h-[1px] w-16 bg-[#d4af37]/70"></div>
      <div className="text-[#d4af37] text-lg">✦</div>
      <div className="h-[1px] w-16 bg-[#d4af37]/70"></div>
    </motion.div>

  </div>
</motion.div>
</section>

  )
}
