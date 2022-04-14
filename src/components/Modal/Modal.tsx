import "./Modal.scss"

import React, { useEffect } from "react"

interface props {
  visible: boolean
  onCancel: () => void
  closeBtn?: boolean
}

const Modal: React.FC<props> = ({ visible, closeBtn, children, onCancel }) => {

  useEffect(() => {
    visible ? document.body.style.overflow = "hidden" : document.body.style.overflow = "initial"
  }, [visible])

  return (
    <div className={["m-popup", visible ? "m-popup--show" : ""].join(" ")}>
      <div className={"m-popup__backdrop"} onClick={onCancel} />
      <div className={"m-popup__body"}>
        {closeBtn && <button className={"m-popup__close-btn"} onClick={onCancel}>
          закрыть
          <svg className={"m-popup__close-btn-icon"} width="10" height="10">
            <use href="img/sprite.svg#close" />
          </svg>
        </button>}
        <div className={"m-popup__content"}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
