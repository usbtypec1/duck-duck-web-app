<template>
  <div
    class="chat"
    :class="[isMyMessage ? 'chat-end' : 'chat-start']"
  >
    <div class="chat-bubble">
      {{ secretMessage.text }}
    </div>
    <div class="chat-footer">
      {{ messageCreatedAt }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SecretMessage } from '~/types/secret-messages'
import type { ContactPartial } from '~/types/contacts'

const props = defineProps<{
  secretMessage: SecretMessage,
  contact: ContactPartial,
}>()

const isMyMessage = computed((): boolean => props.secretMessage.sender_id === props.contact.of_user.id)

const messageCreatedAt = useDateFormat(props.secretMessage.created_at, 'DD.MM.YYYY HH:MM')
</script>
