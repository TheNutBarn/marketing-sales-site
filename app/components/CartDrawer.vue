<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../lib/products'

const cart = useCartStore()

const orderDialogOpen = ref(false)
const form = ref({
  name: '',
  email: '',
  phone: '',
  fulfillment: 'pickup' as 'pickup' | 'delivery',
  deliveryAddress: '',
  payment: 'on-pickup' as 'on-pickup' | 'call',
  notes: '',
})
const submitting = ref(false)
const submitted = ref(false)
const orderRef = ref('')
const errorMessage = ref('')
const formTouched = ref(false)

const subtotal = computed(() => formatPrice(cart.subtotalCents))

function openOrderDialog() {
  cart.closeDrawer()
  // Close drawer first, then open dialog — prevents nested overlay on mobile
  setTimeout(() => { orderDialogOpen.value = true }, 50)
}

function closeOrderDialog() {
  if (formTouched.value && !submitted.value) {
    if (!confirm('Cancel your order? Your items will remain in your cart.')) return
  }
  orderDialogOpen.value = false
  submitted.value = false
  errorMessage.value = ''
  formTouched.value = false
}

async function submitOrder() {
  if (submitting.value) return
  submitting.value = true
  errorMessage.value = ''

  try {
    const payload = {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      fulfillment: form.value.fulfillment,
      deliveryAddress: form.value.fulfillment === 'delivery' ? form.value.deliveryAddress : undefined,
      payment: form.value.payment,
      items: cart.items.map(i => ({ id: i.id, quantity: i.quantity })),
      notes: form.value.notes || undefined,
    }

    const res = await $fetch<{ success: true; orderRef: string; message: string }>('/api/orders', {
      method: 'POST',
      body: payload,
    })

    orderRef.value = res.orderRef
    submitted.value = true
    // Only clear cart after confirmed 200 OK
    cart.clearCart()
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    errorMessage.value = e?.data?.message ?? 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="cart.isDrawerOpen"
        class="fixed inset-0 bg-black/50"
        style="z-index:calc(var(--z-drawer) - 1);"
        aria-hidden="true"
        @click="cart.closeDrawer()"
      />
    </Transition>

    <!-- Cart drawer -->
    <div
      class="cart-drawer"
      :class="{ 'is-open': cart.isDrawerOpen }"
      role="dialog"
      aria-label="Shopping cart"
      aria-modal="true"
    >
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="cart-drawer-header">
          <h2>Your Cart</h2>
          <button
            type="button"
            class="flex items-center justify-center transition-colors"
            style="width:var(--touch-target);height:var(--touch-target);color:var(--color-cream-light);"
            aria-label="Close cart"
            @click="cart.closeDrawer()"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="cart.items.length === 0" class="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
          <div class="text-5xl" aria-hidden="true">🥜</div>
          <p style="font-family:var(--font-display);font-size:1.125rem;color:var(--color-denim);">Your cart is empty</p>
          <p class="text-sm" style="color:var(--color-text-muted);">Add some cinnamon roasted nuts to get started.</p>
          <NuxtLink
            to="/shop"
            class="inline-block font-bold px-6 py-3 rounded btn-vintage"
            style="background-color:var(--color-orange);color:white;"
            @click="cart.closeDrawer()"
          >
            Browse Products
          </NuxtLink>
        </div>

        <!-- Items list -->
        <ul v-else class="flex-1 overflow-y-auto p-4 space-y-4">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center gap-3 pb-4 border-b last:border-0"
            style="border-color:var(--color-border);"
          >
            <div class="flex-1 min-w-0">
              <p class="font-bold text-sm truncate" style="color:var(--color-text);">{{ item.name }}</p>
              <p class="text-sm" style="color:var(--color-text-muted);">{{ formatPrice(item.priceInCents) }} each</p>
            </div>

            <!-- Quantity controls — 44px touch targets -->
            <div class="flex items-center gap-1">
              <button
                type="button"
                class="flex items-center justify-center rounded-md font-bold text-lg transition-colors"
                style="width:var(--touch-target);height:var(--touch-target);color:var(--color-denim);"
                :aria-label="`Decrease quantity of ${item.name}`"
                @click="cart.updateQuantity(item.id, item.quantity - 1)"
              >−</button>
              <span class="w-8 text-center font-bold text-sm" aria-live="polite">{{ item.quantity }}</span>
              <button
                type="button"
                class="flex items-center justify-center rounded-md font-bold text-lg transition-colors"
                style="width:var(--touch-target);height:var(--touch-target);color:var(--color-denim);"
                :aria-label="`Increase quantity of ${item.name}`"
                @click="cart.updateQuantity(item.id, item.quantity + 1)"
              >+</button>
            </div>

            <div class="text-right" style="min-width:4rem;">
              <p class="font-bold text-sm" style="font-family:var(--font-display);font-size:0.95rem;color:var(--color-denim);">{{ formatPrice(item.priceInCents * item.quantity) }}</p>
              <button
                type="button"
                class="text-xs hover:underline"
                style="color:var(--color-error);"
                :aria-label="`Remove ${item.name} from cart`"
                @click="cart.removeItem(item.id)"
              >Remove</button>
            </div>
          </li>
        </ul>

        <!-- Footer: total + CTA -->
        <div v-if="cart.items.length > 0" class="border-t p-4 space-y-3" style="border-color:var(--color-border);background-color:var(--color-cream);">
          <div class="flex justify-between font-bold" style="font-family:var(--font-display);font-size:1.1rem;color:var(--color-denim);">
            <span>Subtotal</span>
            <span>{{ subtotal }}</span>
          </div>
          <p class="text-xs" style="color:var(--color-text-muted);">Fulfillment & payment details collected at checkout.</p>
          <button
            type="button"
            class="w-full font-bold py-3 px-6 rounded btn-vintage transition-colors"
            style="background-color:var(--color-orange);color:white;"
            @click="openOrderDialog"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>

    <!-- Order dialog -->
    <Transition name="fade">
      <div v-if="orderDialogOpen" class="fixed inset-0 flex items-center justify-center p-4" style="z-index:var(--z-dialog);">
        <!-- Dialog backdrop -->
        <div class="absolute inset-0 bg-black/60" aria-hidden="true" @click="closeOrderDialog" />

        <dialog
          open
          class="relative w-full max-h-[90vh] overflow-y-auto bg-white rounded-lg p-0"
          style="max-width:32rem;box-shadow:var(--shadow-offset-lg);"
          aria-labelledby="order-dialog-title"
          @cancel.prevent="closeOrderDialog"
        >
          <!-- Success state -->
          <div v-if="submitted" class="p-6 text-center space-y-4">
            <div class="text-5xl" aria-hidden="true">✅</div>
            <h2 id="order-dialog-title" style="font-family:var(--font-display);font-size:1.25rem;color:var(--color-denim);">Order Received!</h2>
            <p class="font-bold" style="color:var(--color-orange);">Reference: {{ orderRef }}</p>
            <p class="text-sm" style="color:var(--color-text-muted);">We'll be in touch within 24 hours to confirm your order and arrange payment.</p>
            <button
              type="button"
              class="font-bold px-6 py-3 rounded btn-vintage"
              style="background-color:var(--color-denim);color:white;"
              @click="orderDialogOpen = false"
            >Close</button>
          </div>

          <!-- Order form -->
          <div v-else>
            <!-- Dialog header -->
            <div
              class="flex items-center justify-between px-6 py-4"
              style="background-color:var(--color-denim);"
            >
              <h2 id="order-dialog-title" style="font-family:var(--font-display);font-size:1.125rem;color:var(--color-cream-light);">Place Your Order</h2>
              <button
                type="button"
                class="flex items-center justify-center"
                style="width:var(--touch-target);height:var(--touch-target);color:var(--color-cream-light);"
                aria-label="Close order form"
                @click="closeOrderDialog"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div class="p-6 space-y-4">
              <!-- Order summary (first, per UX spec) -->
              <div class="rounded-lg p-4 border" style="background-color:var(--color-cream-light);border-color:var(--color-denim);">
                <h3 class="font-bold text-sm mb-2" style="color:var(--color-denim);">Order Summary</h3>
                <ul class="space-y-1 text-sm">
                  <li v-for="item in cart.items" :key="item.id" class="flex justify-between">
                    <span>{{ item.name }} × {{ item.quantity }}</span>
                    <span style="font-family:var(--font-display);font-size:0.85rem;">{{ formatPrice(item.priceInCents * item.quantity) }}</span>
                  </li>
                </ul>
                <div class="border-t mt-2 pt-2 flex justify-between font-bold" style="border-color:var(--color-border);">
                  <span>Total</span>
                  <span style="font-family:var(--font-display);">{{ subtotal }}</span>
                </div>
              </div>

              <!-- Error message -->
              <div
                v-if="errorMessage"
                role="alert"
                class="rounded-lg p-3 text-sm border"
                style="background-color:var(--color-error-light);border-color:var(--color-error);color:var(--color-error);"
              >{{ errorMessage }}</div>

              <form @submit.prevent="submitOrder" novalidate class="space-y-4" @input="formTouched = true">
                <!-- Contact fields -->
                <fieldset class="space-y-3">
                  <legend class="font-bold text-sm mb-2" style="color:var(--color-denim);">Contact Information</legend>
                  <div>
                    <label for="order-name" class="block text-sm font-bold mb-1">
                      Full Name <span style="color:var(--color-error);" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="order-name"
                      v-model="form.name"
                      type="text"
                      required
                      autocomplete="name"
                      class="w-full px-3 py-2.5 text-sm rounded border"
                      style="border-color:var(--color-border);"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label for="order-email" class="block text-sm font-bold mb-1">
                      Email <span style="color:var(--color-error);" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="order-email"
                      v-model="form.email"
                      type="email"
                      required
                      autocomplete="email"
                      class="w-full px-3 py-2.5 text-sm rounded border"
                      style="border-color:var(--color-border);"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label for="order-phone" class="block text-sm font-bold mb-1">
                      Phone <span style="color:var(--color-error);" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="order-phone"
                      v-model="form.phone"
                      type="tel"
                      required
                      autocomplete="tel"
                      class="w-full px-3 py-2.5 text-sm rounded border"
                      style="border-color:var(--color-border);"
                      placeholder="(517) 555-1234"
                    />
                  </div>
                </fieldset>

                <!-- Fulfillment -->
                <fieldset class="space-y-2">
                  <legend class="font-bold text-sm mb-1" style="color:var(--color-denim);">Fulfillment</legend>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="form.fulfillment" value="pickup" />
                    <span class="text-sm">Pickup at Farmer's Market</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="form.fulfillment" value="delivery" />
                    <span class="text-sm">Local Delivery</span>
                  </label>
                  <div v-if="form.fulfillment === 'delivery'" class="mt-2">
                    <label for="order-address" class="block text-sm font-bold mb-1">Delivery Address</label>
                    <input
                      id="order-address"
                      v-model="form.deliveryAddress"
                      type="text"
                      autocomplete="street-address"
                      class="w-full px-3 py-2.5 text-sm rounded border"
                      style="border-color:var(--color-border);"
                      placeholder="123 Main St, Dimondale, MI"
                    />
                  </div>
                </fieldset>

                <!-- Payment -->
                <fieldset class="space-y-2">
                  <legend class="font-bold text-sm mb-1" style="color:var(--color-denim);">Payment</legend>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="form.payment" value="on-pickup" />
                    <span class="text-sm">Pay at pickup (Venmo, Square, PayPal)</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" v-model="form.payment" value="call" />
                    <span class="text-sm">Call me to arrange payment</span>
                  </label>
                </fieldset>

                <!-- Notes -->
                <div>
                  <label for="order-notes" class="block text-sm font-bold mb-1">Notes (optional)</label>
                  <textarea
                    id="order-notes"
                    v-model="form.notes"
                    rows="3"
                    class="w-full px-3 py-2.5 text-sm rounded border resize-none"
                    style="border-color:var(--color-border);"
                    placeholder="Allergies, special requests, gift message..."
                  />
                </div>

                <button
                  type="submit"
                  :disabled="submitting"
                  class="w-full font-bold py-3 px-6 rounded btn-vintage transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  style="background-color:var(--color-orange);color:white;"
                >
                  {{ submitting ? 'Sending…' : 'Send Order' }}
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
