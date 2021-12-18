import "./articles.scss"
import "./search.scss"

import { getArticles } from "api/actions/blog"
import ArticleCard from "components/Article/ArticleCard"
import Icon from "components/common/Icon"
import { useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { Route, Switch } from "react-router-dom"

import articlesData from "./BlogLoadedData/articles.json"
import BlogNavigation from "./BlogNavigation/BlogNavigation"
import BlogSlider from "./BlogSlider"

function Blog() {
  const { payload } = useQuery(getArticles)
  const [navigation, setNavigation] = useState([])

  const convertTagToRoute = (tag) => `/blog/tag/${tag.slice(1).toLowerCase()}`

  const generateRoutes = (arr) => {
    let newArr = []
    arr.forEach((item) =>
      newArr.push({ tag: item, route: convertTagToRoute(item) })
    )
    return newArr
  }

  useEffect(() => {
    setNavigation(generateRoutes(articlesData.tags))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!payload) return null

  return (
    <section className="articles">
      <div className="articles__container articles__all">
        <BlogNavigation navigation={navigation} />
        <section className="section">
          <header className="section__header">
            <h2 className="section__title">Все</h2>
            <div className="section__control">
              <Icon
                className="section__arrow section__arrow--left"
                name="arrow-slider"
                width="20"
                height="20"
              />
              <Icon
                className="section__arrow section__arrow--right"
                name="arrow-slider"
                width="20"
                height="20"
              />
            </div>
          </header>
          <div className="section__list">
            {payload.results.map((article, index) => (
              <ArticleCard {...article} key={index} />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Blog
