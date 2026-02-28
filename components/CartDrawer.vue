<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="cart.isOpen"
        class="fixed inset-0 bg-black/50 z-40"
        @click="cart.closeCart"
        aria-hidden="true"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="slide">
      <div
        v-if="cart.isOpen"
        class="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b" style="border-color: #ede9df">
          <div class="flex items-center gap-2">
            <button
              v-if="step === 'checkout'"
              @click="goBack"
              class="p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 text-sm"
              aria-label="Back to cart"
            >
              ←
            </button>
            <h2 class="text-xl font-bold" style="color: #8B4513">{{ stepTitle }}</h2>
          </div>
          <button
            @click="cart.closeCart"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-4">

          <!-- Success -->
          <div v-if="step === 'success'" class="flex flex-col items-center justify-center h-full text-center gap-4 px-4">
            <div class="text-6xl">🥜</div>
            <h3 class="text-2xl font-bold" style="color: #8B4513">Order Received!</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              We've emailed you a confirmation and will be in touch shortly to arrange payment and pickup.
            </p>
            <button @click="cart.closeCart" class="btn-primary mt-2">
              Continue Shopping
            </button>
          </div>

          <!-- Cart items -->
          <template v-else-if="step === 'cart'">
            <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-4">
              <span class="text-5xl">🛒</span>
              <p class="text-lg font-medium">Your cart is empty</p>
              <p class="text-sm">Add some delicious nuts to get started!</p>
            </div>
            <ul v-else class="space-y-4">
              <li
                v-for="item in cart.items"
                :key="item.id"
                class="flex items-start gap-3 p-3 rounded-lg"
                style="background-color: #f8f6f0"
              >
                <div class="text-3xl">🥜</div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-sm text-gray-800 leading-tight">{{ item.name }}</p>
                  <p class="text-sm font-bold mt-1" style="color: #ff6b35">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                  <div class="flex items-center gap-2 mt-2">
                    <button
                      @click="cart.updateQuantity(item.id, item.quantity - 1)"
                      class="w-8 h-8 rounded-full border font-bold text-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      style="border-color: #8B4513; color: #8B4513"
                      :aria-label="`Decrease quantity of ${item.name}`"
                    >
                      −
                    </button>
                    <span class="w-6 text-center font-semibold">{{ item.quantity }}</span>
                    <button
                      @click="cart.updateQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 rounded-full border font-bold text-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                      style="border-color: #8B4513; color: #8B4513"
                      :aria-label="`Increase quantity of ${item.name}`"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  @click="cart.removeItem(item.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors text-sm p-1"
                  :aria-label="`Remove ${item.name} from cart`"
                >
                  ✕
                </button>
              </li>
            </ul>
          </template>

          <!-- Checkout form -->
          <form
            v-else-if="step === 'checkout'"
            id="checkout-form"
            @submit.prevent="handleSubmitOrder"
            class="space-y-4"
          >
            <p class="text-sm text-gray-500">
              Enter your details and we'll confirm your order and arrange payment.
            </p>
            <div>
              <label for="checkout-name" class="block text-sm font-semibold mb-1 text-gray-700">
                Name <span class="text-red-500">*</span>
              </label>
              <input
                id="checkout-name"
                v-model="form.name"
                type="text"
                required
                placeholder="Your name"
                class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                style="border-color: #ede9df"
              />
            </div>
            <div>
              <label for="checkout-email" class="block text-sm font-semibold mb-1 text-gray-700">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="checkout-email"
                v-model="form.email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                style="border-color: #ede9df"
              />
            </div>
            <div>
              <label for="checkout-notes" class="block text-sm font-semibold mb-1 text-gray-700">
                Notes <span class="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="checkout-notes"
                v-model="form.notes"
                rows="3"
                placeholder="Pickup preferences, questions, etc."
                class="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                style="border-color: #ede9df"
              />
            </div>
            <p v-if="sendStatus === 'error'" class="text-red-600 text-sm">
              Something went wrong. Please try again or call us at (517) 410-9029.
            </p>
          </form>
        </div>

        <!-- Footer: cart step -->
        <div
          v-if="step === 'cart' && cart.items.length > 0"
          class="p-4 border-t space-y-3"
          style="border-color: #ede9df"
        >
          <div class="flex justify-between items-center text-lg font-bold" style="color: #8B4513">
            <span>Total</span>
            <span>${{ cart.total.toFixed(2) }}</span>
          </div>
          <button
            @click="step = 'checkout'"
            class="w-full py-3 rounded-full font-bold text-white text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            style="background-color: #ff6b35"
          >
            Place Order →
          </button>
          <div class="text-center">
            <div class="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
              <span>💳</span>
              <span>Coming soon: Pay by card (Stripe)</span>
            </div>
          </div>
          <button
            @click="cart.clearCart"
            class="w-full text-xs text-gray-400 hover:text-red-500 transition-colors py-1"
          >
            Clear cart
          </button>
        </div>

        <!-- Footer: checkout step -->
        <div
          v-if="step === 'checkout'"
          class="p-4 border-t space-y-3"
          style="border-color: #ede9df"
        >
          <div class="flex justify-between items-center text-sm text-gray-500">
            <span>{{ cart.itemCount }} item{{ cart.itemCount !== 1 ? 's' : '' }}</span>
            <span class="font-bold" style="color: #8B4513">${{ cart.total.toFixed(2) }}</span>
          </div>
          <button
            type="submit"
            form="checkout-form"
            :disabled="sendStatus === 'sending'"
            class="w-full py-3 rounded-full font-bold text-white text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            style="background-color: #ff6b35"
          >
            {{ sendStatus === 'sending' ? 'Sending Order...' : 'Send Order →' }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
type Step = 'cart' | 'checkout' | 'success'
type SendStatus = 'idle' | 'sending' | 'error'

const cart = useCartStore()

const step = ref<Step>('cart')
const form = reactive({ name: '', email: '', notes: '' })
const sendStatus = ref<SendStatus>('idle')

const stepTitle = computed(() => {
  if (step.value === 'cart') return 'Your Cart'
  if (step.value === 'checkout') return 'Your Details'
  return 'Order Sent!'
})

// Reset state when drawer closes
watch(() => cart.isOpen, (open) => {
  if (!open) {
    step.value = 'cart'
    sendStatus.value = 'idle'
  }
})

// Prevent body scroll when drawer is open
watch(() => cart.isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// Escape key to close
onMounted(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && cart.isOpen) cart.closeCart()
  }
  document.addEventListener('keydown', handleKey)
  onUnmounted(() => document.removeEventListener('keydown', handleKey))
})

function goBack() {
  step.value = 'cart'
  sendStatus.value = 'idle'
}

async function handleSubmitOrder() {
  sendStatus.value = 'sending'
  try {
    await $fetch('/api/orders', {
      method: 'POST',
      body: {
        customerName: form.name,
        customerEmail: form.email,
        notes: form.notes,
        items: cart.items,
        total: cart.total,
      },
    })
    cart.clearCart()
    Object.assign(form, { name: '', email: '', notes: '' })
    sendStatus.value = 'idle'
    step.value = 'success'
  } catch {
    sendStatus.value = 'error'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
