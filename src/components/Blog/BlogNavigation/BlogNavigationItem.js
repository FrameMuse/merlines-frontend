import { Link, useLocation } from "react-router-dom"

function BlogNavigationItem({ tagName, tagLink, clickHandler, mobile }) {
  const location = useLocation()
  const activeTag =
    location.pathname.slice(10).toUpperCase() === tagName.slice(1)
  const allTags = location.pathname === "/blog" && tagName === "ВСЕ"

  return (
    <li className={`articles__${mobile ? "sublist-" : ""}item`}>
      <Link
        onClick={clickHandler}
        className={`articles__link ${
          allTags || activeTag ? "articles__link--active" : ""
        }`}
        to={tagLink}
      >
        {tagName}
      </Link>
    </li>
  )
}

export default BlogNavigationItem
