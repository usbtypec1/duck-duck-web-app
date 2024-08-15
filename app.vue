<template>
  <ClientOnly>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </ClientOnly>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script setup>
import { useWebApp } from 'vue-tg'

const webApp = useWebApp()

const userId = webApp?.initDataUnsafe?.user?.id

const userStore = useUserStore()
userStore.setUserId(userId)
</script>
