import React, { useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import { useKey } from "react-use"

import { setRouteFrom, setRouteTo } from "../../reducers/mainSearchSlice"
import DropDownItem from "./DropDownItem"
import DropDownItemPoint from "./DropDownItemPoint"

function DropDown({
  currentCities,
  setCurrentCitiesData,
  setInputValue,
  inputEl,
  inputDirection,
  nodeDropDown
}) {
  const [cursorPosition, setCursorPosition] = useState(0)
  const [city, setCity] = useState(null)
  const [citiesWithAirports, setCitiesWithAirports] = useState(null)
  const dispatch = useDispatch()

  const writeCityToState = (choosedCity) => {
    if (inputDirection === "from") {
      dispatch(
        setRouteFrom({
          apiRoute: choosedCity.code,
          frontRoute: choosedCity.name || choosedCity.city.name
        })
      )
      sessionStorage.setItem("cityApiFrom", choosedCity.code)
      sessionStorage.setItem(
        "cityFrontFrom",
        choosedCity.name || choosedCity.city.name
      )

      inputEl.current.focus()
    } else {
      dispatch(
        setRouteTo({
          apiRoute: choosedCity.code,
          frontRoute: choosedCity.name || choosedCity.city.name
        })
      )
      sessionStorage.setItem("cityApiTo", choosedCity.code)
      sessionStorage.setItem(
        "cityFrontTo",
        choosedCity.name || choosedCity.city.name
      )
    }

    setInputValue("")
    setCurrentCitiesData("")
  }

  useEffect(() => {
    const filteredAirports = currentCities[0]?.airports.filter(
      (item) => item.iata_type === "airport"
    )

    if (filteredAirports?.length > 1) {
      const uniqueAirports = [...new Set(filteredAirports)]
      const [firstItem, ...rest] = currentCities
      const newArray = [firstItem, ...uniqueAirports, ...rest]
      setCitiesWithAirports(newArray)
    } else setCitiesWithAirports(currentCities)
  }, [currentCities])

  useKey(
    "ArrowDown",
    () => {
      setCursorPosition((prevState) => {
        if (citiesWithAirports && prevState < citiesWithAirports.length - 1)
          return prevState + 1
        return prevState
      })
    },
    { event: "keyup" },
    [citiesWithAirports]
  )

  useKey("ArrowUp", () =>
    setCursorPosition((prevState) =>
      prevState > 0 ? prevState - 1 : prevState
    )
  )

  useKey(
    "Enter",
    (e) => {
      e.preventDefault()
      if (citiesWithAirports) setCity(citiesWithAirports[cursorPosition])
    },
    { event: "keyup" },
    [cursorPosition, citiesWithAirports]
  )

  useEffect(() => {
    if (city) writeCityToState(city)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city])

  return (
    <ul
      ref={nodeDropDown}
      className={`drop-down ${currentCities ? "" : "block-hidden"}`}
    >
      {citiesWithAirports &&
        citiesWithAirports.map((city, index) =>
          city.airports ? (
            <DropDownItem
              key={city.id}
              active={index === cursorPosition}
              cityOrAirport={city}
              getCity={(city) => setCity(city)}
              currentCities={currentCities}
            />
          ) : (
            <DropDownItemPoint
              key={city.id}
              active={index === cursorPosition}
              cityOrAirport={city}
              getCity={(city) => setCity(city)}
            />
          )
        )}
    </ul>
  )
}

export default DropDown
