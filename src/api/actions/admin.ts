import { MailingType } from "admin/components/AdminBlogMailing/AdminBlogMailing"
import { TagArticleProps } from "admin/components/AdminEditTags/AdminEditTags"
import { Action } from "api/client"
import { ArticleContentType, BlogTagType } from "interfaces/Blog"
import { OrderingType, PaginationType } from "interfaces/Django"
import { Client } from "interfaces/user"


/* Articles */

export const getAdminArticle = (articleId: string): Action<ArticleContentType> => ({
  method: "GET",
  endpoint: "/admin/articles/" + articleId,
})

export const getAdminArticles = (page: number, page_size: number, filters: {
  ordering?: OrderingType<"tags__contains" | "title__icontains">
  tags__contains?: string
  title__icontains?: string
}): Action<PaginationType<TagArticleProps>> => ({
  method: "GET",
  endpoint: "/admin/articles",
  params: { page, page_size, ...filters }
})

export const postAdminArticle = (data: ArticleContentType, is_draft?: boolean): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/admin/articles",
  body: { ...data, is_draft }
})

export const patchAdminArticle = (id: string | number, data: Partial<ArticleContentType>, is_draft?: boolean): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/admin/article/" + id,
  body: { ...data, is_draft }
})

export const deleteAdminArticle = (id: number): Action => ({
  method: "DELETE",
  endpoint: "/admin/article/" + id
})

export const deleteAdminComment = (id: number): Action => ({
  method: "DELETE",
  endpoint: "/admin/comment/" + id
})

/* Users */

export const getAdminUser = (id: number): Action => ({
  method: "GET",
  endpoint: "/admin/user/" + id,
})

export const patchAdminUser = (id: number, type: Client["type"]): Action => ({
  method: "PATCH",
  endpoint: "/admin/user/" + id,
  body: { type }
})

export const deleteAdminUser = (id: number): Action => ({
  method: "DELETE",
  endpoint: "/admin/user/" + id
})

export const getAdminUsers = (filters: Partial<{ id: number, type: string, first_name: string, page: number, page_size: number }>): Action<PaginationType<Client>> => ({
  method: "GET",
  endpoint: "/admin/users",
  params: filters
})

export const getAdminUsersEditors = (filters: Partial<{ id: number, first_name: string, page: number, page_size: number }>): Action<PaginationType<{
  id: number
  first_name: string
  last_name: string
  email: string
  articles_count: number
}>> => ({
  method: "GET",
  endpoint: "/admin/users/editors",
  params: filters
})

/* Tags */

export const postAdminTag = (title: string): Action<BlogTagType> => ({
  method: "POST",
  endpoint: "/admin/tags",
  body: { title }
})

export const putAdminTag = (id: number, title: string): Action<BlogTagType> => ({
  method: "PUT",
  endpoint: "/admin/tag/" + id,
  body: { title }
})

export const deleteAdminTag = (id: number): Action => ({
  method: "DELETE",
  endpoint: "/admin/tag/" + id
})

/* Mailing */

export const getAdminMailings = (page: number, page_size: number): Action<PaginationType<Omit<MailingType, "content">>> => ({
  method: "GET",
  endpoint: "/admin/mailings",
  params: { page, page_size }
})

export const postAdminMailings = (subject: string, content: string): Action => ({
  method: "POST",
  endpoint: "/admin/mailings",
  body: { subject, content }
})

export const getAdminMailing = (id: number): Action<MailingType> => ({
  method: "GET",
  endpoint: "/admin/mailing/" + id
})

export const patchAdminMailing = (id: number, data: Partial<Pick<MailingType, "content" | "subject">>): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/admin/mailing/" + id,
  body: data
})

export const deleteAdminMailing = (id: number): Action => ({
  method: "DELETE",
  endpoint: "/admin/mailing/" + id
})

export const postAdminMailingStart = (id: number): Action => ({
  method: "POST",
  endpoint: `/admin/mailing/${id}/start`
})

export const postAdminMailingStop = (id: number): Action => ({
  method: "POST",
  endpoint: `/admin/mailing/${id}/stop`
})
