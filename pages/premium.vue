<template>
  <div>
    <div
      class="select-none h-screen w-full rounded-lg flex flex-col gap-y-4"
    >
      <Card #content>
        <p class="font-semibold text-2xl text-center">🌟 Премиум подписка</p>
      </Card>
      <Card v-for="feature in features">
        <template #title>{{ feature.title }}</template>
        <template #content><span v-html="feature.content"></span></template>
      </Card>
      <div class="fixed bottom-5 right-3">
        <NuxtLink :to="{ name: 'index' }">
          <Button class="my-4" raised rounded size="large" icon="pi pi-arrow-left" severity="primary"/>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'premium',
})

const features: { title: string, content: string }[] = [
  {
    title: '⛏️ Шахта',
    content: `
    <p>💎 1. Увеличенная вероятность добычи более редких ресурсов на 5-15%.</p>
    <p>⚡️ 2. Затраты энергии меньше на 25%.</p>
    <p>❤️‍🩹 3. Затраты здоровья меньше на 20%.</p>
    <p>⏱️ 4. Копать можно раз в полтора часа, вместо 3 часов.</p>
    `,
  },
  {
    title: '🏆 Награды',
    content: `
    <p>📉 1. Стоимость наград снижена на 25%</p>
    <p>💳 2. При продаже награды возвращается 75% от стоимости, вместо 50%.</p>`
  },
  {
    title: '🧮 Работа "арифметика"',
    content: `
    <p>🔥 1. Награда увеличена на 50%.</p>`
  }
]
</script>
