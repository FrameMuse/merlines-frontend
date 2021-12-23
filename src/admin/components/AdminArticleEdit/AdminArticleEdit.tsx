import "./AdminArticleEdit.style.scss"

import { patchAdminArticle, postAdminArticle } from "api/actions/admin"
import ClientAPI from "api/client"
import ArticleCard from "components/Article/ArticleCard"
import ArticleContent from "components/Article/ArticleContent"
import { DataURLBase64 } from "interfaces/common"
import { AuthedUser } from "interfaces/user"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { classWithModifiers, isImageFile, toBase64 } from "utils"

import AdminArticleEditor, { EditArticleType, getFileId } from "../AdminArticleEditor/AdminArticleEditor"
import AdminButton from "../AdminButton/AdminButton"


const llErrors = {
  noTags: "Добавьте хотя бы один тэг",
  noImages: "Добавьте хотя бы одну картинку",
  noPreview: "Выберите превью",
  emptyTitle: "Название не может быть пустым",
  tooLittleContent: "В содержании должно быть хотя бы 120 символов"
}


const sampleDate = (new Date).toISOString()
const sampleArticleData: EditArticleType = {
  title: "",
  tags: [],
  content: "",
  files: [],
  preview: null
}

interface AdminArticleAddProps {
  new: true
  edit?: undefined
}
interface AdminArticleEditProps {
  new?: false
  edit: EditArticleType
}

/**
 *
 * @param new means new article to be created
 * @param edit means an article to be edited and is initial data to preview
 */
function AdminArticleEdit(props: AdminArticleAddProps | AdminArticleEditProps) {
  const history = useHistory()

  const [error, setError] = useState(false)

  const [articleData, setArticleData] = useState<EditArticleType>(props.edit || sampleArticleData)
  const [showPreview, setShowPreview] = useState(false)

  function validateArticleData() {
    const errors: string[] = []

    if (articleData.tags.length === 0) {
      errors.push(llErrors.noTags)
    }

    if (articleData.files.length === 0) {
      errors.push(llErrors.noImages)
    }

    if (articleData.preview == null) {
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

  async function createRequestPayload() {
    const tags = articleData.tags.filter(Boolean)
    const files: Record<string, DataURLBase64> = {}
    const preview = getFileId(articleData.preview)

    for (const file of articleData.files) {
      // Ignore all unmentioned images
      if (articleData.content.search(getFileId(file)) >= 0) {
        files[getFileId(file)] = await toBase64(file)
      }
    }

    return { ...articleData, tags, files, preview }
  }

  async function onSubmit() {
    const action = props.new ? postAdminArticle : patchAdminArticle

    const requestPayload = await createRequestPayload()
    const { error, payload } = await ClientAPI.query(action(requestPayload))
    if (error || !payload || payload.error) return

    history.push("/blog/article/" + payload.id)
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
  }, [llErrors, articleData, validateArticleData])

  return (
    <div className={classWithModifiers("article-edit", showPreview && "preview")}>
      <div className="article__topbar-edit__topbar">
        <AdminButton
          onClick={() => setShowPreview(!showPreview)}
          color={showPreview ? "gray" : undefined}
          children={showPreview ? "Disable preview mode" : "Enable preview modei"}
        />
      </div>
      <AdminArticleEditor {...articleData} hidden={showPreview} onChange={data => setArticleData({ ...articleData, ...data })} />
      <AdminArticlePreview {...articleData} hidden={!showPreview} />
      <div>
        <AdminButton onClick={onSubmit} disabled={error}>Опубликовать статью</AdminButton>
      </div>
    </div>
  )
}


interface AdminArticlePreviewProps extends EditArticleType {
  hidden?: boolean
}

function AdminArticlePreview(props: AdminArticlePreviewProps) {
  const user = useSelector(state => state.user) as AuthedUser
  const previewProps = {
    ...props,
    id: 1,
    created_at: sampleDate,
    preview: props.preview && URL.createObjectURL(props.preview) || ""
  }
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
            // Preview content
            content={props.files.filter(isImageFile).reduce((result, file) => result.replace(new RegExp(getFileId(file), "g"), URL.createObjectURL(file)), props.content)}
            author={user}
            comments={[]}
            previewMode
          />
        </div>
      </div>
    </div>
  )
}

export default AdminArticleEdit
