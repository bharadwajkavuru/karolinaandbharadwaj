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

      {/* Gold dust texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/textures/gold-dust.svg')",
          backgroundSize: "500px"
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-4xl md:text-5xl mb-12 tracking-wide text-[#1a1a1a]">
          Our Journey
        </h2>

        {/* Line 1 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-700 leading-relaxed"
        >
          From different corners of the world, our journey began.
        </motion.p>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-700 mt-6 leading-relaxed"
        >
          Across cultures, we found something meaningful.
        </motion.p>

        {/* Line 3 (highlight) */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl mt-6 text-[#c6a85a] leading-relaxed"
          style={{
            textShadow: "0 0 6px rgba(212,175,55,0.15)"
          }}
        >
          Now, we gather to celebrate the story that brought us here.
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 items-center gap-4 text-[#d4af37]"
        >
          <div className="h-[1px] w-16 bg-[#d4af37]/60"></div>
          <div className="text-lg">✦</div>
          <div className="h-[1px] w-16 bg-[#d4af37]/60"></div>
        </motion.div>

      </div>

    </motion.section>

  )
}
