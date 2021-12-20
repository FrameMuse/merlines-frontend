import { Link, useHistory } from "react-router-dom"
import { classWithModifiers } from "utils"

import BlogSearch from "./BlogSearch"

function BlogNavigation(props: { tags: string[] }) {
  const history = useHistory()
  return (
    <nav className="articles__nav">
      <div className="articles__list">
        <li className="articles__item">
          <Link
            className={classWithModifiers("articles__link", history.location.pathname.endsWith("/blog") && "active")}
            to="/blog"
            children={"Все"}
          />
        </li>

        {props.tags.map(tag => (
          <li className="articles__item">
            <Link
              className={classWithModifiers("articles__link", history.location.pathname.endsWith(tag) && "active")}
              to={"/blog/tag/" + tag}
              children={"#" + tag}
            />
          </li>
        ))}
      </div>
      <BlogSearch />
    </nav>
  )
}

export default BlogNavigation
