<template>
  <!-- Hero -->
  <section
    class="py-16 text-center text-white"
    style="background: linear-gradient(135deg, #8B4513, #5c2d0e)"
  >
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
      <p class="text-orange-200 text-lg">
        Everything you need to know about our nuts, ordering, events, and more.
      </p>
    </div>
  </section>

  <!-- FAQ -->
  <section class="py-16 px-4" style="background-color: #f8f6f0">
    <div class="max-w-3xl mx-auto space-y-12">
      <div v-for="category in categories" :key="category">
        <h2
          class="text-2xl font-bold mb-6 pb-2 border-b-2"
          style="color: #8B4513; border-color: #ff6b35"
        >
          {{ category }}
        </h2>
        <div class="space-y-4">
          <details
            v-for="(item, i) in itemsByCategory(category)"
            :key="i"
            class="card group open:ring-2 open:ring-orange-400"
          >
            <summary
              class="cursor-pointer font-semibold list-none flex justify-between items-start gap-4"
              style="color: #8B4513"
            >
              <span>{{ item.question }}</span>
              <span
                class="flex-shrink-0 text-lg group-open:rotate-45 transition-transform duration-200"
                style="color: #ff6b35"
              >
                +
              </span>
            </summary>
            <p class="mt-4 text-gray-600 leading-relaxed">{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-12 px-4 text-center text-white" style="background-color: #8B4513">
    <h2 class="text-2xl font-bold mb-2">Still Have Questions?</h2>
    <p class="text-orange-200 mb-6">We're happy to help — reach out anytime.</p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <NuxtLink href="/contact" class="btn-primary">Contact Us →</NuxtLink>
      <NuxtLink
        href="/shop"
        class="inline-block px-6 py-3 rounded-full font-semibold border-2 border-white text-white hover:bg-white transition-all duration-200"
      >
        Shop Now
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const FAQ_ITEMS = [
  // Ingredients & Dietary
  { question: 'Are your roasted nuts vegan?', answer: 'Yes! Every product we make at The Nut Barn is 100% vegan. We use only plant-based ingredients with no animal products of any kind.', category: 'Ingredients & Dietary' },
  { question: 'Are your products gluten-free?', answer: 'Yes — all of our cinnamon roasted nuts are gluten-free. We use only 5 simple ingredients, none of which contain gluten.', category: 'Ingredients & Dietary' },
  { question: 'What are the 5 ingredients in your roasted nuts?', answer: "We use 5 simple, wholesome ingredients in our cinnamon roasted nuts. We keep the exact recipe close to the chest — but you'll recognize every single one of them! No preservatives, no artificial flavors, and nothing you can't pronounce.", category: 'Ingredients & Dietary' },
  { question: 'Do your nuts contain any common allergens?', answer: 'Our products do contain tree nuts. They are made in an environment that processes nuts. If you have a severe tree nut allergy, please contact us before ordering. We do not use peanuts, gluten, dairy, or eggs.', category: 'Ingredients & Dietary' },
  { question: 'Are your products good for people with dietary restrictions?', answer: 'Our cinnamon roasted nuts are vegan, gluten-free, and dairy-free — making them a great snack for many dietary lifestyles including plant-based, paleo-friendly, and Whole30-adjacent diets. Always check with your healthcare provider for specific medical dietary needs.', category: 'Ingredients & Dietary' },
  // Ordering & Shipping
  { question: 'Can I order online?', answer: "Yes! You can order directly from our Shop page. Add products to your cart and proceed to checkout — your order is sent to us via email, and we'll confirm payment and shipping details within 1–2 business days.", category: 'Ordering & Shipping' },
  { question: 'Do you ship nationwide?', answer: 'Yes, we ship our cinnamon roasted nuts anywhere in the United States. Shipping costs and timelines will be confirmed when we reply to your order email.', category: 'Ordering & Shipping' },
  { question: 'How long does shipping take?', answer: 'Most orders ship within 1–2 business days of payment confirmation. Delivery typically takes 3–5 business days via USPS or UPS, depending on your location.', category: 'Ordering & Shipping' },
  { question: 'What payment methods do you accept?', answer: "We currently accept Square, PayPal, and Venmo (@nutbarn). In-person at the farmer's market, we also accept cash. Credit card payment directly on this website is coming soon!", category: 'Ordering & Shipping' },
  { question: 'How long do the nuts stay fresh?', answer: 'Our roasted nuts are freshest within 2 weeks of purchase when stored in a cool, dry place. They can last up to 4–6 weeks sealed. We recommend enjoying them as soon as possible for the best flavor!', category: 'Ordering & Shipping' },
  // Products & Pricing
  { question: 'What sizes do you offer?', answer: 'We offer 6 oz ($10), 8 oz ($15), and 15 oz ($23) bags of cinnamon roasted nuts. We also offer custom holiday gift baskets starting at $40. Visit our Shop page for full details.', category: 'Products & Pricing' },
  { question: "What's the difference between the bag sizes?", answer: "All three bags contain the exact same delicious cinnamon roasted nuts — it's just a matter of how much you want! The 6 oz is perfect for personal snacking or a small gift. The 8 oz is our most popular \"just right\" size. The 15 oz family size is great value for households or generous gifts.", category: 'Products & Pricing' },
  { question: 'What are the best uses for cinnamon roasted nuts?', answer: "They're incredibly versatile! Enjoy them as a snack on the go, sprinkle on a salad for a warm crunch, add to oatmeal or yogurt, spoon over vanilla ice cream (our personal favorite), or include them in a cheese and charcuterie board. The possibilities are delicious.", category: 'Products & Pricing' },
  // Events & Schedule
  { question: 'Where can I find The Nut Barn in person?', answer: "Our permanent home is the Holt Farmer's Market in Holt, Michigan — every Saturday from 9am to 2pm. We also attend festivals, fairs, and community events around Mid-Michigan. Check our Find Us page for the full schedule.", category: 'Events & Schedule' },
  { question: 'Can I book The Nut Barn for my event?', answer: "Absolutely! We love participating in community events, festivals, corporate gatherings, and private parties. Use our Contact page to send us an inquiry — include your event date, location, and expected attendance, and we'll be in touch.", category: 'Events & Schedule' },
  // Gifting
  { question: 'Do you offer gift baskets?', answer: 'Yes! Our Holiday Gift Baskets start at $40 and can be customized for any occasion — holidays, birthdays, corporate gifting, or thank-you gifts. Contact us to discuss your custom order.', category: 'Gifting' },
  { question: 'Do you offer wholesale or bulk pricing?', answer: 'Yes — we offer bulk pricing for businesses, restaurants, event planners, and gift shops. Visit our Wholesale page or contact us directly to discuss volume pricing.', category: 'Gifting' },
  { question: 'Can I get a custom order for a wedding or corporate event?', answer: "We love custom orders! Whether you need branded packaging for a corporate event or personalized gift bags for a wedding, reach out via our Contact page and we'll work with you to make it happen.", category: 'Gifting' },
]

const categories = [...new Set(FAQ_ITEMS.map(f => f.category))]

function itemsByCategory(category: string) {
  return FAQ_ITEMS.filter(item => item.category === category)
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

useSeoMeta({
  title: 'FAQ — Frequently Asked Questions',
  description:
    "Answers to common questions about The Nut Barn's cinnamon roasted nuts — ingredients, ordering, shipping, events, gifting, and more.",
})

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(faqSchema) }],
})
</script>
