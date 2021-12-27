import { Action } from "api/client"
import { ArticlePreviewType, ArticleReplyType, ArticleType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"


/* Content */

export const getBlogArticles = (page: number, page_size: number, tags__contains: string): Action<PaginationType<ArticlePreviewType>> => ({
  method: "GET",
  endpoint: "/blog/articles",
  params: { page, page_size, tags__contains }
})

export const getBlogArticle = (id: string): Action<ArticleType> => ({
  method: "GET",
  endpoint: "/blog/article/" + id,
  config: {
    skipCache: true
  }
})


/* Comments */

export const getBlogArticleComments = (id: number, page: number, page_size: number): Action<PaginationType<ArticleReplyType>> => ({
  method: "GET",
  endpoint: "/blog/article/" + id + "/comments",
  params: { page, page_size }
})

export const postBlogArticleComments = (id: number, text: string, reply?: number): Action<Pick<ArticleReplyType, "id" | "created_at" | "author">> => ({
  method: "POST",
  endpoint: "/blog/article/" + id + "/comments",
  body: { text, reply }
})

/* Like */

export const postBlogArticleLike = (id: number): Action => ({
  method: "POST",
  endpoint: "/blog/article/" + id + "/like"
})
