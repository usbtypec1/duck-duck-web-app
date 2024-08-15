<template>
  <div>
    <p class="font-semibold">Перевод</p>
    <p v-if="isOutgoing" class="text-gray-500 text-sm">Для {{ usernameOrFullName(transaction.recipient) }}</p>
    <p v-else class="text-gray-500 text-sm">От {{ usernameOrFullName(transaction.sender) }}</p>
    <TransactionListItemDescription :description="transaction.description"/>
  </div>
  <TransactionListItemAmount
    :amount="transaction.amount"
    :is-outgoing="isOutgoing"
  />
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/transactions'
import { usernameOrFullName } from '~/services/users'
import TransactionListItemDescription from '~/components/transactions/TransactionListItemDescription.vue'
import TransactionListItemAmount from '~/components/transactions/TransactionListItemAmount.vue'

const props = defineProps<{ transaction: Transaction }>()

const userStore = useUserStore()

const isOutgoing = props.transaction.sender?.id === userStore.userId
</script>
