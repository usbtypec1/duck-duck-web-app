import type { UserPartial } from '~/types/users'

export interface Transaction {
  id: string
  sender: UserPartial | null
  recipient: UserPartial | null
  amount: number
  description: string | null
  created_at: string
}

export interface TransactionsPage {
  transactions: Transaction[]
  is_end_of_list_reached: boolean
}
