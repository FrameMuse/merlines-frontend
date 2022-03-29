import "./Modal.scss"

import React, {useEffect} from "react"

interface props {
  visible: boolean
  onCancel: () => void
  closeBtn?: boolean
}

const Modal: React.FC<props> = ({visible, closeBtn, children, onCancel}) => {

  useEffect(() => {
    visible ? document.body.style.overflow = "hidden" : document.body.style.overflow = "initial"
  }, [visible])

  return (
    <div className={["modal", visible ? "modal--show" : ""].join(" ")}>
      <div className={"modal__backdrop"} onClick={onCancel}/>
      <div className={"modal__body"}>
        {closeBtn && <button className={"modal__close-btn"} onClick={onCancel}>
          закрыть
          <svg className={"modal__close-btn-icon"} width="10" height="10">
            <use href="img/sprite.svg#close"/>
          </svg>
        </button>}
        <div className={"modal__content"}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
