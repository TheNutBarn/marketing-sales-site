<template>
  <div>
    <Header />
    <CartDrawer />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Nut Barn",
  description:
    "Fresh cinnamon roasted nuts — vegan, gluten-free, made with only 5 simple ingredients. Family business serving Mid-Michigan since 2023.",
  url: "https://thenutbarn.com",
  telephone: "+15174109029",
  email: "thenutbarnllc@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dimondale",
    addressRegion: "MI",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "42.6459",
    longitude: "-84.6474",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  servesCuisine: "Snacks",
  priceRange: "$",
  sameAs: [
    "https://www.facebook.com/thenutbarn",
    "https://www.instagram.com/thenutbarn",
  ],
  foundingDate: "2023",
};

// Env-aware title prefix so non-production tabs are easy to identify
const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV;
const prefix =
  env === "production"
    ? ""
    : env === "preview"
      ? "[Preview] "
      : env === "local"
        ? "[Local] "
        : "[Dev] ";

useSeoMeta({
  titleTemplate: `${prefix}%s | The Nut Barn`,
  description:
    "Fresh cinnamon roasted nuts — vegan, gluten-free, made with 5 simple ingredients. Visit us at the Holt Farmer's Market every Saturday, or order online. Dimondale, Michigan.",
  ogSiteName: "The Nut Barn",
  ogLocale: "en_US",
  ogType: "website",
  robots: "index, follow",
});

useHead({
  htmlAttrs: { lang: "en" },
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(localBusinessSchema),
    },
  ],
});

// Handle legacy hash-route redirects from the old Netlify SPA
// (hash fragments are client-side only; this replicates what the old next.config.js attempted)
const router = useRouter();
onMounted(() => {
  const hashMap: Record<string, string> = {
    "#products": "/shop",
    "#story": "/our-story",
    "#schedule": "/find-us",
    "#contact": "/contact",
  };
  const hash = window.location.hash;
  if (hash && hashMap[hash]) {
    router.replace(hashMap[hash]);
  }
});
</script>
