import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/app/_components/navbar.component"

export const metadata: Metadata = {
  title: "Skin Match",
  description: "Find ingredients suited for different skin types",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-[76.8px]">{children}</main>
      </body>
    </html>
  )
}
