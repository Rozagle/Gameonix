import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gameonix - Premium Gaming Store',
  description: 'Discover the latest games and gaming experiences at Gameonix. Your ultimate gaming destination.',
  keywords: 'games, gaming, video games, PC games, console games, gaming store',
  authors: [{ name: 'Gameonix Team' }],
  openGraph: {
    title: 'Gameonix - Premium Gaming Store',
    description: 'Discover the latest games and gaming experiences at Gameonix',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/20">
            <Navigation />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}