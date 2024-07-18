<template>
  <span class="font-semibold">Имя пользователя:</span>&nbsp;{{ value }}
</template>

<script setup lang="ts">
defineProps<{ value: string }>()
</script>
