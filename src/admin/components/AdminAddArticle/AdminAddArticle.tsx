import "./AdminAddArticle.style.scss"

import { postAdminArticle } from "api/actions/admin"
import ClientAPI from "api/client"
import ArticlePicture from "components/Article/ArticleFigure"
import ArticleSocial from "components/Article/ArticleSocial/ArticleSocial"
import ArticleTag from "components/Article/ArticleTag"
import { DataURLBase64 } from "interfaces/common"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { classWithModifiers, isImageFile, toBase64 } from "utils"

import AdminButton from "../AdminButton/AdminButton"
import AdminArticleEditor, { EditArticleType, getFileId } from "../AdminEditArticle/AdminEditArticle"

const sampleArticleData: EditArticleType = {
  title: "5 чего-то Название",
  tags: ["Тэг"],
  content: "![Эйфелева башня](1.jpg)\n\n## Музей Лувр\n\nСмотрели фильм «Бельфегор – призрак Лувра?». Хотите побывать там, где проводились его съемки со знаменитыми, может даже вашими любимыми актерами? Где летали призраки и передвигались мумии? Тогда вам прямая дорога в Лувр – один из самых древних музеев мира. Каждый год его посещают от 7 до 10 миллионов человек.",
  files: [],
  preview: null
}

const date = (new Date).toISOString()

function AdminAddArticle() {
  const history = useHistory()

  const [articleData, setArticleData] = useState<EditArticleType>(sampleArticleData)
  const [showPreview, setShowPreview] = useState(false)

  function validateArticleData() {
    const errors: string[] = []

    if (articleData.tags.length === 0) {
      errors.push("Добавьте хотя бы один тэг")
    }

    if (articleData.files.length === 0) {
      errors.push("Добавьте хотя бы один файл")
    }

    if (articleData.preview == null) {
      errors.push("Выберите превью")
    }

    if (articleData.title.length === 0) {
      errors.push("Название не может быть пустым")
    }

    if (articleData.content.length < 120) {
      errors.push("В содержании должно быть хотя бы 120 символов")
    }

    // Display errors
    errors.forEach(error => toast.info(error))

    return errors.length === 0
  }

  async function addArticle() {
    const files: Record<string, DataURLBase64> = {}
    const preview = getFileId(articleData.preview)

    if (!validateArticleData()) return

    for (const file of articleData.files) {
      // Ignore all unmentioned images
      if (articleData.content.search(getFileId(file)) >= 0) {
        files[getFileId(file)] = await toBase64(file)
      }
    }

    const { error, payload } = await ClientAPI.query(postAdminArticle({ ...articleData, files, preview }))
    if (error || !payload || payload.error) return

    history.push("/blog/article/" + payload.id)
  }

  return (
    <div className={classWithModifiers("add-article", showPreview && "preview")}>
      <div className="add-article__topbar">
        <AdminButton
          onClick={() => setShowPreview(!showPreview)}
          color={showPreview ? "gray" : undefined}
          children={showPreview ? "Disable preview mode" : "Enable preview modei"}
        />
      </div>
      <AdminArticleEditor {...sampleArticleData} hidden={showPreview} onChange={data => setArticleData({ ...articleData, ...data })} />
      {/* TODO: Replace with existed component */}
      {showPreview && (
        <section className="article-page">
          <div className="article-page__container">
            <article className="article">
              <ArticleSocial />
              <div className="article-card article-card--header">
                <div className="article-card__tags-list">
                  {articleData.tags.map((tag, index) => (
                    <ArticleTag key={index} tag={tag} />
                  ))}
                </div>
                <h2 className="article-card__title">{articleData.title}</h2>
                <time className="article-card__date" dateTime={date}>{date}</time>
              </div>
              <ReactMarkdown components={{ img: props => <ArticlePicture {...props} /> }}>
                {articleData.files.filter(isImageFile).reduce((result, file) => result.replace(new RegExp(getFileId(file), "g"), URL.createObjectURL(file)), articleData.content)}
              </ReactMarkdown>
            </article>
          </div>
        </section>
      )}
      <div>
        <AdminButton onClick={addArticle}>Опубликовать новую статью</AdminButton>
      </div>
    </div>
  )
}

export default AdminAddArticle
