import React, { useRef } from "react"
import InputDepartureCity from "./InputDepartureCity/InputDepartureCity"
import InputArrivedCity from "./InputArrivedCity/InputArrivedCity"
import { useDispatch, useSelector } from "react-redux"
import { setRouteFrom, setRouteTo } from "../../../reducers/mainSearchSlice"
import api from "../../../api/api"
import { selectAccessData } from "../../../reducers/accessDataSlice"
import InputDepartureDate from "./InputDepartureDate/InputDepartureDate"
import InputPassengersAndClass from "./InputPassengersAndClass/InputPassengersAndClass"
import InputArrivedDate from "./InputArrivedDate/InputArrivedDate"

const SearchFormInner = () => {
  const dispatch = useDispatch()

  const accessData = useSelector(selectAccessData)

  const dateToInputRef = useRef(null)
  const dateFromInputRef = useRef(null)
  const routToInputRef = useRef(null)

  const getCitiesData = async (cityName) => {
    try {
      const cities = await api.getCities(cityName, accessData.loginToken)
      return cities
    } catch (error) {
      console.error(error)
    }
  }

  const setSelectedCityInSessionStorage = (direction, city) => {
    if (direction === "from") {
      dispatch(setRouteFrom({ apiRoute: city.code, frontRoute: city.name }))
      sessionStorage.setItem("cityApiFrom", city.code)
      sessionStorage.setItem("cityFrontFrom", city.name)
      //inputEl.current.focus();
    } else {
      dispatch(setRouteTo({ apiRoute: city.code, frontRoute: city.name }))
      sessionStorage.setItem("cityApiTo", city.code)
      sessionStorage.setItem("cityFrontTo", city.name)
    }
  }

  return (
    <>
      <InputDepartureCity
        getCitiesData={getCitiesData}
        setSelectedCityInSessionStorage={setSelectedCityInSessionStorage}
        routToInputRef={routToInputRef}
      />
      <InputArrivedCity
        getCitiesData={getCitiesData}
        setSelectedCityInSessionStorage={setSelectedCityInSessionStorage}
        routToInputRef={routToInputRef}
        dateFromInputRef={dateFromInputRef}
      />
      <InputDepartureDate
        dateFromInputRef={dateFromInputRef}
        dateToInputRef={dateToInputRef}
      />
      <InputArrivedDate />
      <InputPassengersAndClass />
    </>
  )
}

export default SearchFormInner
