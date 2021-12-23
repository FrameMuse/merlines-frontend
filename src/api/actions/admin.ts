import { EditArticleType } from "admin/components/AdminArticleEditor/AdminArticleEditor"
import { Action } from "api/client"
import { DataURLBase64 } from "interfaces/common"
import { PaginationType } from "interfaces/Django"
import { AuthedUser } from "interfaces/user"


/* Articles */

export const getAdminArticle = (articleId: string): Action<EditArticleType<string, string[]>> => ({
  method: "GET",
  endpoint: "/admin/articles/" + articleId,
})

export const postAdminArticle = (data: EditArticleType<string, Record<string, DataURLBase64>>): Action<{ id: number }> => ({
  method: "POST",
  endpoint: "/admin/articles",
  body: data
})

export const patchAdminArticle = (data: EditArticleType<string, Record<string, DataURLBase64>>): Action<{ id: number }> => ({
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
