// app/zzandujs/[id]/page.tsx
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ id: string }>
}

type Category = { 
  title: string | null
  slug: string
}
type Province = { 
  name: string
}
type ZzandujsRow = {
  title: string      // adjust to your column names
  excerpt: string
  website: string 
  telephone: string
  email: string
  address: string
  city: string
  provinces: Province | null
  postal_code: string
  latitude: string
  longitude: string 
  map_url: string
  categories: Category | null
}

export default async function ZzandujsDetailPage({ params }: PageProps) {
  const { id } = await params
  const numericId = Number(id)

  if (Number.isNaN(numericId)) {
    console.error('Bad id param:', id)
    return <div>Invalid id</div>
  }

  const { data, error } = await supabase
    .from('zzandujs')
    //.select('*')
    .select('title, excerpt, website, telephone, email, address, city, provinces (name), postal_code, latitude, longitude, map_url, categories (title, slug)')
    .eq('id', numericId)   // change 'id' if your PK has a different name
    .single()

  if (error) {
    console.error(error)
    return <div>Could not load item</div>
  }

  if (!data) {
    return <div>Item not found</div>
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{data.title}</h1>
      <p>{data.excerpt}</p>
      {/* other fields */}
      <hr />

      <pre>{JSON.stringify(data, null, 2)}</pre>

      <Link href={'/zzandujs'}>
        Back to listings
      </Link>
    </main>
  )
}