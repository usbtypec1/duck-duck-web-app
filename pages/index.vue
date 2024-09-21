<template>
  <div>
    <UserProfileTelegramInfo :user="userStore.user"/>
    <Button
      class="my-3 w-full"
      outlined
      label="Получить подарок"
      rounded
      icon="pi pi-gift"
      v-if="isGiftShown"
      @click="onTakeGift"
    />
    <UserServicesSlider/>
    <UserProfileUpdateForm
      v-if="userStore.user"
      :user="userStore.user"
      v-model:realFirstName="realFirstName"
      v-model:realLastName="realLastName"
      v-model:patronymic="patronymic"
      v-model:bornOn="bornOn"
      v-model:canBeAddedToContacts="canBeAddedToContacts"
      v-model:canReceiveNotifications="canReceiveNotifications"
      v-model:gender="gender"
      v-model:personality-type-prefix="personalityTypePrefix"
      v-model:personality-type-suffix="personalityTypeSuffix"
      @submit="onSaveUser"
      :is-request-pending="isSavingRequestPending"
    />
    <p v-else>Не удалось загрузить информацию о пользователе</p>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { User } from '~/types/users'
import type { Gender } from '~/types/genders'
import { findGenderById } from '~/services/genders'
import UserServicesSlider from '~/components/user-profile/UserServicesSlider.vue'
import { useWebAppHapticFeedback } from 'vue-tg'


const { notificationOccurred } = useWebAppHapticFeedback()

const realFirstName = ref<string | null>()
const realLastName = ref<string | null>()
const patronymic = ref<string | null>()
const canBeAddedToContacts = ref<boolean>()
const canReceiveNotifications = ref<boolean>()
const profilePhotoUrl = ref<string | null>()
const bornOn = ref<Date | null>(null)
const gender = ref<Gender | null>()
const personalityTypePrefix = ref<string | null>()
const personalityTypeSuffix = ref<string | null>()

const handleUserResponse = (user: User): void => {
  realFirstName.value = user.real_first_name
  realLastName.value = user.real_last_name
  canBeAddedToContacts.value = user.can_be_added_to_contacts
  canReceiveNotifications.value = user.can_receive_notifications
  patronymic.value = user.patronymic
  profilePhotoUrl.value = user.profile_photo_url
  bornOn.value = user.born_on ? new Date(user.born_on) : null
  gender.value = findGenderById(user.gender)

  if (user.personality_type === null) {
    personalityTypePrefix.value = null
    personalityTypeSuffix.value = null
  } else {
    const [prefix, suffix] = user.personality_type.split('-')
    personalityTypePrefix.value = prefix
    personalityTypeSuffix.value = suffix
  }
}

const userStore = useUserStore()
const transactionsStore = useTransactionsStore()

if (!userStore.user) {
  await userStore.fetchUser()
}
handleUserResponse(userStore.user)

const toast = useToast()

const isSavingRequestPending = ref<boolean>(false)


const formatDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return `${year}-${month}-${day}`
}

const getRandomNumberFrom0To100 = (): number => {
  return Math.round(Math.random() * 100)
}

const isGiftShown = ref<boolean>(getRandomNumberFrom0To100() <= 5)


const onTakeGift = async () => {
  isGiftShown.value = false
  const amount: number = 1000
  try {
    await transactionsStore.createDeposit({ amount, description: '🎁 Подарок' })
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: `Подарок получен (${amount} коинов)`,
      life: 3000,
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось получить подарок',
      life: 3000,
    })
  } finally {
    isGiftShown.value = false
  }
}

const onSaveUser = async () => {
  isSavingRequestPending.value = true
  try {
    await userStore.updateUser(
      {
        realFirstName: realFirstName.value || '-',
        realLastName: realLastName.value || '-',
        patronymic: patronymic.value || '-',
        canBeAddedToContacts: canBeAddedToContacts.value,
        canReceiveNotifications: canReceiveNotifications.value,
        bornOn: bornOn.value ? formatDate(bornOn.value) : null,
        gender: gender.value?.id ?? null,
        personalityTypePrefix: personalityTypePrefix.value,
        personalityTypeSuffix: personalityTypeSuffix.value,
        themeId: userStore.user?.theme?.id ?? null,
      })
    await userStore.fetchUser()
    handleUserResponse(userStore.user)
    notificationOccurred?.('success')
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Изменения сохранены',
      life: 3000,
    })
  } catch (error) {
    console.error(error)
    notificationOccurred?.('error')
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
</script>
