<template>
  <div>
    <TagList :tags="tagsStore.tags" />
    <FloatingCornerButton page-name="index" severity="warn"/>
  </div>
</template>

<script setup lang="ts">
import TagList from '~/components/tags/TagList.vue'
import FloatingCornerButton from '~/components/navigation/FloatingCornerButton.vue'

const tagsStore = useTagsStore()

await tagsStore.fetchTags()
</script>
