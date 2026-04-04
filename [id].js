import fs from 'fs'
import path from 'path'
import { strapiUrl } from '../../lib/api'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function PostPage({ post }) {
  if (!post) return <div>جاري التحميل...</div>

  return (
    <article className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        تاريخ النشر: {new Date(post.publishedAt).toLocaleDateString('ar-EG')}
      </p>
      {post.imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-6">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}

export async function getStaticPaths() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  let paths = []

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/posts?fields[0]=id`)
      const { data } = await res.json()
      paths = (data || []).map((p) => ({ params: { id: p.id.toString() } }))
    } catch (error) {
      console.error('Failed to get post paths from Strapi:', error.message)
    }
  } else {
    const dataPath = path.join(process.cwd(), 'data', 'sample.json')
    const raw = fs.readFileSync(dataPath, 'utf8')
    const data = JSON.parse(raw)
    paths = (data.posts || []).map((p) => ({ params: { id: p.id.toString() } }))
  }

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/api/posts/${id}?populate=*`)
      const { data } = await res.json()
      const post = { id: data.id, ...data.attributes, imageUrl: data.attributes.image?.data ? strapiUrl(data.attributes.image.data.attributes.url) : null }
      return { props: { post }, revalidate: 60 }
    } catch (error) {
      console.error(`Failed to fetch post ${id} from Strapi:`, error.message)
    }
  }

  const dataPath = path.join(process.cwd(), 'data', 'sample.json')
  const raw = fs.readFileSync(dataPath, 'utf8')
  const data = JSON.parse(raw)
  const post = (data.posts || []).find((p) => p.id.toString() === id)

  return { props: { post: post || null } }
}