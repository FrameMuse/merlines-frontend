import routes from '../../../routes';
import BlogNavigationItem from './BlogNavigationItem';
import BlogSearch from '../BlogSearch';

function BlogNavigation({ navigation }) {
  return (
    <nav className="articles__nav">
      <ul className="articles__list">
        <BlogNavigationItem key={'ВСЕ'} tagName="ВСЕ" tagLink={routes.blog} />
        {navigation.map((item, index) =>
          <BlogNavigationItem key={index} tagName={item.tag} tagLink={item.route} />)}
        <li className="articles__item articles__item--hide">
          ...
          <ul className="articles__sublist">
            <BlogNavigationItem mobile={true} key={'ВСЕ'} tagName="ВСЕ" tagLink={routes.blog} />
            {navigation.map((item, index) =>
              <BlogNavigationItem mobile={true} key={index} tagName={item.tag} tagLink={item.route} />)}
          </ul>
        </li>
      </ul>
      <BlogSearch />
    </nav>
  )
};

export default BlogNavigation;
