<template>
  <TagListItem
    v-for="(tag, index) in tags"
    :key="tag.id"
    :tag-number="index + 1"
    :tag="tag"
  />
</template>

<script setup lang="ts">
import type { Tag } from '~/types/tags'
import TagListItem from '~/components/tags/TagListItem.vue'

defineProps<{ tags: Tag[] }>()
</script>
