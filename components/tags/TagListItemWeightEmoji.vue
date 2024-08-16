<template>
  {{ emoji }}
</template>

<script setup lang="ts">
import { TagWeight } from '~/types/tags'

const props = defineProps<{ weight: TagWeight }>()

const emoji = computed(() => {
  switch (props.weight) {
    case TagWeight.Gold:
      return '🥇'
    case TagWeight.Silver:
      return '🥈'
    case TagWeight.Bronze:
      return '🥉'
    default:
      return ''
  }
})
</script>
