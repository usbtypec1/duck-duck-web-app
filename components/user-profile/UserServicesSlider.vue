<template>
  <section
    class="flex gap-x-4 snap-x overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide mt-3 mb-1"
  >
    <NuxtLink :to="{ name: 'contacts' }">
      <Button
        outlined
        label="Контакты"
        icon="pi pi-users"
        icon-pos="top"
        class="scroll-ml-6 snap-start min-w-16"
        severity="info"
      />
    </NuxtLink>
    <NuxtLink :to="{ name: 'transactions' }">
      <Button
        outlined
        label="Переводы"
        icon="pi pi-money-bill"
        icon-pos="top"
        class="scroll-ml-6 snap-start min-w-16"
        severity="success"
      />
    </NuxtLink>
    <NuxtLink :to="{ name: 'themes' }">
      <Button
        outlined
        label="Темы"
        icon="pi pi-palette"
        icon-pos="top"
        class="scroll-ml-6 snap-start min-w-16"
        severity="help"
      />
    </NuxtLink>
  </section>
</template>
