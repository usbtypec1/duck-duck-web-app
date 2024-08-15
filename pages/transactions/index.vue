<template>
  <div>
    <section
      class="select-none py-4 px-6 w-full h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex flex-col justify-between">
      <p class="text-white font-semibold">Ваш баланс:</p>
      <p class="text-white font-light text-xs select-text">{{ userStore.userId }}</p>
      <p class="text-white font-semibold text-lg">
        {{ transactionsStore.renderedBalance }} коинов
      </p>
    </section>
    <NuxtLink :to="{ name: 'index' }">
      <Button class="my-4" label="Назад" icon="pi pi-arrow-left" severity="secondary"/>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const transactionsStore = useTransactionsStore()
const userStore = useUserStore()

await transactionsStore.fetchBalance()
</script>
