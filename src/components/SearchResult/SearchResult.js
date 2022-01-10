import "./ticket.scss"
import "./ticket-list.scss"
import "./ticket-mini.scss"

import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

import api from "../../api/api"
import asyncAction from "../../hooks/asyncAction"
import useQuery from "../../hooks/useQuery"
// import { selectAccessData } from '../../reducers/accessDataSlice';
import useWindowSize from "../../hooks/useWindowSize"
import { selectFilter } from "../../reducers/filtersSlice"
import { setRouteFrom, setRouteTo } from "../../reducers/mainSearchSlice"
import {
  selectSearchResult,
  setSearchData,
} from "../../reducers/searchResultSlice"
import meta from "../../seo/meta"
import parseParamsFromRoute from "../../services/parseParamsFromRoute"
import Icon from "../common/Icon"
import Loader from "../Loader/Loader"
import LoaderClose from "../Loader/LoaderClose"
import SearchForm from "../SearchForm/SearchForm"
import SearchFormMini from "../SearchForm/SearchFormMini"
import SearchResultTicketList from "./SearchResultTicketList/SearchResultTicketList"
import { transfersFilter } from "./utils"

function SearchResult({ setIsOpenFilter }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const {
    searchData: { tickets },
  } = useSelector(selectSearchResult)
  const { transfers } = useSelector(selectFilter)
  const [searchParams, setSearchParams] = useState("")
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(true)

  const windowSize = useWindowSize()
  const query = useQuery()

  const loadStatuses = {
    success: "Success",
    loading: "loading",
    failed: "Failure",
  }

  const [searchData, setData] = useState([])

  useEffect(() => {
    setData(transfersFilter(tickets, transfers))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transfers])

  useEffect(() => {
    setSearchParams(location.search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1]) // todo ?

  useEffect(() => {
    // FIXME: это при каждом изменении окна перезапускаем?) чёт такое себе...
    if (windowSize.width < 992) {
      setIsSearchFormOpen(false)
    } else {
      setIsSearchFormOpen(true)
    }
  }, [windowSize])

  const getParsParamsFromRout = () =>
    parseParamsFromRoute(
      location.pathname,
      location.search,
      query,
      dispatch,
      setRouteFrom,
      setRouteTo
    )

  const useGetBusTicketAction = () => asyncAction(getBusTickets)

  const useGetAirTicketAction = () => asyncAction(getAirTickets)

  const getBusTickets = async () => {
    const params = {
      origin: 62,
      destination: 254,
      depart_date: "2021-06-03",
    }
    return await api.getBusTickets(params)
  }

  const getAirTickets = async () => {
    const testParams = getParsParamsFromRout()
    return await api.getTickets(testParams.routeParams)
  }

  const [airTicketsResult, getAirTicketsResult] = useGetAirTicketAction()
  const [bussTicketsResult, getBusTicketsList] = useGetBusTicketAction()
  // const [trainTicketsResult, setTrainTicketsResult] = useGetTrainTicketAction()

  useEffect(() => {
    getBusTicketsList()
    getAirTicketsResult()
    // setTrainTicketsResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (airTicketsResult.type === loadStatuses.success) {
      console.log("Seccess")
      dispatch(
        setSearchData([])
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airTicketsResult.type])

  const [cityFrom, setCityFrom] = useState("")
  const [cityTo, setCityTo] = useState("")
  const [travelClass, setTravelClass] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [cityFromCode, setCityFromCode] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [cityToCode, setCityToCode] = useState("")
  const [isChildren, setIsChildren] = useState(false)
  const [transport, setTransport] = useState()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    setTransport(urlSearchParams.get("transport"))
    // const testParams = getParsParamsFromRout()
    setCityFrom(sessionStorage.getItem("cityFrontFrom"))
    setCityTo(sessionStorage.getItem("cityFrontTo"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    if (query.get("passengers_children") || query.get("passengers_infants")) {
      setIsChildren(true)
    } else {
      setIsChildren(false)
    }
    setTravelClass(query.get("travel_class"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return (
    <>
      <Helmet>
        <title>{meta.generateTitle(cityFrom, cityTo, travelClass)}</title>
        <meta
          name="description"
          content={meta.generateMetaDescription(
            cityFrom,
            cityFromCode,
            cityTo,
            cityToCode,
            travelClass,
            isChildren
          )}
        />
      </Helmet>
      {window ? (
        <section className="ticket-list">
          <div className="ticket-list-form__container">
            {isSearchFormOpen ? (
              <>
                <SearchForm searchResult={true} />
                <div className="form-close">
                  <button
                    onClick={() => setIsSearchFormOpen(!isSearchFormOpen)}
                    className="form-close__btn"
                    type="button"
                  >
                    <Icon name="arrow-angle" className="form-close__icon" />
                  </button>
                </div>
              </>
            ) : (
              <SearchFormMini
                openForm={() => setIsSearchFormOpen(!isSearchFormOpen)}
              />
            )}
          </div>
          <div className="ticket-list__container">
            <SearchResultTicketList
              tickets={tickets}
              transfers={transfers}
              searchData={tickets}
              filterData={searchData}
              loadedState={true}
              bussTicketsResult={bussTicketsResult}
            />
          </div>
          <button className="ticket-list__open-filter" onClick={() => setIsOpenFilter(true)}>фильтры</button>
        </section>
      ) : (
        <>
          {isSearchFormOpen ? (
            <Loader loadedState={airTicketsResult.type}>
              <SearchForm />
              <div className="form-close">
                <button
                  onClick={() => setIsSearchFormOpen(!isSearchFormOpen)}
                  className="form-close__btn"
                  type="button"
                >
                  <Icon name="arrow-angle" className="form-close__icon" />
                </button>
              </div>
            </Loader>
          ) : (
            <LoaderClose>
              <SearchFormMini openForm={() => setIsSearchFormOpen(!isSearchFormOpen)} />
            </LoaderClose>
          )}
        </>
      )}
    </>
  )
}

export default SearchResult
