import "./article.scss"
import "./article-card.scss"
import "./article-page.scss"

import { getBlogArticle } from "api/actions/blog"
import { postMainEcho } from "api/actions/main"
import { FormEvent } from "react"
import { useQuery } from "react-fetching-library"

import ClientAPI from "../../api/client"
import ArticleContent from "./ArticleContent"


interface ArticleProps {
  articleId: string
}

function Article(props: ArticleProps) {
  const { error, payload } = useQuery(getBlogArticle(props.articleId))
  if (error || !payload || payload.error) return <>no content</>

  return (
    <div className="wrap">
      <ArticleContent {...payload} />
      {/* <ArticleRecomendation /> */}
    </div>
  )
}

export default Article
