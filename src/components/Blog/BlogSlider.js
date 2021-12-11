import { useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"

import ArticleCard from "../Article/ArticleCard"
import Svg from "../common/Svg"
import { blogSearchState } from "./BlogSearch"



function BlogSlider({ articles }) {
  const history = useHistory()
  const [blogSearch] = useRecoilState(blogSearchState)

  const hasTag = history.location.pathname.startsWith("/blog/tag/")
  const searchedTag = history.location.pathname.replace("/blog/tag/", "").toLowerCase()
  const filteredArticles = articles.items.filter(article => {
    if (blogSearch && !article.title.split(" ").includes(blogSearch)) {
      return false
    }

    if (hasTag && !article.tags.map(tag => tag.toLowerCase()).includes(searchedTag)) {
      return false
    }


    return true
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
      <div className="section__list">
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
      </div>
    </section>
  )
}

export default BlogSlider
