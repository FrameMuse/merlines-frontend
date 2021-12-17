// SCSS
import "./comments.scss"

import { ArticleCommentType } from "interfaces/Blog"

import ArticleCommentsForm from "./ArticleCommentsForm"
import ArticleCommentsHeader from "./ArticleCommentsHeader"
import ArticleCommentsList from "./ArticleCommentsList"

function ArticleComments(props: { list: ArticleCommentType[] }) {
  return (
    <section className="comments comments--active">
      <ArticleCommentsHeader />
      <ArticleCommentsList list={props.list} />
      <ArticleCommentsForm />
    </section>
  )
}

export default ArticleComments
