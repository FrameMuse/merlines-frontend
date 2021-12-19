import { Action } from "api/client"
import { ArticleType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"

export const getBlogArticles: Action<PaginationType<ArticleType>> = {
  method: "GET",
  endpoint: "/blog/articles"
}

export const getBlogArticle = (id: string): Action<ArticleType> => ({
  method: "GET",
  endpoint: "/blog/article/" + id
})
