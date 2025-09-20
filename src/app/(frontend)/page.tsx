import PageTemplate, { generateMetadata as baseGenerateMetadata } from './[...slug]/page'

// Home page component that passes empty slug array
export default function HomePage() {
  return <PageTemplate params={Promise.resolve({ slug: [] })} />
}

// Metadata generation for home page
export async function generateMetadata() {
  return await baseGenerateMetadata({
    params: Promise.resolve({ slug: [] })
  })
}
