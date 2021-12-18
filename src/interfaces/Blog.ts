export interface ArticleType {
  title: string
  created_at: string
  preview: string
  content: string
  comments: ArticleReplyType[]
  tags: string[]

  author: ArticleAuthorType
}

export interface ArticleReplyType {
  id: number
  text: string
  date: string
  author: ArticleAuthorType
  replies: ArticleReplyType[]
}

export interface ArticleAuthorType {
  id: number
  avatar: string
  first_name: string
  last_name: string
}
