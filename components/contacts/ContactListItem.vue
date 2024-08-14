<template>
  <section>
    <NuxtLink :to="{ name: 'contacts-id', params: { id: contact.id } }">
      <div class="flex cursor-pointer">
        <div class="basis-1/5">
          <ContactsContactListItemAvatar :contact="contact"/>
        </div>
        <div class="basis-4/5">
          <ContactsContactListItemDescription :contact="contact"/>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contacts'

defineProps<{
  contact: Contact,
}>()
</script>
