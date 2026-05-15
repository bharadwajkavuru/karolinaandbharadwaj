import { NextResponse } from "next/server";

const CLOUD_NAME = "dtxpya0p6";

async function fetchCloudinaryResources(resourceType: "image" | "video") {
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.error("Missing CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET");
    return [];
  }

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/${resourceType}?max_results=500&context=true`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error(`Cloudinary ${resourceType} fetch failed:`, data);
    return [];
  }

  return (data.resources || []).filter((item: any) =>
    item.public_id?.startsWith("wedding/")
  );
}

export async function GET() {
  try {
    const [images, videos] = await Promise.all([
      fetchCloudinaryResources("image"),
      fetchCloudinaryResources("video"),
    ]);

    const combined = [...images, ...videos].sort(
      (a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json(combined);
  } catch (error) {
    console.error("Wedding photos API error:", error);
    return NextResponse.json([]);
 }
}
