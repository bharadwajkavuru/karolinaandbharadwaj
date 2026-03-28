"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

export default function Hero() {

  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  // ✨ FIXED STATIC STARS (NO hydration issues)
const stars = [
  { left: "5%", top: "10%", delay: 0 },
  { left: "12%", top: "30%", delay: 1 },
  { left: "18%", top: "70%", delay: 2 },
  { left: "25%", top: "50%", delay: 3 },
  { left: "30%", top: "20%", delay: 1.5 },
  { left: "35%", top: "80%", delay: 2.5 },
  { left: "42%", top: "35%", delay: 0.8 },
  { left: "48%", top: "65%", delay: 2.2 },
  { left: "55%", top: "15%", delay: 3.5 },
  { left: "60%", top: "55%", delay: 1.2 },
  { left: "65%", top: "75%", delay: 2.8 },
  { left: "70%", top: "40%", delay: 0.5 },
  { left: "75%", top: "85%", delay: 3 },
  { left: "80%", top: "25%", delay: 1.7 },
  { left: "85%", top: "60%", delay: 2.4 },
  { left: "90%", top: "15%", delay: 0.9 },
  { left: "95%", top: "50%", delay: 3.2 },

  { left: "8%", top: "85%", delay: 1.3 },
  { left: "20%", top: "15%", delay: 2.6 },
  { left: "28%", top: "60%", delay: 0.7 },
  { left: "38%", top: "10%", delay: 3.8 },
  { left: "45%", top: "90%", delay: 1.9 },
  { left: "52%", top: "45%", delay: 2.1 },
  { left: "62%", top: "5%", delay: 0.6 },
  { left: "72%", top: "70%", delay: 3.4 },
  { left: "82%", top: "35%", delay: 1.4 },
  { left: "92%", top: "80%", delay: 2.9 }
]
  return (
    <motion.section
      ref={ref}
      style={{ opacity, scale }}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 overflow-hidden bg-gradient-to-b from-[#1b1510] via-[#201a14] to-[#0e0c09]"
    >

      {/* Cinematic gold glow */}
<motion.div
  animate={{
    scale: [1, 1.06, 1.1, 1.04, 1],
    opacity: [0.7, 0.9, 1, 0.85, 0.7]
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="absolute w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(212,175,55,0.65)_0%,rgba(212,175,55,0.25)_35%,rgba(0,0,0,0)_70%)] blur-[120px]"
/>
      {/* ✨ SUBTLE SPARKLING STARS */}
      <div className="absolute inset-0 pointer-events-none">

        {stars.map((s, i) => (
          <motion.span
            key={i}
className={`absolute rounded-full bg-[#d4af37] ${
  i % 3 === 0 ? "w-[3px] h-[3px]" : "w-[2px] h-[2px]"
}`}
            style={{
              left: s.left,
              top: s.top
            }}
animate={{
  opacity: [0.15, 1, 0.15],
  scale: [1, 2, 1]
}}            transition={{
              duration: 3,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

      </div>
{/* ✨ CINEMATIC LIGHT RAYS */}
<motion.div
  animate={{
    opacity: [0.25, 0.45, 0.3],
    scale: [1, 1.05, 1]
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="absolute inset-0 flex items-center justify-center pointer-events-none"
>
  <div
    className="w-[900px] h-[900px]"
    style={{
      background: `
        conic-gradient(
          from 0deg,
          rgba(212,175,55,0.15) 0deg,
          rgba(212,175,55,0.05) 30deg,
          transparent 60deg,
          transparent 120deg,
          rgba(212,175,55,0.08) 150deg,
          transparent 210deg,
          rgba(212,175,55,0.12) 260deg,
          transparent 320deg,
          rgba(212,175,55,0.1) 360deg
        )
      `,
      filter: "blur(60px)"
    }}
  />
</motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center px-4 pb-10 relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.2] tracking-[0.12em] text-[#f8f5ef]"
        >
Karolína
        </motion.h1>

        <div className="text-[#d4af37] text-2xl sm:text-3xl my-4 sm:my-5">
          &
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.2] tracking-[0.12em] text-[#f8f5ef]"
        >
          Bharadwaj
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 sm:mt-10 text-base sm:text-lg text-[#e6c77c] opacity-95"
        >
          Two Cultures • One Celebration
        </motion.p>

        <div className="flex items-center justify-center gap-4 mt-6">

          <div className="h-[1px] w-12 sm:w-16 bg-[#d4af37]/60"></div>

          <div className="text-[#d4af37] text-lg">✦</div>

          <div className="h-[1px] w-12 sm:w-16 bg-[#d4af37]/60"></div>

        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 sm:bottom-14 flex flex-col items-center">

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-10 sm:h-12 bg-[#d4af37]"
        />

      </div>

    </motion.section>
  )
}
