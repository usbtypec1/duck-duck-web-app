<template>
  <div>
    <form @submit.prevent>
      <Fieldset legend="Редактирование контакта">
        <section class="flex flex-col gap-y-4">
          <div class="flex gap-x-4">
            <div
              v-if="contact.to_user.profile_photo_url"
              class="basis-1/2"
            >
              <NuxtImg
                :src="contact.to_user.profile_photo_url"
                class="rounded-md"
              />
            </div>
            <div>
              <p><span class="font-semibold">Имя пользователя:</span>&nbsp;{{ contact.to_user.fullname }}</p>
              <p><span class="font-semibold">Username:</span>
                <span>&nbsp;<template v-if="contact.to_user.username">@</template>{{ contact.to_user.username }}</span>
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

          <div class="flex flex-col gap-y-3">
            <NuxtLink :to="{ name: 'contacts' }">
              <Button
                label="Назад"
                severity="secondary"
                class="w-full"
              />
            </NuxtLink>
            <Button
              @click="onDeleteContact"
              severity="danger"
              :loading="isRequestPending"
              label="Удалить"
            />
            <Button
              @click="onSaveContact"
              :loading="isRequestPending"
              label="Сохранить"
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

const { params } = useRoute()

const toast = useToast()
const confirm = useConfirm()

const contactId = parseInt(params.id)

const privateName = ref<string>()
const publicName = ref<string>()
const isHidden = ref<boolean>()

const isRequestPending = ref<boolean>(false)

const handleContactResponseData = (contact: Contact): void => {
  privateName.value = contact.private_name
  publicName.value = contact.public_name
  isHidden.value = contact.is_hidden
}


const contactsStore = useContactsStore()

let contact = contactsStore.findContactById(contactId)

if (!contact) {
  contact = await contactsStore.fetchById(contactId)
}

handleContactResponseData(contact)


const onDeleteContact = (): void => {
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
    toast.add({
      severity: 'warn',
      summary: 'Успешно',
      detail: 'Контакт удален',
      life: 3000,
    })
    await navigateTo({ name: 'contacts' })
  } catch (error) {
    console.error(error)
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
    })
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Изменения сохранены',
      life: 3000,
    })
  } catch (error) {
    console.error(error)
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
