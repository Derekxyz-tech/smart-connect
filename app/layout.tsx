import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/components/UserProvider'

export const metadata: Metadata = {
  title: 'CodGeni Education - Plateforme Éducative',
  description: 'Plateforme éducative complète pour administrateurs, professeurs et élèves',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}
