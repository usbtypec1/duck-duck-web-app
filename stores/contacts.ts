import { defineStore } from 'pinia'
import type { Contact, ContactToUpdate, UserContacts } from '~/types/contacts'

export const useContactsStore = defineStore('contactsStore', () => {
  const contacts = ref<Contact[]>()

  const themesStore = useThemesStore()
  const userStore = useUserStore()

  const runtimeConfig = useRuntimeConfig()

  const fetchAll = async () => {
    const url = `${runtimeConfig.public.apiBaseUrl}/contacts/users/${userStore.userId}/`

    try {
      const userContacts = await $fetch<UserContacts>(url)
      contacts.value = userContacts.contacts
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const deleteById = async (id: number) => {
    const url = `${runtimeConfig.public.apiBaseUrl}/contacts/${id}/`

    await $fetch(url, { method: 'DELETE' })
    contacts.value = contacts.value?.filter((contact) => contact.id !== id)
  }

  const updateById = async (
    {
      id,
      privateName,
      publicName,
      isHidden,
      themeId,
    }: ContactToUpdate) => {
    const url = `${runtimeConfig.public.apiBaseUrl}/contacts/${id}/`
    await $fetch(url, {
      method: 'PUT',
      body: {
        private_name: privateName,
        public_name: publicName,
        is_hidden: isHidden,
        theme_id: themeId,
      },
    })

    const contactToUpdate = contacts.value?.find((contact) => contact.id === id)

    if (contactToUpdate) {
      const theme = themesStore.themes.value?.find((theme) => theme.id === themeId)

      contactToUpdate.private_name = privateName
      contactToUpdate.public_name = publicName
      contactToUpdate.is_hidden = isHidden
      contactToUpdate.theme = theme
    }
  }

  const fetchById = async (contactId: number): Promise<Contact> => {
    const url = `${runtimeConfig.public.apiBaseUrl}/contacts/${contactId}/`
    return await $fetch<Contact>(url)
  }

  const findContactById = (id: number): Contact | undefined => {
    return contacts.value?.find((contact) => contact.id === id)
  }

  const notHiddenContacts = computed(() => {
    return contacts.value?.filter((contact: Contact) => !contact.is_hidden)
  })

  return {
    contacts,
    fetchAll,
    deleteById,
    updateById,
    findContactById,
    fetchById,
    notHiddenContacts,
  }
})