import { redirect } from 'next/navigation'
import { getCurrentUserFromCookies } from '@/lib/auth'
import Sidebar from '@/components/Sidebar'
import DashboardStats from '@/components/DashboardStats'
import { getSupabaseAdmin } from '@/lib/supabase'

export default async function AdminDashboard() {
  const user = await getCurrentUserFromCookies()

  if (!user || user.role !== 'admin') {
    redirect('/login')
  }

  // Récupérer les stats directement depuis Supabase
  const supabase = getSupabaseAdmin()

  const [eleves, profs, elevesBloques, avis, datesImportantes, nouveauxComptes, changementsStatut] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact' }).eq('role', 'eleve').eq('actif', true),
    supabase.from('users').select('id', { count: 'exact' }).eq('role', 'prof').eq('actif', true),
    supabase.from('users').select('id', { count: 'exact' }).eq('role', 'eleve').eq('actif', false),
    supabase.from('avis').select('id', { count: 'exact' }),
    supabase.from('evenements').select('id', { count: 'exact' }).eq('type', 'date_importante'),
    supabase.from('users').select('id, nom, role, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('users').select('id, nom, role, actif, created_at').eq('role', 'eleve').order('created_at', { ascending: false }).limit(10),
  ])

  // Filtrer les changements de statut récents (élèves bloqués/débloqués)
  const changementsRecents = changementsStatut.data?.filter((user, index, self) => {
    // Trouver les changements de statut (actif -> inactif ou vice versa)
    // Pour simplifier, on prend les 5 derniers élèves avec leur statut actuel
    return index < 5
  }) || []

  const stats = {
    eleves: eleves.count || 0,
    profs: profs.count || 0,
    elevesBloques: elevesBloques.count || 0,
    avis: avis.count || 0,
    datesImportantes: datesImportantes.count || 0,
  }

  const activites = {
    nouveauxComptes: nouveauxComptes.data || [],
    changementsStatut: changementsRecents,
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-center pl-14 pr-4 md:px-8 shadow-sm z-10">
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight truncate">Tableau de bord</h2>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <DashboardStats role="admin" stats={stats} activites={activites} />
          </div>
        </main>
      </div>
    </div>
  )
}
