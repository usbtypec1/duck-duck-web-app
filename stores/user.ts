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
      realFirstName,
      realLastName,
      patronymic,
      canBeAddedToContacts,
      canReceiveNotifications,
      bornOn,
      gender,
      personalityTypePrefix,
      personalityTypeSuffix,
      themeId,
    }: UserToUpdate) => {
    if (userId.value === undefined) {
      throw new Error('User is not loaded')
    }

    const url = `${runtimeConfig.public.apiBaseUrl}/users/${userId.value}/`

    await $fetch(url, {
      method: 'PUT',
      body: {
        id: userId.value,
        real_first_name: realFirstName,
        real_last_name: realLastName,
        patronymic,
        can_be_added_to_contacts: canBeAddedToContacts,
        can_receive_notifications: canReceiveNotifications,
        born_on: bornOn,
        gender,
        personality_type_prefix: personalityTypePrefix,
        personality_type_suffix: personalityTypeSuffix,
        theme_id: themeId,
        profile_photo_url: user.value?.profile_photo_url ?? null,
      },
    })
  }

  return {
    userId,
    user,
    setUserId,
    fetchUser,
    updateUser,
  }
})