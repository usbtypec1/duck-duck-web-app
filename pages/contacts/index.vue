<template>
  <div>
    <div v-if="contactsStore.contacts">
      <section v-for="contact in contactsStore.contacts">
        <NuxtLink :to="{ name: 'contacts-id', params: { id: contact.id } }">
          <div class="flex cursor-pointer my-4">
            <div class="basis-1/5">
              <NuxtImg
                v-if="contact.to_user.profile_photo_url"
                :src="contact.to_user.profile_photo_url"
                class="h-16 rounded-full"
                size="large"
                placeholder
              />
              <div
                v-else
                :class="[contact.is_hidden ? 'bg-gray-400' : 'bg-emerald-400']"
                class="w-16 h-16 rounded-full flex justify-center items-center"
              >
                <p class="font-semibold text-2xl text-white">{{ contact.private_name.at(0).toUpperCase() }}</p>
              </div>
            </div>
            <div class="ml-1">
              <p class="text-md font-semibold">{{ contact.private_name }}</p>
              <p class="text-sm text-gray-600">{{ contact.public_name }}</p>
              <p v-if="contact.is_hidden" class="text-xs text-gray-500">Скрыт</p>
            </div>
          </div>
        </NuxtLink>
        <Divider/>
      </section>
    </div>
    <p v-else>У вас нет контактов</p>
    <DevOnly>
      <Button
        class="w-full my-3"
        @click="toMainPage"
        severity="secondary"
        outlined
        label="Назад"
        :loading="isLoadingToMainPage"
      />
    </DevOnly>
    <MainButton text="Назад" @click="toMainPage" :progress="isLoadingToMainPage"/>
  </div>
</template>

<script setup lang="ts">
import { useWebApp, MainButton } from 'vue-tg'

const { initDataUnsafe } = useWebApp()

const contactsStore = useContactsStore()

const isLoadingToMainPage = ref<boolean>(false)

const userId = initDataUnsafe?.user?.id

const toMainPage = async () => {
  isLoadingToMainPage.value = true
  try {
    await navigateTo({ name: 'index' })
  } finally {
    isLoadingToMainPage.value = false
  }
}

if (!contactsStore.contacts) {
  await contactsStore.fetchAll(userId)
}
</script>
