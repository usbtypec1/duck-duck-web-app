<template>
  <div>
    <TagList :tags="tagsStore.tags" />
    <div class="fixed bottom-5 right-3">
      <NuxtLink :to="{ name: 'index' }">
        <Button class="my-4" raised rounded size="large" icon="pi pi-arrow-left" severity="warn"/>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import TagList from '~/components/tags/TagList.vue'

const tagsStore = useTagsStore()

await tagsStore.fetchTags()
</script>
