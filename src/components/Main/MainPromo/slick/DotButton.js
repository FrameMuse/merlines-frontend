import React from "react"

const DotButton = ({ index, isActive, dispatch }) => {
  const onClick = () => dispatch({ index })
  return (
    <button
      onClick={onClick}
      className={`advantages__slider-btn ${
        isActive ? "advantages__slider-btn--active" : ""
      }`}
      type="button"
    ></button>
  )
}

export const DotButtons = ({ activeIndex, dispatch }) => {
  const buttons = []
  for (let i = 0; i < 3; i++) {
    buttons.push(
      <DotButton
        dispatch={dispatch}
        isActive={activeIndex === i}
        index={i}
        key={i}
      />
    )
  }
  return buttons
}

export default DotButton
