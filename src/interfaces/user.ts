export type User = AuthedUser | UnauthedUser
export interface AuthedUser {
  authed: true
  // If Authed
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
  type: "ADMIN" | "EDITOR" | "DEFAULT"
}
export interface UnauthedUser {
  authed: false
}
