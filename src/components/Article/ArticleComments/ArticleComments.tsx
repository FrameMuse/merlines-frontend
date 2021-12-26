// SCSS
import "./comments.scss"

import { getBlogArticleComments, postBlogArticleLike } from "api/actions/blog"
import ClientAPI from "api/client"
import Icon from "components/common/Icon"
import { ArticleAuthorType, ArticleReplyType, ArticleType } from "interfaces/Blog"
import { useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { classWithModifiers } from "utils"

import ArticleCommentsForm from "./ArticleCommentsForm"
import ArticleCommentsItem from "./ArticleCommentsItem"


interface ArticleCommentsProps extends ArticleType {
  reply?: ArticleAuthorType
}

function ArticleComments(props: ArticleCommentsProps) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [comments, setComments] = useState<ArticleReplyType[]>([])
  const { error, payload } = useQuery(getBlogArticleComments(props.id, page, pageSize))
  useEffect(() => {
    if (!payload) return
    setComments(payload.results)
  }, [payload])
  if (error || !payload || payload.error) return <>no content</>
  return (
    <section className="comments comments--active">
      <div className="comments__header">
        <h2 className="comments__header-title">
          <span className="comments__header-counter">{payload.count}</span>комментария
        </h2>
        <ArticleLikes {...props} />
      </div>
      <div className="comments__inner">
        <ul className="comments__list">
          {comments.map(item => (
            <ArticleCommentsItem {...item} key={item.id} />
          ))}
        </ul>
        {(page * pageSize) < payload.count && (
          <div className="button-text">
            <button className="button-text__btn" onClick={() => setPage(page + 1)}>загрузить ещё 10 комментариев</button>
          </div>
        )}
      </div>
      <ArticleCommentsForm {...props} />
    </section>
  )
}

function ArticleLikes(props: ArticleCommentsProps) {
  const [liked, setLiked] = useState(props.liked)
  function onLike() {
    ClientAPI
      .query(postBlogArticleLike(props.id))
      .then(({ error, payload, status }) => {
        if (error || payload?.error || status !== 204) return

        setLiked(!liked)
      })
  }
  return (
    <div className={classWithModifiers("comments__like", liked && "active")} onClick={onLike}>
      <span className="comments__like-counter">{props.likes + Number(liked)}</span>
      <Icon className="comments__like-icon" name="like" />
    </div>
  )
}

export default ArticleComments
