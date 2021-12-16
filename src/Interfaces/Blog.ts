export interface ArticleType {
  title: string;
  date: string;
  headerImage: any;
  content: string[];
  comments: ArticleCommentType[];
  tags: string[];

  author: ArticleAuthorType;
}

export interface ArticleCommentType {
  id: number;
  text: string;
  date: string;
  author: ArticleAuthorType;
  comments: ArticleCommentType[];
}

export interface ArticleAuthorType {
  id: number;
  avatar: string;
  name: string;
}
