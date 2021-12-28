import "./articles.scss"

import { getBlogArticles } from "api/actions/blog"
import ArticleCard from "components/Article/ArticleCard"
import Icon from "components/common/Icon"
import { useState } from "react"
import { useQuery } from "react-fetching-library"
import { useRecoilState } from "recoil"
import { capitalize, classWithModifiers } from "utils"

import BlogNavigation from "./BlogNavigation"
import { blogSearchState } from "./BlogSearch"


export interface ArticleFiltersType {
  tags__contains: string
  title__contains: string
  ordering: "created_at" | "likers__count" | "-created_at" | "-likers__count"
}

function Blog(props: { tag?: string }) {
  const [blogSearch] = useRecoilState(blogSearchState)

  function BlogSections() {
    if (blogSearch.length) {
      return (
        <BlogSection title="Поиск" pageSize={12} filters={{ title__contains: blogSearch }} />
      )
    }

    if (props.tag?.length) {
      return (
        <BlogSection title={props.tag} pageSize={12} filters={{ tags__contains: props.tag }} />
      )
    }

    return (
      <>
        <BlogSection title="Новое" pageSize={4} filters={{ ordering: "-created_at" }} />
        <BlogSection title="Популярное" pageSize={4} filters={{ ordering: "likers__count" }} />
        <BlogSection title="Все" pageSize={12} />
      </>
    )
  }

  return (
    <div className="articles">
      <div className="articles__container articles__all">
        <BlogNavigation tags={["FAQ", "подборки"]} />
        <BlogSections />
      </div>
    </div>
  )
}


interface BlogSectionProps {
  title: string
  pageSize: number
  filters?: Partial<ArticleFiltersType>
}

function BlogSection(props: BlogSectionProps) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(props.pageSize)

  const { error, loading, payload } = useQuery(getBlogArticles(page, pageSize, props.filters))
  if (error || !payload) return <>no content</>

  const isLastPage = (page * pageSize) >= payload.count
  return (
    <section className={classWithModifiers("section", loading && "disabled")}>
      <div className="section__header">
        <h2 className="section__title">
          {capitalize(props.title)}
        </h2>
        <div className="section__control">
          <Icon
            name="arrow-slider"
            className={classWithModifiers("section__arrow", "left", page === 1 && "disabled")}
            onClick={() => setPage(page - 1)}
          />
          <Icon
            name="arrow-slider"
            className={classWithModifiers("section__arrow", "right", isLastPage && "disabled")}
            onClick={() => setPage(page + 1)}
          />
        </div>
      </div>
      <div className="section__list">
        {payload.results.map((article, index) => (
          <ArticleCard {...article} key={index} />
        ))}
      </div>
      {!isLastPage && (
        <button className="section__more">
          <span>загрузить еще</span>
          <Icon name="arrow-angle" className="section__more-icon" />
        </button>
      )}
    </section>
  )
}

export default Blog
