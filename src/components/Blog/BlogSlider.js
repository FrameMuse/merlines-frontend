import Svg from "../common/Svg"
import ArticleCard from "../Article/ArticleCard"

function BlogSlider({ articles }) {
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
        {articles.items.map((article) => (
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
