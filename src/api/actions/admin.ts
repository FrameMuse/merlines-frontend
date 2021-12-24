import { ArticleEditorContentType } from "admin/components/AdminArticleEditor/AdminArticleEditor"
import { Action } from "api/client"
import { ArticleContentType } from "interfaces/Blog"
import { PaginationType } from "interfaces/Django"
import { AuthedUser } from "interfaces/user"


/* Articles */

export const getAdminArticle = (articleId: string): Action<ArticleContentType> => ({
  method: "GET",
  endpoint: "/admin/articles/" + articleId,
})

export const postAdminArticle = (data: ArticleEditorContentType): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/admin/articles",
  body: data
})

export const patchAdminArticle = (data: ArticleEditorContentType): Action<{ id: number }> => ({
  method: "PATCH",
  endpoint: "/admin/articles",
  body: data
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

export const getAdminUsers = (filters: Partial<{ id: number, first_name: string, page: number, page_size: number }>): Action<PaginationType<AuthedUser>> => ({
  method: "GET",
  endpoint: "/admin/users",
  params: filters
})
