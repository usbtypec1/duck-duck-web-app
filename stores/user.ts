import type { User, UserToUpdate } from '~/types/users'
import type { ServerResponse } from '~/types/responses'

export const useUserStore = defineStore('userStore', () => {
  const userId = ref<number>()
  const user = ref<User>()

  const runtimeConfig = useRuntimeConfig()

  const setUserId = (id: number) => userId.value = id

  const fetchUser = async () => {
    const url = `${runtimeConfig.public.apiBaseUrl}/users/${userId.value}/`
    user.value = await $fetch(url)
  }

  const updateUser = async (
    {
      fullname,
      username,
      realFirstName,
      realLastName,
      patronymic,
      canBeAddedToContacts,
      canReceiveNotifications,
      bornOn,
      gender,
      personalityTypePrefix,
      personalityTypeSuffix,
    }: UserToUpdate) => {
    const url = `${runtimeConfig.public.apiBaseUrl}/users/`

    const response = await $fetch<ServerResponse<User>>(url, {
      method: 'POST',
      body: JSON.stringify({
        id: userId.value,
        fullname,
        username,
        real_first_name: realFirstName,
        real_last_name: realLastName,
        patronymic,
        can_be_added_to_contacts: canBeAddedToContacts,
        can_receive_notifications: canReceiveNotifications,
        born_on: bornOn,
        gender,
        personality_type_prefix: personalityTypePrefix,
        personality_type_suffix: personalityTypeSuffix,
      }),
    })
    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`)
    }
    user.value = response.result
  }

  return {
    userId,
    user,
    setUserId,
    fetchUser,
    updateUser,
  }
})