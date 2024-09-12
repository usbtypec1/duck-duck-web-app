<template>
  <div>
    <form @submit.prevent>
      <Fieldset legend="Редактирование контакта">
        <section class="flex flex-col gap-y-4">
          <div class="flex md:flex-row flex-col gap-y-4">
            <div
              v-if="contact.user.profile_photo_url"
            >
              <NuxtImg
                :src="contact.user.profile_photo_url"
                class="rounded-md"
              />
            </div>
            <div>
              <p>
                <TelegramFullname :value="contact.user.fullname"/>
              </p>
              <p>
                <TelegramUsername :value="contact.user.username"/>
              </p>
            </div>
          </div>
          <div class="flex flex-col">
            <label for="private-name" class="font-semibold">Приватное имя</label>
            <InputText id="private-name" v-model.trim="privateName" :disabled="isRequestPending"/>
          </div>
          <div class="flex flex-col">
            <label for="public-name" class="font-semibold">Публичное имя</label>
            <InputText id="public-name" v-model.trim="publicName" :disabled="isRequestPending"/>
          </div>
          <div class="flex gap-x-2">
            <ToggleSwitch
              input-id="is-hidden"
              v-model.trim="isHidden"
              :disabled="isRequestPending"
            />
            <label for="is-hidden" class="font-semibold">Скрыть</label>
          </div>
          <div>
            <label for="theme" class="font-semibold">Тема контакта</label>
            <Select
              v-model="themeId"
              :options="themesStore.themes"
              option-label="secret_message_template_text"
              option-value="id"
              empty-message="Нет доступных тем"
              class="w-full"
            />
          </div>

          <div class="flex flex-col gap-y-3">
            <NuxtLink :to="{ name: 'contacts' }">
              <Button
                label="Назад"
                severity="secondary"
                class="w-full"
                icon="pi pi-arrow-left"
              />
            </NuxtLink>
            <Button
              @click="onDeleteContact"
              severity="danger"
              :loading="isRequestPending"
              label="Удалить"
              icon="pi pi-trash"
            />
            <Button
              @click="onSaveContact"
              :loading="isRequestPending"
              label="Сохранить"
              icon="pi pi-save"
            />
          </div>
        </section>
      </Fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import type { Contact } from '~/types/contacts'
import { useWebAppHapticFeedback } from 'vue-tg'

const { params } = useRoute()

const { notificationOccurred } = useWebAppHapticFeedback()

const toast = useToast()
const confirm = useConfirm()

const contactId = parseInt(params.id)

const privateName = ref<string>()
const publicName = ref<string>()
const isHidden = ref<boolean>()
const themeId = ref<string | null>()

const isRequestPending = ref<boolean>(false)

const handleContactResponseData = (contact: Contact): void => {
  privateName.value = contact.private_name
  publicName.value = contact.public_name
  isHidden.value = contact.is_hidden
  themeId.value = contact.theme?.id
}

const contactsStore = useContactsStore()
const themesStore = useThemesStore()


let contact = contactsStore.findContactById(contactId)

if (!contact) {
  contact = await contactsStore.fetchById(contactId)
}

if (themesStore.themes === undefined) {
  await themesStore.fetchThemes()
}


handleContactResponseData(contact)


const onDeleteContact = (): void => {
  notificationOccurred?.('warning')
  confirm.require({
    header: 'Подтверждение',
    message: 'Вы уверены, что хотите удалить контакт?',
    accept: deleteContact,
    acceptProps: {
      label: 'Удалить',
      severity: 'danger',
    },
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
    },
  })
}

const deleteContact = async (): Promise<void> => {
  isRequestPending.value = true
  try {
    await contactsStore.deleteById(contactId)
    notificationOccurred?.('success')
    toast.add({
      severity: 'warn',
      summary: 'Успешно',
      detail: 'Контакт удален',
      life: 3000,
    })
    await navigateTo({ name: 'contacts' })
  } catch (error) {
    console.error(error)
    notificationOccurred?.('error')
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось удалить контакт',
      life: 3000,
    })
  } finally {
    isRequestPending.value = false
  }
}

const onSaveContact = async (): Promise<void> => {
  isRequestPending.value = true
  try {
    await contactsStore.updateById({
      id: contactId,
      privateName: privateName.value,
      publicName: publicName.value,
      isHidden: isHidden.value,
      themeId: themeId.value,
    })
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
      detail: 'Не удалось сохранить изменения',
      life: 3000,
    })
  } finally {
    isRequestPending.value = false
  }
}
</script>
