<template>
  <form
    @submit.prevent
    class="flex flex-col gap-y-2"
  >
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
          <div>
            <label class="font-semibold">Энергия:</label>
            <ProgressBar :value="energy">{{ energy }}</ProgressBar>
          </div>
          <div>
            <label class="font-semibold">Здоровье:</label>
            <ProgressBar :value="health">{{ health }}</ProgressBar>
          </div>
        </section>
      </div>
    </Fieldset>

    <Fieldset legend="Контакты">
      <NuxtLink :to="{ name: 'contacts' }">
        <Button outlined label="Список контактов"/>
      </NuxtLink>
    </Fieldset>

    <Fieldset legend="Личная информация">
      <section class="flex flex-col gap-y-3">
        <div class="flex flex-col">
          <label for="real-first-name" class="font-semibold">Имя:</label>
          <InputText
            v-model.trim="realFirstName"
            id="real-first-name"
            :disabled="isRequestPending"
          />
        </div>

        <div class="flex flex-col">
          <label for="real-last-name" class="font-semibold">Фамилия:</label>
          <InputText
            v-model.trim="realLastName"
            id="real-last-name"
            :disabled="isRequestPending"
          />
        </div>

        <div class="flex flex-col">
          <label for="patronymic" class="font-semibold">Отчество:</label>
          <InputText
            v-model.trim="patronymic"
            id="patronymic"
            :disabled="isRequestPending"
          />
        </div>

        <div class="flex flex-col">
          <label for="born-on" class="font-semibold">Дата рождения:</label>
          <DatePicker
            :disabled="isRequestPending"
            input-id="born-on"
            v-model="bornOn"
            dateFormat="dd/mm/yy"
          />
        </div>

        <div class="flex flex-col">
          <label for="gender" class="font-semibold">Пол:</label>
          <Select
            v-model="gender"
            label-id="gender"
            :options="genders"
            :disabled="isRequestPending"
            option-label="name"
            placeholder="Выберите пол"
          />
        </div>

        <SelectPersonalityType
          v-model:personality-type-prefix="personalityTypePrefix"
          v-model:personality-type-suffix="personalityTypeSuffix"
          :disabled="isRequestPending"
        />

      </section>
    </Fieldset>

    <Fieldset legend="Настройки">
      <section class="flex flex-col gap-y-4">
        <div class="flex items-center gap-x-2">
          <ToggleSwitch
            input-id="can-be-added-to-contacts"
            v-model="canBeAddedToContacts"
            :disabled="isRequestPending"
          />
          <label for="can-be-added-to-contacts">Разрешить добавлять в контакты</label>
        </div>

        <div class="flex items-center gap-x-2">
          <ToggleSwitch
            input-id="can-receive-notifications"
            v-model="canReceiveNotifications"
            :disabled="isRequestPending"
          />
          <label for="can-receive-notifications">Включить уведомления</label>
        </div>
      </section>
    </Fieldset>

    <DevOnly>
      <Button
        class="mt-2 mb-6"
        @click="emit('submit')"
        :loading="isRequestPending"
        label="Сохранить"
        type="submit"
        raised
      />
    </DevOnly>
    <MainButton
      @click="emit('submit')"
      :progress="isRequestPending"
      text="Сохранить"
    />
  </form>

</template>

<script setup lang="ts">
import type { User } from '~/types/users'
import { genders } from '~/services/genders'
import { MainButton } from 'vue-tg'
import SelectPersonalityType from '~/components/user-profile/SelectPersonalityType.vue'

const props = defineProps<{
  user: User,
  isRequestPending: boolean,
}>()

const emit = defineEmits<{
  submit: [],
}>()

const realFirstName = defineModel<string | null>('realFirstName')
const realLastName = defineModel<string | null>('realLastName')
const patronymic = defineModel<string | null>('patronymic')
const bornOn = defineModel<Date | null>('bornOn')
const canBeAddedToContacts = defineModel<boolean>('canBeAddedToContacts')
const canReceiveNotifications = defineModel<boolean>('canReceiveNotifications')
const gender = defineModel<{ id: number, name: string }>('gender')
const personalityTypePrefix = defineModel<string>('personalityTypePrefix')
const personalityTypeSuffix = defineModel<string>('personalityTypeSuffix')

const energy = computed((): number => props.user.energy / 100)
const health = computed((): number => props.user.health / 100)
</script>
