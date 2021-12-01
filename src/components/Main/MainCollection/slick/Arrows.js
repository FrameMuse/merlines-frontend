import React, { useEffect } from "react"

const addDotsToClassNames = (className) => {
  const arr = className.trim().split(" ")
  arr[0] = "." + arr[0]
  return arr.join(" .")
}

const setDisabled = (className, disabled) => {
  if (disabled) {
    const selector = addDotsToClassNames(className)
    const $el = document.querySelector(selector)
    $el?.classList.add("arrow--disabled")
  } else {
    const $el = document.querySelector("." + className)
    $el?.classList.remove("arrow--disabled")
  }
}

export const MainCollectionPrevArrow = (props) => {
  const { className, onClick, disabled } = props
  const svgName = "arrow-slider"
  const svgClassName = ((className ?? "") + " arrow--left").trim()
  useEffect(() => setDisabled(svgClassName, disabled), [disabled, svgClassName])
  return (
    <svg onClick={onClick} className={svgClassName} disabled={disabled}>
      <use xlinkHref={`img/sprite.svg#${svgName}`} />
    </svg>
  )
}

export const MainCollectionNextArrow = (props) => {
  const { className, onClick, disabled } = props
  const svgName = "arrow-slider"
  const svgClassName = ((className ?? "") + " arrow--right").trim()
  useEffect(() => setDisabled(svgClassName, disabled), [disabled, svgClassName])

  return (
    <svg onClick={onClick} className={svgClassName} disabled={disabled}>
      <use xlinkHref={`img/sprite.svg#${svgName}`} />
    </svg>
  )
}
