import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase'

const TABLE = 'programme_annee'
const BUCKET = 'fichiers'
const FOLDER = 'programme-annee'
const MAX_SIZE = 15 * 1024 * 1024

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('uploaded_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ programme: data })
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Seuls les fichiers PDF sont acceptés.' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'Fichier trop volumineux (max 15 Mo).' }, { status: 400 })
  }

  try {
    const supabase = getSupabaseAdmin()

    const safeName = file.name.slice(0, 60).replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath = `${FOLDER}/${crypto.randomUUID()}-${safeName}`

    const body = await file.arrayBuffer()

    const ensureBucket = async (name: string) => {
      const { error } = await supabase.storage.createBucket(name, { public: true })
      if (error && !/already/i.test(error.message)) {
        /* bucket exists – ok */
      }
    }

    await ensureBucket(BUCKET)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, body, { contentType: 'application/pdf', upsert: false })

    if (uploadError || !uploadData) {
      return NextResponse.json(
        { error: (uploadError as { message?: string })?.message || 'Erreur upload' },
        { status: 500 },
      )
    }

    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(uploadData.path)
    const publicUrl = urlData.publicUrl

    const { error: insertError } = await supabase.from(TABLE).insert({
      nom_fichier: file.name,
      url: publicUrl,
      taille: file.size,
      uploaded_by: user.id,
    })

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({
      programme: {
        nom_fichier: file.name,
        url: publicUrl,
        taille: file.size,
        uploaded_at: new Date().toISOString(),
      },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
