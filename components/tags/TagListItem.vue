<template>
  <div>
    <span>{{ tagNumber }}.&nbsp</span>
    <TagListItemWeightEmoji :weight="tag.weight"/>
    <span>&nbsp{{ tag.text }}</span>
    <span> ({{ usernameOrFullName({ username: tag.of_user_username, fullname: tag.of_user_fullname }) }})</span>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '~/types/tags'
import TagListItemWeightEmoji from '~/components/tags/TagListItemWeightEmoji.vue'
import { usernameOrFullName } from '../../services/users'

defineProps<{ tag: Tag, tagNumber: number }>()
</script>
