import type { Theme } from '~/types/themes'

export const useThemesStore = defineStore('themesStore', () => {
  const themes = ref<Theme[]>([])

  const runtimeConfig = useRuntimeConfig()

  const fetchThemes = async () => {
    const url = `${runtimeConfig.public.apiBaseUrl}/themes/`
    const response = await $fetch<{ ok: boolean, result: Theme[] }>(url)

    if (response.ok) {
      themes.value = response.result
    } else {
      throw new Error('Failed to fetch themes')
    }
  }

  return {
    themes,
    fetchThemes,
  }
})