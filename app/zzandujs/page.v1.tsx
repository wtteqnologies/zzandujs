// app/zzandujs/page.tsx
import { supabase } from '@/lib/supabaseClient'

export default async function ZzandujsPage() {
  const { data, error } = await supabase.from('zzandujs').select('*')

  if (error) {
    console.error(error)
    return <div>Error loading zzandujs data</div>
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>zzandujs rows</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}