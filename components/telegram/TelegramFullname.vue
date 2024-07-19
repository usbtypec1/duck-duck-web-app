<template>
  <span class="font-semibold">Пользователь:</span>&nbsp;{{ value }}
</template>

<script setup lang="ts">
defineProps<{ value: string }>()
</script>
