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
  method: "GET",
  endpoint: "/account/me/password"
}

export const postAccountPasswordReset: Action = {
  method: "GET",
  endpoint: "/account/password/reset"
}

export const getAccountMe: Action<AuthedUser> = {
  method: "GET",
  endpoint: "/account/me"
}

export const putAccountMe: Action = {
  method: "GET",
  endpoint: "/account/me"
}

export const patchAccountMe: Action = {
  method: "GET",
  endpoint: "/account/me"
}

export const deleteAccountMe: Action = {
  method: "GET",
  endpoint: "/account/me"
}

export const postAccountPasswordResetConfirm: Action = {
  method: "GET",
  endpoint: "/account/password/reset/confirm"
}

export const postAccountToken: Action<{ token: string }> = {
  method: "GET",
  endpoint: "/account/token"
}

export const deleteAccountToken: Action = {
  method: "GET",
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
