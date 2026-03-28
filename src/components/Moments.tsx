"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const photos = [
  "/moments/moment1.jpg",
  "/moments/moment2.jpg",
  "/moments/moment3.jpg",
  "/moments/moment4.jpg",
  "/moments/moment5.jpg",
  "/moments/moment6.jpg",
  "/moments/moment7.jpg",
  "/moments/moment8.jpg",
  "/moments/moment9.jpg",
  "/moments/moment11.jpg", 
  "/moments/moment12.jpg",
"/moments/moment10.jpg"
]

export default function Moments() {

  const [centerIndex, setCenterIndex] = useState(0)
  const [particles, setParticles] = useState<any[]>([])
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {

    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % photos.length)
    }, 5000)

    return () => clearInterval(interval)

  }, [])

  useEffect(() => {

    const generated = Array.from({ length: 18 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 10
    }))

    setParticles(generated)

  }, [])

  const handleMouseMove = (e: any) => {

    const rect = e.currentTarget.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setTilt({
      x: (y - 0.5) * 10,
      y: (x - 0.5) * -10
    })

  }

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (

<motion.section
initial={{ opacity: 1 }}
whileInView={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 1 }}
className="relative py-40 bg-gradient-to-b from-[#f5f2ea] via-[#efe9dc] to-[#f5f2ea] overflow-hidden"
>
{/* background glow */}
<div
  className="absolute inset-0 opacity-[0.12]"
  style={{
    background:
      "radial-gradient(circle at center, rgba(212,175,55,0.35), transparent 65%)"
  }}
/>


{/* floating particles */}

<div className="absolute inset-0 pointer-events-none">

{particles.map((p, i) => (

<motion.span
key={i}
className="absolute w-[2px] h-[2px] bg-[#d4af37] rounded-full"
style={{
  left: `${p.x}%`,
  top: `${p.y}%`
}}
animate={{
  y: ["0%", "120%"],
  opacity: [0.1, 0.6, 0.1, 0]
}}
transition={{
  duration: p.duration,
  repeat: Infinity,
  ease: "linear"
}}
/>

))}

</div>


<div className="max-w-6xl mx-auto px-6 relative">

<h2 className="text-center text-4xl md:text-5xl mb-20 tracking-wide text-[#1a1a1a]">
  Moments
</h2>


<div
className="relative flex items-center justify-center h-[540px]"
style={{ perspective: 1200 }}
>


{/* GOLD LIGHT RAYS */}

<motion.div
animate={{ opacity: [0.2, 0.35, 0.2] }}
transition={{ duration: 6, repeat: Infinity }}
className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
style={{
background:
"radial-gradient(circle, rgba(255,220,120,0.45) 0%, rgba(212,175,55,0.25) 40%, transparent 70%)"
}}
/>


{photos.map((photo, i) => {

const offset = i - centerIndex
const absOffset = Math.abs(offset)
const isCenter = i === centerIndex

return (

<motion.img
key={photo}
src={photo}
onMouseMove={isCenter ? handleMouseMove : undefined}
onMouseLeave={isCenter ? resetTilt : undefined}
initial={false}
animate={{

x: offset * 220,
y: offset * -20,
scale: isCenter ? 1 : 0.82,
rotate: isCenter ? 0 : offset * 6,
rotateX: isCenter ? tilt.x : 0,
rotateY: isCenter ? tilt.y : 0,
opacity: absOffset > 2 ? 0 : 1,
zIndex: isCenter ? 10 : 5 - absOffset

}}
transition={{
duration: 1.2,
ease: "easeInOut"
}}
className="absolute w-[260px] md:w-[320px] h-[360px] md:h-[420px] object-cover rounded-xl shadow-[0_35px_70px_rgba(0,0,0,0.28)]"
/>

)

})}

</div>


{/* navigation dots */}

<div className="flex justify-center mt-16 gap-3">

{photos.map((_, i) => (

<div
key={i}
onClick={() => setCenterIndex(i)}
className={`w-3 h-3 rounded-full cursor-pointer transition ${
i === centerIndex
? "bg-[#d4af37]"
: "bg-gray-400/40"
}`}
/>

))}

</div>


{/* decorative divider */}

<div className="flex justify-center mt-20 items-center gap-4">

<div className="h-[1px] w-16 bg-[#d4af37]/60"></div>
<div className="text-[#d4af37] text-lg">✦</div>
<div className="h-[1px] w-16 bg-[#d4af37]/60"></div>

</div>


</div>

</motion.section>
  )
}
