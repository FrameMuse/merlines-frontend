import Svg from "../common/Svg"
import ArticleCard from "./ArticleCard"

function ArticleRecomendation() {
  const recomendationCards = [
    {
      id: "asdfsaf",
      title: "5 самых старых маяков Норвегии",
      imgSrc: "images/article/5.jpg",
      tags: ["гид", "подборки"],
      date: "12 июня 2019"
    },
    {
      id: "a44dsaf",
      title: "3 самых дешёвых страны Европы",
      imgSrc: "images/article/4.jpg",
      tags: ["гид", "подборки"],
      date: "15 августа 2020"
    },
    {
      id: "333fsaf",
      title: "5 самых старых маяков Норвегии",
      imgSrc: "images/article/5.jpg",
      tags: ["гид", "подборки"],
      date: "12 июня 2019"
    },
    {
      id: "Dfffsaf",
      title: "3 самых дешёвых страны Европы",
      imgSrc: "images/article/4.jpg",
      tags: ["гид", "подборки"],
      date: "15 августа 2020"
    }
  ]

  return (
    <section className="section section--article">
      <div className="section__container">
        <header className="section__header">
          <h2 className="section__title">Рекомендации</h2>
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
        </header>
        <ul className="section__list slider">
          {recomendationCards.map((card) => (
            <ArticleCard
              key={card.id}
              title={card.title}
              imgSrc={card.imgSrc}
              tags={card.tags}
              date={card.date}
              articleId={card.id}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ArticleRecomendation
