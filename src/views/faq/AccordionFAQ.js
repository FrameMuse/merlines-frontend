import React, { useState } from "react"

const AccordionFAQ = ({ question, answer }) => {
  const [isDisplay, setIsDisplay] = useState(false)

  return (
    <div className="answers__item">
      <div
        className={
          isDisplay
            ? "answers__item-wrap answers__item-wrap--active"
            : "answers__item-wrap"
        }
      >
        <div className="answers__question">
          <p className="answers__question-text">{`${question}`}</p>
        </div>

        <button
          className={
            isDisplay
              ? "answers__button answers__button--active"
              : "answers__button"
          }
          type="button"
          onClick={() => setIsDisplay(!isDisplay)}
        >
          Ответ{" "}
          <svg className="answers__button-arrow" width="8" height="8">
            <use href="img/sprite.svg#arrow-open"></use>
          </svg>
        </button>
      </div>

      <div className="answers__item-inner">
        <p className="text" dangerouslySetInnerHTML={{ __html: answer }}></p>
      </div>
    </div>
  )
}

export default AccordionFAQ
