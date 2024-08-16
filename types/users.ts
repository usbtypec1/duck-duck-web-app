import type { GenderEnum } from '~/types/genders'
import type { Theme } from '~/types/themes'

export interface User {
  id: number
  fullname: string
  username: string | null
  created_at: string
  can_be_added_to_contacts: boolean
  profile_photo_url: string | null
  can_receive_notifications: boolean
  personality_type: string | null
  born_on: string | null
  real_first_name: string | null
  real_last_name: string | null
  patronymic: string | null
  gender: GenderEnum | null
  energy: number
  health: number
  theme: Theme | null
  is_premium: boolean
}

export interface UserToUpdate {
  fullname: string
  username: string | null
  realFirstName?: string
  realLastName?: string
  patronymic?: string
  canBeAddedToContacts?: boolean
  canReceiveNotifications?: boolean
  bornOn?: string
  gender?: GenderEnum
  personalityTypePrefix?: string
  personalityTypeSuffix?: string
  themeId?: string
}

export interface UserPartial {
  id: number
  username: string | null
  fullname: string
}
