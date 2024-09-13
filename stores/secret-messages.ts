import type { ContactSecretMessages } from '~/types/secret-messages'

export const useSecretMessagesStore = defineStore('secretMessagesStore', () => {
  const contactIdToContactSecretMessages = ref<Record<number, ContactSecretMessages>>({})

  const runtimeConfig = useRuntimeConfig()

  const fetchContactSecretMessages = async (contactId: number) => {
    const url = `${runtimeConfig.public.apiBaseUrl}/secret-messages/text/contacts/${contactId}/`
    const serverResponse = await $fetch<ContactSecretMessages>(url)
    contactIdToContactSecretMessages.value[contactId] = serverResponse.result
  }

  const getContactSecretMessages = (contactId: number): ContactSecretMessages | undefined => {
    return contactIdToContactSecretMessages.value[contactId]
  }

  return {
    contactIdToContactSecretMessages,
    fetchContactSecretMessages,
    getContactSecretMessages,
  }
})