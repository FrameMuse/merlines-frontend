import { Action } from "api/client"
import { ArticleContentType, ArticleType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"

export const getBlogArticles: Action<PaginationType<ArticleType>> = {
  method: "GET",
  endpoint: "/blog/articles"
}

export const getBlogArticle = (id: string): Action<ArticleType> => ({
  method: "GET",
  endpoint: "/blog/article/" + id
})

export const postBlogArticle = (data: ArticleContentType<ArrayBuffer | string>): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/blog/articles",
  body: data
})
