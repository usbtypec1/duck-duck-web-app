<template>
  <div
    v-for="transaction in transactions"
    :key="transaction.id"
  >
    <TransactionListItem
      :transaction="transaction"
      :color-scheme="colorScheme"
    />
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types/transactions'
import { useWebAppTheme } from 'vue-tg'
import TransactionListItem from '~/components/transactions/TransactionListItem.vue'

const { colorScheme } = useWebAppTheme()

const props = defineProps<{ transactions: Transaction[] }>()
</script>
