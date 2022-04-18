import { Action } from "api/client"
import { DataURLBase64 } from "interfaces/common"
import { Client } from "interfaces/user"

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

export const postAccountPassword = (email: string): Action => ({
  method: "POST",
  endpoint: "/account/password",
  body: { email }
})

export const putAccountPassword = (password: string, session: string): Action<{ token: string }> => ({
  method: "PUT",
  endpoint: "/account/password",
  body: { password, session }
})


export const putAccountMePassword = (userData: {
  old_password: string
  new_password: string
}): Action<{}> => ({
  method: "PUT",
  endpoint: "/account/me/password",
  body: userData
})

export const postAccountPasswordReset: Action = {
  method: "POST",
  endpoint: "/account/password/reset"
}

export const getAccountMe: Action<Client> = {
  method: "GET",
  endpoint: "/account/me"
}

export const putAccountMe: Action = {
  method: "PUT",
  endpoint: "/account/me"
}

export const patchAccountMe = (userData: Partial<Pick<Client, "first_name" | "last_name"> & { avatar: DataURLBase64 }>): Action<Client> => ({
  method: "PATCH",
  endpoint: "/account/me",
  body: userData
})

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

export const postAccountSupport = (text: string): Action<{}> => ({
  method: "POST",
  endpoint: "/account/me/supports",
  body: { text }
})