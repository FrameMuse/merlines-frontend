import { Action } from "api/client"
import { ArticlePreviewType, ArticleType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"

export const getBlogArticles = (page: number, page_size: number, tags__contains: string): Action<PaginationType<ArticlePreviewType>> => ({
  method: "GET",
  endpoint: "/blog/articles",
  params: { page, page_size, tags__contains }
})

export const getBlogArticle = (id: string): Action<ArticleType> => ({
  method: "GET",
  endpoint: "/blog/article/" + id,
  config: {
    skipAuth: true
  }
})
