import { Action } from "api/client"
import { ArticleFiltersType } from "components/Blog/Blog"
import { ArticlePreviewType, ArticleReplyType, ArticleType, BlogTagType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"


/* Tags */

export const getBlogTags = (page: number, page_size: number): Action<PaginationType<BlogTagType>> => ({
  method: "GET",
  endpoint: "/blog/tags",
  params: { page, page_size }
})

/* Content */

export const getBlogArticles = (page: number, page_size: number, filters?: Partial<ArticleFiltersType>): Action<PaginationType<ArticlePreviewType>> => ({
  method: "GET",
  endpoint: "/blog/articles",
  params: { page, page_size, ...filters }
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

export const postBlogArticleComments = (id: number, text: string, reply?: number): Action<Pick<ArticleReplyType, "id" | "created_at" | "author" | "is_deleted">> => ({
  method: "POST",
  endpoint: "/blog/article/" + id + "/comments",
  body: { text, reply }
})

/* Like */

export const postBlogArticleLike = (id: number): Action => ({
  method: "POST",
  endpoint: "/blog/article/" + id + "/like"
})
