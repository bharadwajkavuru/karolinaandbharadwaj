"use client";

import { useEffect, useState } from "react";

const EVENTS = [
  { label: "All", value: "All" },
  { label: "Haldi 🌼", value: "Haldi" },
  { label: "Mehendi 🌿", value: "Mehendi" },
  { label: "Sangeet 🎶", value: "Sangeet" },
  { label: "Wedding 💛", value: "Wedding" },
  { label: "Behind the Scenes 🎬", value: "Behind the Scenes" }
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getMediaEvent(item: any) {
  return (
    item.context?.custom?.event ||
    item.context?.event ||
    item.metadata?.event ||
    item.event ||
    ""
  );
}

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

        setMedia(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMedia();

    const interval = setInterval(fetchMedia, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (value: string) => {
    if (value === filter) return;

    setVisible(false);

    setTimeout(() => {
      setFilter(value);
      setVisible(true);
    }, 250);
  };

  const filtered =
    filter === "All"
      ? media
      : media.filter((item) => normalize(getMediaEvent(item)) === normalize(filter));

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-20">
      <h1 className="text-4xl md:text-5xl text-center text-yellow-400 mb-10 tracking-wide">
        Wedding Moments ✨
      </h1>

      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {EVENTS.map((event) => (
          <button
            key={event.value}
            type="button"
            onClick={() => handleFilterChange(event.value)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-300 ${
              filter === event.value
                ? "bg-yellow-400 text-black border-yellow-400 scale-105 shadow-[0_0_12px_rgba(255,215,0,0.5)]"
                : "border-neutral-600 text-neutral-300 hover:border-yellow-400 hover:scale-105"
            }`}
          >
            {event.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-neutral-500">
          No moments found in this category yet.
        </p>
      ) : (
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
                key={`${item.public_id}-${index}`}
                className="relative group overflow-hidden rounded-xl cursor-pointer break-inside-avoid mb-4"
                onClick={() => setSelected(item)}
              >
                {!isVideo && (
                  <img
                    src={item.secure_url}
                    alt={getMediaEvent(item) || "Wedding moment"}
                    className="w-full rounded-xl transition duration-700 group-hover:scale-105"
                  />
                )}

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

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition duration-500" />

                {getMediaEvent(item) && (
                  <div className="absolute left-3 bottom-3 rounded-full bg-black/55 px-3 py-1 text-[11px] text-[#f1d48a] backdrop-blur">
                    {getMediaEvent(item)}
                  </div>
                )}

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
      )}

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
