export type User = Client | Anonymous
export interface Client {
  auth: true

  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
  type: UserType
}
export interface Anonymous {
  auth: false
}

export enum UserType {
  Banned = 1, Default, Editor, Admin, Super
}
