import { cn } from '@/lib/utils'
import './globals.css'

import { Inter as FontSans } from "next/font/google"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Yakitate</title>
      </Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
