import "./AdminArticleEdit.style.scss"

import { patchAdminArticle, postAdminArticle } from "api/actions/admin"
import ClientAPI from "api/client"
import ArticleCard from "components/Article/ArticleCard"
import ArticleContent from "components/Article/ArticleContent"
import { ArticleAuthorType, ArticleContentType } from "interfaces/Blog"
import { Client } from "interfaces/user"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { classWithModifiers } from "utils"

import AdminArticleEditor from "../AdminArticleEditor/AdminArticleEditor"
import AdminButton from "../AdminButton/AdminButton"


const llErrors = {
  noTags: "Добавьте хотя бы один тэг",
  noImages: "Добавьте хотя бы одну картинку",
  noPreview: "Выберите превью",
  emptyTitle: "Название не может быть пустым",
  tooLittleContent: "В содержании должно быть хотя бы 120 символов"
}


const sampleDate = (new Date).toISOString()
const sampleArticleData: ArticleContentType = {
  title: "",
  tags: [],
  content: "",
  files: [],
  preview: ""
}

interface AdminArticleAddProps {
  new: true
  edit?: undefined
  author?: undefined
}
interface AdminArticleEditProps {
  new?: false
  id: string
  edit: ArticleContentType
  author: ArticleAuthorType
}

/**
 *
 * @param new means new article to be created
 * @param edit means an article to be edited and is initial data to preview
 */
function AdminArticleEdit(props: AdminArticleAddProps | AdminArticleEditProps) {
  const history = useHistory()

  const [error, setError] = useState(false)

  const [articleData, setArticleData] = useState<ArticleContentType>(props.edit || sampleArticleData)
  const [showPreview, setShowPreview] = useState(false)

  function validateArticleData() {
    const errors: string[] = []

    if (articleData.tags.length === 0) {
      errors.push(llErrors.noTags)
    }

    if (articleData.files.length === 0) {
      errors.push(llErrors.noImages)
    }

    if (articleData.preview.length === 0) {
      errors.push(llErrors.noPreview)
    }

    if (articleData.title.length === 0) {
      errors.push(llErrors.emptyTitle)
    }

    if (articleData.content.length < 120) {
      errors.push(llErrors.tooLittleContent)
    }

    return errors
  }

  async function postArticle() {
    const { error, payload } = await ClientAPI.query(postAdminArticle(articleData))
    if (error || !payload || payload.error) return

    return payload.id
  }
  async function patchArticle() {
    const id = props.edit ? props.id : ""
    const files = articleData.files

    for (const file of Object.values(files)) {
      if (file.data?.startsWith("http")) {
        file.data = null
      }
    }

    const { error, payload } = await ClientAPI.query(patchAdminArticle(id, articleData))
    if (error || !payload || payload.error) return

    return payload.id
  }

  async function onSubmit() {
    const id = props.new ? await postArticle() : await patchArticle()
    if (!id) return

    history.push("/blog/article/" + id)
  }

  useEffect(() => {
    const errors = validateArticleData()

    Object.values(llErrors).forEach(error => {
      if (!errors.includes(error)) {
        toast.dismiss(error)
        return
      }

      toast.info(error, { toastId: error, autoClose: false, closeOnClick: false, closeButton: false, draggable: false })
    })

    setError(!!errors.length)
  }, [llErrors, validateArticleData])

  return (
    <div className={classWithModifiers("article-edit", showPreview && "preview")}>
      <div className="article-edit__topbar">
        <AdminButton
          onClick={() => setShowPreview(!showPreview)}
          color={showPreview ? "gray" : undefined}
          children={showPreview ? "Disable preview mode" : "Enable preview mode"}
        />
      </div>
      <AdminArticleEditor {...articleData} hidden={showPreview} onChange={data => setArticleData({ ...articleData, ...data })} />
      <AdminArticlePreview {...articleData} hidden={!showPreview} author={props.author} />
      <div>
        <AdminButton onClick={onSubmit} disabled={error}>Сохранить статью</AdminButton>
        <AdminButton onClick={onSubmit} disabled={error}>Опубликовать статью</AdminButton>
      </div>
    </div>
  )
}


interface AdminArticlePreviewProps extends ArticleContentType {
  hidden?: boolean
  author?: ArticleAuthorType
}

function AdminArticlePreview(props: AdminArticlePreviewProps) {
  const user = useSelector(state => props.author || state.user) as Client
  const previewProps = {
    ...props,
    id: 1,
    created_at: sampleDate,
    preview: props.files.find(file => file.name === props.preview)?.data || ""
  }
  if (props.hidden) return null
  return (
    <div className={classWithModifiers("article-preview", props.hidden && "hidden")}>
      <div className="article-preview__entry">
        <h2 className="article-preview__title">Предпросмотр карточки</h2>
        <div className="article-preview__cards">
          <ArticleCard {...previewProps} />
          <ArticleCard {...previewProps} />
          <ArticleCard {...previewProps} />
          <ArticleCard {...previewProps} />
        </div>
      </div>

      <div className="article-preview__enrty">
        <h2 className="article-preview__title">Предпросмотр статьи</h2>
        <div className="article-preview__article">
          <ArticleContent
            {...previewProps}
            author={user}
            likes={27}
            liked={true}
            previewMode
          />
        </div>
      </div>
    </div>
  )
}

export default AdminArticleEdit
