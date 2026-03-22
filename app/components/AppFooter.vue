<template>
  <footer style="background-color:var(--color-midnight);color:var(--color-text-inverse);border-top:2px solid var(--color-orange);" class="mt-auto">
    <div class="mx-auto px-4 py-12" style="max-width:var(--container-xl);">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand column -->
        <div class="md:col-span-1">
          <p class="mb-2" style="font-family:var(--font-display);font-size:1.125rem;color:var(--color-mustard);">The Nut Barn</p>
          <p class="text-sm mb-4" style="color:rgba(253,246,232,0.7);">
            Handcrafted cinnamon roasted nuts. Fresh from the Holt Farmer's Market every Saturday.
          </p>
          <p class="text-sm mb-1">
            <a href="tel:5174109029" class="transition-colors" style="color:var(--color-cream-light);">(517) 410-9029</a>
          </p>
          <p class="text-sm" style="color:rgba(253,246,232,0.6);">Dimondale, Michigan</p>
        </div>

        <!-- Products -->
        <div>
          <h3 class="text-sm uppercase mb-4" style="font-family:var(--font-body);letter-spacing:var(--letter-spacing-wider);color:var(--color-mustard);">Products</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/shop" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">6 oz Roasted Nuts</NuxtLink></li>
            <li><NuxtLink to="/shop" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">8 oz Roasted Nuts</NuxtLink></li>
            <li><NuxtLink to="/shop" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">15 oz Roasted Nuts</NuxtLink></li>
            <li><NuxtLink to="/shop" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">Holiday Gift Basket</NuxtLink></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-sm uppercase mb-4" style="font-family:var(--font-body);letter-spacing:var(--letter-spacing-wider);color:var(--color-mustard);">Company</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/our-story" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">Our Story</NuxtLink></li>
            <li><NuxtLink to="/find-us" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">Find Us</NuxtLink></li>
            <li><NuxtLink to="/blog" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">Blog</NuxtLink></li>
            <li><NuxtLink to="/contact" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">Contact</NuxtLink></li>
            <li><NuxtLink to="/wholesale" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">Wholesale</NuxtLink></li>
          </ul>
        </div>

        <!-- Info -->
        <div>
          <h3 class="text-sm uppercase mb-4" style="font-family:var(--font-body);letter-spacing:var(--letter-spacing-wider);color:var(--color-mustard);">Info</h3>
          <ul class="space-y-2 text-sm mb-6">
            <li><NuxtLink to="/faq" class="transition-colors hover:opacity-80" style="color:var(--color-cream-light);">FAQ</NuxtLink></li>
          </ul>
          <h3 class="text-sm uppercase mb-2" style="font-family:var(--font-body);letter-spacing:var(--letter-spacing-wider);color:var(--color-mustard);">We Accept</h3>
          <p class="text-sm" style="color:rgba(253,246,232,0.7);">Venmo @nutbarn · Square · PayPal</p>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style="border-color:rgba(201,67,26,0.3);">
        <p class="text-sm" style="color:rgba(253,246,232,0.5);">
          &copy; {{ new Date().getFullYear() }} The Nut Barn LLC. All rights reserved.
        </p>
        <p class="text-xs" style="color:rgba(253,246,232,0.4);">Family Business · Dimondale, MI · Est. 2023</p>
      </div>
    </div>
  </footer>
</template>
