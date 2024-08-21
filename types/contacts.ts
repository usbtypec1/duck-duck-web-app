import type { User, UserPartial } from '~/types/users'

export interface Contact {
  id: number
  of_user: User
  to_user: User
  private_name: string
  public_name: string
  created_at: string
  is_hidden: boolean
}

export interface ContactToUpdate {
  id: number
  privateName: string
  publicName: string
  isHidden: boolean
}

export interface ContactPartial {
  id: number
  of_user: UserPartial,
  to_user: UserPartial,
}
