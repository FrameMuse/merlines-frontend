import "./article.scss"
import "./article-card.scss"
import "./article-page.scss"

import ArticleContent from "./ArticleContent"
import ArticleRecomendation from "./ArticleRecomendation"

function Article({ articleData }) {
  return (
    <div className="wrap">
      <ArticleContent articleData={articleData} />
      <ArticleRecomendation />
    </div>
  )
}

export default Article
