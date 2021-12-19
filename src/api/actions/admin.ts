import { EditArticleType } from "admin/components/AdminEditArticle/AdminEditArticle"
import { Action } from "api/client"

export const postAdminArticle = (data: EditArticleType<string, Record<string, ArrayBuffer>>): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/admin/articles",
  body: data
})
