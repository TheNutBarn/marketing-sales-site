import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Blog — Recipes, Gift Guides & Behind the Scenes',
  description:
    'Recipes featuring cinnamon roasted nuts, seasonal gift guides, event recaps, and stories from The Nut Barn family business in Dimondale, Michigan.',
}

export default async function BlogPage() {
  const posts = await getPosts(12)

  return (
    <>
      {/* Hero */}
      <section
        className="py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #8B4513, #5c2d0e)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">From The Nut Barn</h1>
          <p className="text-orange-200 text-lg">
            Recipes, gift ideas, market stories, and everything in between.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#8B4513' }}>
                Posts Coming Soon
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;re working on recipes, gift guides, and market stories. Check back soon!
              </p>
              <Link href="/shop" className="btn-primary">
                Shop Our Nuts →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <article key={post.id} className="card flex flex-col">
                  {/* Image placeholder */}
                  <div
                    className="w-full h-48 rounded-lg mb-4 flex items-center justify-center text-4xl"
                    style={{ background: 'linear-gradient(135deg, #ede9df, #f8f6f0)' }}
                  >
                    🥜
                  </div>

                  {/* Categories */}
                  {post.categories.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {post.categories.map(cat => (
                        <span
                          key={cat}
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#ede9df', color: '#8B4513' }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}

                  <h2 className="text-lg font-bold mb-2 flex-1" style={{ color: '#8B4513' }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: '#ede9df' }}>
                    <time className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold hover:underline"
                      style={{ color: '#ff6b35' }}
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12 px-4 text-center text-white"
        style={{ backgroundColor: '#8B4513' }}
      >
        <h2 className="text-2xl font-bold mb-2">Inspired by a Recipe?</h2>
        <p className="text-orange-200 mb-6">
          Order fresh cinnamon roasted nuts to try it yourself.
        </p>
        <Link href="/shop" className="btn-primary">
          Shop Now →
        </Link>
      </section>
    </>
  )
}
