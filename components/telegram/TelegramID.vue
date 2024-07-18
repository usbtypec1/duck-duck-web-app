<template>
  <span class="font-semibold">ID:</span> {{ value }}
</template>

<script setup lang="ts">
defineProps<{ value: number }>()
</script>
