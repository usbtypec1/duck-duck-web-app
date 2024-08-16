<template>
  <Fieldset legend="Telegram">
    <div class="flex flex-row items-center gap-x-4">
      <section class="basis-1/2">
        <NuxtImg
          v-if="user.profile_photo_url"
          :src="user.profile_photo_url"
          alt="profile photo"
          class="rounded-full"
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
        <div>
          <label class="font-semibold">Энергия:</label>
          <ProgressBar
            :pt:value:style="energyProgressBarStyle"
            :value="energy"
          >
            {{ energy }}
          </ProgressBar>
        </div>
        <div>
          <label class="font-semibold">Здоровье:</label>
          <ProgressBar
            :pt:value:style="healthProgressBarStyle"
            :value="health"
          >
            {{ health }}
          </ProgressBar>
        </div>
      </section>
    </div>
  </Fieldset>

</template>

<script setup lang="ts">
import type { User } from '~/types/users'
import UserPremium from '~/components/user-profile/UserPremium.vue'

const props = defineProps<{
  user: User,
}>()

const energy = computed((): number => props.user.energy / 100)
const health = computed((): number => props.user.health / 100)

const energyProgressBarStyle = computed((): string | undefined => {
  if (energy.value < 40) return 'background-color: red;'
})
const healthProgressBarStyle = computed((): string | undefined => {
  if (health.value < 30) return 'background-color: red;'
})
</script>
