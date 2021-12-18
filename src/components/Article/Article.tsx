import "./article.scss"
import "./article-card.scss"
import "./article-page.scss"

import { getArticle } from "api/actions/blog"
import { postMainEcho } from "api/actions/main"
import { FormEvent } from "react"
import { useQuery } from "react-fetching-library"

import ClientAPI from "../../api/client"
import ArticleContent from "./ArticleContent"


interface ArticleProps {
  articleId: string
}

function Article(props: ArticleProps) {
  const { payload } = useQuery(getArticle(props.articleId))
  function sendImages(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    ClientAPI.query(postMainEcho(formData))
  }
  return (
    <div className="wrap">
      {payload && (
        <ArticleContent {...payload} />
      )}
      {/* <ArticleRecomendation /> */}


      <form method="post" onSubmit={sendImages}>
        <input type="file" name="img[]" />
        <button type="submit">Send images</button>
      </form>
    </div>
  )
}

export default Article
