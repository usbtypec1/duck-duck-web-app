<template>
  <div>
    <UserProfileUpdateForm
      v-if="status === 'success'"
      :user="user"
      v-model:realFirstName="realFirstName"
      v-model:realLastName="realLastName"
      v-model:patronymic="patronymic"
      v-model:bornOn="bornOn"
      v-model:canBeAddedToContacts="canBeAddedToContacts"
      v-model:canReceiveNotifications="canReceiveNotifications"
      v-model:gender="gender"
      @submit="onSaveUser"
    />
    <p v-else>Не удалось загрузить информацию о пользователе</p>
  </div>
</template>

<script setup lang="ts">
import { useWebApp } from 'vue-tg'
import { useToast } from 'primevue/usetoast'
import type { User } from '~/types/users'
import type { ServerResponse } from '~/types/responses'
import type { Gender } from '~/types/genders'
import { findGenderById } from '~/services/genders'


const runtimeConfig = useRuntimeConfig()

const { initDataUnsafe } = useWebApp()

const userId = initDataUnsafe?.user?.id ?? 896678539

const toast = useToast()

const url = `${runtimeConfig.public.apiBaseUrl}/users/${userId}/`
const { data: user, status } = await useFetch<User>(url)

const isSavingRequestPending = ref<boolean>(false)

const fullname = ref<string>()
const username = ref<string | null>()
const realFirstName = ref<string | null>()
const realLastName = ref<string | null>()
const patronymic = ref<string | null>()
const canBeAddedToContacts = ref<boolean>()
const canReceiveNotifications = ref<boolean>()
const profilePhotoUrl = ref<string | null>()
const bornOn = ref<Date | null>()
const gender = ref<Gender | null>()

const handleUserResponse = (user: User): void => {
  fullname.value = user.fullname
  username.value = user.username
  realFirstName.value = user.real_first_name
  realLastName.value = user.real_last_name
  canBeAddedToContacts.value = user.can_be_added_to_contacts
  canReceiveNotifications.value = user.can_receive_notifications
  patronymic.value = user.patronymic
  profilePhotoUrl.value = user.profile_photo_url
  bornOn.value = user.born_on ? new Date(user.born_on) : null
  gender.value = findGenderById(user.gender)
}

const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return `${year}-${month}-${day}`
}

const onSaveUser = async () => {
  const url = `${runtimeConfig.public.apiBaseUrl}/users/`

  isSavingRequestPending.value = true
  try {
    const data: ServerResponse<User> = await $fetch(url, {
      method: 'POST',
      body: {
        id: userId,
        fullname: fullname.value,
        username: username.value,
        real_first_name: realFirstName.value || '-',
        real_last_name: realLastName.value || '-',
        patronymic: patronymic.value || '-',
        can_be_added_to_contacts: canBeAddedToContacts.value,
        can_receive_notifications: canReceiveNotifications.value,
        born_on: bornOn.value ? formatDate(bornOn.value) : undefined,
        gender: gender.value?.id ?? null,
      },
    })

    if (data.ok) {
      handleUserResponse(data.result)
      toast.add({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Изменения сохранены',
        life: 3000,
      })
    } else {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Изменения не сохранены',
        life: 3000,
      })
    }
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Изменения не сохранены',
      life: 3000,
    })
  } finally {
    isSavingRequestPending.value = false
  }
}

if (user.value !== null) {
  handleUserResponse(user.value)
}
</script>
