import type { Tag, UserTags } from '~/types/tags'

export const useTagsStore = defineStore('tagsStore', () => {
  const tags = ref<Tag[]>([])

  const userStore = useUserStore()

  const runtimeConfig = useRuntimeConfig()

  const fetchTags = async () => {
    if (userStore.userId === undefined) {
      throw new Error('User ID is not set')
    }
    const url = `${runtimeConfig.public.apiBaseUrl}/tags/users/${userStore.userId}/`
    const userTags = await $fetch<UserTags>(url)
    tags.value = userTags.tags
  }

  return {
    tags,
    fetchTags,
  }
})