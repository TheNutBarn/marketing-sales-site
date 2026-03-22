<script setup lang="ts">
import { ref } from "vue";

useHead({
  title: "Contact Us — The Nut Barn",
  meta: [
    {
      name: "description",
      content:
        "Get in touch with The Nut Barn. Questions, orders, or wholesale inquiries — we reply within 24 hours.",
    },
  ],
});

const form = ref({
  name: "",
  email: "",
  subject: "General Question",
  message: "",
});
const submitting = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const subjects = [
  "General Question",
  "Order Question",
  "Wholesale Inquiry",
  "Other",
];

async function submit() {
  if (submitting.value) return;
  submitting.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const res = await $fetch<{ success: true; message: string }>(
      "/api/contact",
      {
        method: "POST",
        body: form.value,
      },
    );
    successMessage.value = res.message;
    form.value = {
      name: "",
      email: "",
      subject: "General Question",
      message: "",
    };
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } };
    errorMessage.value =
      e?.data?.message ?? "Something went wrong. Please try again.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <section
      class="px-4 py-14 text-center"
      style="background: var(--gradient-hero); color: var(--color-text-inverse)"
    >
      <div class="mx-auto" style="max-width: var(--container-md)">
        <p class="eyebrow mb-2" style="color: var(--color-mustard)">
          Get in Touch
        </p>
        <h1
          style="
            font-size: clamp(2rem, 5vw, 3rem);
            color: var(--color-cream-light);
          "
        >
          Contact Us
        </h1>
        <p class="mt-2" style="color: rgba(253, 246, 232, 0.8)">
          We reply within 24 hours.
        </p>
      </div>
    </section>

    <div
      class="mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12"
      style="max-width: var(--container-xl)"
    >
      <!-- Info sidebar -->
      <aside class="space-y-6">
        <div>
          <h2
            class="mb-3"
            style="font-size: 1.25rem; color: var(--color-denim)"
          >
            Get in Touch
          </h2>
          <ul class="space-y-3 text-sm">
            <li>
              <p class="font-bold mb-0.5" style="color: var(--color-text)">
                Email
              </p>
              <a
                href="mailto:contact@thenutbarn.net"
                style="color: var(--color-denim)"
                >contact@thenutbarn.net</a
              >
            </li>
            <li>
              <p class="font-bold mb-0.5" style="color: var(--color-text)">
                Phone
              </p>
              <a href="tel:5174109029" style="color: var(--color-denim)"
                >(517) 410-9029</a
              >
            </li>
            <li>
              <p class="font-bold mb-0.5" style="color: var(--color-text)">
                Location
              </p>
              <p style="color: var(--color-text-muted)">Dimondale, Michigan</p>
            </li>
          </ul>
        </div>

        <!-- Wholesale callout -->
        <div
          class="rounded-lg p-4 card-vintage"
          style="
            background-color: var(--color-cream-light);
            border: 2px solid var(--color-denim);
          "
        >
          <h3 class="mb-2" style="font-size: 1rem; color: var(--color-denim)">
            Wholesale Inquiries
          </h3>
          <p class="text-sm mb-3" style="color: var(--color-text-muted)">
            Interested in carrying The Nut Barn in your store or event?
          </p>
          <NuxtLink
            to="/wholesale"
            class="text-sm font-bold"
            style="color: var(--color-orange)"
            >Learn about wholesale →</NuxtLink
          >
        </div>
      </aside>

      <!-- Contact form -->
      <div class="md:col-span-2">
        <!-- Success message -->
        <div
          v-if="successMessage"
          role="status"
          class="mb-6 rounded-lg p-4 border"
          style="
            background-color: var(--color-success-light);
            border-color: var(--color-success);
            color: var(--color-success);
          "
        >
          {{ successMessage }}
        </div>

        <!-- Error message -->
        <div
          v-if="errorMessage"
          role="alert"
          class="mb-6 rounded-lg p-4 border"
          style="
            background-color: var(--color-error-light);
            border-color: var(--color-error);
            color: var(--color-error);
          "
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="submit" novalidate class="space-y-5">
          <div>
            <label for="contact-name" class="block text-sm font-bold mb-1">
              Full Name
              <span style="color: var(--color-error)" aria-hidden="true"
                >*</span
              >
            </label>
            <input
              id="contact-name"
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              class="w-full px-3 py-2.5 rounded border text-sm"
              style="border-color: var(--color-border)"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label for="contact-email" class="block text-sm font-bold mb-1">
              Email
              <span style="color: var(--color-error)" aria-hidden="true"
                >*</span
              >
            </label>
            <input
              id="contact-email"
              v-model="form.email"
              type="email"
              required
              autocomplete="email"
              class="w-full px-3 py-2.5 rounded border text-sm"
              style="border-color: var(--color-border)"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label for="contact-subject" class="block text-sm font-bold mb-1"
              >Subject</label
            >
            <select
              id="contact-subject"
              v-model="form.subject"
              class="w-full px-3 py-2.5 rounded border text-sm bg-white"
              style="border-color: var(--color-border)"
            >
              <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <div>
            <label for="contact-message" class="block text-sm font-bold mb-1">
              Message
              <span style="color: var(--color-error)" aria-hidden="true"
                >*</span
              >
            </label>
            <textarea
              id="contact-message"
              v-model="form.message"
              rows="6"
              required
              class="w-full px-3 py-2.5 rounded border text-sm resize-none"
              style="border-color: var(--color-border)"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="font-bold px-8 py-3 rounded btn-vintage disabled:opacity-60 disabled:cursor-not-allowed"
            style="background-color: var(--color-orange); color: white"
          >
            {{ submitting ? "Sending…" : "Send Message" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
