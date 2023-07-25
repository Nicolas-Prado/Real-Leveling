import './globals.css'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  login
}: {
  children: React.ReactNode,
  login: React.ReactNode
}) {
  const cookieStore = cookies()

  return (
    <html lang="en">
      <body>{cookieStore.get('SESSIONRL')
        ? children
        : login
      }</body>
    </html>
  )
}
