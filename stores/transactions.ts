import { defineStore } from 'pinia'

export const useTransactionsStore = defineStore('transactionsStore', () => {
  const userStore = useUserStore()

  const balance = ref<number>()

  const runtimeConfig = useRuntimeConfig()

  const fetchBalance = async () => {
    const url = `${runtimeConfig.public.apiBaseUrl}/economics/balance/users/${userStore.userId}`

    const userBalance: { user_id: number, balance: number } = await $fetch(url)
    balance.value = userBalance.balance
  }

  const renderedBalance = computed((): string => {
    if (balance.value === undefined) return 'Загрузка...'
    return balance.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  })

  return {
    fetchBalance,
    balance,
    renderedBalance,
  }
})