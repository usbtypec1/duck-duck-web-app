<template>
  <div>
    <form
      @submit.prevent
      v-if="status === 'success'"
      class="flex flex-col gap-y-2"
    >
      <Fieldset legend="Telegram">
        <div class="flex flex-row gap-x-4">
          <section class="basis-1/2">
            <Image
              v-if="profilePhotoUrl"
              alt="profile photo"
              preview
              class="rounded-full"
            >
              <template #previewicon>
                <i class="pi pi-search"></i>
              </template>
              <template #image>
                <NuxtImg
                  :src="profilePhotoUrl"
                  alt="image"
                  class="rounded-full"
                />
              </template>
              <template #preview="slotProps">
                <NuxtImg
                  :src="profilePhotoUrl"
                  alt="preview"
                  :style="slotProps.style"
                  @click="slotProps.onClick"
                />
              </template>
            </Image>
          </section>
          <section class="basis-1/2 flex flex-col justify-center">
            <p>
              <span class="font-semibold">ID:</span> {{ userId }}
            </p>
            <p>
              <span class="font-semibold">Имя пользователя:</span> {{ fullname }}</p>
            <p>
              <span class="font-semibold">Username:</span>
              <template v-if="username">@</template>
              {{ username }}
            </p>
          </section>
        </div>
      </Fieldset>

      <Fieldset legend="Контакты">
        <NuxtLink :to="{ name: 'contacts' }">
          <Button outlined label="Список контактов"/>
        </NuxtLink>
      </Fieldset>

      <Fieldset legend="Личная информация">
        <section class="flex flex-col gap-y-3">
          <div class="flex flex-col">
            <label for="real-first-name" class="font-semibold">Имя:</label>
            <InputText
              v-model.trim="realFirstName"
              id="real-first-name"
              :disabled="isSavingRequestPending"
            />
          </div>

          <div class="flex flex-col">
            <label for="real-last-name" class="font-semibold">Фамилия:</label>
            <InputText
              v-model.trim="realLastName"
              id="real-last-name"
              :disabled="isSavingRequestPending"
            />
          </div>

          <div class="flex flex-col">
            <label for="patronymic" class="font-semibold">Отчество:</label>
            <InputText
              v-model.trim="patronymic"
              id="patronymic"
              :disabled="isSavingRequestPending"
            />
          </div>

          <div class="flex flex-col">
            <label for="born-on" class="font-semibold">Дата рождения</label>
            <DatePicker
              input-id="born-on"
              v-model="bornOn"
              dateFormat="dd/mm/yy"
            />
          </div>

          <div class="flex flex-col">
            <label for="gender" class="font-semibold">Пол</label>
            <Select
              v-model="gender"
              label-id="gender"
              :options="genderOptions" option-label="name" placeholder="Выберите пол"/>

          </div>

        </section>
      </Fieldset>

      <Fieldset legend="Настройки">
        <section class="flex flex-col gap-y-4">
          <div class="flex items-center gap-x-2">
            <ToggleSwitch
              input-id="can-be-added-to-contacts"
              v-model="canBeAddedToContacts"
              :disabled="isSavingRequestPending"
            />
            <label for="can-be-added-to-contacts">Разрешить добавлять в контакты</label>
          </div>

          <div class="flex items-center gap-x-2">
            <ToggleSwitch
              input-id="can-receive-notifications"
              v-model="canReceiveNotifications"
              :disabled="isSavingRequestPending"
            />
            <label for="can-receive-notifications">Включить уведомления</label>
          </div>
        </section>
      </Fieldset>

      <Button class="mt-2 mb-6" @click="onSaveUser" :loading="isSavingRequestPending" label="Сохранить" type="submit"
              raised/>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useWebApp } from 'vue-tg'
import { useToast } from 'primevue/usetoast'
import type { User } from '~/types/users'
import type { ServerResponse } from '~/types/responses'

interface Gender {
  id: number
  name: string
}

const runtimeConfig = useRuntimeConfig()

const { initDataUnsafe } = useWebApp()

const userId = initDataUnsafe?.user?.id

const toast = useToast()

const url = `${runtimeConfig.public.apiBaseUrl}/users/${userId}/`
const { data: user, status } = await useFetch<User>(url)

const isSavingRequestPending = ref<boolean>(false)

const genderOptions: Gender[] = [
  {
    id: 1,
    name: 'Женский',
  },
  {
    id: 2,
    name: 'Мужской',
  },
  {
    id: 3,
    name: 'Другой',
  },
]

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
  gender.value = genderOptions.find(genderOption => genderOption.id == user.gender) ?? null
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
