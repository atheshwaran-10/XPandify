import "@uploadthing/react/styles.css";
import './globals.css'
import type { Metadata } from 'next'
import { ToastProvider } from "@/components/providers/toaster-provider";
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'X',
  description: 'X',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="../public/images/logo.png"></link>
      <body className={inter.className+"bg-black"}>
         <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
          <ToastProvider/>
            {children}
        </ThemeProvider>
        </body>
    </html>
  )
}
