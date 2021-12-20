export interface ArticleType extends ArticlePreviewType, ArticleContentType {
  comments: ArticleReplyType[]
  author: ArticleAuthorType
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
  preview: string
  content: string
  tags: string[]
}

export interface ArticleReplyType {
  id: number
  text: string
  created_at: string
  author: ArticleAuthorType
  replies: ArticleReplyType[]
}

export interface ArticleAuthorType {
  id: number
  avatar: string
  first_name: string
  last_name: string
}
