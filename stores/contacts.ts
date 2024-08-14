import { defineStore } from 'pinia'
import type { Contact, ContactToUpdate } from '~/types/contacts'

export const useContactsStore = defineStore('contactsStore', () => {
  const contacts = ref<Contact[]>()

  const runtimeConfig = useRuntimeConfig()

  const fetchAll = async (userId: number) => {
    const url = `${runtimeConfig.public.apiBaseUrl}/users/${userId}/contacts/`

    try {
      contacts.value = await $fetch<Contact[]>(url)
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

    }: ContactToUpdate) => {
    const url = `${runtimeConfig.public.apiBaseUrl}/contacts/${id}/`
    await $fetch(url, {
      method: 'PUT',
      body: {
        private_name: privateName,
        public_name: publicName,
        is_hidden: isHidden,
      },
    })

    const contactToUpdate = contacts.value?.find((contact) => contact.id === id)

    if (contactToUpdate) {
      contactToUpdate.private_name = privateName
      contactToUpdate.public_name = publicName
      contactToUpdate.is_hidden = isHidden
    }
  }

  const fetchById = async (contactId: number): Promise<Contact> => {
    const url = `${runtimeConfig.public.apiBaseUrl}/contacts/${contactId}/`
    return await $fetch<Contact>(url)
  }

  const findContactById = (id: number): Contact | undefined => {
    return contacts.value?.find((contact) => contact.id === id)
  }

  return {
    contacts,
    fetchAll,
    deleteById,
    updateById,
    findContactById,
    fetchById,
  }
})