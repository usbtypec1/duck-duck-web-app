<template>
  <p
    v-if="description !== null"
    class="text-gray-500 text-sm"
  >
    {{ description }}
  </p>
</template>

<script setup lang="ts">
defineProps<{ description: string | null }>()
</script>
