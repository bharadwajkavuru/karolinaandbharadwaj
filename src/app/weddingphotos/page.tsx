"use client";

import { useEffect, useState } from "react";

export default function WeddingPhotos() {
  const [media, setMedia] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

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

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-20">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl text-center text-yellow-400 mb-16 tracking-wide">
        Wedding Moments ✨
      </h1>

      {/* Masonry Layout */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">

        {media.map((item, index) => {
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
                  alt="wedding"
                  className="w-full rounded-xl transition duration-700 group-hover:scale-105"
                />
              )}

              {/* VIDEO (hover play) */}
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

              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition duration-500" />

              {/* ✨ Gold shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.18),transparent_60%)]" />

              {/* ▶ Play indicator */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition">
                  <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center text-white text-lg">
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
