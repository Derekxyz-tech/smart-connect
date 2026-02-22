'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'
import { useUser } from '@/components/UserProvider'

interface Question {
  type: string
  texte: string
  points?: number
  options?: string[]
}

interface Reponse {
  id: string
  eleve_id: string
  reponses: Record<string, unknown>
  note: number | null
  corrige: boolean
  commentaire?: string | null
  submitted_at: string
  corrected_at: string | null
  eleve?: { nom?: string; prenom?: string }
}

export default function QuizResultatsPage() {
  const router = useRouter()
  const params = useParams()
  const quizId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [quiz, setQuiz] = useState<{ titre: string; questions: Question[]; bareme: number } | null>(null)
  const [reponses, setReponses] = useState<Reponse[]>([])
  const [loading, setLoading] = useState(true)
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({})
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [savingId, setSavingId] = useState<string | null>(null)
  const { user: contextUser, loading: authLoading } = useUser()

  useEffect(() => {
    if (authLoading) return
    if (!contextUser || contextUser.role !== 'prof') { router.push('/login'); return }
    setUser(contextUser)
    loadResultats()
  }, [contextUser, authLoading])

  const loadResultats = async () => {
    try {
      const res = await fetch(`/api/quiz/${quizId}/resultats`)
      const data = await res.json()
      if (!res.ok) {
        router.push('/prof/quiz')
        return
      }
      setQuiz(data.quiz)
      setReponses(data.reponses || [])
      const initialNotes: Record<string, string> = {}
      const initialComments: Record<string, string> = {}
      ;(data.reponses || []).forEach((r: Reponse) => {
        initialNotes[r.eleve_id] = r.note != null ? String(r.note) : ''
        initialComments[r.eleve_id] = r.commentaire ?? ''
      })
      setNoteInputs(initialNotes)
      setCommentInputs(initialComments)
    } catch {
      router.push('/prof/quiz')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNote = async (eleveId: string) => {
    const raw = noteInputs[eleveId]
    const note = raw === '' || raw === undefined ? null : parseFloat(raw)
    if (note !== null && (Number.isNaN(note) || note < 0)) return
    setSavingId(eleveId)
    const commentaire = commentInputs[eleveId]?.trim() || null
    try {
      const res = await fetch(`/api/quiz/${quizId}/reponses`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eleve_id: eleveId, note, commentaire }),
      })
      if (!res.ok) {
        const d = await res.json()
        alert(d.error || 'Erreur')
        return
      }
      const data = await res.json()
      setReponses(prev => prev.map(r => r.eleve_id === eleveId ? { ...r, note: data.reponse?.note ?? r.note, commentaire: data.reponse?.commentaire ?? commentaire, corrige: true } : r))
    } finally {
      setSavingId(null)
    }
  }

  const formatRep = (rep: unknown): string => {
    if (rep === true) return 'Vrai'
    if (rep === false) return 'Faux'
    if (typeof rep === 'string') return rep
    return '—'
  }

  if (loading || !user || !quiz) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  const bareme = quiz.bareme ?? 20
  const hasOpenQuestions = quiz.questions.some(q => q.type === 'ouverte')
  const allAutoGraded = !hasOpenQuestions

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center pl-14 pr-4 md:px-8 shadow-sm z-10">
          <Link
            href={`/prof/quiz/${quizId}`}
            className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Retour au quiz"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
          </Link>
          <h2 className="text-xl font-semibold text-slate-800 tracking-tight truncate flex-1 text-center">Résultats · {quiz.titre}</h2>
          <div className="w-9"></div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {allAutoGraded && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                Ce quiz ne contient que des QCM et Vrai/Faux. Les notes sont calculées automatiquement.
              </div>
            )}
            {reponses.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                Aucune réponse soumise pour ce quiz.
              </div>
            ) : (
              reponses.map((r) => {
                const alreadyGraded = r.corrige && r.note != null
                return (
                  <div key={r.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <span className="font-medium text-slate-800">
                            {(r.eleve as any)?.prenom} {(r.eleve as any)?.nom}
                          </span>
                          <span className="text-slate-500 text-sm ml-2">
                            soumis le {new Date(r.submitted_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {allAutoGraded ? (
                            <span className="text-sm font-medium text-slate-700">
                              Note : <span className="text-green-600 font-bold">{r.note != null ? r.note : '—'}</span> / {bareme}
                            </span>
                          ) : alreadyGraded ? (
                            <span className="text-sm font-medium text-slate-700">
                              Note : <span className="text-green-600 font-bold">{r.note}</span> / {bareme}
                              <span className="ml-2 text-xs text-slate-400">(définitive)</span>
                            </span>
                          ) : (
                            <>
                              <label className="text-sm text-slate-600">
                                Note / {bareme} :
                                <input
                                  type="number"
                                  min={0}
                                  max={bareme}
                                  step={0.5}
                                  value={noteInputs[r.eleve_id] ?? ''}
                                  onChange={e => setNoteInputs(prev => ({ ...prev, [r.eleve_id]: e.target.value }))}
                                  className="ml-2 w-20 px-2 py-1 border border-slate-300 rounded text-sm"
                                />
                              </label>
                              <button
                                type="button"
                                onClick={() => handleSaveNote(r.eleve_id)}
                                disabled={savingId === r.eleve_id}
                                className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50"
                              >
                                {savingId === r.eleve_id ? '...' : 'Enregistrer'}
                              </button>
                            </>
                          )}
                          {r.corrige && <span className="text-xs text-green-600 font-medium">Corrigé</span>}
                        </div>
                      </div>
                      {/* Commentaire (note manuelle) : champ ou affichage */}
                      {!allAutoGraded && (
                        <div className="px-6 pt-2 pb-3 border-t border-slate-100 mt-2">
                          {alreadyGraded && r.commentaire ? (
                            <div className="text-sm">
                              <span className="font-medium text-slate-600">Commentaire :</span>
                              <p className="text-slate-700 mt-1 whitespace-pre-wrap bg-slate-50 rounded-lg p-3">{r.commentaire}</p>
                            </div>
                          ) : !alreadyGraded ? (
                            <div>
                              <label className="block text-sm font-medium text-slate-600 mb-1">Commentaire (optionnel)</label>
                              <textarea
                                value={commentInputs[r.eleve_id] ?? ''}
                                onChange={e => setCommentInputs(prev => ({ ...prev, [r.eleve_id]: e.target.value }))}
                                placeholder="Commentaire pour l'élève..."
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      {quiz.questions.map((q, index) => {
                        const rep = (r.reponses || {})[String(index)]
                        const isAuto = q.type === 'qcm' || q.type === 'vrai_faux'
                        return (
                          <div key={index} className="border-b border-slate-100 pb-4 last:border-0">
                            <p className="font-medium text-slate-800 mb-1">
                              {index + 1}. {q.texte}
                              {q.points != null ? <span className="text-slate-500 text-sm ml-2">({q.points} pt)</span> : null}
                            </p>
                            <div className="bg-slate-50 rounded-lg px-3 py-2 text-slate-700 text-sm">
                              <strong>Réponse :</strong> {formatRep(rep)}
                            </div>
                            {isAuto && (
                              <p className="text-green-700 text-xs mt-1 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                                Correction automatique ({q.type === 'qcm' ? 'QCM' : 'Vrai/Faux'})
                              </p>
                            )}
                            {q.type === 'ouverte' && !alreadyGraded && (
                              <p className="text-amber-700 text-xs mt-1">Question ouverte — attribuez la note ci-dessus selon le barème.</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
