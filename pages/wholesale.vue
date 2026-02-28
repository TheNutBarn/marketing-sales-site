<template>
  <!-- Hero -->
  <section
    class="py-16 text-center text-white"
    style="background: linear-gradient(135deg, #8B4513, #5c2d0e)"
  >
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Wholesale &amp; Bulk Orders</h1>
      <p class="text-orange-200 text-lg">
        Bring The Nut Barn to your business, event, or gift program.
      </p>
    </div>
  </section>

  <section class="py-16 px-4" style="background-color: #f8f6f0">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
      <!-- Info -->
      <div class="md:col-span-2 space-y-6">
        <h2 class="text-2xl font-bold" style="color: #8B4513">Great For</h2>
        <div class="space-y-4">
          <div v-for="item in WHOLESALE_USES" :key="item.title" class="card">
            <div class="text-2xl mb-1">{{ item.icon }}</div>
            <h3 class="font-bold text-sm mb-1" style="color: #8B4513">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.body }}</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="md:col-span-3 card">
        <!-- Success state -->
        <div v-if="status === 'success'" class="text-center py-8">
          <div class="text-5xl mb-4">✅</div>
          <h3 class="text-2xl font-bold mb-2" style="color: #8B4513">Inquiry Sent!</h3>
          <p class="text-gray-600">
            Thanks for your interest! We'll be in touch within 1–2 business days with wholesale pricing and details.
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-5">
          <h2 class="text-xl font-bold mb-6" style="color: #8B4513">Wholesale Inquiry</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-semibold mb-1 text-gray-700">
                Your Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Jane Smith"
                class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                style="border-color: #ede9df"
              />
            </div>
            <div>
              <label for="business" class="block text-sm font-semibold mb-1 text-gray-700">
                Business Name <span class="text-red-500">*</span>
              </label>
              <input
                id="business"
                v-model="form.business"
                type="text"
                required
                placeholder="Acme Gift Shop"
                class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                style="border-color: #ede9df"
              />
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-semibold mb-1 text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              placeholder="jane@yourbusiness.com"
              class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none"
              style="border-color: #ede9df"
            />
          </div>

          <div>
            <label for="quantity" class="block text-sm font-semibold mb-1 text-gray-700">
              Estimated Monthly Quantity
            </label>
            <select
              id="quantity"
              v-model="form.quantity"
              class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none bg-white"
              style="border-color: #ede9df"
            >
              <option value="">Select a range...</option>
              <option value="10–25 bags">10–25 bags</option>
              <option value="25–50 bags">25–50 bags</option>
              <option value="50–100 bags">50–100 bags</option>
              <option value="100+ bags">100+ bags</option>
              <option value="One-time event order">One-time event order</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-semibold mb-1 text-gray-700">
              Tell us more
            </label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              placeholder="What products are you interested in? Any special packaging or branding needs?"
              class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-y"
              style="border-color: #ede9df"
            />
          </div>

          <p v-if="status === 'error'" class="text-red-600 text-sm">
            Something went wrong. Email us directly at thenutbarnllc@gmail.com.
          </p>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="btn-primary w-full py-3 disabled:opacity-60"
          >
            {{ status === 'sending' ? 'Sending...' : 'Send Wholesale Inquiry →' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Wholesale & Bulk Orders — The Nut Barn',
  description:
    'Wholesale and bulk pricing for retailers, restaurants, corporate gifting, and events. Contact The Nut Barn for volume pricing on cinnamon roasted nuts.',
})

const form = reactive({ name: '', business: '', email: '', quantity: '', message: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const WHOLESALE_USES = [
  { icon: '🏪', title: 'Retail / Gift Shops', body: 'Stock our nuts in your store. Customers love finding local, artisan snacks.' },
  { icon: '🍽️', title: 'Restaurants & Cafes', body: 'Add cinnamon roasted nuts to your menu as a topping, snack, or dessert component.' },
  { icon: '🎁', title: 'Corporate Gifting', body: 'Branded or unbranded gift sets for employee appreciation, client gifts, or events.' },
  { icon: '🎉', title: 'Events & Weddings', body: 'Personalized nut bags as party favors or dessert table features.' },
]

async function handleSubmit() {
  status.value = 'sending'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        subject: `Wholesale Inquiry — ${form.business}`,
        message: `Business: ${form.business}\nEstimated quantity: ${form.quantity}\n\n${form.message}`,
      },
    })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>
