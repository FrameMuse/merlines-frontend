import DropDown from "../../../DropDown/DropDown"
import React, { useEffect, useState } from "react"
import {
  selectMainSearchParams,
  setRouteTo
} from "../../../../reducers/mainSearchSlice"
import { useDispatch, useSelector } from "react-redux"
import { getValueFromSessionStorageByKey } from "../../../../services/handlersForSearchParameters/getParametersFromSessionStorage"

const InputArrivedCity = ({
  getCitiesData,
  setSelectedCityInSessionStorage,
  dateFromInputRef,
  routToInputRef
}) => {
  const dispatch = useDispatch()

  const { route } = useSelector(selectMainSearchParams)

  const [currentArrivedCity, setCurrentArrivedCity] = useState("")
  const [currentCitiesData, setCurrentCitiesData] = useState("")
  const [inputDirection, setInputDirection] = useState("")

  useEffect(() => {
    const {
      front: { to }
    } = route
    const cityNameFromRedux = to
    const cityNameFromSessionStorage =
      getValueFromSessionStorageByKey("cityFrontTo")
    const cityCodeFromSessionStorage =
      getValueFromSessionStorageByKey("cityApiTo")
    if (!!cityNameFromRedux) {
      setCurrentArrivedCity(cityNameFromRedux)
    } else if (!!cityNameFromSessionStorage) {
      dispatch(
        setRouteTo({
          apiRoute: cityCodeFromSessionStorage,
          frontRoute: cityNameFromSessionStorage
        })
      )
      setCurrentArrivedCity(cityNameFromSessionStorage)
    }
  }, [route.front.to])

  const onChangeWriteValue = async (evt) => {
    const targetDirection = evt.target.dataset.direction
    const targetValue = evt.target.value
    setInputDirection(targetDirection)
    setCurrentArrivedCity(targetValue)
    await setCitiesHint(currentArrivedCity, "to")
  }

  const setCitiesHint = async (cityName, direction) => {
    const cities = await getCitiesData(cityName)
    setCurrentCitiesData({
      keyWord: cityName,
      citiesInfo: cities.data
    })
  }

  const inputFromOnBlur = () => {
    setTimeout(() => {
      if (currentCitiesData) {
        let currentCity = null
        let currentCityCode = null
        currentCitiesData.citiesInfo.forEach((elem) => {
          if (currentArrivedCity === elem.name) {
            currentCity = elem.name
            currentCityCode = elem.code
          }
        })
        if (currentCity) {
          const city = {
            name: currentCity,
            code: currentCityCode
          }
          setCurrentArrivedCity(currentCity)
          setSelectedCityInSessionStorage(inputDirection, city)
          setCurrentCitiesData("")
        }
        dateFromInputRef.current.focus()
      }
    }, 500)
  }

  const selectCityAndSetIntoStorage = (city) => {
    setCurrentCitiesData("")
    setCurrentArrivedCity(city.name)
    setSelectedCityInSessionStorage(inputDirection, city)
  }

  return (
    <div className="form__group form__group--arrival">
      <input
        onChange={onChangeWriteValue}
        value={currentArrivedCity}
        className="form__input form__input--arrival"
        type="text"
        id="main-arrival"
        placeholder="Куда"
        autoComplete="off"
        ref={routToInputRef}
        data-direction="to"
        tabIndex="2"
        onBlur={inputFromOnBlur}
      />
      <label
        className="form__label form__label--arrival"
        htmlFor="main-arrival"
      >
        куда
      </label>
      <DropDown
        currentCities={currentCitiesData?.citiesInfo}
        dateFromInput={dateFromInputRef}
        selectCityAndSetIntoStorage={selectCityAndSetIntoStorage}
      />
    </div>
  )
}

export default InputArrivedCity
