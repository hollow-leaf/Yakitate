"use client"
import { cn } from '@/lib/utils'
import './globals.css'

import { Inter as FontSans } from "next/font/google"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import {configureStore} from "@reduxjs/toolkit"
import { Provider } from "react-redux";
import userSlice from '@/store/userSlice'
// Create a client
const queryClient = new QueryClient()

//store
const store =configureStore({
  reducer:{
    //key: value
    user:userSlice
  },
})

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
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Yakitate</title>
      </Head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col justify-between",
          fontSans.variable
        )}
      >
        <Navbar />
        <div className='flex h-auto w-screen flex-row'>
        {children}
        </div>
        <Footer />
      </body>
    </html>
    </QueryClientProvider>
    </Provider>
  )
}
