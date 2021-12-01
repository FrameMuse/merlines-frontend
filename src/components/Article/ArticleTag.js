import { Link } from 'react-router-dom';

function ArticleTag({ tagName }) {
  return (
    <li className="article-card__tags-item">
      <Link className="article-card__tag" to="#">{tagName}</Link>
    </li>
  )
};

export default ArticleTag;
