<script setup lang="ts">
import { useScrollReveal } from '~/composables/useScrollReveal'
useScrollReveal()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
