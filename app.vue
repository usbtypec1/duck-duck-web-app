<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </ClientOnly>
</template>
<script setup lang="ts">
import { useWebApp } from 'vue-tg'
import { userIdKey } from '~/utils/dependencies'

const { initDataUnsafe } = useWebApp()

const userId = initDataUnsafe?.user?.id

provide(userIdKey, userId)
</script>
