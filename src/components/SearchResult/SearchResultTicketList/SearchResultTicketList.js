import React, { useState, useEffect } from 'react';
import TransportSwitcher from '../../common/TransportSwitcher';
import SearchResultTicket from './SearchResultTicket/SearchResultTicket';
import SearchResultTicketNotFound from "../../TechnicalPages/SearchResultTicketNotFound";
import SearchResultBusTickets from "./SearchResultBusTickets/";
import SearchResultWeekPrice from "../SearchResultWeekPrice/SearchResultWeekPrice";
import SearchResultSubscribePrice from "../SearchResultSubscribePrice/SearchResultSubscribePrice";
import SearchResultFilters from "../SearchResultFilters/SearchResultFilters";
import {returnInputs} from "../utils";
import SearchResultTrainTickets from "./SearchResultTrainTickets/SearchResultTrainTickets";
import PreloaderDots from "../../Preloaders/PreloaderDots/PreloaderDots";


function SearchResultTicketList({
      searchData, trainTicketsResult,
      filterData, bussTicketsResult,
      tickets, transfers
}) {
  const transport = {
    air: 'air',
    train: 'train',
    bus: 'bus',
  };

  const [searchResultPagination, setSearchResultPagination] = useState([]);
  const [searchResultBusListPagination, setSearchResultBusListPagination] = useState([]);
  const [searchTransportIs, setSearchTransport] = useState()

  const dataToScroll = filterData ? filterData : searchData;

  useEffect(() => {
    setSearchResultPagination(dataToScroll?.slice(0, 10))
  }, [dataToScroll]);



  const openMoreResult = () => {
    const start = searchResultPagination?.length;
    const end = start + 10;
    setSearchResultPagination([...searchResultPagination, ...dataToScroll.slice(start, end)]);
  };

  const toSwitchTransport = (e) => {
    const transportIs = e.currentTarget.name
    console.log(transportIs)
    setSearchTransport(transportIs)
  }




  return (
    <>
      {searchTransportIs !== transport.train && <SearchResultWeekPrice/>}
      <aside className="ticket-list__left">
        {/*{searchTransportIs === transport.air && <SearchResultSubscribePrice/>}*/}
        <SearchResultSubscribePrice/>
        {tickets && searchTransportIs === transport.air && <SearchResultFilters checkboxes={returnInputs(tickets, transfers)} />}
      </aside>
        <div className="ticket-list__content">
          <TransportSwitcher toSwitchTransport={toSwitchTransport}
                             setSearchTransport={setSearchTransport}
                             searchTransportIs={searchTransportIs}/>
          {
            searchTransportIs === transport.air
            ? searchResultPagination?.length !== 0
              ?
              <>
                  {
                    searchResultPagination
                      ? searchResultPagination.map((ticket) => (
                          <SearchResultTicket
                            key={ticket.hash}
                            carriers={ticket.carriers}
                            price={ticket.sellers[0].price}
                            airports={ticket.voyages[0]}
                            flight={ticket.voyages}
                            maxDuration={ticket.duration}
                            sellers={ticket.sellers}
                            voyages={ticket.voyages}
                            transfers={ticket.transfers && ticket.transfers}
                          />
                        ))
                      : <PreloaderDots />
                  }
              {searchResultPagination && dataToScroll?.length > searchResultPagination?.length && (
                <button onClick={openMoreResult} className="btn btn-secondary">Загрузить еще 10 билетов</button>
              )}
              </>
              : <SearchResultTicketNotFound />
              : searchTransportIs === transport.train
                ? <SearchResultTrainTickets
                      trainTicketsResult={trainTicketsResult} />
                : bussTicketsResult
                  ? <SearchResultBusTickets
                    searchResultBusListPagination={searchResultBusListPagination}
                    setSearchResultBusListPagination={setSearchResultBusListPagination}
                    bussTicketsResult={bussTicketsResult}/>
                  : <PreloaderDots/>
          }

        </div>
      </>
  )
};

export default SearchResultTicketList;
