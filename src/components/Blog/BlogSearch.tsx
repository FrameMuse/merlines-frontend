// SCSS
import "./search.scss"

import { ChangeEvent, FormEvent, useState } from "react"
import { atom, useSetRecoilState } from "recoil"
import { classWithModifiers } from "utils"

import Icon from "../common/Icon"


export const blogSearchState = atom({
  key: "blogSearch",
  default: ""
})

function BlogSearch() {
  const [value, setValue] = useState("")
  const [isActive, setIsActive] = useState(false)
  const setBlogSearchState = useSetRecoilState(blogSearchState)
  function onToggle() {
    setIsActive(!isActive)
  }
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value)
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsActive(false)
    setBlogSearchState(value)
  }
  return (
    <div className="search">
      <button className="search-trigger" onClick={onToggle}>
        <Icon name="search" className="search-trigger__icon" />
      </button>
      <div className={classWithModifiers("search-modal", isActive && "active")}>
        <div className="search-modal__container">
          <button className="search-modal__close" type="button" onClick={onToggle}>
            <span>закрыть</span>
            <Icon name="close" className="search-modal__icon" />
          </button>
          <div className="search-modal__wrapper">
            <div className="search-modal__header">
              <div className="search-modal__title">Поисковая строка</div>
              <div className="search-modal__desc">Введите запрос, который вас интересует</div>
            </div>

            <form className="search-modal__search" onSubmit={onSubmit}>
              <input type="text" className="search-modal__input" onChange={onChange} />
              <button className="search-modal__submit" type="submit">Искать</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSearch
