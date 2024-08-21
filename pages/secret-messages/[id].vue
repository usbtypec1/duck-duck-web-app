<template>
  <div>
    <SecretMessagesChat
      :contact-secret-messages="contactSecretMessages"
      ref="chat"
      class="overflow-y-scroll h-screen"
    />
    <FloatingCornerButton severity="primary" page-name="secret-messages"/>
  </div>
</template>

<script setup lang="ts">
import type { ContactSecretMessages } from '~/types/secret-messages'
import FloatingCornerButton from '~/components/navigation/FloatingCornerButton.vue'

const route = useRoute()

const chat = ref<HTMLDivElement | null>(null)

const contactId = parseInt(route.params.id as string)

const secretMessagesStore = useSecretMessagesStore()

await secretMessagesStore.fetchContactSecretMessages(contactId)

const contactSecretMessages = computed((): ContactSecretMessages | undefined => secretMessagesStore.getContactSecretMessages(contactId))

onMounted(async() => {
  await nextTick();
  chat.value?.scrollTo?.({ top: chat.value?.offsetHeight })
  console.log(chat.value)
})
</script>
