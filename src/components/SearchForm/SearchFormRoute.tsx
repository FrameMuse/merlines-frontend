import { getGeoAirCities, getGeoIpAir } from "api/actions/geo"
import ClientAPI from "api/client"
import { ChangeEvent, Dispatch, MutableRefObject, useEffect, useRef, useState } from "react"
import { ReactNode } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import { SearchAirports, SearchPlace, SearchRoute, updateSearchRoute } from "redux/reducers/search"
import { classWithModifiers } from "utils"

import useLocalization from "../../plugins/localization/hook"
import DropDown from "../DropDown/DropDown"
import { DropDownElementProps } from "../DropDown/DropDownItem"


interface SearchFormRouteProps extends SearchRoute {
  index: number
}

export function SearchFormRoute(props: SearchFormRouteProps) {
  const ll = useLocalization(ll => ll)
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  function onChangeDeparturePoint(place: SearchPlace) {
    dispatch(updateSearchRoute(props.index, { origin: place }))
  }

  function onChangeArrivalPoint(place: SearchPlace) {
    dispatch(updateSearchRoute(props.index, { destination: place }))
  }

  const search = useSelector(state => state.search)
  const params = useParams<{ routes?: string }>()

  useEffect(() => {
    if (params.routes != null) return
    if (search.routes[0].origin != null || search.routes[0].destination != null) return

    ClientAPI
      .query(getGeoIpAir)
      .then(({ payload }) => {
        if (!payload) return

        inputRef.current?.focus()
        dispatch(updateSearchRoute(0, { origin: payload }))
      })
  }, [search.routes[0], params.routes])

  return (
    <>
      <SearchFormRouteInput name="departure" placeholder={ll.main.origin} state={props.origin} onChange={onChangeDeparturePoint}>
        <SearchFormRoutesSwitchButton />
      </SearchFormRouteInput>
      <SearchFormRouteInput name="arrival" placeholder={ll.main.destination} state={props.destination} onChange={onChangeArrivalPoint} inputRef={inputRef} />
    </>
  )
}


interface SearchFormRouteInputProps {
  name: string
  placeholder: string
  inputRef?: MutableRefObject<HTMLInputElement | null>

  state: SearchPlace | null
  onChange: Dispatch<SearchPlace>

  children?: ReactNode
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

  useEffect(() => setValue(props.state?.title), [props.state])

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

        value={value || ""}
        onChange={onChange}
        ref={props.inputRef} />
      <div className="search-form__placeholder">{props.placeholder}</div>
      <DropDown list={dropDownList} isOpen={isOpen} setIsOpen={setIsOpen} onSelect={onSelect} />
      {props.children}
    </label>
  )
}


function SearchFormRoutesSwitchButton() {
  const ll = useLocalization(ll => ll)
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)

  function switchRoutes() {
    console.log(search.routes[0])
    // Switch exists for the first and only route
    dispatch(updateSearchRoute(0, {
      destination: search.routes[0].origin,
      origin: search.routes[0].destination,
    }))
  }

  if (search.routes.length > 1) return null
  return <button onClick={switchRoutes} type="button" className="search-form__switch">{ll.main.swap}</button>
}
