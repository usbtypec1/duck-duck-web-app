<template>
  <span class="font-semibold">Премиум-подписка:</span> {{ isPremium ? '✅ есть' : '❌ нет' }}
</template>

<script setup lang="ts">
defineProps<{ isPremium: boolean }>()
</script>
