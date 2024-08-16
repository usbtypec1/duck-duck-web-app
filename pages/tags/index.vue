<template>
  <div>
    <TagList :tags="tagsStore.tags" />
    <NuxtLink :to="{ name: 'index' }">
      <Button
        class="w-full my-5"
        severity="secondary"
        outlined
        label="Назад"
        icon="pi pi-arrow-left"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import TagList from '~/components/tags/TagList.vue'

const tagsStore = useTagsStore()

await tagsStore.fetchTags()
</script>
