import { Action } from "api/client"
import { ArticleContentType } from "interfaces/Blog"

export const postAdminArticle = (data: ArticleContentType<ArrayBuffer | string>): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/admin/articles",
  body: data
})
