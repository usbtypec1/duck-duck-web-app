<template>
  <div>
    <section
      class="select-none py-4 mb-3 px-6 w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-gray-400 rounded-lg flex flex-col justify-between"
    >
      <p class="text-white font-semibold">Количество наград: {{ totalTagsCount }} ({{ renderBalance(totalTagsPrice) }} коинов)</p>
      <p class="text-white font-semibold text-sm">🥇 Золотые: {{ goldTagsCount }} ({{ renderBalance(totalTagsPrice) }} коинов)</p>
      <p class="text-white font-semibold text-sm">🥈 Серебряные: {{ silverTagsCount }} ({{ renderBalance(totalTagsPrice) }} коинов)</p>
      <p class="text-white font-semibold text-sm">🥉 Бронзовые: {{ bronzeTagsCount }} ({{ renderBalance(totalTagsPrice) }} коинов)</p>
      <p class="text-white font-semibold text-sm mt-1">Коэффициент продажи: {{ userStore.user.is_premium ? 0.75 : 0.5 }}x</p>
    </section>
    <TagList :tags="tagsStore.tags"/>
    <FloatingCornerButton page-name="index" severity="warn"/>
  </div>
</template>

<script setup lang="ts">
import TagList from '~/components/tags/TagList.vue'
import FloatingCornerButton from '~/components/navigation/FloatingCornerButton.vue'
import { TagWeight } from '~/types/tags'
import { renderBalance } from '~/services/balance'

const userStore = useUserStore()
const tagsStore = useTagsStore()

await tagsStore.fetchTags()

const tagWeightToPrice: Record<TagWeight, number> = {
  [TagWeight.Gold]: 1_000_000,
  [TagWeight.Silver]: 100_000,
  [TagWeight.Bronze]: 10_000,
}

const goldTagsCount = computed((): number => tagsStore.tags.filter(({ weight }) => weight === TagWeight.Gold).length)
const goldTagsPrice = computed((): number => goldTagsCount.value * tagWeightToPrice[TagWeight.Gold])

const silverTagsCount = computed((): number => tagsStore.tags.filter(({ weight }) => weight === TagWeight.Silver).length)
const silverTagsPrice = computed((): number => silverTagsCount.value * tagWeightToPrice[TagWeight.Silver])

const bronzeTagsCount = computed((): number => tagsStore.tags.filter(({ weight }) => weight === TagWeight.Bronze).length)
const bronzeTagsPrice = computed((): number => bronzeTagsCount.value * tagWeightToPrice[TagWeight.Bronze])

const totalTagsCount = computed((): number => goldTagsCount.value + silverTagsCount.value + bronzeTagsCount.value)
const totalTagsPrice = computed((): number => goldTagsPrice.value + silverTagsPrice.value + bronzeTagsPrice.value)
</script>
