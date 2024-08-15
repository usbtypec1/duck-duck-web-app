import { defineStore } from 'pinia'
import type { TransactionsPage } from '~/types/transactions'
import { renderBalance } from '~/services/balance'

export const useTransactionsStore = defineStore('transactionsStore', () => {
  const userStore = useUserStore()

  const balance = ref<number>()

  const runtimeConfig = useRuntimeConfig()

  const fetchBalance = async () => {
    const url = `${runtimeConfig.public.apiBaseUrl}/economics/balance/users/${userStore.userId}`

    const userBalance: { user_id: number, balance: number } = await $fetch(url)
    balance.value = userBalance.balance
  }

  const fetchTransactionsPage = async (): Promise<TransactionsPage> => {
    const url = `${runtimeConfig.public.apiBaseUrl}/economics/transactions/users/${userStore.userId}?limit=50`
    return await $fetch(url)
  }

  const renderedBalance = computed((): string => {
    if (balance.value === undefined) return 'Загрузка...'
    return renderBalance(balance.value)
  })

  return {
    fetchBalance,
    balance,
    renderedBalance,
    fetchTransactionsPage,
  }
})