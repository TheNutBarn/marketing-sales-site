<script setup lang="ts">
useHead({
  title: 'Our Story — The Nut Barn',
  meta: [
    { name: 'description', content: "The Nut Barn was founded in 2023 by a husband and wife from Dimondale, Michigan. Read the story behind our handcrafted cinnamon roasted nuts." },
  ],
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="px-4 py-16 text-center" style="background:var(--gradient-hero);color:var(--color-text-inverse);">
      <div class="mx-auto" style="max-width:var(--container-md);">
        <h1 style="font-size:clamp(2.5rem,6vw,4rem);">Our Story</h1>
        <p class="mt-3" style="color:rgba(255,255,255,0.8);">Family Business · Dimondale, Michigan · Est. 2023</p>
      </div>
    </section>

    <!-- Story -->
    <section class="px-4 py-16">
      <div class="mx-auto prose" style="max-width:var(--container-md);">
        <p class="text-lg mb-6" style="color:var(--color-text);line-height:var(--line-height-relaxed);">
          Our story began in August 2023 when my husband and I decided to embark on a new adventure that we could eventually use to supplement our retirement income and teach our grandchildren the valuable lessons that come with owning your own business.
        </p>

        <!-- Pull quote -->
        <blockquote class="my-10 px-8 py-6 rounded-2xl border-l-4" style="background-color:var(--color-cream-warm);border-color:var(--color-orange);">
          <p class="text-xl" style="font-family:var(--font-heading);font-weight:700;color:var(--color-brown);line-height:var(--line-height-snug);">
            "I remember these little nut stands being at the mall growing up in the 80s — you could just follow that smell from a hundred yards away."
          </p>
          <footer class="mt-3 text-sm" style="color:var(--color-text-muted);">
            — The Nut Barn founder, on why she started the business
          </footer>
        </blockquote>

        <p class="text-lg mb-6" style="color:var(--color-text);line-height:var(--line-height-relaxed);">
          Much like the nostalgia of the drive-in theatre and big name bands like REO Speedwagon at the County Fair, these little stands fell away and became harder to find outside of the annual Renaissance Fair in Michigan.
        </p>

        <p class="text-lg mb-10" style="color:var(--color-text);line-height:var(--line-height-relaxed);">
          It took a little convincing for my husband to take this leap of faith with me, but I knew he would say yes to buying this little nut stand because he's never told me "No" to anything in 26 years of marriage... so we jumped right in with both feet!
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="px-4 py-12" style="background-color:var(--color-cream-dark);">
      <div class="mx-auto text-center" style="max-width:var(--container-xl);">
        <h2 class="mb-10" style="color:var(--color-brown);">Why We Do It</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-2xl" style="box-shadow:var(--shadow-sm);">
            <div class="text-4xl mb-4" aria-hidden="true">👨‍👩‍👧‍👦</div>
            <h3 class="mb-2" style="color:var(--color-brown);">For the Grandkids</h3>
            <p class="text-sm" style="color:var(--color-text-muted);">Teaching the next generation what it means to build something with your own hands.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl" style="box-shadow:var(--shadow-sm);">
            <div class="text-4xl mb-4" aria-hidden="true">🌱</div>
            <h3 class="mb-2" style="color:var(--color-brown);">For Retirement</h3>
            <p class="text-sm" style="color:var(--color-text-muted);">A venture born from a dream — doing what we love on our own schedule.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl" style="box-shadow:var(--shadow-sm);">
            <div class="text-4xl mb-4" aria-hidden="true">🏘️</div>
            <h3 class="mb-2" style="color:var(--color-brown);">For Community</h3>
            <p class="text-sm" style="color:var(--color-text-muted);">Every Saturday at the Holt Farmer's Market — bringing people together over something warm and delicious.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 py-16 text-center">
      <div class="mx-auto" style="max-width:var(--container-sm);">
        <h2 class="mb-4" style="color:var(--color-brown);">Come Find Us at the Market</h2>
        <p class="mb-6" style="color:var(--color-text-muted);">Every Saturday at the Holt Farmer's Market — look for the yellow canopy and the smell of fresh cinnamon.</p>
        <NuxtLink to="/find-us" class="font-bold px-8 py-3.5 rounded-full transition-colors" style="background-color:var(--color-orange);color:white;">
          Find Us This Saturday →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
