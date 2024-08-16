<template>
  <div>
    <label class="font-semibold">Здоровье:</label>
    <ProgressBar
      :pt:value:style="healthProgressBarStyle"
      :value="normalizedHealth"
    >
      {{ normalizedHealth }}
    </ProgressBar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ health: number }>()

const normalizedHealth = computed((): number => props.health / 100)

const healthProgressBarStyle = computed((): string | undefined => {
  if (normalizedHealth.value < 30) return 'background-color: red;'
})
</script>
