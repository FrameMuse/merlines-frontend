import { getGeoAirCities } from "api/actions/geo"
import ClientAPI from "api/client"
import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchAirports, SearchPlace, SearchRoute, updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers, noop } from "utils"

import DropDown from "../DropDown/DropDown"
import { DropDownElementProps } from "../DropDown/DropDownItem"


interface SearchFormRouteProps extends SearchRoute {
  index: number
}

export function SearchFormRoute(props: SearchFormRouteProps) {
  const dispatch = useDispatch()

  const search = useSelector(state => state.search)

  function updateRouteData<K extends keyof SearchRoute = keyof SearchRoute>(key: K, value: SearchRoute[K]) {
    dispatch(updateSearchRoute(props.index, { [key]: value }))
  }

  function onChangeDeparturePoint(place: SearchPlace) {
    updateRouteData("departurePoint", place)
  }

  function onChangeArrivalPoint(place: SearchPlace) {
    updateRouteData("arrivalPoint", place)
  }

  return (
    <>
      <SearchFormRouteInput name="departure" placeholder="откуда" state={props.departurePoint} onChange={onChangeDeparturePoint}>
        <SearchFormRoutesSwitchButton />
      </SearchFormRouteInput>
      <SearchFormRouteInput name="arrival" placeholder="куда" state={props.arrivalPoint} onChange={onChangeArrivalPoint} />
    </>
  )
}


interface SearchFormRouteInputProps {
  name: string
  placeholder: string
  children?: any

  state: SearchPlace | null
  onChange: Dispatch<SearchPlace>
}

function SearchFormRouteInput(props: SearchFormRouteInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(props.state?.title)
  const [places, setPlaces] = useState<SearchAirports[]>([])

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setValue(value)

    ClientAPI
      .query(getGeoAirCities(value))
      .then(({ error, payload }) => {
        if (error || !payload) return

        setPlaces(payload.results)
        setIsOpen(true)
      })
  }
  function onSelect(_element: DropDownElementProps, index: number) {
    const element = placesIdList[index]
    // Check it as there could be empty array
    if (!element) return

    setValue(element.title)
    props.onChange(element)
  }

  useEffect(() => {
    setValue(props.state?.title)
  }, [props.state])

  const placesIdList = places.flatMap(place => {
    if (place.airports) {
      return [{
        id: place.id,
        code: place.code,
        title: place.title,
      }, ...place.airports]
    }

    return {
      id: place.id,
      code: place.code,
      title: place.title,
    }
  })
  const dropDownList: DropDownElementProps[] = places.flatMap(place => {
    if (place.airports) {
      return [
        {
          code: place.code,
          title: place.title + ", " + place.country_title,
        },
        ...place.airports.map(airport => ({
          code: airport.code,
          title: airport.title,
          iconName: "departures"
        }))
      ]
    }

    return {
      code: place.code,
      title: place.title,
    }
  })
  return (
    <label className={classWithModifiers("search-form__group", props.name)}>
      <input
        className="search-form__input"
        autoComplete="off"
        placeholder="_"

        value={value}
        onChange={onChange} />
      <div className="search-form__placeholder">{props.placeholder}</div>
      <DropDown list={dropDownList} isOpen={isOpen} setIsOpen={setIsOpen} onSelect={onSelect} />
      {props.children}
    </label>
  )
}


function SearchFormRoutesSwitchButton() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)

  function switchRoutes() {
    console.log(search.routes[0])
    // Switch exists for the first and only route
    dispatch(updateSearchRoute(0, {
      arrivalPoint: search.routes[0].departurePoint,
      departurePoint: search.routes[0].arrivalPoint,
    }))
  }

  if (search.routes.length > 1) return null
  return <button onClick={switchRoutes} type="button" className="search-form__switch">Поменять местами</button>
}
