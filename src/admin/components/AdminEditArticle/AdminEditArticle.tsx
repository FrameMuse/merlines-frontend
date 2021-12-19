import "./AdminEditArticle.style.scss"

import { ClipboardEvent, Dispatch, DragEvent, FormEvent, useEffect, useState } from "react"
import { classWithModifiers, isImageFile, toBase64 } from "utils"

import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"


export interface EditArticleType<Preview = File | null, Files = File[]> {
  tags: string[]
  title: string
  content: string
  preview: Preview
  files: Files
}

interface AdminEditArticleProps extends EditArticleType {
  hidden?: boolean
  onChange: Dispatch<Partial<EditArticleType>>
}

function AdminArticleEditor(props: AdminEditArticleProps) {
  const [tags, setTags] = useState(props.tags)
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [preview, setPreview] = useState(props.preview)
  const [files, setFiles] = useState<File[]>(props.files)

  const updateTitle = (event: FormEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
  const updateContent = (event: FormEvent<HTMLTextAreaElement>) => setContent(event.currentTarget.value)

  const addTag = () => setTags([...tags, "Новый тэг"])
  const updateTag = (value: string, index: number) => (tags[index] = value, setTags([...tags]))

  function addFiles(filesToAdd: File[]) {
    // Filter by unique file name
    const filteredFiles = filesToAdd.filter(fileToAdd => {
      return !files.some(file => getFileId(file) === getFileId(fileToAdd))
    })

    setFiles([...files, ...filteredFiles])
  }

  function fileToMarkdown(file: File): string {
    if (isImageFile(file)) {
      return `![${"Краткое описание картинки"}](${getFileId(file)} "Подпись под картинкой")`
    }

    return `_${file.name}_`
  }

  function onPaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const target = event.currentTarget
    const pastedFiles = [...event.clipboardData.files]

    if (pastedFiles.length === 0) return
    if (target !== document.activeElement) return

    event.preventDefault()

    addFilesToTextarea(target, pastedFiles)
  }

  function onDrop(event: DragEvent<HTMLTextAreaElement>) {
    const target = event.currentTarget
    const pastedFiles = [...event.dataTransfer.files]

    if (pastedFiles.length === 0) return
    if (target !== document.activeElement) return

    event.preventDefault()

    addFilesToTextarea(target, pastedFiles)
  }

  function addFilesToTextarea(target: HTMLTextAreaElement, pastedFiles: File[]) {
    const { selectionStart, selectionEnd } = target
    const markdownFiles = pastedFiles.map(fileToMarkdown).join("\n")

    // https://stackoverflow.com/a/55174561/288906
    if (!document.execCommand("insertText", false, markdownFiles)) {
      target.setRangeText(markdownFiles, selectionStart, selectionEnd, "end")
    }
    setContent(target.value)

    console.log(pastedFiles)

    addFiles(pastedFiles)
  }

  useEffect(() => {
    props.onChange({ tags: tags.filter(Boolean), title, content, preview, files })
  }, [tags, title, content, preview, files])

  return (
    <div className={classWithModifiers("edit-article", props.hidden && "hidden")}>
      <div className="edit-article-tags">
        <h3 className="edit-article-tags__title">Тэги</h3>
        <AdminButton className="edit-article-tags__button" onClick={addTag}>Добавить</AdminButton>
        <div className="edit-article-tags__inner">
          {tags.map((tag, index) => tag.length > 0 && (
            <AdminEditableTag onInput={value => updateTag(value, index)} key={index}>{tag}</AdminEditableTag>
          ))}
        </div>
      </div>
      <div className="edit-article-title">
        <h3 className="edit-article-title__title">Заголовок</h3>
        <input type="text" className="edit-article-title__input" required defaultValue={title} onInput={updateTitle} />
      </div>
      <div className="edit-article-preview">
        <h3 className="edit-article-preview__title">Картинки</h3>
        Выберите превью, оно будет отображать в поиске по статьям
        <div className="edit-article-preview__images">
          {files.filter(isImageFile).length === 0 && (
            <p>Вставленные картинки будет появлятся здесь</p>
          )}
          {files.map((file, index) => (
            <div className={classWithModifiers("edit-article-preview-image", file === preview && "chosen")}>
              <img className="edit-article-preview-image__image" src={URL.createObjectURL(file)} alt="" key={index} />
              <span className="edit-article-preview-image__copy" onClick={() => setPreview(file)}>
                <div className="edit-article-preview-image__text">
                  {file === preview && "PREVIEW"}
                  {file !== preview && "Choose as preview"}
                </div>
                <div className="edit-article-preview-image__name">{file.name}</div>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="edit-article-content">
        <div className="edit-article-content__header">
          <h3 className="edit-article-content__title">Редактор</h3>
          <p className="edit-article-content__desc">
            Можно вставлять картинки через <kbd>ctrl</kbd> + <kbd>v</kbd> или перетащив в это поле
            <br />
            Лучше всего начить статью с картинки в качестве превью
            <br />
            "Подпись под картинкой" не обязательна
          </p>
        </div>
        <textarea className="edit-article-content__textarea" required onInput={updateContent} onPaste={onPaste} onDrop={onDrop}>{content}</textarea>
        <a className="edit-article-content__notice" href="https://commonmark.org/help/">
          <span>Learn markdown</span>
          <img src="https://commonmark.org/help/images/favicon.png" width="20" alt="Markdown" />
        </a>
      </div>
    </div>
  )
}


/**
 * Generates unique file name
 * @returns last 20 (or given) amount of chars from base64 code
 */
export function getFileId(file?: File | null) {
  if (file == null) return "no file"

  return `${file.lastModified}-${file.size}-${file.name}`

  // return file.name
}

export default AdminArticleEditor