import { Link } from "react-router-dom"

import Icon from "../../common/Icon"

function ArticleSocialItem({ socialItem }) {
  return (
    <li className="article__social-item">
      <Link
        className={`article__social-link article__social-link--${socialItem.name}`}
        to={socialItem.link}
      >
        <Icon
          className="article__social-icon"
          name={socialItem.svg}
          width="30"
          height="30"
        />
      </Link>
    </li>
  )
}

export default ArticleSocialItem
