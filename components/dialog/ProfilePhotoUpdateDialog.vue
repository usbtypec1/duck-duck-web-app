<template>
  <Dialog v-model:visible="isVisible" modal header="Фото профиля" :style="{ width: '25rem' }">
    <FileUpload
      mode="basic"
      name="profile_photo"
      :url="url"
      accept="image/*"
      :max-file-size="1000000"
      @upload="onUpload"
      @error="onError"
      auto
      class="w-full"
      :disabled="uploadStatus !== null"
      choose-label="Загрузить"
    />
    <p
      v-if="uploadStatus === 'success'"
      class="text-center mt-1"
    >
      Фото успешно загружено
    </p>
    <p
      v-else-if="uploadStatus === 'error'"
      class="text-center mt-1 text-red-500"
    >
      Произошла ошибка
    </p>
    <Button
      type="button"
      class="w-full mt-3"
      label="Закрыть"
      outlined
      @click="onClose"
    />
  </Dialog>
</template>

<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload'

const isVisible = defineModel<boolean>('isVisible')

const uploadStatus = ref<'success' | 'error' | null>(null)

const userStore = useUserStore()
const runtimeConfig = useRuntimeConfig()

const onClose = () => {
  isVisible.value = false
  uploadStatus.value = null
}

const onUpload = async () => {
  uploadStatus.value = 'success'
  await userStore.fetchUser()
}

const onError = () => {
  uploadStatus.value = 'error'
}

const url = computed((): string | undefined => {
  if (!userStore.userId) return
  return `${runtimeConfig.public.apiBaseUrl}/users/${userStore.userId}/profile-photos/`
})
</script>
