'use client'

// These styles apply to every route in the application
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='de'>
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}
