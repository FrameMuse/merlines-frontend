import { Link } from "react-router-dom"

// FIXME: конвертировать date="12 июня 2019" в dateTime="2019-06-12" или наоборот
function ArticleCard({ title, preview, tags, date, id }) {
  return (
    <li className="section__item">
      <div className="article-card article-card--slider">
        <img
          className="article-card__img"
          src={preview}
          alt={title}
          width="290"
          height="180"
        />
        <ul className="article-card__tags-list">
          {tags.map((tag, index) => (
            <Link key={index} className="article-card__tags-item" to={"/blog/tag/" + tag}>
              #{tag}
            </Link>
          ))}
        </ul>
        <Link className="article-card__title" to={"/blog/article/" + id}>
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
