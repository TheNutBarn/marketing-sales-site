import type { Metadata } from 'next'
import Link from 'next/link'
import { getPostBySlug } from '@/lib/wordpress'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #8B4513, #5c2d0e)' }}
      >
        <div className="max-w-3xl mx-auto px-4">
          {post.categories.length > 0 && (
            <div className="flex justify-center gap-2 mb-4">
              {post.categories.map(cat => (
                <span
                  key={cat}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'rgba(255,107,53,0.3)', border: '1px solid rgba(255,107,53,0.5)' }}
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <time className="text-orange-300 text-sm">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
      </section>

      {/* Post content */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-3xl mx-auto">
          {/* Image placeholder */}
          <div
            className="w-full h-64 rounded-2xl mb-10 flex items-center justify-center text-6xl"
            style={{ background: 'linear-gradient(135deg, #ede9df, #f8f6f0)' }}
          >
            🥜
          </div>

          {/* Excerpt as intro — full content from WP would be rendered here */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl leading-relaxed mb-6 text-gray-600">{post.excerpt}</p>
            <p className="text-gray-500 italic">
              Full article content is managed in WordPress. Connect the WordPress CMS to see the complete post.
            </p>
          </div>

          {/* Back to blog */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: '#ede9df' }}>
            <Link
              href="/blog"
              className="text-sm font-semibold hover:underline"
              style={{ color: '#ff6b35' }}
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12 px-4 text-center text-white"
        style={{ backgroundColor: '#8B4513' }}
      >
        <h2 className="text-2xl font-bold mb-3">Ready to Try Our Nuts?</h2>
        <Link href="/shop" className="btn-primary">
          Shop Now →
        </Link>
      </section>
    </>
  )
}
