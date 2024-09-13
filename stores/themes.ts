import type { Theme } from '~/types/themes'

export const useThemesStore = defineStore('themesStore', () => {
  const themes = ref<Theme[]>()

  const runtimeConfig = useRuntimeConfig()

  const fetchThemes = async () => {
    const url = `${runtimeConfig.public.apiBaseUrl}/themes/`
    const response = await $fetch<Theme[]>(url)

    if (response) {
      themes.value = response
    } else {
      throw new Error('Failed to fetch themes')
    }
  }

  return {
    themes,
    fetchThemes,
  }
})