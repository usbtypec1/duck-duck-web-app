<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <p class="text-md font-semibold">{{ contact.private_name }}</p>
      <p class="text-sm text-gray-600">{{ contact.public_name }}</p>
      <p v-if="contact.is_hidden" class="text-xs text-gray-500">Скрыт</p>
    </div>
    <div class="border-b border-gray-400"></div>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contacts'

const props = defineProps<{
  contact: Contact,
}>()
</script>
