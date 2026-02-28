<template>
  <footer class="text-white mt-16" style="background-color: #5c2d0e">
    <div class="max-w-6xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Contact -->
        <div>
          <h3 class="text-lg font-bold mb-4" style="color: #ff6b35">Contact Us</h3>
          <ul class="space-y-2 text-orange-100 text-sm">
            <li>
              <a href="mailto:thenutbarnllc@gmail.com" class="hover:text-white transition-colors">
                📧 thenutbarnllc@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+15174109029" class="hover:text-white transition-colors">
                📞 (517) 410-9029
              </a>
            </li>
            <li>📍 Dimondale, Michigan</li>
          </ul>
        </div>

        <!-- Payment Methods -->
        <div>
          <h3 class="text-lg font-bold mb-4" style="color: #ff6b35">Payment Methods</h3>
          <ul class="space-y-2 text-orange-100 text-sm">
            <li>💳 Square</li>
            <li>💰 PayPal</li>
            <li>📱 Venmo @nutbarn</li>
          </ul>
        </div>

        <!-- Follow + Links -->
        <div>
          <h3 class="text-lg font-bold mb-4" style="color: #ff6b35">Follow Us</h3>
          <div class="flex gap-3 mb-6">
            <a
              href="https://www.facebook.com/thenutbarn"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-80"
              style="background-color: #1877F2"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/thenutbarn"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-80"
              style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
            >
              Instagram
            </a>
          </div>
          <nav class="flex flex-col gap-1">
            <NuxtLink
              v-for="link in FOOTER_LINKS"
              :key="link.href"
              :href="link.href"
              class="text-sm text-orange-200 hover:text-white transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-orange-200"
        style="border-color: rgba(255,255,255,0.15)"
      >
        <p>© {{ new Date().getFullYear() }} The Nut Barn LLC. All rights reserved.</p>
        <p>🌱 Vegan · 🌾 Gluten-Free · 🤚 5 Simple Ingredients · 💛 Family Business Est. 2023</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const FOOTER_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/find-us', label: 'Find Us' },
  { href: '/faq', label: 'FAQ' },
  { href: '/wholesale', label: 'Wholesale' },
]
</script>
