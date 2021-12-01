import React from "react"

import { useDispatch } from "react-redux"
import {
  setIsOpenClearHistory,
  setIsHistoryRoute
} from "../../../reducers/lkDataSlice"

function LkContentClearAll({ subscribe }) {
  const mainClass = `button-text button-text--cabinet ${
    subscribe ? "button-text--right" : ""
  }`
  const dispatch = useDispatch()
  const onClickClearAllHistory = () => {
    dispatch(setIsHistoryRoute(false))
    dispatch(setIsOpenClearHistory(true))
  }

  return (
    <div className={mainClass}>
      <button
        onClick={onClickClearAllHistory}
        className="button-text__btn"
        type="button"
      >
        очистить всю историю
      </button>
    </div>
  )
}

export default LkContentClearAll
