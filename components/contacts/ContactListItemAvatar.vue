<template>
  <Avatar
    v-bind="avatarProps"
    shape="circle"
    size="xlarge"
  />
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contacts'

const props = defineProps<{
  contact: Contact,
}>()

const avatarProps = computed(() => {
  if (props.contact.user.profile_photo_url === null) {
    return { label: props.contact.private_name.at(0).toUpperCase() }
  }
  return { image: props.contact.user.profile_photo_url }
})
</script>
