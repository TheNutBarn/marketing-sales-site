<template>
  <div
    class="overflow-hidden py-3"
    style="background-color:var(--color-mustard);"
    aria-hidden="true"
  >
    <div class="marquee-track">
      <!-- Doubled to create seamless loop -->
      <span
        v-for="i in 2"
        :key="i"
        class="inline-flex items-center gap-6 px-6"
        style="font-family:var(--font-display);font-size:0.9rem;color:var(--color-midnight);letter-spacing:0.05em;"
      >
        <span>Cinnamon Roasted Nuts</span>
        <span style="color:var(--color-orange);">✦</span>
        <span>Every Saturday</span>
        <span style="color:var(--color-orange);">✦</span>
        <span>Holt Farmer's Market</span>
        <span style="color:var(--color-orange);">✦</span>
        <span>Five Simple Ingredients</span>
        <span style="color:var(--color-orange);">✦</span>
        <span>Handcrafted Since 2023</span>
        <span style="color:var(--color-orange);">✦</span>
        <span>Warning: May Be Habit Forming</span>
        <span style="color:var(--color-orange);">✦</span>
        <span>Dimondale, Michigan</span>
        <span style="color:var(--color-orange);">✦</span>
      </span>
    </div>
  </div>
</template>
