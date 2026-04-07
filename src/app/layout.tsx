import "./globals.css"

import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata = {
  title: "Karolína & Bharadwaj",
  icons: {
    icon: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
<link rel="icon" href="/icon.png" />
<link rel="apple-touch-icon" href="/icon.png" />
<body>
  <div className="w-full overflow-x-hidden">
    {children}
  </div>
</body>
    </html>
  )
}
