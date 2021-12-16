import "./article.scss"
import "./article-card.scss"
import "./article-page.scss"

import { ArticleType } from "../../Interfaces/Blog"
import ArticleContent from "./ArticleContent"
import ArticleRecomendation from "./ArticleRecomendation"


interface ArticleProps extends ArticleType { }

function Article(props: ArticleProps) {
  return (
    <div className="wrap">
      <ArticleContent {...props} />
      <ArticleRecomendation />
    </div>
  )
}

export default Article
