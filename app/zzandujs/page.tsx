import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

type Category = { 
  title: string | null
  slug: string
}
type Province = { 
  name: string
  short_name: string
}
type ZzandujsRow = {
  id: number
  title: string      // adjust to your column names
  address: string
  city: string
  provinces: Province | null
  postal_code: string
  categories: Category | null
}

export default async function ZzandujsPage() {
  const { data, error } = await supabase
    .from('zzandujs')
    .select('id, title, address, city, provinces (short_name), postal_code, categories (title, slug)')
    .order('title', { ascending: true })

  if (error) {
    console.error(error)
    return <div>Error loading zzandujs data</div>
  }

  const rows = (data ?? []) as ZzandujsRow[]

  // Temporary use for placeholder
  const img_url = 'https://picsum.photos/200/300'

  return (
    <main
      style={{
        padding: 24,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}
    >
      {rows.map(row => (
        <article
          key={row.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
          }}
        >
          {/* {row.image_url && (
            <img
              src={row.image_url}
              alt={row.title}
              style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
            />
          )} */}
            <img
              src={img_url}
              alt={row.title}
              style={{ width: '100%', borderRadius: 8, marginBottom: 8 }}
            />

          <h2>{row.title}</h2>

          <p>
            {row.categories?.title && (
              <span style={{ fontWeight: 'bold' }}>
                <Link href={`/zzandujs/${row.categories.slug}`}>{row.categories.title}</Link>
              </span>
            )}
          </p>

          <p>
            {row.address}
            <br />
            {row.city}, {row.provinces?.short_name} {row.postal_code}
          </p>

          <Link href={`/zzandujs/${row.id}`}>View details</Link>
        </article>
      ))}
    </main>
  )
}


    {/* <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      {rows.map(row => (
        <article
          key={row.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
          }}
        >
          <h2>{row.title}</h2>
          <p><Link href={'/category/${row.categories?.id}'}>{row.categories?.title}</Link></p>
          <p>{row.address}<br />{row.city}, {row.provinces?.short_name}, {row.postal_code}</p>
          <p>{row.excerpt}</p>

          <Link href={`/zzandujs/${row.id}`}>
            View details
          </Link>
        </article>
      ))}
    </main> */}