<template>
  <div>
    <label class="font-semibold">Энергия:</label>
    <ProgressBar
      :pt:value:style="energyProgressBarStyle"
      :value="normalizedEnergy"
    >
      {{ normalizedEnergy }}
    </ProgressBar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ energy: number }>()

const normalizedEnergy = computed((): number => props.energy / 100)

const energyProgressBarStyle = computed((): string | undefined => {
  if (normalizedEnergy.value < 40) return 'background-color: red;'
})
</script>
