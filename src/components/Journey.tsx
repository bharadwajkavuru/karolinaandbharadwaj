"use client"

import { motion } from "framer-motion"

export default function Journey() {

  return (

    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full relative py-40 bg-gradient-to-b from-[#f7f6f3] to-[#efece6] text-center overflow-hidden"
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

        {/* Line 3 */}
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

        {/* Divider */}
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

        {/* Instagram Section */}
        <div className="mt-16 flex flex-col items-center text-center">

          <p className="text-lg md:text-xl text-[#cbb27a] tracking-wide mb-3">
            A glimpse into our moments…
          </p>

          <a
            href="https://instagram.com/indoslovakdiary"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-[#d4af37] text-lg md:text-xl tracking-wide transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              More stories on Instagram

              {/* Instagram icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 opacity-50 group-hover:opacity-80 transition"
              >
                <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3.5A5.5 5.5 0 106 13a5.5 5.5 0 006-5.5zm0 2A3.5 3.5 0 118.5 13 3.5 3.5 0 0112 9.5zm4.75-3.25a1 1 0 100 2 1 1 0 000-2z"/>
              </svg>

              {/* Arrow */}
              <span className="text-sm">↗</span>
            </span>

            {/* Underline */}
            <span className="block h-[1px] w-0 bg-[#d4af37] mt-1 transition-all duration-500 group-hover:w-full"></span>
          </a>

        </div>

      </div>

    </motion.section>

  )
}
