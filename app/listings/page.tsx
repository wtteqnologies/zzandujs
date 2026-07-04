import { supabase } from '@/lib/supabaseClient'

export default async function ListingsPage() {
  const { data, error } = await supabase.from('zzandujs').select('*')

  console.log(data)
  
  if (error) {
    console.error(error)
    return <div>Error loading profiles</div>
  }

  return (
    <main>
      <h1>Listings</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}