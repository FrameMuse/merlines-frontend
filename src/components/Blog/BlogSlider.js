import { useHistory } from "react-router-dom"

import ArticleCard from "../Article/ArticleCard"
import Svg from "../common/Svg"

function BlogSlider({ articles }) {
  const history = useHistory()
  const hasTag = history.location.pathname.startsWith("/blog/tag/")
  const searchedTag = history.location.pathname.replace("/blog/tag/", "").toLowerCase()
  const filteredArticles = articles.items.filter(article => {
    if (!hasTag) return true

    if (article.tags.map(tag => tag.toLowerCase()).includes(searchedTag)) {
      return true
    }

    return false
  })
  if (filteredArticles.length < 1) return null
  return (
    <section className="section">
      <header className="section__header">
        <h2 className="section__title">{articles.name}</h2>
        {articles.name !== "Все" && (
          <div className="section__control">
            <Svg
              svgClass="section__arrow section__arrow--left"
              svgName="arrow-slider"
              svgWidth="20"
              svgHeight="20"
            />
            <Svg
              svgClass="section__arrow section__arrow--right"
              svgName="arrow-slider"
              svgWidth="20"
              svgHeight="20"
            />
          </div>
        )}
      </header>
      <ul className="section__list">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            imgSrc={article.blogMainImg}
            tags={article.tags}
            date={article.date}
            articleId={article.id}
          />
        ))}
      </ul>
    </section>
  )
}

export default BlogSlider
