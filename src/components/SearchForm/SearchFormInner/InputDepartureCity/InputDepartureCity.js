import DropDown from "../../../DropDown/DropDown"
import React, { useEffect, useRef, useState } from "react"
import {
  selectMainSearchParams,
  setRouteFrom,
  setRouteTo
} from "../../../../reducers/mainSearchSlice"
import { useDispatch, useSelector } from "react-redux"
import api from "../../../../api/api"
import { selectAccessData } from "../../../../reducers/accessDataSlice"
import { getValueFromSessionStorageByKey } from "../../../../services/handlersForSearchParameters/getParametersFromSessionStorage"
import { getRoutParameterByName } from "../../../../services/handlersForSearchParameters/getParametersFromRout"
import useQuery from "../../../../hooks/useQuery"

const InputDepartureCity = ({
  getCitiesData,
  setSelectedCityInSessionStorage,
  routToInputRef
}) => {
  const dispatch = useDispatch()

  const { route } = useSelector(selectMainSearchParams)
  const mainSearchParams = useSelector(selectMainSearchParams)

  const dateFromInput = useRef(null)

  const [currentDepartureCity, setCurrentDepartureCity] = useState("")
  const [currentCitiesData, setCurrentCitiesData] = useState("")
  const [inputDirection, setInputDirection] = useState("")

  useEffect(() => {
    let {
      front: { from }
    } = route
    const cityNameFromRedux = from
    const cityNameFromSessionStorage =
      getValueFromSessionStorageByKey("cityFrontFrom")
    const cityCodeFromSessionStorage =
      getValueFromSessionStorageByKey("cityApiFrom")
    if (cityNameFromRedux) {
      setCurrentDepartureCity(cityNameFromRedux)
    } else if (cityNameFromSessionStorage) {
      dispatch(
        setRouteFrom({
          apiRoute: cityCodeFromSessionStorage,
          frontRoute: cityNameFromSessionStorage
        })
      )
      setCurrentDepartureCity(cityNameFromSessionStorage)
    }
    setCurrentDepartureCity(cityNameFromRedux)
  }, [route.front.from])

  const onChangeWriteValue = async (evt) => {
    const targetDirection = evt.target.dataset.direction
    const targetValue = evt.target.value
    setInputDirection(targetDirection)
    setCurrentDepartureCity(targetValue)
    await setCitiesHint(currentDepartureCity, "from")
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
          if (currentDepartureCity === elem.name) {
            currentCity = elem.name
            currentCityCode = elem.code
          }
        })
        if (currentCity) {
          const city = {
            name: currentCity,
            code: currentCityCode
          }
          setCurrentDepartureCity(currentCity)
          //setCurrentDepartureCityCode(currentCityCode)
          setSelectedCityInSessionStorage(inputDirection, city)
          setCurrentCitiesData("")
        }
        routToInputRef.current.focus()
      }
    }, 500)
  }

  const selectCityAndSetIntoStorage = (city) => {
    setCurrentCitiesData("")
    setCurrentDepartureCity(city.name)
    setSelectedCityInSessionStorage(inputDirection, city)
  }

  const changeRoutes = () => {
    dispatch(
      setRouteFrom({
        apiRoute: mainSearchParams.route.api.to,
        frontRoute: mainSearchParams.route.front.to
      })
    )
    dispatch(
      setRouteTo({
        apiRoute: mainSearchParams.route.api.from,
        frontRoute: mainSearchParams.route.front.from
      })
    )
  }

  return (
    <div className="form__group form__group--departure">
      <input
        onChange={onChangeWriteValue}
        value={currentDepartureCity}
        className="form__input"
        type="text"
        id="main-departure"
        placeholder="Откуда"
        autoComplete="off"
        data-direction="from"
        tabIndex="1"
        onBlur={inputFromOnBlur}
      />
      <label className="form__label" htmlFor="main-departure">
        откуда
      </label>
      <button onClick={changeRoutes} type="button" className="form__switch">
        Поменять местами
      </button>
      <DropDown
        currentCities={currentCitiesData?.citiesInfo}
        dateFromInput={dateFromInput}
        selectCityAndSetIntoStorage={selectCityAndSetIntoStorage}
      />
    </div>
  )
}

export default InputDepartureCity
