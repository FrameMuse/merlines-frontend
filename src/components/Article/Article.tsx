import "./article.scss"
import "./article-card.scss"
import "./article-page.scss"

import { articles } from "components/Blog/BlogLoadedData/articles.json"

import ArticleContent from "./ArticleContent"
import ArticleRecomendation from "./ArticleRecomendation"


interface ArticleProps {
  articleId: string
}

function Article(props: ArticleProps) {
  return (
    <div className="wrap">
      <ArticleContent {...articles[0].items[0] as any} />
      <ArticleRecomendation />
    </div>
  )
}

export default Article
