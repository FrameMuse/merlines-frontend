import { Dispatch, useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use"
import { classWithModifiers } from "utils"

import DropDownItem, { DropDownElementProps } from "./DropDownItem"


interface DropDownProps {
  list: DropDownElementProps[]
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
  onSelect?(element: DropDownElementProps, index: number): void
}

function DropDown(props: DropDownProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  function onKeyDown(event: KeyboardEvent) {
    if (!props.isOpen || !["Enter", "ArrowUp", "ArrowDown"].includes(event.key)) return

    event.preventDefault()

    if (event.key === "Enter") select(activeIndex)

    if (event.key === "ArrowUp" && activeIndex > 0) setActiveIndex(activeIndex - 1)
    if (event.key === "ArrowDown" && activeIndex < props.list.length - 1) setActiveIndex(activeIndex + 1)
  }
  function select(index: number) {
    if (!props.isOpen) return

    props.setIsOpen(false)
    props.onSelect?.(props.list[index], index)

    setActiveIndex(index)
  }
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])
  useClickAway(ref, () => select(activeIndex))
  return (
    <div className={classWithModifiers("drop-down", !props.isOpen && "hidden")} ref={ref}>
      {props.list.map((element, index) => (
        <DropDownItem
          {...element}
          active={index === activeIndex}
          onClick={() => select(index)}
          key={index}
        />
      ))}
    </div>
  )
}

export default DropDown
