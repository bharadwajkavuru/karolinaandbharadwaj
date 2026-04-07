"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const events = [
  {
    title: "Haldi Ceremony",
    date: "16 May 2026",
    et: "10:00 AM ET",
    ist: "7:30 PM IST",
    location: "7365 Quinn Court, Dawsonville, GA",
    map: "https://www.google.com/maps?q=7365+Quinn+Court+Dawsonville+GA",
    image: "/events/haldi.jpg"
  },
  {
    title: "Sangeet Evening",
    date: "16 May 2026",
    et: "05:00 PM ET",
    ist: "2:30 AM IST",
    location: "Banjara Banquets, Cumming, GA",
    map: "https://www.google.com/maps?q=Banjara+Banquets+1656+Buford+Hwy+Cumming+GA",
    image: "/events/sangeet.jpg"
  },
  {
    title: "Wedding Ceremony",
    date: "17 May 2026",
    et: "10:00 AM ET",
    ist: "7:30 PM IST",
    location: "Banjara Banquets, Cumming, GA",
    map: "https://www.google.com/maps?q=Banjara+Banquets+1656+Buford+Hwy+Cumming+GA",
    image: "/events/wedding.jpg"
  }
]

export default function Events() {

  const [flipped, setFlipped] = useState<number | null>(null)

  return (

<motion.section
initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }}
viewport={{ once: true }}
className="relative py-40 bg-[#0f0d0b] text-center overflow-hidden"
>

<div
className="absolute inset-0 opacity-[0.08]"
style={{
background:
"radial-gradient(circle at center, rgba(212,175,55,0.35), transparent 60%)"
}}
/>

<div className="max-w-6xl mx-auto px-6 relative">

<h2 className="text-4xl md:text-5xl text-[#f1d48a] mb-20 tracking-wide">
Events
</h2>

<div className="grid md:grid-cols-3 gap-10">

{events.map((event, i) => {

const isFlipped = flipped === i

return (

<div
key={i}
onMouseEnter={() => setFlipped(i)}
onMouseLeave={() => setFlipped(null)}
className="relative h-[320px] perspective"
>

<motion.div
animate={{ rotateY: isFlipped ? 180 : 0 }}
transition={{ duration: 0.8 }}
className="relative h-full rounded-xl"
style={{ transformStyle: "preserve-3d" }}
>

{/* FRONT */}
<div
className="absolute inset-0 rounded-xl overflow-hidden border border-[#d4af37]/30"
style={{ backfaceVisibility: "hidden" }}
>

<img
src={event.image}
className="absolute inset-0 w-full h-full object-cover opacity-55"/>

<div className="absolute inset-0 bg-black/45" />

<div className="relative h-full flex flex-col items-center justify-center text-center p-6">

<h3 className="text-xl text-[#f1d48a] mb-4">
{event.title}
</h3>

<div className="flex items-center gap-3">
<div className="h-[1px] w-10 bg-[#d4af37]/70"></div>
<div className="text-[#d4af37]">✦</div>
<div className="h-[1px] w-10 bg-[#d4af37]/70"></div>
</div>

</div>
</div>

{/* BACK */}
<div
className="absolute inset-0 rounded-xl overflow-hidden border border-[#d4af37]/30 bg-[#161412]"
style={{
backfaceVisibility: "hidden",
transform: "rotateY(180deg)"
}}
>

<img
src={event.image}
className="absolute inset-0 w-full h-full object-cover opacity-45"
/>

<div className="absolute inset-0 bg-black/50" />

<div className="relative h-full flex flex-col items-center justify-center text-center px-6">

<p className="text-[#f1d48a] text-lg mb-2">
{event.date}
</p>

<p className="text-gray-200 text-sm">
{event.et}
</p>

<p className="text-gray-400 text-sm mb-3">
{event.ist}
</p>

{/* 📍 LOCATION */}
<a
href={event.map}
target="_blank"
rel="noopener noreferrer"
className="text-sm text-[#d4af37] underline hover:opacity-80"
>
{event.location}
</a>

</div>

</div>

</motion.div>
</div>

)

})}

</div>

<div className="flex justify-center mt-20 items-center gap-4">
<div className="h-[1px] w-16 bg-[#d4af37]/60"></div>
<div className="text-[#d4af37] text-lg">✦</div>
<div className="h-[1px] w-16 bg-[#d4af37]/60"></div>
</div>

</div>

</motion.section>

  )
}
