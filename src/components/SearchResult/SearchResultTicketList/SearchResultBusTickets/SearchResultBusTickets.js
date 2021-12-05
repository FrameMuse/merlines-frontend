import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  selectSearchBusTicketResult,
  setSearchData
} from "../../../../reducers/searchResultBusTicketsSlice"
// import busTicketsDataParser from "../../searchReasultDataParsers/busTicketsDataParser";
import SearchResultBusTicketList from "./SearchResultBusTicketList/SearchResultBusTicketList"

const SearchResultBusTickets = ({
  bussTicketsResult,
  searchResultBusListPagination,
  setSearchResultBusListPagination
}) => {
  const dispatch = useDispatch()
  const { searchData } = useSelector(selectSearchBusTicketResult)
  const tickets = searchData?.tickets
  useEffect(() => {
    dispatch(setSearchData(bussTicketsResult?.result?.data))
    // eslint-disable-next-line
  }, []) //bussTicketsResult?.result?.data

  return (
    <>
      <SearchResultBusTicketList
        searchResultBusListPagination={searchResultBusListPagination}
        setSearchResultBusListPagination={setSearchResultBusListPagination}
        tickets={tickets}
      />
    </>
  )
}

export default SearchResultBusTickets
