import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import controllerParams from "./controllersParams"
import useQuery from "../hooks/useQuery"
import api from "../api/api"
import {
  selectMainSearchParams,
  setRouteFrom,
  setRouteTo
} from "../reducers/mainSearchSlice"

function useParamsFromRoute() {
  const location = useLocation()
  const query = useQuery()
  const dispatch = useDispatch()
  const mainSearchParams = useSelector(selectMainSearchParams)
  console.log("mainSearchParams", mainSearchParams)

  const getParams = (path) => {
    return controllerParams.find((item) => item.name === path)
  }

  const parseSearchParams = (params) => {
    let newParams = {
      name: params.name,
      routeParams: {}
    }

    params.mainParams.forEach((param) => {
      newParams.routeParams[param] = query.get(param)
    })

    if (params.optionalParams.length) {
      params.optionalParams.forEach((optionalParam) => {
        newParams.routeParams[optionalParam] = query.get(optionalParam)
      })
    }

    return newParams
  }

  const getCityNameFrom = async () => {
    const codeFrom = query.get("origin")

    if (codeFrom) {
      try {
        const cityFrom = await api.getCityNameFromCode(codeFrom)
        if (cityFrom) {
          dispatch(
            setRouteFrom({
              apiRoute: codeFrom,
              frontRoute: cityFrom.data[0].cases.su
            })
          )
          sessionStorage.setItem("cityFrontFrom", cityFrom.data[0].cases.su)
          sessionStorage.setItem("cityApiFrom", codeFrom)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getCityNameTo = async () => {
    const codeTo = query.get("destination")

    if (codeTo) {
      try {
        const cityTo = await api.getCityNameFromCode(codeTo)
        if (cityTo) {
          dispatch(
            setRouteTo({
              apiRoute: codeTo,
              frontRoute: cityTo.data[0].cases.su
            })
          )
          sessionStorage.setItem("cityFrontTo", cityTo.data[0].cases.su)
          sessionStorage.setItem("cityApiTo", codeTo)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const paramsForCurrentRoute = getParams(location.pathname)
  const testParamsParse =
    location.search && parseSearchParams(paramsForCurrentRoute)

  if (location.search) {
    // формирование ссылки идет через редакс из параметров поэтому нет смысла проверять на наличие
    // const params = {
    //   origin: mainSearchParams.route.api.from,
    //   destination: mainSearchParams.route.api.to,
    //   start_date: DateTime.now().toISODate(),
    //   end_date: `${DateTime.local(DateTime.now().plus({ year: 1 }).year, DateTime.now().month, 1).toISODate()}`,
    // };

    const isCityNamesInSession =
      sessionStorage.getItem("cityFrontFrom") &&
      sessionStorage.getItem("cityFrontTo") &&
      sessionStorage.getItem("cityApiFrom") &&
      sessionStorage.getItem("cityApiTo")
    const isCurrentRouteSameAsInSession =
      sessionStorage.getItem("cityApiFrom") === query.get("origin") &&
      sessionStorage.getItem("cityApiTo") === query.get("destination")

    // const testCityNames = sessionStorage.getItem('cityFrontFrom') && sessionStorage.getItem('cityFrontTo');

    if (isCityNamesInSession) {
      if (isCurrentRouteSameAsInSession) {
        console.log("is this????")
        sessionStorage.setItem("currentController", testParamsParse.name)
        sessionStorage.setItem(
          "mainParams",
          JSON.stringify(testParamsParse.routeParams)
        )
        dispatch(
          setRouteFrom({
            apiRoute: testParamsParse.routeParams.origin,
            frontRoute: sessionStorage.getItem("cityFrontFrom")
          })
        )
        dispatch(
          setRouteTo({
            apiRoute: testParamsParse.routeParams.destination,
            frontRoute: sessionStorage.getItem("cityFrontTo")
          })
        )
      } else {
        console.log("else??????")
        sessionStorage.setItem("currentController", testParamsParse.name)
        sessionStorage.setItem(
          "mainParams",
          JSON.stringify(testParamsParse.routeParams)
        )
        getCityNameFrom()
        getCityNameTo()
      }
    } else {
      console.log("second else???")
      sessionStorage.setItem("currentController", testParamsParse.name)
      sessionStorage.setItem(
        "mainParams",
        JSON.stringify(testParamsParse.routeParams)
      )
      getCityNameFrom()
      getCityNameTo()
    }
  } else {
    // clearStorage
  }

  return testParamsParse
}

export default useParamsFromRoute
