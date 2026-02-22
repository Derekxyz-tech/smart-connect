import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/components/UserProvider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Collège Saint-Michel - Plateforme Éducative',
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
