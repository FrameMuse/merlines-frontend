import "./Modal.scss"

import React, { useEffect } from "react"
import { classWithModifiers } from "utils"

interface props {
  visible: boolean
  onCancel?: () => void
  closeBtn?: boolean
  maxWidth?: string
}

const Modal: React.FC<props> = ({ visible, closeBtn, children, onCancel, maxWidth }) => {
  useEffect(() => {
    visible ? document.body.style.overflow = "hidden" : document.body.style.overflow = "initial"
  }, [visible])

  return (
    <div className={classWithModifiers("m-popup", visible && "show")}>
      <div className={"m-popup__backdrop"} onClick={onCancel} />
      <div className={"m-popup__body"} style={{ "--max-width": maxWidth }}>
        {closeBtn && <button className={"m-popup__close-btn"} onClick={onCancel}>
          закрыть
          <svg className={"m-popup__close-btn-icon"} width="10" height="10">
            <use href="img/sprite.svg#close" />
          </svg>
        </button>}
        <div className={"m-popup__content"}>
          {visible && children}
        </div>
      </div>
    </div>
  )
}

export default Modal
