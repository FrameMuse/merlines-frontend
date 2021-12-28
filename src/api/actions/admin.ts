import { MailingEntryType } from "admin/components/AdminBlogMailing/AdminBlogMailing"
import { AdminTagType } from "admin/components/AdminEditTags/AdminEditTags"
import { Action } from "api/client"
import { ArticleContentType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"
import { AuthedUser } from "interfaces/user"


/* Articles */

export const getAdminArticle = (articleId: string): Action<ArticleContentType> => ({
  method: "GET",
  endpoint: "/admin/articles/" + articleId,
})

export const postAdminArticle = (data: ArticleContentType): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/admin/articles",
  body: data
})

export const patchAdminArticle = (id: string, data: ArticleContentType): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/admin/article/" + id,
  body: data
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

export const putAdminUser = (id: number, type: AuthedUser["type"]): Action => ({
  method: "PUT",
  endpoint: "/admin/user/" + id,
  body: { type }
})

export const deleteAdminUser = (id: number): Action => ({
  method: "DELETE",
  endpoint: "/admin/user/" + id
})

export const getAdminUsers = (filters: Partial<{ id: number, type: string, first_name: string, page: number, page_size: number }>): Action<PaginationType<AuthedUser>> => ({
  method: "GET",
  endpoint: "/admin/users",
  params: filters
})

/* Tags */

export const getAdminTags = (page: number, page_size: number): Action<PaginationType<AdminTagType>> => ({
  method: "GET",
  endpoint: "/admin/tags",
  params: { page, page_size }
})

export const postAdminTag = (title: string): Action<AdminTagType> => ({
  method: "POST",
  endpoint: "/admin/tags",
  body: { title }
})

export const putAdminTag = (id: number, title: string): Action<AdminTagType> => ({
  method: "PUT",
  endpoint: "/admin/tag/" + id,
  body: { title }
})

export const deleteAdminTag = (id: number): Action => ({
  method: "DELETE",
  endpoint: "/admin/tag/" + id
})

/* Mailing */

export const getAdminMailings = (page: number, page_size: number): Action<PaginationType<MailingEntryType>> => ({
  method: "GET",
  endpoint: "/admin/mailings",
  params: { page, page_size }
})

export const postAdminMailings = (title: string, subject: string, content: string): Action => ({
  method: "POST",
  endpoint: "/admin/mailings",
  body: { title, subject, content }
})
