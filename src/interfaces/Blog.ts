import { DataURLBase64, URLType } from "./common"


/* Blog */

export interface BlogTagType {
  id: number
  title: string
}

/* Article */

export interface ArticleType extends ArticlePreviewType, ArticleContentType {
  author: ArticleAuthorType
  likes: number
  liked: boolean
}

export interface ArticlePreviewType {
  id: number
  title: string
  created_at: string
  preview: string
  tags: string[]
}

export interface ArticleContentType {
  title: string
  content: string
  preview: string
  tags: string[]
  is_draft: boolean
  files: ArticleFileType[]
}

export interface ArticleFileType {
  name: string
  data: URLType | DataURLBase64 | null
}

export interface ArticleReplyType {
  id: number
  text: string | null
  is_deleted: boolean
  created_at: string
  author: ArticleAuthorType
  replies?: ArticleReplyType[]
}

export interface ArticleAuthorType {
  id: number
  avatar: string
  first_name: string
  last_name: string
}
