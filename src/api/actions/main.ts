import { Action } from "api/client"

export const getMainEcho: Action = {
  method: "GET",
  endpoint: "/main/echo"
}

export const postMainEcho = (formData: FormData): Action => ({
  method: "POST",
  endpoint: "/main/echo",
  body: formData
})
