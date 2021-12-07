// SCSS
import "./passengers-list.scss"

import { useEffect, useRef, useState } from "react"
import { useClickAway } from "react-use"
import { classWithModifiers } from "utils"

import DropDownPassengersItem from "./DropDownPassengersItem"
import DropDownPassengersTravelClass from "./DropDownPassengersTravelClass"


// interface DropDownPassengersProps {
//   hidden?: boolean
//   parentRef: React.MutableRefObject<HTMLDivElement | null>
// }

function DropDownPassengers() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isHidden, setIsHidden] = useState(true)
  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return

    function focusEvent(event: Event) {
      event.preventDefault()
      setIsHidden(event.type === "focus" ? false : true)
    }

    parent?.addEventListener("focus", focusEvent)
    return () => parent?.removeEventListener("focu", focusEvent)
  }, [])
  useClickAway(ref, event => {
    const parent = ref.current?.parentElement
    if (!parent) return

    if (event.composedPath().includes(parent)) return

    setIsHidden(true)
  })
  return (
    <div className={classWithModifiers("passengers-list", isHidden && "hidden")} ref={ref}>
      <div className="passengers-list__item">
        <DropDownPassengersItem name="adults" />
        <DropDownPassengersItem name="children" />
        <DropDownPassengersItem name="babies" />
      </div>
      <div className="passengers-list__item">
        <DropDownPassengersTravelClass name="economy" />
        <DropDownPassengersTravelClass name="business" />
      </div>
    </div>
  )
}

export default DropDownPassengers
