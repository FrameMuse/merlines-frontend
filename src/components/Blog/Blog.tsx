import "./articles.scss"

import { getBlogArticles } from "api/actions/blog"
import ArticleCard from "components/Article/ArticleCard"
import Icon from "components/common/Icon"
import { OrderingType } from "interfaces/Django"
import { useState } from "react"
import { useQuery } from "react-fetching-library"
import { ReactNode } from "react-markdown/lib/react-markdown"
import { useLocation } from "react-router-dom"
import { classWithModifiers } from "utils"

import BlogNavigation from "./BlogNavigation"


export interface ArticleFiltersType {
  tags__contains: string | null
  title__icontains: string | null
  ordering: OrderingType<"created_at" | "likers__count">
}

function Blog() {
  const location = useLocation()
  const locationSearch = new URLSearchParams(location.search)

  const activeTag = locationSearch.get("tag")
  const searchValue = locationSearch.get("search")

  const searchSectionTitle = [activeTag || "все", !!searchValue && [" | ", <small>{searchValue}</small>]]
  return (
    <div className="articles">
      <div className="articles__container articles__all">
        <BlogNavigation activeTag={activeTag} />
        {(activeTag || searchValue) ? (
          <BlogSection title={searchSectionTitle} pageSize={12} filters={{ tags__contains: activeTag, title__icontains: searchValue }} />
        ) : (
          <>
            <BlogSection title="Новое" pageSize={4} filters={{ ordering: "-created_at" }} />
            <BlogSection title="Популярное" pageSize={4} filters={{ ordering: "-likers__count" }} />
            <BlogSection title="Все" pageSize={12} showMoreButton />
          </>
        )}
      </div>
    </div>
  )
}


interface BlogSectionProps {
  title: ReactNode
  pageSize: number
  filters?: Partial<ArticleFiltersType>
  showMoreButton?: boolean
}

function BlogSection(props: BlogSectionProps) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(props.pageSize)
  const { error, loading, payload } = useQuery(getBlogArticles(page, pageSize, props.filters))
  if (error || !payload) return <>no content</>

  function updatePage(by: 1 | -1) {
    setPage(page + by)
    setPageSize(props.pageSize)
  }

  const isLastPage = (page * pageSize) >= payload.count
  return (
    <section className={classWithModifiers("section", loading && "disabled")}>
      <div className="section__header">
        <h2 className="section__title">{props.title}</h2>
        <div className="section__control">
          <button disabled={page === 1} onClick={() => updatePage(-1)}>
            <Icon className={classWithModifiers("section__arrow", "left", page === 1 && "disabled")} name="arrow-slider" />
          </button>
          <button disabled={isLastPage} onClick={() => updatePage(+1)}>
            <Icon className={classWithModifiers("section__arrow", "right", isLastPage && "disabled")} name="arrow-slider" />
          </button>
        </div>
      </div>
      <div className="section__list">
        {payload.results.map((article, index) => (
          <ArticleCard {...article} key={index} />
        ))}
      </div>
      {!isLastPage && props.showMoreButton && (
        <button className="section__more" onClick={() => setPageSize(pageSize + props.pageSize)}>
          <span>загрузить еще</span>
          <Icon name="chevron" className="section__more-icon" />
        </button>
      )}
    </section>
  )
}

export default Blog
