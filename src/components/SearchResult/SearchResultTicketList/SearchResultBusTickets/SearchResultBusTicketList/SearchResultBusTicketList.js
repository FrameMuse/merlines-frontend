import React, {useEffect} from 'react'
import SearchResultBusTicket from "../SearchResultBusTicket";

const SearchResultBusTicketList = ({tickets,searchResultBusListPagination,setSearchResultBusListPagination}) => {


  const dataToScroll = tickets;

  useEffect(() => {
    setSearchResultBusListPagination(tickets?.slice(0, 10))
  // eslint-disable-next-line
  }, []); //tickets

  const openMoreResult = () => {
    const start = searchResultBusListPagination?.length;
    const end = start + 10;
    setSearchResultBusListPagination([...searchResultBusListPagination, ...dataToScroll.slice(start, end)]);
  };


  return (
    <>
    {searchResultBusListPagination?.map((ticket, i) => (
      <SearchResultBusTicket
        key={ticket.id}
        carrier={ticket.carrier_name}
        maxDuration={ticket.duration}
        price={ticket.price}
        arrivalDateTime={ticket.arrival_datetime}
        arrivalPointName={ticket.arrival_point_name}
        departureDatetime={ticket.departure_datetime}
        departurePointName={ticket.departure_point_name}
        url={ticket.url}
        airports={[]}
        flight={''}
        sellers={[]}
        voyages={[]}
        transfers={[]}
      />
    ))}
      {searchResultBusListPagination && dataToScroll?.length > searchResultBusListPagination?.length && (
        <button onClick={openMoreResult} className="btn btn-secondary">Загрузить еще 10 билетов</button>
      )}
    </>
  )
}

export default SearchResultBusTicketList
