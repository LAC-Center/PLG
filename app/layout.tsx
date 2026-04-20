import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wise Africa Expansion — Strategic Dashboard',
  description: 'Strategic analysis dashboard validating Wise revenue growth hypothesis via high-cost remittance corridors',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
