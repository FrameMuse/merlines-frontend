import { ArticlePreviewType } from "interfaces/Blog"
import { Link } from "react-router-dom"

interface ArticleCardProps extends ArticlePreviewType { }

function ArticleCard(props: ArticleCardProps) {
  const date = new Date(props.created_at).toLocaleDateString("ru", { dateStyle: "long" })
  return (
    // <li className="section__item">
    <div className="article-card">
      <div className="article-card__image">
        <img className="article-card__img" src={props.preview} alt={props.title} />
      </div>
      <div className="article-card__tags-list">
        {props.tags.map(tag => (
          <Link key={tag} className="article-card__tags-item" to={"/blog/tag/" + tag}>#{tag}</Link>
        ))}
      </div>
      <Link className="article-card__title" to={"/blog/article/" + props.id}>{props.title}</Link>
      <time className="article-card__date" dateTime={props.created_at}>{date}</time>
    </div>
    // </li>
  )
}

export default ArticleCard
