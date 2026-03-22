<script setup lang="ts">
useHead({
  title: 'Page Not Found — The Nut Barn',
})
</script>

<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
    <div class="text-6xl mb-6" aria-hidden="true">🥜</div>
    <h1 class="mb-3" style="font-size:clamp(1.75rem,4vw,2.5rem);color:var(--color-denim);">Page Not Found</h1>
    <p class="text-lg mb-8" style="color:var(--color-text-muted);">Looks like this page ran off to the farmer's market without us.</p>

    <div class="flex flex-wrap justify-center gap-4 mb-10">
      <NuxtLink
        to="/shop"
        class="font-bold px-6 py-3 rounded btn-vintage"
        style="background-color:var(--color-orange);color:white;"
      >
        Looking for our products? →
      </NuxtLink>
      <NuxtLink
        to="/find-us"
        class="font-bold px-6 py-3 rounded border-2 btn-vintage"
        style="border-color:var(--color-denim);color:var(--color-denim);"
      >
        Market schedule? →
      </NuxtLink>
    </div>

    <NuxtLink to="/" style="color:var(--color-text-muted);">← Go Home</NuxtLink>
  </div>
</template>
