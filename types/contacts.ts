import type { UserPartial, UserPartialWithProfilePhotoUrl, UserPartialWithTheme } from '~/types/users'
import type { Theme } from '~/types/themes'

export interface Contact {
  id: number
  user: UserPartialWithProfilePhotoUrl
  private_name: string
  public_name: string
  theme: Theme | null
  is_hidden: boolean
  created_at: string
}

export interface ContactToUpdate {
  id: number
  privateName: string
  publicName: string
  isHidden: boolean
  themeId: string | null
}

export interface ContactPartial {
  id: number
  of_user: UserPartial,
  to_user: UserPartial,
}

export interface UserContacts {
  user: UserPartialWithTheme
  contacts: Contact[]
}
