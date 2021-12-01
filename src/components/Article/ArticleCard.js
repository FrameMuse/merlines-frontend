import React from "react"
import { Link } from "react-router-dom"

import { convertIdToRoute } from "../../utils"

// FIXME: конвертировать date="12 июня 2019" в dateTime="2019-06-12" или наоборот
function ArticleCard({ title, imgSrc, tags, date, articleId }) {
  return (
    <li className="section__item">
      <div className="article-card article-card--slider">
        <img
          className="article-card__img"
          src={imgSrc}
          alt={title}
          width="290"
          height="180"
        />
        <ul className="article-card__tags-list">
          {tags.map((tag, index) => (
            <Link key={index} className="article-card__tags-item" to="#">
              {tag}
            </Link>
          ))}
        </ul>
        <Link className="article-card__title" to={convertIdToRoute(articleId)}>
          {title}
        </Link>
        <time className="article-card__date" dateTime="2019-06-12">
          {date}
        </time>
      </div>
    </li>
  )
}

export default ArticleCard
