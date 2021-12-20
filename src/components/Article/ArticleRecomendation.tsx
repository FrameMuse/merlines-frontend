import ArticleCard from "./ArticleCard"


const recomendationCards = [
  {
    id: 1,
    title: "5 самых старых маяков Норвегии",
    preview: "images/article/5.jpg",
    tags: ["гид", "подборки"],
    created_at: "12 июня 2019"
  },
  {
    id: 2,
    title: "3 самых дешёвых страны Европы",
    preview: "images/article/4.jpg",
    tags: ["гид", "подборки"],
    created_at: "15 августа 2020"
  },
  {
    id: 3,
    title: "5 самых старых маяков Норвегии",
    preview: "images/article/5.jpg",
    tags: ["гид", "подборки"],
    created_at: "12 июня 2019"
  },
  {
    id: 4,
    title: "3 самых дешёвых страны Европы",
    preview: "images/article/4.jpg",
    tags: ["гид", "подборки"],
    created_at: "15 августа 2020"
  }
]

function ArticleRecomendation() {
  return (
    <section className="section section--article">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Рекомендации</h2>
        </div>
        <div className="section__list slider">
          {recomendationCards.map(card => (
            <ArticleCard {...card} key={card.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArticleRecomendation
