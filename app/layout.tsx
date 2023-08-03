import './globals.css'
import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HomePage',
  description: 'Home',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
