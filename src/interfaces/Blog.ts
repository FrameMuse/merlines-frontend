export interface ArticleType extends ArticleContentType {
  id: number
  created_at: string
  comments: ArticleReplyType[]
  author: ArticleAuthorType
}

export interface ArticleContentType<Preview = string> {
  title: string
  preview: Preview
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
