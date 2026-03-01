<template>
  <div class="min-h-screen flex flex-col" style="background-color:var(--color-cream)">
    <AppHeader />
    <main class="flex-1" id="main-content">
      <slot />
    </main>
    <AppFooter />
    <CartDrawer />
  </div>
</template>
