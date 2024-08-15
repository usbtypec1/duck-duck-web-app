<template>
  <div class="p-4 bg-gray-200 rounded-lg my-3 flex justify-between items-center">
    <div>
      <p class="font-semibold">Пополнение</p>
      <p
        v-if="transaction.description !== null"
        class="text-gray-500 text-sm"
      >{{ transaction.description }}</p>
    </div>
    <span class="text-green-500 text-md text-end">+{{ renderBalance(transaction.amount) }} коинов</span>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/transactions'
import { renderBalance } from '~/services/balance'

const props = defineProps<{ transaction: Transaction }>()
</script>
