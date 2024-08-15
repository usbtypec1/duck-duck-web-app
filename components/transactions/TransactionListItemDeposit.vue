<template>
  <div>
    <p class="font-semibold">Пополнение</p>
    <TransactionListItemDescription :description="transaction.description"/>
  </div>
  <TransactionListItemAmount
    :amount="transaction.amount"
    :is-outgoing="false"
  />
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/transactions'
import TransactionListItemDescription from '~/components/transactions/TransactionListItemDescription.vue'
import TransactionListItemAmount from '~/components/transactions/TransactionListItemAmount.vue'

const props = defineProps<{ transaction: Transaction }>()
</script>
