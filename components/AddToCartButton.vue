<template>
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <button
        @click="quantity = Math.max(1, quantity - 1)"
        class="w-10 h-10 rounded-full border-2 font-bold text-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
        style="border-color: #8B4513; color: #8B4513"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span class="w-8 text-center font-semibold text-lg">{{ quantity }}</span>
      <button
        @click="quantity++"
        class="w-10 h-10 rounded-full border-2 font-bold text-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
        style="border-color: #8B4513; color: #8B4513"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    <button
      @click="handleAdd"
      class="w-full py-3 rounded-full font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      :style="{ backgroundColor: added ? '#5c2d0e' : '#ff6b35' }"
    >
      {{ added ? '✓ Added to Cart!' : 'Add to Cart' }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  name: string
  price: number
}

const props = defineProps<Props>()
const cart = useCartStore()

const quantity = ref(1)
const added = ref(false)

function handleAdd() {
  cart.addItem(props.id, props.name, props.price, quantity.value)
  quantity.value = 1
  added.value = true
  cart.openCart()
  setTimeout(() => { added.value = false }, 2000)
}
</script>
