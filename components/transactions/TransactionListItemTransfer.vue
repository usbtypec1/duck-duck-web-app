<template>
  <div class="p-4 bg-gray-200 rounded-lg my-3 flex justify-between items-center">
    <div>
      <p class="font-semibold">Перевод</p>
      <p v-if="isOutgoing" class="text-gray-500 text-sm">Для {{ usernameOrFullName(transaction.recipient) }}</p>
      <p v-else class="text-gray-500 text-sm">От {{ usernameOrFullName(transaction.sender) }}</p>
      <p
        v-if="transaction.description !== null"
        class="text-gray-500 text-sm"
      >{{ transaction.description }}</p>
    </div>
    <span v-if="isOutgoing" class="text-red-500 text-md text-end">-{{ renderBalance(transaction.amount) }} коинов</span>
    <span v-else class="text-green-500 text-md text-end">+{{ renderBalance(transaction.amount) }} коинов</span>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/transactions'
import { renderBalance } from '~/services/balance'
import { usernameOrFullName } from '~/services/users'

const props = defineProps<{ transaction: Transaction }>()

const userStore = useUserStore()

const isOutgoing = props.transaction.sender?.id === userStore.userId
</script>
