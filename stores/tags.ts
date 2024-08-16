import type { Tag } from '~/types/tags'
import type { ServerResponse } from '~/types/responses'

export const useTagsStore = defineStore('tagsStore', () => {
  const tags = ref<Tag[]>([])

  const userStore = useUserStore()

  const runtimeConfig = useRuntimeConfig()

  const fetchTags = async () => {
    const url = `${runtimeConfig.public.apiBaseUrl}/users/${userStore.userId}/tags/`

    const tagsResponse = await $fetch<ServerResponse<Tag[]>>(url)

    if (!tagsResponse.ok) {
      throw new Error('Failed to fetch tags')
    } else {
      tags.value = tagsResponse.result
    }
  }

  return {
    tags,
    fetchTags,
  }
})