<template>
  <div>
    <ThemeListItem :theme="state"/>
    <div class="fixed left-2 top-1/2">
      <Button
        class="opacity-70"
        icon="pi pi-arrow-left"
        rounded
        raised
        @click="prev()"
      />
    </div>
    <div class="fixed right-2 top-1/2">
      <Button
        class="opacity-70"
        size="large"
        icon="pi pi-arrow-right"
        rounded
        raised
        @click="next()"
      />
    </div>
    <Button
      class="w-full"
      :label="saveButtonText"
      icon="pi pi-save"
      raised
      :disabled="isCurrentTheme"
      @click="onSaveTheme"
      :loading="isRequestPending"
    />
    <FloatingCornerButton severity="help" page-name="index"/>
  </div>
</template>

<script setup lang="ts">
import ThemeListItem from '~/components/themes/ThemeListItem.vue'
import { useWebAppHapticFeedback } from 'vue-tg'
import FloatingCornerButton from '~/components/navigation/FloatingCornerButton.vue'


const { notificationOccurred } = useWebAppHapticFeedback()

const toast = useToast()

const themesStore = useThemesStore()
const userStore = useUserStore()

const isRequestPending = ref(false)

await themesStore.fetchThemes()

const { state, next, prev, go } = useCycleList(themesStore.themes)

const isCurrentTheme = computed(() => state.value.id === userStore.user?.theme?.id)
const saveButtonText = computed(() => isCurrentTheme.value ? 'Текущая тема' : 'Сохранить')

const onSaveTheme = async () => {
  if (!userStore.user) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Пользователь не найден',
    })
    return
  }

  isRequestPending.value = true
  try {
    await userStore.updateUser({
      realFirstName: userStore.user.real_first_name,
      realLastName: userStore.user.real_last_name,
      patronymic: userStore.user.patronymic,
      canBeAddedToContacts: userStore.user.can_receive_notifications,
      canReceiveNotifications: userStore.user.can_receive_notifications,
      bornOn: userStore.user.born_on,
      gender: userStore.user.gender,
      themeId: state.value.id,
    })
    await userStore.fetchUser()
    notificationOccurred?.('success')
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Тема сохранена',
    })
  } catch (error) {
    console.error(error)
    notificationOccurred?.('error')
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось сохранить тему',
    })
  } finally {
    isRequestPending.value = false
  }
}
</script>
