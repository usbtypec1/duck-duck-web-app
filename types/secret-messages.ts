import type { ContactPartial } from '~/types/contacts'

export interface SecretMessage {
  id: string
  text: string
  sender_id: number
  recipient_id: number
  created_at: string
}

export interface ContactSecretMessages {
  contact: ContactPartial
  secret_messages: SecretMessage[]
}
