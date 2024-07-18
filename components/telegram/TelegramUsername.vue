<template>
  <span class="font-semibold">Username:</span>&nbsp;<template v-if="value">@{{ value }}</template>
</template>

<script setup lang="ts">
defineProps<{ value: string | null }>()
</script>
