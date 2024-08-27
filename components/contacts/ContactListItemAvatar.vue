<template>
  <NuxtImg
    v-if="contact.user.profile_photo_url"
    :src="contact.user.profile_photo_url"
    class="aspect-square h-16 w-16 rounded-full"
    size="large"
    placeholder
  />
  <div
    v-else
    :class="[contact.is_hidden ? 'bg-gray-400' : 'bg-emerald-400']"
    class="aspect-square h-16 w-16 rounded-full flex justify-center items-center"
  >
    <p class="font-semibold text-2xl text-white">{{ contact.private_name.at(0).toUpperCase() }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contacts'

const props = defineProps<{
  contact: Contact,
}>()
</script>
