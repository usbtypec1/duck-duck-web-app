<template>
  <section
    class="flex gap-x-2.5 snap-x overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide mt-3 mb-1"
  >
    <NuxtLink
      v-for="item in items"
      :key="item.label"
      :to="{ name: item.pageName }"
    >
      <Button
        :label="item.label"
        :icon="item.icon"
        icon-pos="top"
        :severity="item.severity"
        outlined
      />

    </NuxtLink>
  </section>
</template>
<script setup lang="ts">
const items = [
  {
    label: 'Контакты',
    icon: 'pi pi-users',
    severity: 'info',
    pageName: 'contacts'
  },
  {
    label: 'Переводы',
    icon: 'pi pi-money-bill',
    severity: 'success',
    pageName: 'transactions'
  },
  {
    label: 'Темы',
    icon: 'pi pi-palette',
    severity: 'help',
    pageName: 'themes'
  },
  {
    label: 'Награды',
    icon: 'pi pi-trophy',
    severity: 'warn',
  },
  {
    label: 'Секретки',
    icon: 'pi pi-lock',
    severity: 'contrast',
  }
]
</script>