import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story — The Nut Barn Family Business',
  description:
    'Learn how The Nut Barn was born from nostalgia, a 26-year marriage, and a little nut stand at the Holt Farmer\'s Market in Michigan. A family business, Est. 2023.',
}

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-16 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #8B4513, #5c2d0e)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-orange-200 text-lg">
            A family adventure rooted in nostalgia, community, and really good nuts.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f6f0' }}>
        <div className="max-w-3xl mx-auto">
          {/* Founder photo placeholder */}
          <div
            className="w-full h-64 md:h-80 rounded-2xl mb-12 flex flex-col items-center justify-center text-white text-center"
            style={{ background: 'linear-gradient(135deg, #8B4513, #ff6b35)' }}
          >
            <span className="text-6xl mb-3">🥜</span>
            <p className="text-lg font-semibold">The Nut Barn — Founders Photo Coming Soon</p>
            <p className="text-sm text-orange-200 mt-1">Est. 2023 · Dimondale, Michigan</p>
          </div>

          {/* Full story — verbatim from current site */}
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Our story began in August 2023 when my husband and I decided to embark on a new adventure
              that we could eventually use to supplement our retirement income and teach our grandchildren
              the valuable lessons that come with owning your own business.
            </p>
            <p>
              I remember these little nut stands being at the mall growing up in the 80s and you could
              just follow that smell from a hundred yards away, but much like the nostalgia of the drive
              in theatre and big name bands like REO Speedwagon at the County Fair, these little stands
              fell away and became harder to find outside of the annual Renaissance Fair in Michigan.
            </p>
            <p>
              It took a little convincing for my husband to take this leap of faith with me but I knew he
              would say yes to buying this little nut stand because he&apos;s never told me &ldquo;No&rdquo; to anything
              in 26 years of marriage....so we jumped right in with both feet!
            </p>
            <p>
              I found a permanent home in the Holt Farmer&apos;s Market and began booking events all around
              our community. Before long, we had &ldquo;regulars&rdquo; who would come to market just to see us for
              Hot Chocolate and Roasted Nuts! Organizers were then making space for us all around the
              community and we became the perfect edition to nearly any event!
            </p>
            <p>
              People would follow the smell and say &ldquo;Oh.. I am SO glad you&apos;re here!...we just LOVE
              these&rdquo;. Over time, we have come to recognize, and look forward to seeing, the friendly faces
              that follow and support us! We appreciate each and every one of you!
            </p>
            <p>
              Our roasted nuts are vegan and gluten free and contain only FIVE simple ingredients! They go
              great on salad, ice cream, oatmeal, or just as a quick snack on the go!
            </p>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 px-4" style={{ backgroundColor: '#ede9df' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">What We Stand For</h2>
          <div className="section-divider" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Family Business',
                body: 'This is a family venture, built to teach our grandchildren the rewards — and realities — of owning something of your own.',
              },
              {
                icon: '🌍',
                title: 'Community First',
                body: 'We show up at local markets, festivals, and community events because we believe in investing in the places we call home.',
              },
              {
                icon: '🌱',
                title: 'Vegan & Gluten-Free',
                body: 'Every product we make is plant-based and gluten-free — so almost anyone can enjoy a warm bag of nuts.',
              },
              {
                icon: '🤚',
                title: '5 Simple Ingredients',
                body: 'We use only five simple, recognizable ingredients. No fillers, no mystery. You know exactly what you\'re eating.',
              },
            ].map(value => (
              <div key={value.title} className="card">
                <div className="text-3xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#8B4513' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12 px-4 text-center text-white"
        style={{ backgroundColor: '#8B4513' }}
      >
        <h2 className="text-2xl font-bold mb-3">Ready to Try Them?</h2>
        <p className="text-orange-200 mb-6">
          Order online or find us at the Holt Farmer&apos;s Market every Saturday.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-primary">
            Shop Online →
          </Link>
          <Link
            href="/find-us"
            className="inline-block px-6 py-3 rounded-full font-semibold border-2 border-white text-white hover:bg-white transition-all duration-200"
          >
            Find Us In Person
          </Link>
        </div>
      </section>
    </>
  )
}
