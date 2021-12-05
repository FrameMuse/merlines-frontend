import routes from "../../../routes"
import BlogSearch from "../BlogSearch"
import BlogNavigationItem from "./BlogNavigationItem"

function BlogNavigation({ navigation }) {
  return (
    <nav className="articles__nav">
      <ul className="articles__list">
        <BlogNavigationItem key={"ВСЕ"} tagName="ВСЕ" tagLink={routes.blog} />
        {navigation.map((item, index) => (
          <BlogNavigationItem
            key={index}
            tagName={item.tag}
            tagLink={item.route}
          />
        ))}
        <li className="articles__item articles__item--hide">
          ...
          <ul className="articles__sublist">
            <BlogNavigationItem
              mobile={true}
              key={"ВСЕ"}
              tagName="ВСЕ"
              tagLink={routes.blog}
            />
            {navigation.map((item, index) => (
              <BlogNavigationItem
                mobile={true}
                key={index}
                tagName={item.tag}
                tagLink={item.route}
              />
            ))}
          </ul>
        </li>
      </ul>
      <BlogSearch />
    </nav>
  )
}

export default BlogNavigation
