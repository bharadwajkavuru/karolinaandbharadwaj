"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LiveSangeetPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("live-event-popup-shown")

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setOpen(true)
        sessionStorage.setItem("live-event-popup-shown", "true")
      }, 1200)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl border border-[#d4af37]/35 bg-[#15120f]/95 p-7 text-center shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-neutral-400 transition hover:text-white"
              aria-label="Close popup"
            >
              ✕
            </button>

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4af37]/80">
              Live Celebration
            </p>

            <h2 className="mb-4 text-3xl text-[#f1d48a]">
              Join the Wedding Festivities Live ✨
            </h2>

            <p className="mx-auto mb-7 max-w-sm text-sm leading-relaxed text-neutral-400">
              For our loved ones joining from afar, the ongoing wedding festivities may be available to watch live here.
            </p>

            <a
              href="https://www.youtube.com/live/uIg2M4Id_eM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Watch Live Event
            </a>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 text-xs text-neutral-500 transition hover:text-neutral-300"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
