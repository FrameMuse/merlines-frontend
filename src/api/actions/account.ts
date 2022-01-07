import { Action } from "api/client"
import { AuthedUser } from "interfaces/user"

export const getAccount: Action = {
  method: "GET",
  endpoint: "/account",
  config: {
    skipCache: true
  }
}

export const postAccount: Action = {
  method: "POST",
  endpoint: "/account"
}

export const postAccountMePassword: Action = {
  method: "POST",
  endpoint: "/account/me/password"
}

export const postAccountPasswordReset: Action = {
  method: "POST",
  endpoint: "/account/password/reset"
}

export const getAccountMe: Action<AuthedUser> = {
  method: "GET",
  endpoint: "/account/me"
}

export const putAccountMe: Action = {
  method: "PUT",
  endpoint: "/account/me"
}

export const patchAccountMe: Action = {
  method: "PATCH",
  endpoint: "/account/me"
}

export const deleteAccountMe: Action = {
  method: "DELETE",
  endpoint: "/account/me"
}

export const postAccountPasswordResetConfirm: Action = {
  method: "POST",
  endpoint: "/account/password/reset/confirm"
}

export const postAccountRegister = (userData: {
  email: string
  password: string
  first_name: string
  last_name: string
}): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/account/register",
  body: { ...userData }
})

export const postAccountToken = (userData: {
  email: string
  password: string
}): Action<{ token: string }> => ({
  method: "POST",
  endpoint: "/account/token",
  body: { ...userData }
})

export const deleteAccountToken: Action = {
  method: "DELETE",
  endpoint: "/account/token"
}

export const getAccountSocialFacebook: Action = {
  method: "GET",
  endpoint: "/account/social/facebook"
}

export const getAccountSocialInstagram: Action = {
  method: "GET",
  endpoint: "/account/social/instagram"
}
