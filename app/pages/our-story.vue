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
        <p class="eyebrow mb-2" style="color:var(--color-mustard);">Dimondale, Michigan</p>
        <h1 style="font-size:clamp(2.5rem,6vw,4rem);color:var(--color-cream-light);">Our Story</h1>
        <p class="mt-3" style="color:rgba(253,246,232,0.8);">Family Business · Dimondale, Michigan · Est. 2023</p>
      </div>
    </section>

    <!-- Story -->
    <section class="px-4 py-16">
      <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start" style="max-width:var(--container-xl);">
        <!-- Stand photo with offset shadow -->
        <div class="relative">
          <div
            class="absolute inset-0 rounded-lg"
            style="background-color:var(--color-denim);transform:translate(8px,8px);z-index:0;"
            aria-hidden="true"
          />
          <img
            :src="'/images/front.jpg'"
            alt="The Nut Barn market stand with yellow canopy at the Holt Farmer's Market"
            class="relative rounded-lg w-full"
            style="z-index:1;object-fit:cover;"
            loading="lazy"
          />
          <!-- Est. badge -->
          <div
            class="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-center z-10"
            style="background-color:var(--color-mustard);border:3px solid var(--color-midnight);"
          >
            <span style="font-family:var(--font-display);font-size:0.7rem;color:var(--color-midnight);line-height:1.2;">Est.<br>2023</span>
          </div>
        </div>

        <!-- Story copy -->
        <div>
          <p class="text-lg mb-6" style="color:var(--color-text);line-height:var(--line-height-relaxed);">
            Our story began in August 2023 when my husband and I decided to embark on a new adventure that we could eventually use to supplement our retirement income and teach our grandchildren the valuable lessons that come with owning your own business.
          </p>

          <!-- Pull quote -->
          <blockquote class="my-8 px-6 py-5 rounded-lg border-l-4" style="background-color:var(--color-cream-light);border-color:var(--color-denim);">
            <p style="font-family:var(--font-heading);font-style:italic;font-size:1.2rem;color:var(--color-denim);line-height:var(--line-height-snug);">
              "I remember these little nut stands being at the mall growing up in the 80s — you could just follow that smell from a hundred yards away."
            </p>
            <footer class="mt-3 text-sm" style="color:var(--color-text-muted);">
              — The Nut Barn founder, on why she started the business
            </footer>
          </blockquote>

          <p class="text-lg mb-6" style="color:var(--color-text);line-height:var(--line-height-relaxed);">
            Much like the nostalgia of the drive-in theatre and big name bands like REO Speedwagon at the County Fair, these little stands fell away and became harder to find outside of the annual Renaissance Fair in Michigan.
          </p>

          <p class="text-lg" style="color:var(--color-text);line-height:var(--line-height-relaxed);">
            It took a little convincing for my husband to take this leap of faith with me, but I knew he would say yes to buying this little nut stand because he's never told me "No" to anything in 26 years of marriage... so we jumped right in with both feet!
          </p>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="px-4 py-12" style="background-color:var(--color-cream-dark);">
      <div class="mx-auto text-center" style="max-width:var(--container-xl);">
        <p class="eyebrow">What Drives Us</p>
        <h2 class="mb-2" style="color:var(--color-denim);">Why We Do It</h2>
        <p class="ornament mb-10">— ✦ —</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div class="p-6 bg-white rounded-lg card-vintage">
            <div class="text-4xl mb-4" aria-hidden="true">👨‍👩‍👧‍👦</div>
            <h3 class="mb-2" style="color:var(--color-denim);">For the Grandkids</h3>
            <p class="text-sm" style="color:var(--color-text-muted);">Teaching the next generation what it means to build something with your own hands.</p>
          </div>
          <div class="p-6 bg-white rounded-lg card-vintage">
            <div class="text-4xl mb-4" aria-hidden="true">🌱</div>
            <h3 class="mb-2" style="color:var(--color-denim);">For Retirement</h3>
            <p class="text-sm" style="color:var(--color-text-muted);">A venture born from a dream — doing what we love on our own schedule.</p>
          </div>
          <div class="p-6 bg-white rounded-lg card-vintage">
            <div class="text-4xl mb-4" aria-hidden="true">🏘️</div>
            <h3 class="mb-2" style="color:var(--color-denim);">For Community</h3>
            <p class="text-sm" style="color:var(--color-text-muted);">Every Saturday at the Holt Farmer's Market — bringing people together over something warm and delicious.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 py-16 text-center">
      <div class="mx-auto" style="max-width:var(--container-sm);">
        <h2 class="mb-4" style="color:var(--color-denim);">Come Find Us at the Market</h2>
        <p class="mb-6" style="color:var(--color-text-muted);">Every Saturday at the Holt Farmer's Market — look for the yellow canopy and the smell of fresh cinnamon.</p>
        <NuxtLink to="/find-us" class="font-bold px-8 py-3.5 rounded btn-vintage" style="background-color:var(--color-orange);color:white;">
          Find Us This Saturday →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
