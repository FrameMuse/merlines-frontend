import "./AdminEditArticle.style.scss"

import { ArticleContentType } from "interfaces/Blog"
import { Dispatch, FormEvent, useEffect, useState } from "react"

import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"

interface AdminEditArticleProps extends ArticleContentType<File | string> {
  onChange: Dispatch<Partial<ArticleContentType<File | string>>>
}

function AdminArticleEditor(props: AdminEditArticleProps) {
  const [tags, setTags] = useState(props.tags)
  const [title, setTitle] = useState(props.title)
  const [content, setContent] = useState(props.content)
  const [preview, setPreview] = useState(props.preview)

  const updateTitle = (event: FormEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
  const updateContent = (event: FormEvent<HTMLTextAreaElement>) => setContent(event.currentTarget.value)

  const addTag = () => setTags([...tags, "Новый тэг"])
  function updateTag(value: string, index: number) {
    if (value.length === 0) {
      tags.splice(index, 1)
    } else {
      tags[index] = value
    }

    setTags([...tags])
  }

  function updatePreview(event: FormEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    if (file == null) return

    setPreview(file)
  }

  useEffect(() => {
    props.onChange({ tags, title, content, preview })
  }, [tags, title, content, preview])

  return (
    <form className="edit-article" onSubmit={event => event.preventDefault()}>
      <div className="edit-article-tags">
        <h3 className="edit-article-tags__title">Тэги</h3>
        <AdminButton className="edit-article-tags__button" onClick={addTag}>Добавить</AdminButton>
        <div className="edit-article-tags__inner">
          {tags.map((tag, index) => (
            <AdminEditableTag onInput={value => updateTag(value, index)} key={tag}>{tag}</AdminEditableTag>
          ))}
        </div>
      </div>
      <div className="edit-article-title">
        <h3 className="edit-article-title__title">Заголовок</h3>
        <input type="text" className="edit-article-title__input" required defaultValue={title} onInput={updateTitle} />
      </div>
      <div className="edit-article-preview">
        <h3 className="edit-article-preview__title">Обложка</h3>
        <input type="file" className="edit-article-title__input" required onChange={updatePreview} />
      </div>
      <div className="edit-article-content">
        <h3 className="edit-article-content__title">Editor</h3>
        <textarea className="edit-article-content__textarea" required onInput={updateContent}>{content}</textarea>
        <a className="edit-article-content__notice" href="https://commonmark.org/help/">
          <span>Learn markdown</span>
          <img src="https://commonmark.org/help/images/favicon.png" width="20" alt="Markdown" />
        </a>
      </div>
    </form>
  )
}


export default AdminArticleEditor
