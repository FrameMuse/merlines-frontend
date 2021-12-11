import React from "react"
import { Link } from "react-router-dom"

const MainCollectionCard = ({
  cardMain,
  cardImg,
  cardTag,
  cardTitle,
  cardDate,
  cardDateNum,
  ksClass
}) => {
  return (
    <div
      className={`article-card article-card--index ${cardMain ? "article-card--indexLg" : ""} ${ksClass ?? ""}`}
    >
      <img className="article-card__img" src={cardImg} alt={cardTitle} />
      <Link className="article-card__tag" to={"/blog/tag/" + cardTag.replace("#", "")}>
        {cardTag}
      </Link>
      <Link className="article-card__title" to="#">
        {cardTitle}
      </Link>
      <time className="article-card__date" dateTime={cardDateNum}>
        {cardDate}
      </time>
    </div>
  )
}

export default MainCollectionCard
