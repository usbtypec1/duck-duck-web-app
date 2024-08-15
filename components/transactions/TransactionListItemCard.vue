<template>
  <div
    class="p-4 rounded-lg my-3 flex justify-between items-center"
    :class="backgroundColor"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/transactions'

const props = defineProps<{
  transaction: Transaction,
  colorScheme: 'light' | 'dark',
}>()

console.log(props.colorScheme)

const backgroundColor = props.colorScheme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
</script>
