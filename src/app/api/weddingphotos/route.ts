import { NextResponse } from "next/server";

export async function GET() {
  try {
    const auth = Buffer.from(
      process.env.CLOUDINARY_API_KEY + ":" + process.env.CLOUDINARY_API_SECRET
    ).toString("base64");

    // ✅ Fetch images
    const imageRes = await fetch(
      "https://api.cloudinary.com/v1_1/dtxpya0p6/resources/image?max_results=100",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    // ✅ Fetch videos
    const videoRes = await fetch(
      "https://api.cloudinary.com/v1_1/dtxpya0p6/resources/video?max_results=100",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const imageData = await imageRes.json();
    const videoData = await videoRes.json();

    // ✅ Filter only wedding folder
    const images = (imageData.resources || []).filter((item: any) =>
      item.public_id.startsWith("wedding/")
    );

    const videos = (videoData.resources || []).filter((item: any) =>
      item.public_id.startsWith("wedding/")
    );

    // ✅ Merge both
    const combined = [...images, ...videos];

    return NextResponse.json(combined);
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json([]);
  }
}
