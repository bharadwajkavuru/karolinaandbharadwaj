"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingWeddingPhotos() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-[280px] rounded-2xl border border-[#d4af37]/30 bg-[#15120f]/95 p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          >
            <p className="mb-1 text-sm uppercase tracking-[0.22em] text-[#d4af37]/80">
              Guest Gallery
            </p>

            <h3 className="mb-3 text-xl text-[#f1d48a]">
              Captured Moments
            </h3>

            <p className="mb-5 text-sm leading-relaxed text-neutral-400">
              Explore the latest photos and videos shared by our guests during the celebration.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/weddingphotos"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[#d4af37] px-5 py-2.5 text-center text-sm font-semibold text-black transition hover:opacity-90"
              >
                View Gallery
              </Link>

              <Link
                href="/upload"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#d4af37]/40 px-5 py-2.5 text-center text-sm text-[#d4af37] transition hover:border-[#d4af37]"
              >
                Upload Moments
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-3 rounded-full border border-[#d4af37]/40 bg-[#15120f]/90 px-5 py-3 text-[#f1d48a] shadow-[0_12px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-[#d4af37] hover:bg-[#1c1712]"
      >
        <span className="text-lg">📸</span>

        <span className="text-sm font-medium tracking-wide">
          Captured Moments
        </span>

        <span className="text-[#d4af37] transition group-hover:translate-x-0.5">
          ✦
        </span>
      </button>
    </div>
  )
}
