import "./AdminArticleEditor.style.scss"

import { ArticleContentType } from "interfaces/Blog"
import { ClipboardEvent, Dispatch, DragEvent, FormEvent, useEffect, useState } from "react"
import { classWithModifiers, isImageFile, toBase64 } from "utils"

import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"


interface AdminEditArticleProps extends ArticleContentType {
  hidden?: boolean
  onChange: Dispatch<Partial<ArticleContentType>>
}

function AdminArticleEditor(props: AdminEditArticleProps) {
  const [tags, setTags] = useState(props.tags)
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [preview, setPreview] = useState(props.preview)
  const [files, setFiles] = useState(props.files)

  const updateTitle = (event: FormEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
  const updateContent = (event: FormEvent<HTMLTextAreaElement>) => setContent(event.currentTarget.value)

  const addTag = () => setTags([...tags, "Новый тэг"])
  const updateTag = (value: string, index: number) => {
    if (value.length === 0) {
      if (!window.confirm("Удалить тэг?")) return
    }

    tags[index] = value
    setTags([...tags.filter(Boolean)])
  }

  async function addFiles(filesToAdd: File[]) {
    // Filter by file
    for (const fileToAdd of filesToAdd) {
      const name = getFileId(fileToAdd)
      if (files.some(file => file.name === name)) continue

      const data = await toBase64(fileToAdd)
      // if (files.some(file => file.data === data)) continue

      files.push({ name, data })
    }

    setFiles([...files])
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
    const images = pastedFiles.filter(pastedFile => pastedFile.type.startsWith("image"))
    addFiles(images)

    // setContent should go after addFiles
    setTimeout(() => {
      // https://stackoverflow.com/a/55174561/288906
      if (!document.execCommand("insertText", false, markdownFiles)) {
        target.setRangeText(markdownFiles, selectionStart, selectionEnd, "end")
      }
      setContent(target.value)
    })
  }

  useEffect(() => {
    const filteredFiles = [...files.filter(file => content.includes(file.name))]
    if (filteredFiles.every(file => file.name !== preview)) {
      setPreview("")
    }

    setFiles(filteredFiles)
  }, [content])

  useEffect(() => {
    props.onChange({ tags, title, content, preview, files })
  }, [tags, title, content, preview, files])

  return (
    <div className={classWithModifiers("article-editor", props.hidden && "hidden")}>
      <div className="article-editor-tags">
        <h3 className="article-editor-tags__title">Тэги</h3>
        <AdminButton className="article-editor-tags__button" onClick={addTag}>Добавить</AdminButton>
        <div className="article-editor-tags__inner">
          {tags.map((tag, index) => tag.length > 0 && (
            <AdminEditableTag onChange={value => updateTag(value, index)} key={index}>{tag}</AdminEditableTag>
          ))}
        </div>
      </div>
      <div className="article-editor-title">
        <h3 className="article-editor-title__title">Заголовок</h3>
        <input type="text" className="article-editor-title__input" required defaultValue={title} onInput={updateTitle} />
      </div>
      <div className="article-editor-preview">
        <h3 className="article-editor-preview__title">Картинки</h3>
        Выберите превью, оно будет отображать в поиске по статьям
        <div className="article-editor-preview__images">
          {files.length === 0 && (
            <p>Вставленные картинки будет появлятся здесь</p>
          )}
          {files.map(file => (
            <div className={classWithModifiers("article-editor-preview-image", file.name === preview && "chosen")} key={file.name}>
              <img className="article-editor-preview-image__image" src={file.data || ""} alt="" />
              <span className="article-editor-preview-image__copy" onClick={() => setPreview(file.name)}>
                <div className="article-editor-preview-image__text">
                  {file.name === preview && "PREVIEW"}
                  {file.name !== preview && "Choose as preview"}
                </div>
                <div className="article-editor-preview-image__name">{file.name}</div>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="article-editor-content">
        <div className="article-editor-content__header">
          <h3 className="article-editor-content__title">Редактор</h3>
          <p className="article-editor-content__desc">
            Можно вставлять картинки через <kbd>ctrl</kbd> + <kbd>v</kbd> или перетащив в это поле
            <br />
            Лучше всего начить статью с картинки в качестве превью
            <br />
            "Подпись под картинкой" не обязательна
          </p>
        </div>
        <textarea className="article-editor-content__textarea" required onInput={updateContent} onPaste={onPaste} onDrop={onDrop} defaultValue={content} />
        <a className="article-editor-content__notice" href="https://commonmark.org/help/">
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
  if (file == null) return ""

  return `${file.lastModified}-${file.size}-${file.name}`

  // return file.name
}

export default AdminArticleEditor
