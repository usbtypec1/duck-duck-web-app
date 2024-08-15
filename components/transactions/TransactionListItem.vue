<template>
  <TransactionListItemDeposit
    v-if="transactionType === 'deposit'"
    :transaction="transaction"
  />
  <TransactionListItemWithdrawal
    v-else-if="transactionType === 'withdrawal'"
    :transaction="transaction"
  />
  <TransactionListItemTransfer
    v-else-if="transactionType === 'transfer'"
    :transaction="transaction"
  />
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/transactions'
import TransactionListItemWithdrawal from '~/components/transactions/TransactionListItemWithdrawal.vue'
import TransactionListItemDeposit from '~/components/transactions/TransactionListItemDeposit.vue'
import TransactionListItemTransfer from '~/components/transactions/TransactionListItemTransfer.vue'

const props = defineProps<{ transaction: Transaction }>()


const transactionType = computed((): 'deposit' | 'withdrawal' | 'transfer' => {
  if (props.transaction.sender !== null && props.transaction.recipient !== null) {
    return 'transfer'
  }
  if (props.transaction.sender === null) {
    return 'deposit'
  }
  return 'withdrawal'
})
</script>
