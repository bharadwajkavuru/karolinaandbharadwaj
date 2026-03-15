"use client"
import { useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Hero() {

const ref = useRef(null)

const { scrollYProgress } = useScroll({
  target: ref,
  offset: ["start start", "end start"]
})

const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const [particles, setParticles] = useState<
    { left: number; top: number; duration: number }[]
  >([])

  useEffect(() => {

    const generated = Array.from({ length: 18 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 12 + Math.random() * 8
    }))

    setParticles(generated)

  }, [])

  return (

<motion.section
  ref={ref}
  style={{ opacity, scale }}
  className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-b from-[#1b1510] via-[#201a14] to-[#0e0c09]"
>
      {/* Cinematic gold glow */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(212,175,55,0.55)_0%,rgba(212,175,55,0.18)_35%,rgba(0,0,0,0)_70%)] blur-[120px]"
      />
<div
  className="absolute inset-0 opacity-[0.08]"
  style={{
    backgroundImage: "url('/textures/gold-dust.svg')",
    backgroundSize: "500px"
  }}
/>

      {/* Floating golden particles */}
      <div className="absolute inset-0 pointer-events-none">

        {particles.map((p, i) => (

          <motion.span
            key={i}
            className="absolute w-[2px] h-[2px] bg-[#e6c77c] rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`
            }}
            animate={{
              y: ["0%", "120%"],
              opacity: [0.2, 0.7, 0.2]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />

        ))}

      </div>

      {/* Karolina */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl md:text-8xl tracking-[0.12em] text-[#f8f5ef] relative z-10"
      >
        Karolina
      </motion.h1>

      {/* & */}
      <div className="text-[#d4af37] text-3xl my-5 relative z-10">
        &
      </div>

      {/* Bharadwaj */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-7xl md:text-8xl tracking-[0.12em] text-[#f8f5ef] relative z-10"
      >
        Bharadwaj
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-10 text-lg text-[#e6c77c] opacity-95 relative z-10"
      >
        Two Cultures • One Celebration
      </motion.p>

      {/* Decorative divider */}
      <div className="flex items-center gap-4 mt-6 relative z-10">

        <div className="h-[1px] w-16 bg-[#d4af37]/60"></div>

        <div className="text-[#d4af37] text-lg">✦</div>

        <div className="h-[1px] w-16 bg-[#d4af37]/60"></div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-14 flex flex-col items-center">

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-[#d4af37]"
        />

      </div>

</motion.section>
  )
}
