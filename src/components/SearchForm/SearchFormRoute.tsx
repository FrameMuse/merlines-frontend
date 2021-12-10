import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchRoute, updateSearchRoute } from "redux/reducers/search"

import DropDown from "../DropDown/DropDown"
import { DropDownElementProps } from "../DropDown/DropDownItem"


interface SearchFormRouteProps extends SearchRoute {
  index: number
}

export function SearchFormRoute(props: SearchFormRouteProps) {
  const dispatch = useDispatch()

  const [departurePointOpen, setDeparturePointOpen] = useState(false)
  const [arrivalPointOpen, setArrivalPointOpen] = useState(false)

  function updateRouteData<K extends keyof SearchRoute = keyof SearchRoute>(key: K, value: SearchRoute[K]) {
    dispatch(updateSearchRoute(props.index, { [key]: value }))
  }

  function onSelectDeparturePoint(element: DropDownElementProps) {
    updateRouteData("departurePoint", element.title)
  }

  function onSelectArrivalPoint(element: DropDownElementProps) {
    updateRouteData("arrivalPoint", element.title)
  }

  function onChangeDeparturePoint(event: FormEvent<HTMLInputElement>) {
    setDeparturePointOpen(true)
    updateRouteData("departurePoint", event.currentTarget.value)
  }

  function onChangeArrivalPoint(event: FormEvent<HTMLInputElement>) {
    setArrivalPointOpen(true)
    updateRouteData("arrivalPoint", event.currentTarget.value)
  }


  const list = [{ tag: "WOW", title: "Boobs", iconName: "departures" }, { tag: "MEOW", title: "Cat", iconName: "destinations" }]

  return (
    <>
      <label className="form__group form__group--departure">
        <input
          className="form__input"
          autoComplete="off"
          placeholder="_"

          value={props.departurePoint}
          onChange={onChangeDeparturePoint} />
        <div className="form__label">{"откуда"}</div>
        <SearchFormRoutesSwitchButton />
        <DropDown list={list} isOpen={departurePointOpen} setIsOpen={setDeparturePointOpen} onSelect={onSelectDeparturePoint} />
      </label>
      <label className="form__group form__group--arrival">
        <input
          className="form__input"
          autoComplete="off"
          placeholder="_"

          value={props.arrivalPoint}
          onChange={onChangeArrivalPoint} />
        <div className="form__label">{"куда"}</div>
        <DropDown list={list} isOpen={arrivalPointOpen} setIsOpen={setArrivalPointOpen} onSelect={onSelectArrivalPoint} />
      </label>
    </>
  )
}


function SearchFormRoutesSwitchButton() {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)

  function switchRoutes() {
    // Switch exists for the first and only route
    dispatch(updateSearchRoute(0, {
      arrivalPoint: search.routes[0].departurePoint,
      departurePoint: search.routes[0].arrivalPoint,
    }))
  }

  if (search.routes.length > 1) return null
  return <button onClick={switchRoutes} type="button" className="form__switch">Поменять местами</button>
}
