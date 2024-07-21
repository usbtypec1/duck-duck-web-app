<template>
  <div class="flex flex-col gap-y-0.5">
    <p class="font-semibold">Тип личности:</p>
    <section class="flex gap-x-4">
      <div class="flex flex-col basis-2/3">
        <label for="personality-type-prefix">Префикс:</label>
        <Select
          v-model="personalityTypePrefix"
          :options="personalityTypePrefixes"
          id="personality-type-prefix"
        />
      </div>
      <div class="flex flex-col basis-1/3">
        <label for="personality-type-suffix">Суффикс:</label>
        <Select
          v-model="personalityTypeSuffix"
          :options="personalityTypeSuffixes"
          id="personality-type-suffix"
        />
      </div>
    </section>
  </div>

</template>

<script setup lang="ts">
const personalityTypePrefix = defineModel<string>('personalityTypePrefix', {
  set(value: string): string | null {
    return value === 'None' ? null : value
  }
})
const personalityTypeSuffix = defineModel<string>('personalityTypeSuffix', {
  set(value: string): string | null {
    return value === 'None' ? null : value
  }
})

const personalityTypePrefixes: string[] = [
  'INTJ',
  'INTP',
  'ENTJ',
  'ENTP',
  'INFJ',
  'INFP',
  'ENFJ',
  'ENFP',
  'ISTJ',
  'ISFJ',
  'ESTJ',
  'ESFJ',
  'ISTP',
  'ISFP',
  'ESTP',
  'ESFP',
]

const personalityTypeSuffixes: string[] = ['A', 'T']
</script>
