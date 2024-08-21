<template>
  <div>
    <SecretMessagesChatMessage
      v-for="secretMessage of contactSecretMessages.secret_messages"
      :key="secretMessage.id"
      :contact="contactSecretMessages.contact"
      :secret-message="secretMessage"
    />
  </div>
</template>

<script setup lang="ts">
import type { ContactSecretMessages } from '~/types/secret-messages'
import SecretMessagesChatMessage from '~/components/secret-messages/SecretMessagesChatMessage.vue'

const props = defineProps<{
  contactSecretMessages: ContactSecretMessages
}>()
</script>
