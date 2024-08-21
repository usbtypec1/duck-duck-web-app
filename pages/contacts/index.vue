<template>
  <div>
    <div v-if="contactsStore.contacts" class="flex flex-col gap-y-4">
      <ContactListItem
        v-for="contact in contactsStore.contacts"
        :key="contact.id"
        :contact="contact"
        page-name="contacts-id"
      />
    </div>
    <p v-else>У вас нет контактов</p>
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
import ContactListItem from '~/components/contacts/ContactListItem.vue'

const contactsStore = useContactsStore()

if (!contactsStore.contacts) {
  await contactsStore.fetchAll()
}
</script>
