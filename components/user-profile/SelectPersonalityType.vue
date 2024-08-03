<template>
  <div class="flex flex-col gap-y-0.5">
    <p class="font-semibold">Тип личности:</p>
    <section class="flex gap-x-4">
      <div class="flex flex-col basis-2/3">
        <label for="personality-type-prefix">Префикс:</label>
        <Select
          v-model="personalityTypePrefix"
          :disabled="disabled"
          :options="personalityTypePrefixes"
          :option-label="formatPersonalityTypePrefix"
          option-value="value"
          filter
          filter-placeholder="Поиск по названию"
          id="personality-type-prefix"
        />
      </div>
      <div class="flex flex-col basis-1/3">
        <label for="personality-type-suffix">Суффикс:</label>
        <Select
          v-model="personalityTypeSuffix"
          :disabled="disabled"
          :options="personalityTypeSuffixes"
          :option-label="formatPersonalityTypeSuffix"
          option-value="value"
          id="personality-type-suffix"
        />
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
defineProps<{ disabled: boolean }>()

const personalityTypePrefix = defineModel<string>('personalityTypePrefix', {
  default: null,
})
const personalityTypeSuffix = defineModel<string>('personalityTypeSuffix', {
  default: null,
})


interface PersonalityTypePrefix {
  value: string
  name: string
}


const formatPersonalityTypePrefix = (personalityTypePrefix: PersonalityTypePrefix): string => {
  return `${personalityTypePrefix.value} - ${personalityTypePrefix.name}`
}

const personalityTypePrefixes: PersonalityTypePrefix[] = [
  {
    value: 'INTJ',
    name: 'Стратег',
  },
  {
    value: 'INTP',
    name: 'Ученый',
  },
  {
    value: 'ENTJ',
    name: 'Командир',
  },
  {
    value: 'ENTP',
    name: 'Полемист',
  },
  {
    value: 'INFJ',
    name: 'Активист',
  },
  {
    value: 'INFP',
    name: 'Посредник',
  },
  {
    value: 'ENFJ',
    name: 'Тренер',
  },
  {
    value: 'ENFP',
    name: 'Борец',
  },
  {
    value: 'ISTJ',
    name: 'Администратор',
  },
  {
    value: 'ISFJ',
    name: 'Защитник',
  },
  {
    value: 'ESTJ',
    name: 'Менеджер',
  },
  {
    value: 'ESFJ',
    name: 'Консул',
  },
  {
    value: 'ISTP',
    name: 'Виртуоз',
  },
  {
    value: 'ISFP',
    name: 'Артист',
  },
  {
    value: 'ESTP',
    name: 'Делец',
  },
  {
    value: 'ESFP',
    name: 'Развлекатель',
  },
]

interface PersonalityTypeSuffix {
  name: string
  value: string
}

const formatPersonalityTypeSuffix = (personalityTypeSuffix: PersonalityTypeSuffix): string => {
  return `${personalityTypeSuffix.value} - ${personalityTypeSuffix.name}`
}

const personalityTypeSuffixes: PersonalityTypeSuffix[] = [
  {
    name: 'Assertive',
    value: 'A',
  },
  {
    name: 'Turbulent',
    value: 'T',
  },
]
</script>
