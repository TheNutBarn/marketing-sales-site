<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Wholesale — The Nut Barn',
  meta: [
    { name: 'description', content: 'Bring The Nut Barn cinnamon roasted nuts to your store, event, or corporate gift program. Wholesale inquiries welcome.' },
  ],
})

const form = ref({
  name: '',
  companyName: '',
  email: '',
  phone: '',
  businessType: 'Gift Shop',
  estimatedVolume: 'Under 50 units/month',
  message: '',
})
const submitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const useCases = ["Gift shops & boutiques", "Farmer's market vendors", "Corporate gift programs", "Holiday events & parties", "Specialty grocery stores", "Wedding & event favors"]
const businessTypes = ['Gift Shop', "Farmer's Market", 'Corporate Gifts', 'Event Planning', 'Grocery / Specialty Food', 'Other']
const volumes = ['Under 50 units/month', '50–100 units/month', '100–500 units/month', '500+ units/month']

async function submit() {
  if (submitting.value) return
  submitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const res = await $fetch<{ success: true; message: string }>('/api/contact', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        subject: `Wholesale Inquiry — ${form.value.companyName}`,
        message: `Company: ${form.value.companyName}\nPhone: ${form.value.phone}\nBusiness Type: ${form.value.businessType}\nEstimated Volume: ${form.value.estimatedVolume}\n\n${form.value.message}`,
      },
    })
    successMessage.value = res.message
    form.value = { name: '', companyName: '', email: '', phone: '', businessType: 'Gift Shop', estimatedVolume: 'Under 50 units/month', message: '' }
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    errorMessage.value = e?.data?.message ?? 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <section class="px-4 py-14 text-center" style="background:var(--gradient-hero);color:var(--color-text-inverse);">
      <div class="mx-auto" style="max-width:var(--container-md);">
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);">Wholesale</h1>
        <p class="mt-3 text-lg" style="color:rgba(255,255,255,0.85);">
          Bring The Nut Barn to your store, event, or corporate gift program.
        </p>
      </div>
    </section>

    <div class="mx-auto px-4 py-12" style="max-width:var(--container-xl);">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <!-- Why wholesale -->
        <div>
          <h2 class="mb-6" style="color:var(--color-brown);">Who It's For</h2>
          <ul class="space-y-4">
            <li v-for="use in useCases" :key="use" class="flex items-center gap-3">
              <span style="color:var(--color-orange);font-weight:700;">✓</span>
              <span style="color:var(--color-text);">{{ use }}</span>
            </li>
          </ul>
        </div>

        <!-- Details -->
        <div class="rounded-2xl p-6 border" style="background-color:var(--color-cream-warm);border-color:var(--color-border);">
          <h2 class="mb-4" style="color:var(--color-brown);">Wholesale Details</h2>
          <ul class="space-y-3 text-sm" style="color:var(--color-text-muted);">
            <li><strong style="color:var(--color-text);">Minimum order:</strong> Discuss with us — we're flexible for the right partner</li>
            <li><strong style="color:var(--color-text);">Pricing:</strong> Volume-based discounts available</li>
            <li><strong style="color:var(--color-text);">Freshness:</strong> Made to order — we don't keep excess inventory</li>
            <li><strong style="color:var(--color-text);">Custom packaging:</strong> Available for large orders (ask us)</li>
            <li><strong style="color:var(--color-text);">Lead time:</strong> Typically 1–2 weeks for wholesale orders</li>
          </ul>
        </div>
      </div>

      <!-- Inquiry form -->
      <div class="max-w-lg mx-auto">
        <h2 class="mb-6 text-center" style="color:var(--color-brown);">Send an Inquiry</h2>

        <div v-if="successMessage" role="status" class="mb-6 rounded-xl p-4 border" style="background-color:var(--color-success-light);border-color:var(--color-success);color:var(--color-success);">{{ successMessage }}</div>
        <div v-if="errorMessage" role="alert" class="mb-6 rounded-xl p-4 border" style="background-color:var(--color-error-light);border-color:var(--color-error);color:var(--color-error);">{{ errorMessage }}</div>

        <form @submit.prevent="submit" novalidate class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="ws-name" class="block text-sm font-bold mb-1">Contact Name <span style="color:var(--color-error);" aria-hidden="true">*</span></label>
              <input id="ws-name" v-model="form.name" type="text" required autocomplete="name" class="w-full px-3 py-2.5 text-sm rounded-lg border" style="border-color:var(--color-border);" placeholder="Jane Smith" />
            </div>
            <div>
              <label for="ws-company" class="block text-sm font-bold mb-1">Company Name <span style="color:var(--color-error);" aria-hidden="true">*</span></label>
              <input id="ws-company" v-model="form.companyName" type="text" required class="w-full px-3 py-2.5 text-sm rounded-lg border" style="border-color:var(--color-border);" placeholder="Acme Gift Shop" />
            </div>
          </div>

          <div>
            <label for="ws-email" class="block text-sm font-bold mb-1">Email <span style="color:var(--color-error);" aria-hidden="true">*</span></label>
            <input id="ws-email" v-model="form.email" type="email" required autocomplete="email" class="w-full px-3 py-2.5 text-sm rounded-lg border" style="border-color:var(--color-border);" placeholder="jane@acmegifts.com" />
          </div>

          <div>
            <label for="ws-phone" class="block text-sm font-bold mb-1">Phone</label>
            <input id="ws-phone" v-model="form.phone" type="tel" autocomplete="tel" class="w-full px-3 py-2.5 text-sm rounded-lg border" style="border-color:var(--color-border);" placeholder="(517) 555-1234" />
          </div>

          <div>
            <label for="ws-type" class="block text-sm font-bold mb-1">Type of Business</label>
            <select id="ws-type" v-model="form.businessType" class="w-full px-3 py-2.5 text-sm rounded-lg border bg-white" style="border-color:var(--color-border);">
              <option v-for="t in businessTypes" :key="t">{{ t }}</option>
            </select>
          </div>

          <div>
            <label for="ws-volume" class="block text-sm font-bold mb-1">Estimated Monthly Volume</label>
            <select id="ws-volume" v-model="form.estimatedVolume" class="w-full px-3 py-2.5 text-sm rounded-lg border bg-white" style="border-color:var(--color-border);">
              <option v-for="v in volumes" :key="v">{{ v }}</option>
            </select>
          </div>

          <div>
            <label for="ws-message" class="block text-sm font-bold mb-1">Message</label>
            <textarea id="ws-message" v-model="form.message" rows="4" class="w-full px-3 py-2.5 text-sm rounded-lg border resize-none" style="border-color:var(--color-border);" placeholder="Tell us about your business and what you're looking for..." />
          </div>

          <button type="submit" :disabled="submitting" class="w-full font-bold py-3 rounded-full transition-colors disabled:opacity-60" style="background-color:var(--color-orange);color:white;">
            {{ submitting ? 'Sending…' : 'Send Inquiry' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
