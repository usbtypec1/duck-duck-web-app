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

  const deleteTag = async (tagId: number) => {
    const url = `${runtimeConfig.public.apiBaseUrl}/tags/`
    await $fetch(url, {
      method: 'DELETE',
      body: {
        tag_id: tagId,
        user_id: userStore.userId,
      }
    })
  }

  return {
    tags,
    fetchTags,
    deleteTag,
  }
})