import { supabase } from '@/lib/supabaseClient'

type ZzandujsRow = {
  id: number
  title: string // change this to match your column
  created_at: string
}

export default async function ZzandujsPage() {
  const { data, error } = await supabase
    .from('zzandujs')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error(error)
    return <div>Error loading zzandujs data</div>
  }

  const rows = (data ?? []) as ZzandujsRow[]

  return (
    <main style={{ padding: 24 }}>
      <h1>zzandujs</h1>
      <ul>
        {rows.map(row => (
          <li key={row.id}>
            <strong>{row.title}</strong> (id: {row.id})
          </li>
        ))}
      </ul>
    </main>
  )
}