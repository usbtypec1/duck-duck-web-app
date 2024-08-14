import type { User } from '~/types/users'

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
