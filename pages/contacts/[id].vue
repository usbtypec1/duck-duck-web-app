<template>
  <div>
    <form @submit.prevent>
      <Fieldset legend="Редактирование контакта">
        <section class="flex flex-col gap-y-4">
          <div class="flex gap-x-4">
            <div class="basis-1/2">
              <NuxtImg
                v-if="contact.to_user.profile_photo_url"
                :src="contact.to_user.profile_photo_url"
                class="rounded-md"
              />
            </div>
            <div class="basis-1/2">
              <p><span class="font-semibold">Имя пользователя:</span> {{ contact.to_user.fullname }}</p>
              <p><span class="font-semibold">Username:</span> <template v-if="contact.to_user.username">@</template>{{ contact.to_user.username }}</p>
            </div>
          </div>
          <div class="flex flex-col">
            <label for="private-name" class="font-semibold">Приватное имя</label>
            <InputText id="private-name" v-model.trim="privateName"/>
          </div>
          <div class="flex flex-col">
            <label for="public-name" class="font-semibold">Публичное имя</label>
            <InputText id="public-name" v-model.trim="publicName"/>
          </div>
          <div class="flex gap-x-2">
            <ToggleSwitch input-id="is-hidden" v-model.trim="isHidden"/>
            <label for="is-hidden" class="font-semibold">Скрыть</label>
          </div>
          <Button label="Сохранить" raised class="mt-2"/>
        </section>
      </Fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contacts'

const { params } = useRoute()

const runtimeConfig = useRuntimeConfig()
const url = `${runtimeConfig.public.apiBaseUrl}/contacts/${params.id}`

const { data: contact, status } = await useFetch<Contact>(url)

const privateName = ref<string>()
const publicName = ref<string>()
const isHidden = ref<boolean>()

const handleContactResponseData = (contact: Contact): void => {
  console.log(contact)
  privateName.value = contact.private_name
  publicName.value = contact.public_name
  isHidden.value = contact.is_hidden
}

if (contact.value !== null) {
  handleContactResponseData(contact.value)
}
</script>
