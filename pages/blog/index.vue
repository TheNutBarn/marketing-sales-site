<template>
  <!-- Hero -->
  <section
    class="py-16 text-center text-white"
    style="background: linear-gradient(135deg, #8B4513, #5c2d0e)"
  >
    <div class="max-w-2xl mx-auto px-4">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">From The Nut Barn</h1>
      <p class="text-orange-200 text-lg">
        Recipes, gift ideas, market stories, and everything in between.
      </p>
    </div>
  </section>

  <!-- Blog Grid -->
  <section class="py-16 px-4" style="background-color: #f8f6f0">
    <div class="max-w-6xl mx-auto">
      <!-- Empty state -->
      <div v-if="!posts || posts.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">📝</div>
        <h2 class="text-2xl font-bold mb-2" style="color: #8B4513">Posts Coming Soon</h2>
        <p class="text-gray-600 mb-8">
          We're working on recipes, gift guides, and market stories. Check back soon!
        </p>
        <NuxtLink href="/shop" class="btn-primary">Shop Our Nuts →</NuxtLink>
      </div>

      <!-- Posts grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in posts" :key="post.id" class="card flex flex-col">
          <!-- Image placeholder -->
          <div
            class="w-full h-48 rounded-lg mb-4 flex items-center justify-center text-4xl"
            style="background: linear-gradient(135deg, #ede9df, #f8f6f0)"
          >
            🥜
          </div>

          <!-- Categories -->
          <div v-if="post.categories.length > 0" class="flex gap-1.5 flex-wrap mb-3">
            <span
              v-for="cat in post.categories"
              :key="cat"
              class="text-xs font-semibold px-2 py-0.5 rounded-full"
              style="background-color: #ede9df; color: #8B4513"
            >
              {{ cat }}
            </span>
          </div>

          <h2 class="text-lg font-bold mb-2 flex-1" style="color: #8B4513">
            <NuxtLink :href="`/blog/${post.slug}`" class="hover:underline">
              {{ post.title }}
            </NuxtLink>
          </h2>

          <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ post.excerpt }}</p>

          <div class="flex items-center justify-between mt-auto pt-4 border-t" style="border-color: #ede9df">
            <time class="text-xs text-gray-400">
              {{ formatDate(post.date) }}
            </time>
            <NuxtLink
              :href="`/blog/${post.slug}`"
              class="text-sm font-semibold hover:underline"
              style="color: #ff6b35"
            >
              Read More →
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-12 px-4 text-center text-white" style="background-color: #8B4513">
    <h2 class="text-2xl font-bold mb-2">Inspired by a Recipe?</h2>
    <p class="text-orange-200 mb-6">Order fresh cinnamon roasted nuts to try it yourself.</p>
    <NuxtLink href="/shop" class="btn-primary">Shop Now →</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { getPosts } from '~/lib/wordpress'

useSeoMeta({
  title: 'Blog — Recipes, Gift Guides & Behind the Scenes',
  description:
    'Recipes featuring cinnamon roasted nuts, seasonal gift guides, event recaps, and stories from The Nut Barn family business in Dimondale, Michigan.',
})

const { data: posts } = await useAsyncData('blog-posts', () => getPosts(12))

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
