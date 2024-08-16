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
  of_user_fullname: string
  of_user_username: string | null
}
