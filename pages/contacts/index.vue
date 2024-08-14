<template>
  <div>
    <div v-if="contactsStore.contacts">
      <section v-for="contact in contactsStore.contacts">
        <NuxtLink :to="{ name: 'contacts-id', params: { id: contact.id } }">
          <div class="flex cursor-pointer">
            <div class="basis-1/4">
              <NuxtImg
                v-if="contact.to_user.profile_photo_url"
                :src="contact.to_user.profile_photo_url"
                class="w-full p-2 rounded-full"
                size="large"
                placeholder
              />
            </div>
            <div>
              <p class="text-md font-semibold">{{ contact.private_name }}</p>
              <p class="text-sm text-gray-600">{{ contact.public_name }}</p>
            </div>
          </div>
        </NuxtLink>
        <Divider/>
      </section>
    </div>
    <p v-else>У вас нет контактов</p>
    <NuxtLink :to="{ name: 'index' }">
      <Button class="w-full my-3" severity="secondary" outlined label="Назад"/>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useWebApp } from 'vue-tg'

const { initDataUnsafe } = useWebApp()

const contactsStore = useContactsStore()

const userId = initDataUnsafe?.user?.id

if (!contactsStore.contacts) {
  await contactsStore.fetchAll(userId)
}
</script>
