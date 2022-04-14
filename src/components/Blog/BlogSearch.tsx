// SCSS
import "./search.scss"

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { classWithModifiers } from "utils"

import useLocalization from "../../plugins/localization/hook"
import Icon from "../common/Icon"



function BlogSearch() {
  const ll = useLocalization(ll => ll)
  const history = useHistory()

  const [value, setValue] = useState("")
  const [isActive, setIsActive] = useState(false)

  const searchRef = useRef<HTMLInputElement | null>(null)

  function onToggle() {
    setIsActive(!isActive)
  }
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value)
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsActive(false)

    const searchParams = new URLSearchParams(history.location.search)
    searchParams.set("search", value)

    history.push({ search: searchParams.toString() })
  }

  useEffect(() => {
    if (!searchRef.current || !isActive) return
    searchRef.current.focus()
  }, [isActive])

  return (
    <div className="search">
      <button className="search-trigger" onClick={onToggle}>
        <Icon name="search" className="search-trigger__icon" />
      </button>
      <div className={classWithModifiers("search-modal", isActive && "active")}>
        <div className="search-modal__container">
          <button className="search-modal__close" type="button" onClick={onToggle}>
            <span>{ll.main.close}</span>
            <Icon name="close" className="search-modal__icon" />
          </button>
          <div className="search-modal__wrapper">
            <div className="search-modal__header">
              <div className="search-modal__title">{ll.blog.searchTitle}</div>
              <div className="search-modal__desc">{ll.blog.searchDesc}</div>
            </div>
            <form className="search-modal__search" onSubmit={onSubmit}>
              <input type="text" className="search-modal__input" ref={searchRef} onChange={onChange} />
              <button className="search-modal__submit" type="submit">{ll.blog.search}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSearch
