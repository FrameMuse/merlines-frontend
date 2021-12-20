import "./articles.scss"
import "./search.scss"

import { getBlogArticles } from "api/actions/blog"
import ArticleCard from "components/Article/ArticleCard"
import Icon from "components/common/Icon"
import { useState } from "react"
import { useQuery } from "react-fetching-library"
import { useRecoilState } from "recoil"
import { classWithModifiers } from "utils"

import BlogNavigation from "./BlogNavigation"
import { blogSearchState } from "./BlogSearch"

function Blog(props: { tag: string }) {
  const [page, setPage] = useState(1)
  const [blogSearch] = useRecoilState(blogSearchState)

  const { loading, payload } = useQuery(getBlogArticles(page, 12, props.tag))
  if (!payload) return "no content"

  return (
    <section className="articles">
      <div className="articles__container articles__all">
        <BlogNavigation tags={["FAQ", "подборки"]} />
        <section className={classWithModifiers("section", loading && "disabled")}>
          <header className="section__header">
            <h2 className="section__title">Все</h2>
            <div className="section__control">
              <Icon
                name="arrow-slider"
                className={classWithModifiers("section__arrow", "left", payload.previous ?? "disabled")}
                onClick={() => setPage(page - 1)}
              />
              <Icon
                name="arrow-slider"
                className={classWithModifiers("section__arrow", "right", payload.next ?? "disabled")}
                onClick={() => setPage(page + 1)}
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
