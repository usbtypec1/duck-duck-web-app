<template>
  <span
    class="text-md text-end"
    :class="textColor"
  >
    <template v-if="isOutgoing">-</template>
    <template v-else>+</template>
    {{ renderBalance(amount) }} коинов
  </span>
</template>

<script setup lang="ts">
import { renderBalance } from '~/services/balance'

const props = defineProps<{ amount: number, isOutgoing: boolean }>()

const textColor = computed(() => props.isOutgoing ? 'text-red-500' : 'text-green-500')
</script>
