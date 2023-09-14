import './styles/globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Finance Tracker',
  description: 'Help to organize finances',
  viewport: "user-scalable=no, width=device-width, initial-scale=1.0",
  "apple-mobile-web-app-capable": "yes"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
