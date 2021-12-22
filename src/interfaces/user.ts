export type User = AuthedUser | UnauthedUser
export interface AuthedUser {
  authed: true
  // If Authed
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
  role: "admin" | "editor" | "default"
}
export interface UnauthedUser {
  authed: false
}
