import type { Gender } from '~/types/genders'

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
  gender: Gender | null
  energy: number
  health: number
}
