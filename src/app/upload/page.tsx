"use client";

import { useState } from "react";

const EVENTS = [
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Wedding",
  "Behind the Scenes"
];

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [event, setEvent] = useState("Haldi");

  const handleUpload = async (file: File) => {
    setUploading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wedding_upload");
    formData.append("folder", "wedding");
    formData.append("context", `event=${event}`);

    const isVideo = file.type.startsWith("video");

    const uploadUrl = isVideo
      ? "https://api.cloudinary.com/v1_1/dtxpya0p6/video/upload"
      : "https://api.cloudinary.com/v1_1/dtxpya0p6/image/upload";

    try {
      await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-black border border-yellow-500/30 rounded-2xl p-8 text-center shadow-[0_0_40px_rgba(255,215,0,0.08)]">
        <h1 className="text-3xl text-yellow-400 mb-4 tracking-wide">
          Share Your Moments ✨
        </h1>

        <p className="text-neutral-400 mb-6 text-sm">
          Help us capture the memories through your lens 💛
        </p>

        <div className="mb-6">
          <p className="text-xs text-neutral-400 mb-2">Select Event</p>

          <div className="flex flex-wrap gap-2 justify-center">
            {EVENTS.map((e) => (
              <button
                key={e}
                onClick={() => setEvent(e)}
                className={`px-3 py-1 rounded-full text-xs border transition ${
                  event === e
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "border-neutral-600 text-neutral-300 hover:border-yellow-400"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <label className="block border-2 border-dashed border-yellow-500/40 rounded-xl p-6 cursor-pointer hover:border-yellow-400 transition duration-300">
          <div className="text-neutral-300 text-sm">
            Click or drag photos/videos here
          </div>

          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleUpload(e.target.files[0]);
              }
            }}
          />
        </label>

        <div className="mt-5 min-h-[72px] text-sm flex flex-col items-center justify-start gap-3">
          {uploading && (
            <p className="text-yellow-400 animate-pulse">
              Uploading your moment...
            </p>
          )}

          {success && (
            <>
              <p className="text-green-400">
                Uploaded to {event} ✨
              </p>

              <a
                href="/weddingphotos"
                className="inline-block px-5 py-2 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition duration-300"
              >
                View Wedding Gallery
              </a>

              <p className="text-xs text-neutral-500">
                You can now see your upload or share the gallery with others.
              </p>
            </>
          )}
        </div>

        <p className="text-xs text-neutral-500 mt-6">
          Photos & videos will appear in the wedding gallery shortly
        </p>
      </div>
    </div>
  );
}
