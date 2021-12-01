import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import articlesData from './BlogLoadedData/articles.json';
import BlogNavigation from './BlogNavigation/BlogNavigation';
import BlogSlider from './BlogSlider';
import './articles.scss'
import './search.scss'

function Blog() {
  const [navigation, setNavigation] = useState([]);

  const convertTagToRoute = tag => `/blog/tag/${tag.slice(1).toLowerCase()}`;

  const generateRoutes = arr => {
    let newArr = [];
    arr.forEach(item => newArr.push({ tag: item, route: convertTagToRoute(item) }));
    return newArr;
  };

  useEffect(() => {
    setNavigation(generateRoutes(articlesData.tags));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="articles">
      <div className="articles__container">
        <BlogNavigation navigation={navigation} />
        <Switch>
          <Route exact path="/blog">
            {articlesData.articles.map((section, index) => <BlogSlider key={index} articles={section} />)}
          </Route>
          {navigation.map((item, index) => <Route key={index} path={item.route}>{item.tag}</Route>)}
        </Switch>
      </div>
    </section>
  )
};

export default Blog;
