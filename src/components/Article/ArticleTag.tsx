import { Link } from "react-router-dom"

function ArticleTag(props: { tag: string }) {
  return (
    <div className="article-card__tags-item">
      <Link className="article-card__tag" to={"/blog/tag/" + props.tag}>#{props.tag}</Link>
    </div>
  )
}

export default ArticleTag
