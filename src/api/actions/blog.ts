import { Action } from "api/client"
import { ArticleType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"

export const getArticles: Action<PaginationType<ArticleType>> = {
  method: "GET",
  endpoint: "/blog/articles"
}

export const getArticle = (id: string): Action<ArticleType> => ({
  method: "GET",
  endpoint: "/blog/article/" + id
})
