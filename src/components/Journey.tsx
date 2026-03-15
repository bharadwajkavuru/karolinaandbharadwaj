"use client"

import { motion } from "framer-motion"

export default function Journey() {

  return (

    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative py-40 bg-gradient-to-b from-[#f7f6f3] to-[#efece6] text-center overflow-hidden"
    >

      {/* Subtle gold glow */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(212,175,55,0.35), transparent 60%)"
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl mb-10 tracking-wide text-[#1a1a1a]">
          Our Journey
        </h2>
<div
  className="absolute inset-0 opacity-[0.05]"
  style={{
    backgroundImage: "url('/textures/gold-dust.svg')",
    backgroundSize: "500px"
  }}
/>

        <p className="text-lg text-gray-700 mb-6">
          From distant worlds, a shared journey began.
        </p>

        <p className="text-lg text-gray-700 mb-6">
          Across continents and cultures, two families found connection.
        </p>

        <p className="text-lg text-gray-700">
          Now we gather to celebrate the next chapter.
        </p>

        {/* Decorative divider */}
        <div className="flex justify-center mt-12 items-center gap-4">

          <div className="h-[1px] w-16 bg-[#d4af37]/60"></div>

          <div className="text-[#d4af37] text-lg">✦</div>

          <div className="h-[1px] w-16 bg-[#d4af37]/60"></div>

        </div>

      </div>

    </motion.section>

  )
}
