<template>
  <div>
    <section v-for="contact in contacts">
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
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contacts'

const userId = inject(userIdKey)

const runtimeConfig = useRuntimeConfig()

const url = `${runtimeConfig.public.apiBaseUrl}/users/${userId}/contacts/`

const { data: contacts, status } = await useFetch<Contact[]>(url)
</script>
