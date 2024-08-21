<template>
  <div>
    <h2 class="my-2 text-lg font-semibold text-center">Ваши секретные чаты с контактами</h2>
    <ContactListItem
      v-for="contact of contactsStore.notHiddenContacts"
      :contact="contact"
      page-name="secret-messages-id"
    />
    <FloatingCornerButton severity="primary" page-name="index"/>
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
