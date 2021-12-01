import React from "react"
import ArticleCommentsHeader from "./ArticleCommentsHeader"
import ArticleCommentsList from "./ArticleCommentsList"
import ArticleCommentsForm from "./ArticleCommentsForm"
import "./comments.scss"

function ArticleComments({ comments }) {
  return (
    <section className="comments comments--active">
      <ArticleCommentsHeader />
      <ArticleCommentsList commentsData={comments} />
      <ArticleCommentsForm />
    </section>
  )
}

export default ArticleComments
