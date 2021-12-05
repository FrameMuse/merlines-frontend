import "./comments.scss"

import React from "react"

import ArticleCommentsForm from "./ArticleCommentsForm"
import ArticleCommentsHeader from "./ArticleCommentsHeader"
import ArticleCommentsList from "./ArticleCommentsList"

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
