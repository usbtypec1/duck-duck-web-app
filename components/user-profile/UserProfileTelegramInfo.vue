<template>
  <Fieldset legend="Telegram">
    <div class="flex flex-row items-center gap-x-4">
      <section class="basis-1/2 flex justify-center">
        <NuxtImg
          v-if="user.profile_photo_url"
          :src="user.profile_photo_url"
          alt="profile photo"
          class="rounded-full aspect-square cursor-pointer"
          @click="isProfilePhotoUpdateDialogVisible = true"
        />
        <Button
          v-else
          label="Добавить фото"
          text
          icon="pi pi-image"
          @click="isProfilePhotoUpdateDialogVisible = true"
        />
      </section>
      <section class="basis-1/2 flex flex-col justify-center">
        <p>
          <TelegramFullname :value="user.fullname"/>
        </p>
        <p>
          <TelegramUsername :value="user.username"/>
        </p>
        <p>
          <UserPremium :is-premium="user.is_premium"/>
        </p>
        <UserEnergyProgressBar :energy="user.energy"/>
        <UserHealthProgressBar :health="user.health"/>
      </section>
    </div>
    <ProfilePhotoUpdateDialog v-model:is-visible="isProfilePhotoUpdateDialogVisible"/>
  </Fieldset>
</template>

<script setup lang="ts">
import type { User } from '~/types/users'
import UserPremium from '~/components/user-profile/UserPremium.vue'
import UserEnergyProgressBar from '~/components/user-profile/UserEnergyProgressBar.vue'
import UserHealthProgressBar from '~/components/user-profile/UserHealthProgressBar.vue'
import ProfilePhotoUpdateDialog from '~/components/dialog/ProfilePhotoUpdateDialog.vue'

const props = defineProps<{
  user: User,
}>()

const isProfilePhotoUpdateDialogVisible = ref<boolean>(false)
</script>
