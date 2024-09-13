import type { UserPartial } from '~/types/users'

export enum TagWeight {
  Gold = 1,
  Silver = 2,
  Bronze = 3,
}

export interface Tag {
  id: number
  text: string
  weight: TagWeight
  created_at: string
  of_user: UserPartial
}

export interface UserTags {
  user: UserPartial
  tags: Tag[]
}
