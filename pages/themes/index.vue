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
    <NuxtLink :to="{ name: 'index' }">
      <Button
        class="w-full my-2"
        severity="secondary"
        outlined
        label="Назад"
        icon="pi pi-arrow-left"
      />
    </NuxtLink>
    <Button
      class="w-full"
      :label="saveButtonText"
      icon="pi pi-save"
      raised
      :disabled="isCurrentTheme"
      @click="onSaveTheme"
      :loading="isRequestPending"
    />
  </div>
</template>

<script setup lang="ts">
import ThemeListItem from '~/components/themes/ThemeListItem.vue'
import { useWebAppHapticFeedback } from 'vue-tg'


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
      fullname: userStore.user.fullname,
      username: userStore.user.username,
      themeId: state.value.id,
    })
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
