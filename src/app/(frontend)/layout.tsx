import React from 'react'
import '../globals.css'
import Link from 'next/link'
import Header from './_components/Header'
import Footer from './_components/Footer'

export const metadata = {
  description: 'An outdoor and nature-themed destination with activities and accommodations.',
  title: 'Great Outdoor Adventures',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
