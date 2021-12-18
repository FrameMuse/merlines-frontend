import "./AdminEditArticle.style.scss"

import { Dispatch, FormEvent, useEffect, useState } from "react"

import AdminButton from "../AdminButton/AdminButton"
import AdminEditableTag from "../AdminEditTag/AdminEditableTag"

interface EditArticleType {
  tags: string[]
  title: string
  content: string
}

interface AdminEditArticleProps extends Partial<EditArticleType> {
  onChange: Dispatch<EditArticleType>
}

function AdminArticleEditor(props: AdminEditArticleProps) {
  const [tags, setTags] = useState(props.tags || [])
  const [title, setTitle] = useState(props.title || "Название")
  const [content, setContent] = useState(props.content || "")

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

  useEffect(() => {
    props.onChange({ tags, title, content })
  }, [tags, title, content])

  return (
    <div className="edit-article">
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
        <input type="text" className="edit-article-title__input" defaultValue={title} onInput={updateTitle} />
      </div>
      <div className="edit-article-content">
        <h3 className="edit-article-content__title">Editor</h3>
        <textarea className="edit-article-content__textarea" onInput={updateContent}>{content}</textarea>
        <a className="edit-article-content__notice" href="https://commonmark.org/help/">
          <span>Learn markdown</span>
          <img src="https://commonmark.org/help/images/favicon.png" width="20" alt="Markdown" />
        </a>
      </div>
    </div>
  )
}


export default AdminArticleEditor
