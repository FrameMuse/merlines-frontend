import "./AdminAddArticle.style.scss"

import ArticleContent from "components/Article/ArticleContent"
import articles from "components/Blog/BlogLoadedData/articles.json"
import { useState } from "react"
import { classWithModifiers } from "utils"

import AdminButton from "../AdminButton/AdminButton"
import AdminArticleEditor from "../AdminEditArticle/AdminEditArticle"

function AdminAddArticle() {
  const [articleData, setArticleData] = useState(articles.articles[0].items[0] as any)
  const [showPreview, setShowPreview] = useState(false)
  return (
    <div className={classWithModifiers("add-article", showPreview && "preview")}>
      <div className="add-article__topbar">
        <AdminButton
          onClick={() => setShowPreview(!showPreview)}
          color={showPreview ? "gray" : undefined}
          children={showPreview ? "Disable preview mode" : "Enable preview modei"}
        />
      </div>
      {!showPreview && (
        <AdminArticleEditor {...articleData} onChange={data => setArticleData({ ...articleData, ...data })} />
      )}
      {showPreview && (
        <ArticleContent articleData={articles.articles[0].items[1]} />
      )}
    </div>
  )
}

export default AdminAddArticle
