import { getBlogTags } from "api/actions/blog"
import { useQuery } from "react-fetching-library"
import { Link } from "react-router-dom"
import { classWithModifiers } from "utils"

import BlogSearch from "./BlogSearch"

interface BlogNavigationProps {
  activeTag: string | null
}

function BlogNavigation(props: BlogNavigationProps) {
  const { error, payload } = useQuery(getBlogTags(1, 10))
  if (error || !payload) return <>no content</>
  return (
    <nav className="articles__nav">
      <div className="articles__list">
        <li className="articles__item">
          <Link className={classWithModifiers("articles__link", !props.activeTag && "active")} to="/blog">Все</Link>
        </li>

        {payload.results.map(tag => (
          <li className="articles__item" key={tag.id}>
            <Link className={classWithModifiers("articles__link", tag.title === props.activeTag && "active")} to={{ pathname: "/blog", search: "tag=" + tag.title }}>{tag.title}</Link>
          </li>
        ))}
      </div>
      <BlogSearch />
    </nav>
  )
}

export default BlogNavigation
