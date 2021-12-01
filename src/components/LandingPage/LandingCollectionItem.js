import { Link } from "react-router-dom"
import { fromISOtoString } from "../../utils"

function LandingCollectionItem({ imgSrc, title, tag, ISODate }) {
  return (
    <li className="section__item">
      <div className="article-card article-card--index">
        <img className="article-card__img" src={imgSrc} alt={title} />
        <Link className="article-card__tag" to="#">
          {tag}
        </Link>
        <Link className="article-card__title" to="#">
          {title}
        </Link>
        <time className="article-card__date" dateTime={ISODate}>
          {fromISOtoString(ISODate)}
        </time>
      </div>
    </li>
  )
}

export default LandingCollectionItem
