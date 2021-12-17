import { Link } from "react-router-dom"

function ArticleTag({ tag }) {
  return (
    <li className="article-card__tags-item">
      <Link className="article-card__tag" to={"/blog/tag/" + tag}>#{tag}</Link>
    </li>
  )
}

export default ArticleTag
