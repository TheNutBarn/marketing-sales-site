<template>
  <!-- Hero -->
  <section
    class="py-16 text-center text-white"
    style="background: linear-gradient(135deg, #8B4513, #5c2d0e)"
  >
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
      <p class="text-orange-200 text-lg">
        Questions, orders, events, or just want to say hi — we'd love to hear from you.
      </p>
    </div>
  </section>

  <section class="py-16 px-4" style="background-color: #f8f6f0">
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
      <!-- Contact Info -->
      <div class="md:col-span-2 space-y-6">
        <div>
          <h2 class="text-2xl font-bold mb-6" style="color: #8B4513">Get in Touch</h2>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <span class="text-2xl">📧</span>
              <div>
                <p class="font-semibold text-sm" style="color: #8B4513">Email</p>
                <a href="mailto:thenutbarnllc@gmail.com" class="text-gray-600 hover:text-orange-600 transition-colors text-sm">
                  thenutbarnllc@gmail.com
                </a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-2xl">📞</span>
              <div>
                <p class="font-semibold text-sm" style="color: #8B4513">Phone</p>
                <a href="tel:+15174109029" class="text-gray-600 hover:text-orange-600 transition-colors text-sm">
                  (517) 410-9029
                </a>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-2xl">📍</span>
              <div>
                <p class="font-semibold text-sm" style="color: #8B4513">Location</p>
                <p class="text-gray-600 text-sm">Dimondale, Michigan</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="font-bold mb-3" style="color: #8B4513">Find Us</h3>
          <p class="text-sm text-gray-600 mb-1">🏪 Holt Farmer's Market — Every Saturday 9am–2pm</p>
          <p class="text-sm text-gray-500">Plus community events around Mid-Michigan.</p>
        </div>

        <div>
          <h3 class="font-bold mb-3" style="color: #8B4513">Follow Us</h3>
          <div class="flex gap-3">
            <a
              href="https://www.facebook.com/thenutbarn"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-full text-sm font-semibold text-white hover:opacity-80 transition-opacity"
              style="background-color: #1877F2"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/thenutbarn"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-full text-sm font-semibold text-white hover:opacity-80 transition-opacity"
              style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="md:col-span-3 card">
        <!-- Success state -->
        <div v-if="status === 'success'" class="text-center py-8">
          <div class="text-5xl mb-4">✅</div>
          <h3 class="text-2xl font-bold mb-2" style="color: #8B4513">Message Sent!</h3>
          <p class="text-gray-600">
            Thanks for reaching out! We'll get back to you within 1–2 business days.
          </p>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-5">
          <h2 class="text-xl font-bold mb-6" style="color: #8B4513">Send a Message</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-semibold mb-1 text-gray-700">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Your name"
                class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                style="border-color: #ede9df"
              />
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
                placeholder="your@email.com"
                class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                style="border-color: #ede9df"
              />
            </div>
          </div>

          <div>
            <label for="subject" class="block text-sm font-semibold mb-1 text-gray-700">Subject</label>
            <select
              id="subject"
              v-model="form.subject"
              class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              style="border-color: #ede9df"
            >
              <option value="">Select a topic...</option>
              <option value="General Question">General Question</option>
              <option value="Order Inquiry">Order Inquiry</option>
              <option value="Event Inquiry">Book Us for an Event</option>
              <option value="Wholesale Inquiry">Wholesale / Bulk Order</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-semibold mb-1 text-gray-700">
              Message <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="5"
              placeholder="How can we help you?"
              class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-y"
              style="border-color: #ede9df"
            />
          </div>

          <p v-if="status === 'error'" class="text-red-600 text-sm">
            Something went wrong. Please try again or email us directly at thenutbarnllc@gmail.com.
          </p>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="btn-primary w-full py-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {{ status === 'sending' ? 'Sending...' : 'Send Message →' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Contact Us — The Nut Barn',
  description:
    'Get in touch with The Nut Barn. Questions about ordering, event bookings, wholesale inquiries, or anything else — we love hearing from you.',
})

const form = reactive({ name: '', email: '', subject: '', message: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function handleSubmit() {
  status.value = 'sending'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    status.value = 'success'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch {
    status.value = 'error'
  }
}
</script>
