import type { RouterConfig } from '@nuxt/schema'
import { createMemoryHistory } from '#vue-router'


export default <RouterConfig>{
  history: base => import.meta.client ? createMemoryHistory(base) : null,
}
