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
    <FloatingCornerButton severity="info" page-name="index"/>
  </div>
</template>

<script setup lang="ts">
import ContactListItem from '~/components/contacts/ContactListItem.vue'
import FloatingCornerButton from '~/components/navigation/FloatingCornerButton.vue'

const contactsStore = useContactsStore()

if (!contactsStore.contacts) {
  await contactsStore.fetchAll()
}
</script>
