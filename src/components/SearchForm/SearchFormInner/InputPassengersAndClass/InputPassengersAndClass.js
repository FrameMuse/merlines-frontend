import DropDownPassengers from "../../../DropDownPassengers/DropDownPassengers"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectMainSearchParams,
  setPassengersInfo,
  setPassengersInfoMini
} from "../../../../reducers/mainSearchSlice"
import { pluralize } from "../../../../utils"
// import React from "react";

const InputPassengersAndClass = () => {
  const dispatch = useDispatch()

  const mainSearchParams = useSelector(selectMainSearchParams)

  const [passengersAmount, setPassengersAmount] = useState(1)

  useEffect(() => {
    dispatch(
      setPassengersInfo(
        `${passengersAmount} ${pluralize(passengersAmount, [
          "пассажир",
          "пассажира",
          "пассажиров"
        ])}, ${mainSearchParams.airClasses.economy ? "эконом" : "бизнес"}`
      )
    )
    dispatch(
      setPassengersInfoMini(
        `${passengersAmount} ${pluralize(passengersAmount, [
          "пассажир",
          "пассажира",
          "пассажиров"
        ])} / ${mainSearchParams.airClasses.economy ? "эконом" : "бизнес"}`
      )
    )
  }, [passengersAmount, mainSearchParams.airClasses])

  useEffect(() => {
    const amount = mainSearchParams.passengers
    setPassengersAmount(
      amount.passengers_adults +
        amount.passengers_children +
        amount.passengers_infants
    )
  }, [mainSearchParams.passengers])

  useEffect(() => {
    const handleOverlayClose = (evt) => {
      if (
        !(
          evt.target.classList.contains("form__input--passenger") ||
          (evt.target.closest("ul")
            ? evt.target.closest("ul").classList.contains("passengers-list")
            : "")
        )
      ) {
        setIsPassengersOpen(false)
      }
    }

    document.addEventListener("click", handleOverlayClose)

    return () => {
      document.removeEventListener("click", handleOverlayClose)
    }
  })

  const [isPassengersOpen, setIsPassengersOpen] = useState(false)

  const openPassengers = () => setIsPassengersOpen(!isPassengersOpen)
  return (
    <div className="form__group form__group--passengers">
      <input
        onClick={openPassengers}
        className="form__input form__input--passenger"
        id="main-passenger"
        placeholder="Пассажиры и класс"
        value={mainSearchParams.passengersInfo}
        readOnly
        tabIndex="5"
      />
      <label className="form__label" htmlFor="main-passenger">
        Пассажиры и класс
      </label>
      <DropDownPassengers isPassengersOpen={isPassengersOpen} />
    </div>
  )
}

export default InputPassengersAndClass
