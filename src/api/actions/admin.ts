import { EditArticleType } from "admin/components/AdminArticleEditor/AdminArticleEditor"
import { Action } from "api/client"
import { DataURLBase64 } from "interfaces/common"

export const postAdminArticle = (data: EditArticleType<string, Record<string, DataURLBase64>>): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/admin/articles",
  body: data
})

export const patchAdminArticle = (data: EditArticleType<string, Record<string, DataURLBase64>>): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/admin/articles",
  body: data
})
