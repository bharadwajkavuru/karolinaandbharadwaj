"use client";

import { useEffect, useState } from "react";

const EVENTS = [
  "All",
  "Haldi 🌼",
  "Mehendi 🌿",
  "Sangeet 🎶",
  "Wedding 💛",
  "Behind the Scenes 🎬"
];

export default function WeddingPhotos() {
  const [media, setMedia] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/weddingphotos");
        const data = await res.json();
        setMedia(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMedia();
  }, []);

  // 🎬 Cinematic transition on filter change
  const handleFilterChange = (value: string) => {
    if (value === filter) return;

    setVisible(false); // fade out
    setTimeout(() => {
      setFilter(value);
      setVisible(true); // fade in
    }, 250);
  };

  // 🎯 Clean matching (remove emoji before compare)
  const getEventName = (label: string) =>
    label.replace(/[^\w\s]/gi, "").trim();

  const filtered =
    filter === "All"
      ? media
      : media.filter(
          (item) =>
            item.context?.custom?.event === getEventName(filter)
        );

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-20">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl text-center text-yellow-400 mb-10 tracking-wide">
        Wedding Moments ✨
      </h1>

      {/* 🎯 FILTER UI */}
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {EVENTS.map((e) => (
          <button
            key={e}
            onClick={() => handleFilterChange(e)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-300 ${
              filter === e
                ? "bg-yellow-400 text-black border-yellow-400 scale-105 shadow-[0_0_12px_rgba(255,215,0,0.5)]"
                : "border-neutral-600 text-neutral-300 hover:border-yellow-400 hover:scale-105"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      {/* 🎬 CINEMATIC GRID */}
      <div
        className={`columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 transition-all duration-500 ${
          visible
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-sm scale-95"
        }`}
      >
        {filtered.map((item, index) => {
          const isVideo = item.resource_type === "video";

          return (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setSelected(item)}
            >
              {/* IMAGE */}
              {!isVideo && (
                <img
                  src={item.secure_url}
                  className="w-full rounded-xl transition duration-700 group-hover:scale-105"
                />
              )}

              {/* VIDEO */}
              {isVideo && (
                <video
                  src={item.secure_url}
                  muted
                  loop
                  playsInline
                  className="w-full rounded-xl transition duration-700 group-hover:scale-105"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              )}

              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition duration-500" />

              {/* Play icon */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                    ▶
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🎬 LIGHTBOX */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          {selected.resource_type === "video" ? (
            <video
              src={selected.secure_url}
              controls
              autoPlay
              className="max-h-[90vh] max-w-[95vw] rounded-xl"
            />
          ) : (
            <img
              src={selected.secure_url}
              className="max-h-[90vh] max-w-[95vw] rounded-xl"
            />
          )}
        </div>
      )}
    </div>
  );
}
