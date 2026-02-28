<template>
  <!-- Hero -->
  <section
    class="py-16 text-center text-white"
    style="background: linear-gradient(135deg, #8B4513, #5c2d0e)"
  >
    <div class="max-w-3xl mx-auto px-4">
      <div v-if="post!.categories.length > 0" class="flex justify-center gap-2 mb-4">
        <span
          v-for="cat in post!.categories"
          :key="cat"
          class="text-xs font-semibold px-3 py-1 rounded-full"
          style="background-color: rgba(255,107,53,0.3); border: 1px solid rgba(255,107,53,0.5)"
        >
          {{ cat }}
        </span>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ post!.title }}</h1>
      <time class="text-orange-300 text-sm">{{ formatDate(post!.date) }}</time>
    </div>
  </section>

  <!-- Post content -->
  <section class="py-16 px-4" style="background-color: #f8f6f0">
    <div class="max-w-3xl mx-auto">
      <!-- Image placeholder -->
      <div
        class="w-full h-64 rounded-2xl mb-10 flex items-center justify-center text-6xl"
        style="background: linear-gradient(135deg, #ede9df, #f8f6f0)"
      >
        🥜
      </div>

      <!-- Excerpt as intro — full content from WP rendered here -->
      <div class="prose prose-lg max-w-none text-gray-700">
        <p class="text-xl leading-relaxed mb-6 text-gray-600">{{ post!.excerpt }}</p>
        <p class="text-gray-500 italic">
          Full article content is managed in WordPress. Connect the WordPress CMS to see the complete post.
        </p>
      </div>

      <!-- Back to blog -->
      <div class="mt-12 pt-8 border-t" style="border-color: #ede9df">
        <NuxtLink href="/blog" class="text-sm font-semibold hover:underline" style="color: #ff6b35">
          ← Back to Blog
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-12 px-4 text-center text-white" style="background-color: #8B4513">
    <h2 class="text-2xl font-bold mb-3">Ready to Try Our Nuts?</h2>
    <NuxtLink href="/shop" class="btn-primary">Shop Now →</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { getPostBySlug } from '~/lib/wordpress'

const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`post-${slug}`, () => getPostBySlug(slug))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.excerpt,
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
